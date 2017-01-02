var gulp = require('gulp');
var babel = require('gulp-babel');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');

gulp.task('default', ['less', 'babel', 'copy-pages']);

// Less and minify css
var LESS_PATHS = ['_src/styles/*.less', '!_src/styles/_shared/**'];
gulp.task('less', function () {
    return gulp.src(LESS_PATHS)
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(gulp.dest(''));
});
gulp.watch(LESS_PATHS, ['less']); // Watch less for changes

// Babel
var JS_PATHS = ['_src/javascript/*.js', '!_src/javascript/_shared/**'];
gulp.task('babel', function () {
    return gulp.src(JS_PATHS)
        .pipe(babel())
        .pipe(gulp.dest(''));
});
gulp.watch(JS_PATHS, ['babel']); // Watch js for changes

// Copy html from pages to root for hosting
var PAGES_PATHS = ['_src/pages/*.html'];
gulp.task('copy-pages', function () {
    return gulp.src(PAGES_PATHS)
        .pipe(gulp.dest(''));
});
gulp.watch(PAGES_PATHS, ['copy-pages']); // Watch pages for changes