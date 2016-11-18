function run ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    if (window.cordova) {
      window.open = cordova.InAppBrowser.open
    }

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false)
      cordova.plugins.Keyboard.disableScroll(true)
    }

    if (window.StatusBar) {
      StatusBar.styleLightContent()
    }
  })
}

function config ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $ionicNativeTransitionsProvider) {
  $stateProvider
    .state('welcome', {
      url: '/welcome',
      templateUrl: 'routes/welcome/welcome.html'
    })

  $ionicNativeTransitionsProvider.setDefaultTransition({ type: 'none' })
  $urlRouterProvider.otherwise('/welcome')
  $ionicConfigProvider.views.transition('none')
  $ionicConfigProvider.views.maxCache(0)
}

angular.module('app', ['ionic', 'ngCordova', 'ionic-native-transitions'])
  .run(run)
  .config(config)

