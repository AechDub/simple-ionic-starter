module.exports = {
  src: {
    js: [
      'src/app/app.js',
      'src/app/services/**/**/*.js',
      'src/app/common/**/**/*.js',
      'src/app/routes/**/**/*.js'
    ],
    assets: [ 'src/assets/**/*.*' ],
    css: [ 'src/style/**/*.scss' ],
    templates: [ 'src/app/**/**/**/*.jade' ],
    gulp: [ 'gulp/**/*.js' ]
  },
  vendor: {
    css: ['bower_components/**/**/*.min.css']
  },
  dest: {
    dist: 'www/',
    js: 'www/js',
    assets: 'www/assets/'
  },
  bower: ['bower_components/angular/angular.min.js', 'bower_components/ionic/js/ionic.bundle.min.js', 'bower_components/**/*.js']
}
