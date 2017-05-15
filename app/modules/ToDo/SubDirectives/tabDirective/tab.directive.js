(function(){
  'use strict'

  angular.module('ToDo')
  .directive('tab',tab);

  //tab.$inject = [];
  function tab (){
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
})()
