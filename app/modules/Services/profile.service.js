(function() {
	'use strict';

  angular.module('services')
		.service('profileService', profileService);

	profileService.$inject = ['$q'];
	function profileService($q) {

  }
})();
