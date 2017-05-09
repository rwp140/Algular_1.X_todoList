(function() {
	'use strict';

  angular.module('services')
		.service('profileService', profileService);

	profileService.$inject = ['$q'];
	function profileService($q) {
    var svc = this
    /*====================== Delegation Variables =========================== */
    svc.clearUserData = clearUserData
    /*====================== public Variables =============================== */
    svc.profileMode = "signIn";
    svc.user;
    svc.userEmail;//<!> add encryption
    svc.userPassword;///<!> add encryption
    /*====================== private Variables ============================== */
    /*====================== Services ======================================= */
    /*====================== Public Methods ================================= */
    function clearUserData(){
      
    }
    /*====================== Private Methods ================================ */
    function init(){

    }
    /*====================== Actions ======================================== */
    init();

  }
})();
