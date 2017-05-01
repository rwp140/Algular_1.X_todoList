(function() {
  'use strict';

  angular.module('app', [
      'Root',
      'ToDo'
  ])
  .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/modules/ToDo'});
  }]);
})()
