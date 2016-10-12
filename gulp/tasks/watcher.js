var gulp = require('gulp')
var config = require('../config/config')

gulp.task('watch', function () {
  gulp.watch(config.paths.src.css, ['css'])
  gulp.watch(config.paths.src.templates, ['html'])
  gulp.watch(config.paths.src.js, ['js'])
  gulp.watch(config.paths.bower, ['js'])
})
