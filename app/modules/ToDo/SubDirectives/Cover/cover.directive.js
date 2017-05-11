(function(){
  'use strict'

  angular.module('ToDo')
  .directive('cover',cover);

  cover.$inject = [''];
  function cover (){
    return {
      restrict: 'E',
      scope: true,
      templateUrl: 'modules/ToDo/SubDirectives/Cover/cover.directive.html',
      link: function(scope) {
        function init(){
        }

        init();
      }
    };
  }
})();
