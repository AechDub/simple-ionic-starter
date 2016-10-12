var gutil = require('gulp-util')
var _ = require('lodash')
var paths = require('./paths.js')
var env = gutil.env.env || 'local'
var defaultConfig = require('../environments/default')
var envConfig = require('../environments/' + env)
var config = _.merge({}, defaultConfig, envConfig)

config.paths = paths

module.exports = config

