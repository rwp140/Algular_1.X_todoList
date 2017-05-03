(function(){
  'use strict'

  angular.module('ToDo')
  .directive('listItem',listItem);

  //sample.$inject = ['ToDoService'];
  function listItem (){
    return {
      restrict: 'E',
      scope: {
        placeholder: "@",
        list: "=",
        property: "@"
      },
      templateUrl: 'modules/ToDo/SubDirectives/listItem/listItem.directive.html',
      link: function(scope) {
        function init(){

        }

        init();
      }
    };
  }
})();
