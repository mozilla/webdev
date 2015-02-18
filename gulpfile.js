var argv = require('yargs').argv;
var async = require('async');
var deploy = require('gulp-gh-pages');
var dotenv = require('dotenv');
var fs = require('fs');
var GitHubApi = require("github");
var gulp = require('gulp');
var gutil = require('gulp-util');
var nunjucksRender = require('gulp-nunjucks-render');
var serve = require('gulp-serve');


// Set up Github API connection if necessary.
dotenv.load();
var github = new GitHubApi({
    version: '3.0.0',
});
if (process.env.GITHUB_USERNAME && process.env.GITHUB_PASSWORD) {
    github.authenticate({
        type: 'basic',
        username: process.env.GITHUB_USERNAME,
        password: process.env.GITHUB_PASSWORD,
    });
}


/**
 * Run a local development server. The site is re-generated automatically when
 * changes are made.
 */
gulp.task('serve', function() {
    var watcher = gulp.watch('./src/**/*', ['build']);
    watcher.on('change', function(event) {
        gutil.log(gutil.colors.cyan('Change detected, rebuilding.'));
    });

    // Wish I had a better way of doing this.
    return serve({
        root: 'build',
        port: 8000,
    })();
});

/**
 * Build a projects.json file annotated with data pulled from Github and other
 * sources.
 */
gulp.task('build.projectdata', function(callback) {
    // Ensure the build directory exists.
    try {
        fs.mkdirSync('build');
    } catch (err) {}

    // If the list has been updated in the past 24 hours, don't bother updating.
    // Unless we're being forced to, that is.
    if (!argv.force) {
        try {
            var oldProjects = JSON.parse(fs.readFileSync('build/projects.json'));
            var lastUpdated = new Date(oldProjects.lastUpdated);
            if (lastUpdated - Date.now() < (24 * 60 * 60 * 1000)) {
                gutil.log(gutil.colors.yellow('Projects are up-to-date, skipping re-generation.'));
                return callback();
            }
        } catch (err) {
            // Any failure in checking the old projects means we need to
            // regenerate anyway.
        }
    }

    var projects = JSON.parse(fs.readFileSync('projects.json'));
    projects.lastUpdated = Date.now();

    // Annnotate the projects with extra data and s
    async.each(allProjects(projects), annotateProject, function(err) {
        if (err) {
            console.error('Error annotating projects.');
            console.error(err);
            callback(err);
        } else {
            fs.writeFileSync('build/projects.json', JSON.stringify(projects));
            callback();
        }
    });
});

/**
 * Build HTML files by running them through nunjucks.
 */
gulp.task('build.templates', ['build.projectdata'], function() {
    nunjucksRender.nunjucks.configure(['src']);

    var projects = JSON.parse(fs.readFileSync('build/projects.json'));
    var ctx = {
        projects: projects
    };
    return gulp.src('./src/**/!(*.lib).html')
        .pipe(nunjucksRender(ctx))
        .pipe(gulp.dest('./build'));
});

/**
 * Copy non-HTML files over to the build directory.
 */
gulp.task('build.static', function() {
    return gulp.src('./src/**/!(*.html)')
        .pipe(gulp.dest('./build'));
});

/**
 * Full build of the static site.
 */
gulp.task('build', ['build.templates', 'build.static']);

/**
 * Build the site, commit it to the gh-pages branch, and push to origin.
 */
gulp.task('deploy', ['build'], function() {
    return gulp.src('./build/**/*')
        .pipe(deploy());
});

/**
 * Return a list of every individual project from the categorized lists in
 * projects.json.
 */
function allProjects(projects) {
    var _allProjects = [];
    ['websites', 'libraries', 'apps', 'other'].forEach(function(category) {
        projects[category].forEach(function(project) {
            _allProjects.push(project);
        });
    });

    return _allProjects;
}

/**
 * Annotate a project with extra metadata, such as repo info pulled from the
 * Github API.
 */
function annotateProject(project, callback) {
    if (project.repos) {
        project.link = project.repos[0];
    } else if (project.see_also) {
        project.link = project.see_also[0];
    }

    if (project.github) {
        github.repos.get({
            user: project.github.user,
            repo: project.github.repository,
        }, function(err, result) {
            if (err) {
                callback(err);
            } else {
                project.description = result.description;
                project.stars = result.stargazers_count;
                callback();
            }
        });
    } else {
        callback();
    }
}
