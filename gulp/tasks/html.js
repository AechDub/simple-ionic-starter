var gulp = require('gulp')
var jade = require('gulp-jade')
// var gulpif = require('gulp-if')
// var htmlmin = require('gulp-minify-html')
// var ngHtml = require('gulp-angular-htmlify')
// var sizeOf = require('gulp-size')
var config = require('../config/config')

gulp.task('html', [ 'js', 'css' ], function () {
  return gulp
    .src(config.paths.src.templates)
    .pipe(jade(config.options.html.jade))
    .pipe(gulp.dest(config.paths.dest.dist))
})
