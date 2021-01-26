var argv = require('yargs').argv;
var async = require('async');
var babel = require('gulp-babel');
var del = require('del');
var deploy = require('gulp-gh-pages');
var dotenv = require('dotenv');
var fs = require('fs');
var GitHubApi = require("github");
var gitRev = require('git-rev');
var gulp = require('gulp');
var gutil = require('gulp-util');
var jsonschema = require('jsonschema');
var myth = require('gulp-myth');
var nunjucksRender = require('gulp-nunjucks-render');
var plumber = require('gulp-plumber');
var ProgressBar = require('progress');
var request = require('request');
var serve = require('gulp-serve');
var util = require('util');


var CONTRIBUTE_JSON_URL = 'https://raw.githubusercontent.com/%s/%s/master/contribute.json';
var CONTRIBUTE_JSON_SCHEMA = 'https://raw.githubusercontent.com/mozilla/contribute.json/master/schema.json';


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
 * Run a local development server. The site is re-generated
 * automatically when changes are made.
 */
gulp.task('serve', done => {
    gulp.series('build', () => {
        var watcher = gulp.watch('./src/**/*', ['build']);
        watcher.on('change', function (event) {
            gutil.log(gutil.colors.cyan('Change detected, rebuilding.'));
        });

        // Wish I had a better way of doing this.
        return serve({
            root: 'build',
            port: 8000,
        })();
    })
    done();
});

/**
 * Build a projects.json file annotated with data pulled from Github and other
 * sources.
 */
gulp.task('build.projectdata', callback => {
    // Ensure the build directory exists.
    try {
        fs.mkdirSync('build');
    } catch (err) {
    }

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

    var projects = loadProjects();
    projects.lastUpdated = Date.now();

    // Annnotate the projects with extra data and s
    async.each(allProjects(projects), annotateProject, function (err) {
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
gulp.task('build.templates', done => {
    gulp.series('build.projectdata', () => {
        nunjucksRender.nunjucks.configure(['src']);

        var projects = JSON.parse(fs.readFileSync('build/projects.json'));
        var githubProjects = allProjects(projects, function (p) {
            return p.github;
        });
        githubProjects.sort(function (a, b) {
            return b.github.stars - a.github.stars;
        });

        var ctx = {
            projects: githubProjects,
            thisYear: new Date().getFullYear(),
            now: new Date(),
        };
        return gulp.src('./src/index.html')
            .pipe(plumber())
            .pipe(nunjucksRender(ctx))
            .pipe(gulp.dest('./build'));
    })
    done();
});

/**
 * Copy other files over to the build directory.
 */
gulp.task('build.static', () => {
    return gulp.src(['./src/font/**/*',
            './src/img/**/*',
            './src/js/lib/**/*'],
        {base: './src'})
        .pipe(gulp.dest('./build'));
});

/**
 * Build CSS files by running them through myth.
 */
gulp.task('build.css', () => {
    return gulp.src('./src/css/*.css')
        .pipe(plumber())
        .pipe(myth())
        .pipe(gulp.dest('./build/css'));
});

/**
 * Build JS files by running them through Babel.
 */
gulp.task('build.js', () => {
    return gulp.src('./src/js/*.js')
        .pipe(plumber())
        .pipe(babel())
        .pipe(gulp.dest('./build/js'));
});

/**
 * Full build of the static site.
 */
gulp.task('build', done => {
    gulp.series('build.templates', 'build.css', 'build.js', 'build.static')
    done();
});


gulp.task('clean', cb => {
    del('build/**/*', cb);
});

/**
 * Build the site, commit it to the gh-pages branch, and push to origin.
 */
gulp.task('deploy', done => {
    gulp.series('build', (cb) => {
        gitRev.long(function (rev) {
            gulp.src('./build/**/*')
                .pipe(deploy({
                    message: 'Building from commit ' + rev,
                }))
                .on('end', cb);
        });
    })
    done();
});

/**
 * Download and validate contribute.json files for all the projects in
 * projects.json.
 */
gulp.task('validate_contribute_json',  gulpCallback=> {
    var projects = allProjects(loadProjects());
    var bar = new ProgressBar(':bar', {total: projects.length});
    var passed = [];
    var failed = [];
    var skipped = [];

    // Sort projects by name.
    projects.sort(function (a, b) {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });

    async.each(projects, function (project, eachCallback) {
        if (!project.github) {
            skipped.push({project: project, reason: 'No Github repo.'});
            bar.tick();
            return eachCallback();
        }

        getContributeJSON(project, function (contributeJSON, error) {
            if (error) {
                failed.push({
                    project: project,
                    reason: error
                });
                bar.tick();
                eachCallback();
            } else {
                validateContributeJSON(contributeJSON, function (result) {
                    if (result.errors.length > 0) {
                        failed.push({
                            project: project,
                            reason: 'Failed validation.',
                            validationResult: result,
                        });
                        bar.tick();
                        eachCallback();
                    } else {
                        passed.push(project);
                        bar.tick();
                        eachCallback();
                    }
                });
            }
        });
    }, function () {
        gutil.log(gutil.colors.green('== Passed =='));
        passed.forEach(function (project) {
            gutil.log('  ' + gutil.colors.underline(project.name));
        });

        gutil.log(gutil.colors.red('== Failed =='));
        failed.forEach(function (result) {
            gutil.log('  ' + gutil.colors.underline(result.project.name));
            gutil.log('    ' + result.reason);
            if (result.validationResult) {
                gutil.log(result.validationResult.errors);
            }
        });

        gutil.log(gutil.colors.yellow('== Skipped =='));
        skipped.forEach(function (result) {
            gutil.log('  ' + gutil.colors.underline(result.project.name));
            gutil.log('    ' + result.reason);
        });
    });
});

function getContributeJSON(project, callback) {
    if (!project.github) {
        callback(null, 'No Github repo.');
    }

    var url = util.format(CONTRIBUTE_JSON_URL, project.github.user,
        project.github.repository);
    request(url, function (error, response, body) {
        if (error) {
            callback(null, 'Error downloading contribute.json: ' + error);
        } else if (response.statusCode != 200) {
            callback(null, 'Bad response code: ' + response.statusCode);
        } else {
            try {
                var contributeJSON = JSON.parse(body);
                callback(contributeJSON, null);
            } catch (error) {
                callback(null, 'Error parsing contribute.json: ' + error);
            }
        }
    });
}

var _contributeSchema = null;

function getContributeSchema(callback) {
    if (!_contributeSchema) {
        request(CONTRIBUTE_JSON_SCHEMA, function (error, response, body) {
            // TODO: Handle errors fetching this.
            _contributeSchema = JSON.parse(body);
            callback(_contributeSchema);
        });
    } else {
        callback(_contributeSchema);
    }
}

function validateContributeJSON(contributeJSON, callback) {
    getContributeSchema(function (contributeSchema) {
        callback(jsonschema.validate(contributeJSON, contributeSchema));
    });
}

/**
 * Return a list of every individual project from the categorized lists in
 * projects.json.
 */
function allProjects(projects, filter) {
    var _allProjects = [];
    ['websites', 'libraries', 'apps', 'other'].forEach(function (category) {
        projects[category].forEach(function (project) {
            if (filter && !filter(project)) return;
            _allProjects.push(project);
        });
    });

    return _allProjects;
}

/**
 * Load projects.json.
 */
function loadProjects() {
    return JSON.parse(fs.readFileSync('projects.json'));
}

/**
 * Annotate a project with extra metadata, such as repo info pulled from the
 * Github API.
 */
function annotateProject(project, callback) {
    project.searchData = [project.name];
    if (project.repos) {
        project.link = project.repos[0];
    } else if (project.see_also) {
        project.link = project.see_also[0];
    }

    // If we have info about the Github repo, we can get the Github metadata as
    // well as the contribute.json file.
    if (project.github) {
        async.series([
            annotateProjectGithub.bind(null, project),
            annotateProjectContributeJSON.bind(null, project),
        ], function () {
            if (project.description) {
                project.searchData.push(project.description);
            }
            project.searchData = project.searchData.join(',').toLowerCase();

            callback();
        });
    } else {
        callback();
    }
}

/**
 * Annotate a project with info from the Github API.
 */
function annotateProjectGithub(project, callback) {
    github.repos.get({
        user: project.github.user,
        repo: project.github.repository,
    }, function (err, result) {
        if (err) {
            callback(err, project);
        } else {
            project.github.description = result.description;
            project.description = result.description;
            project.github.stars = result.stargazers_count;
            project.github.forks = result.forks_count;
            callback(null, project);
        }
    });
}

/**
 * Annotate a project with info from its contribute.json file.
 */
function annotateProjectContributeJSON(project, callback) {
    getContributeJSON(project, function (contributeJSON, error) {
        if (error) {
            callback(error, project);
        } else {
            project.contributeJSON = contributeJSON;
            project.description = contributeJSON.description || project.description;
            if (contributeJSON.keywords) {
                project.searchData = project.searchData.concat(contributeJSON.keywords);
            }

            callback(null, project);
        }
    });
}
