var gulp = require('gulp')
var config = require('../config/config')

gulp.task('assets', function () {
  return gulp
    .src(config.paths.src.assets)
    .pipe(gulp.dest(config.paths.dest.assets)
  )
})
