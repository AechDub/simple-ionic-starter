(function () { 'use strict';function run ($ionicPlatform) {
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
    .state('vin-entry', {
      url: '/vin/entry',
      templateUrl: 'routes/vin/entry.html',
      controller: 'VinEntryCtrl as vinEntryCtrl'
    })
    .state('list-vehicles', {
      url: '/list/vehicles',
      templateUrl: 'routes/list/vehicles.html',
      controller: 'VehiclesCtrl as vehiclesCtrl'
    })
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

})();
(function () { 'use strict';function vehicleFactory ($http, Constants) {
  function getVehicles (params) {
    var req = {
      method: 'GET',
      url: Constants.apiUrl + 'vehicles',
      params: params
    }

    function getVehiclesComplete (response) {
      return response.data.results
    }

    function getVehiclesFailed (error) {
      console.error(error)
    }

    return $http(req)
      .then(getVehiclesComplete, getVehiclesFailed)
  }

  function addVehicle (data) {
    return requestVehicleByVin(data)
  }

  function requestVehicleByVin (vin) {
    var req = {
      method: 'GET',
      url: Constants.edmundsApiUrl + 'vins/' + vin + '?fmt=json' + Constants.edmundsApiKey
    }

    return $http(req)
      .then(requestVehicleByVinComplete, requestVehicleByVinFailed)

    function requestVehicleByVinComplete (response) {
      saveVehicleDetails(response.data)
    }

    function requestVehicleByVinFailed (error) {
      console.error(error)
    }
  }

  function saveVehicleDetails (data) {
    console.log('saving vehicle', data);

    var req = {
      method: 'POST',
      url: Constants.apiUrl + 'vehicles',
      data: {
        vehicle_type: data.categories.vehicleType,
        vehicle_make: data.make.name,
        vehicle_model: data.model.name,
        mpg: data.MPG.highway,
        vin: data.vin,
        price: data.price.baseMSRP
      }
    }

    return $http(req)
      .then(saveVehicleDetailsComplete, saveVehicleDetailsFailed)

    function saveVehicleDetailsComplete (response) {
      return response
    }

    function saveVehicleDetailsFailed (error) {
      console.error(error)
    }
  }

  return {
    getVehicles: getVehicles,
    addVehicle: addVehicle
  }
}

angular
  .module('app')
  .factory('vehicleFactory', vehicleFactory)
})();
(function () { 'use strict';function VinEntryCtrl ($rootScope, vehicleFactory, $state) {
  var ctrl = this

  ctrl.saveVehicle = function () {
    ctrl.processing = true

    console.log('saving')

    vehicleFactory
      .addVehicle(ctrl.form.vin)
      .then(function (res) {
        ctrl.processing = false

        if (res) {
          console.log(res)
        }
      })
  }

}

angular
  .module('app')
  .controller(
    'VinEntryCtrl',
    VinEntryCtrl
  )
})();