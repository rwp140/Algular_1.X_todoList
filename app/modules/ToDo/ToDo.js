(function(){
  'use strict';

  angular.module('ToDo', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/ToDo', {
      templateUrl: 'modules/ToDo/ToDo.html',
      controller: 'ToDoController',
      controllerAs: 'vm'
      //controller: 'ToDoCtrl'
    });
  }]);
  //.controller('toDoController',toDoController );
  //  function toDoControler(){console.log("ERROR");}
})();


//}]);
