(function(){
  'use strict'

  angular.module('ToDo')
  .directive('listCreation',listCreation);

  //tab.$inject = [];
  function listCreation (){
    return {
      restrict: 'E',
      scope: true,
      templateUrl: 'modules/ToDo/SubDirectives/ListCreation/listCreation.directive.html',
      link: function(scope) {
        function init(){
          
        }

        init();
      }
    };
  }
})();
