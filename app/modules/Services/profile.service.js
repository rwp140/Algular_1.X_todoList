(function() {
	'use strict';

  angular.module('services')
		.service('profileService', profileService);

	profileService.$inject = ['$q'];
	function profileService($q) {
    var svc = this
    /*====================== Delegation Variables =========================== */
    svc.profileMode = "signIn";
    svc.user;
    svc.userEmail;//<!> add encryption
    svc.userPassword;///<!> add encryption
    /*====================== public Variables =============================== */
    /*====================== private Variables ============================== */
    /*====================== Services ======================================= */
    /*====================== Public Methods ================================= */
    /*====================== Private Methods ================================ */
    function init(){

    }
    /*====================== Actions ======================================== */
    init();

  }
})();
