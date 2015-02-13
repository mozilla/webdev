var deploy = require('gulp-gh-pages');
var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
var serve = require('gulp-serve');


gulp.task('serve', function() {
    var watcher = gulp.watch('./src/**/*', ['build']);
    watcher.on('change', function(event) {
        console.log('Change detected, rebuilding.');
    });

    // Wish I had a better way of doing this.
    return serve({
        root: 'build',
        port: 8000,
    })();
});

gulp.task('build', function() {
    nunjucksRender.nunjucks.configure(['src']);
    return gulp.src('./src/**/*')
        .pipe(nunjucksRender({foo: 'bar'}))
        .pipe(gulp.dest('./build'));
});

gulp.task('deploy', ['build'], function() {
    return gulp.src('./build/**/*')
        .pipe(deploy());
});
