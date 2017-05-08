(function(){
  'use strict'

  angular.module('ToDo')
  .directive('profile',profile);

  //sample.$inject = ['ToDoService'];
  function profile (){
    return {
      restrict: 'E',
      scope: true,
      templateUrl: 'modules/ToDo/SubDirectives/profile/profile.directive.html',
      link: function(scope) {
        function init(){

        }

        init();
      }
    };
  }
})();
