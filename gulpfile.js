const gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

function getTask(task) {
    return require('./gulp/' + task)(gulp, plugins);
}

gulp.task('css-minify : demo', getTask('css-minify-demo'));
gulp.task('css-minify : dist', getTask('css-minify-dist'));
