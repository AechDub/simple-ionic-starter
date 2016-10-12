var mainBowerFiles = require('main-bower-files')
var concat = require('gulp-concat')
var config = require('../config/config')
var file = require('gulp-file')
var gulp = require('gulp')
var gulpif = require('gulp-if')
var uglify = require('gulp-uglify')
var eslint = require('gulp-eslint')
var addsrc = require('gulp-add-src')
var wrap = require('gulp-wrap')
var ngAnno = require('gulp-ng-annotate')

gulp.task('js:vendor', ['js:lib'], function () {
  return gulp
    .src(mainBowerFiles('**/*.js'), { base: './bower_components' })
    .pipe(concat('vendor.js'))
    .pipe(gulpif(config.run.js.uglify, uglify(config.options.js.uglify)))
    .pipe(gulp.dest(config.paths.dest.js))
})

gulp.task('js:lib', function () {
  return gulp
    .src('./lib/**/**/*.*', {base: './lib'})
    .pipe(gulp.dest('./www/lib'))
})

gulp.task('js:app', ['js:lint'], function (done) {
  return gulp
    .src(config.paths.src.js)
    .pipe(wrap("(function () { 'use strict';<%= contents %>})();"))
    .pipe(concat('app.js'))
    .pipe(gulpif(config.run.js.uglify, ngAnno()))
    .pipe(gulpif(config.run.js.uglify, uglify(config.options.js.uglify)))
    .pipe(gulp.dest(config.paths.dest.js))
})

gulp.task('js:lint', function () {
  return gulp
    .src(config.paths.src.js)
    .pipe(addsrc(config.paths.src.gulp))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(gulpif(config.run.js.eslintFail, eslint.failAfterError()))
})

gulp.task('js:constants', function () {
  var constantsObjString, codeString, key, value

  constantsObjString = '{'

  for (key in config.constants) {
    value = config.constants[ key ]
    if (typeof value === 'string') {
      value = '\'' + value + '\''
    }
    constantsObjString += '\n      ' + key + ': ' + value + ','
  }

  // Remove the last comma
  constantsObjString = constantsObjString.substring(0, constantsObjString.length - 1)

  constantsObjString += '\n    }'

  codeString = ';(function(){' +
    '\n  angular.module(\'app\')' +
    '\n    .constant(\'Constants\', ' + constantsObjString + ');' +
    '\n})();'

  return file('constants.js', codeString, { src: true })
    .pipe(gulpif(config.run.js.uglify, uglify(config.options.js.uglify)))
    .pipe(gulp.dest(config.paths.dest.js))
})

gulp.task('js:build', [
  'js:app',
  'js:vendor',
  'js:constants'
])

gulp.task('js', [ 'js:build' ])
