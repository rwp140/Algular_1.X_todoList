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
        //var dir = this;
        var psvc = profileService;
        scope.psvc = psvc;
        //scope.dir = this;
        function init(){
          //console.log(dir.psvc.profileMode);
        }

        init();
      }
    };
  }
})();
