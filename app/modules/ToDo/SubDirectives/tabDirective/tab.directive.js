(function(){
  'use strict'

  angular.module('ToDo')
  .directive('tab',tab);

  //tab.$inject = [];
  function tab (){
    return {
      restrict: 'E',
      transclude:true,
      scope: true,
      templateUrl: 'modules/ToDo/SubDirectives/tabDirective/tab.directive.html',
      link: function(scope) {

        function init(){
        }

        init();
      }
    };
  }
})()
