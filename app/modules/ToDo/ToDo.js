'use strict';

angular.module('ToDo', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ToDo', {
    templateUrl: 'modules/ToDo/ToDo.html',
    controller: 'ToDoCtrl'
  });
}])

.controller('ToDoCtrl', [function() {

}]);
