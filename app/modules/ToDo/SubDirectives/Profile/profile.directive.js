(function(){
  'use strict'

  angular.module('ToDo')
  .directive('profile',profile);

  profile.$inject = ['profileService'];
  function profile (profileService){
    return {
      restrict: 'E',
      scope: true,
      templateUrl: 'modules/ToDo/SubDirectives/profile/profile.directive.html',
      link: function(scope) {
        scope.pSvc = profileService;
        function init(){
        }

        init();
      }
    };
  }
})();
