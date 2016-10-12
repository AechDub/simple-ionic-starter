var paths = require('../config/paths')

module.exports = {
  constants: {
    assetsDir: '/assets'
  },

  run: {
    html: {
      ngHtml: false,
      htmlmin: false
    },
    js: {
      ngAnno: false,
      concat: false,
      uglify: false,
      freeze: false,
      jshintReporter: false,
      eslintFail: false
    },
    css: {
      concat: false,
      cssMin: false,
      freeze: false,
      sMaps: false
    },
    templates: {
      ngHtml: false
    },
    stubby: false
  },

  options: {
    html: {
      ngHtml: {
        verbose: false,
        customPrefixes: [ 'ui-', 'uib-' ]
      },
      inSrc: {
        cwd: paths.dest.dist
      },
      htmlmin: {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true
      },
      sizeOf: {
        title: 'Html -> '
      },
      jade: {
        cache: false,
        pretty: true,
        locals: {
          lang: 'en',
          assets: '/assets'
        }
      }
    },
    vendor: {
      mainBowerFiles: {
        env: 'development',
        filter: '**/**/*.js'
      },
      sizeOf: {
        title: 'Packages -> '
      }
    },
    js: {
      uglify: {
        mangle: { 'except': [ 'angular', 'moment', 'd3', 'google', 'scrollfix' ] },
        enclose: true,
        compress: {
          drop_debugger: true,
          drop_console: true
        },
        preserveComments: true,
        unsafe: true,
        output: {
          beautify: false
        }
      },
      sizeOf: {
        title: 'App -> '
      },
      ngAnno: true,
      jshintReporter: null
    },
    css: {
      mainBowerFiles: {
        env: 'development',
        filter: '**/**/*.css'
      },
      cssGlob: {
        extensions: [ '.scss', '.css' ]
      },
      scss: {
        outputStyle: 'expanded',
        includePaths: [
          paths.bower + '/bootstrap-sass/assets/stylesheets',
          paths.bower + '/bourbon/app/assets/stylesheets'
        ]
      },
      cssMin: {
        advanced: true,
        keepSpecialComments: 0,
        sourceMap: false
      },
      sizeOf: {
        title: 'Stylesheets -> '
      },
      concat: true,
      sMaps: null,
      envBannerColor: null
    },
    templates: {
      jade: {
        pretty: true,
        locals: {
          assets: '/assets'
        }
      },
      ngHtml: {
        verbose: false,
        customPrefixes: [ 'ui-', 'uib-' ]
      },
      htmlmin: {
        empty: true,
        spare: true,
        quotes: true
      },
      jsCache: {
        moduleName: 'templates',
        standalone: true,
        stripPrefix: 'components/'
      },
      sizeOf: {
        title: 'Templates -> '
      }
    }
  }
}
