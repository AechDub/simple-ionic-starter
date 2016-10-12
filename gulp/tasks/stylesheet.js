var gulp = require('gulp')
var sass = require('gulp-sass')
var minifyCss = require('gulp-minify-css')
var globbing = require('gulp-css-globbing')
var rename = require('gulp-rename')
var config = require('../config/config')

gulp.task('css', ['css:vendor'], function () {
  gulp.src(config.paths.src.css)
    .pipe(globbing({
      extensions: ['.scss']
    }))
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest('./www/css/'))
})

gulp.task('css:vendor', function () {
  gulp.src(config.paths.vendor.css)
    .pipe(globbing({
      extensions: ['.css']
    }))
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename('vendor.min.css'))
    .pipe(gulp.dest('./www/css/'))
})
