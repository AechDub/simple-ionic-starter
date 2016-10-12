/******
*
* This is an example factory. Factories are used throughout Angular and 
* are no different in terms of use for Ionic
* 
* You'll see that I've got a function passed instead of nesting the 
* functions in the factory declaration.  This is just a formatting 
* approach that I prefer and will cover in a post (link will be added here 
* later)
*
******/

function stuffFactory ($http, Constants) {
  function getStuff (params) {
    var req = {
      method: 'GET',
      url: Constants.apiUrl + 'stuff',
      params: params
    }

    function getStuffComplete (response) {
      return response.data.results
    }

    function getStuffFailed (error) {
      console.error(error)
    }

    return $http(req)
      .then(getStuffComplete, getStuffFailed)
  }

  function addStuff (data) {
    var req = {
      method: 'POST',
      url: Constants.apiUrl + 'stuff',
      data: {
        key: data.value
      }
    }

    return $http(req)
      .then(saveStuffComplete, saveStuffFailed)

    function saveStuffComplete (response) {
      return response
    }

    function saveStuffFailed (error) {
      console.error(error)
    }
  }

  return {
    getStuff: getStuff,
    addStuff: addStuff
  }
}

angular
  .module('app')
  .factory('stuffFactory', stuffFactory)
