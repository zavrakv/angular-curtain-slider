var gulp = require('gulp'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename');

module.exports = function (gulp, plugins) {
    return function () {
        gulp.src('docs/css/curtain-slider.css')
            .pipe(cssmin())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('docs/css'));
    };
};