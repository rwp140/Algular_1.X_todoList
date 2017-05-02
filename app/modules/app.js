(function() {
  'use strict';

  // Declare app level module which depends on views, and components
  angular.module('myApp', [
    'ngRoute',
    'ToDo'
  ]).
  config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $routeProvider.otherwise({redirectTo: '/ToDo'});

    //'myApp.view1',
    //'myApp.view2',
    //'myApp.version'
  }]);
})();
