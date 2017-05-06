(function() {
	'use strict';

  angular.module('services')
		.service('firebaseService', firebaseService);

	firebaseService.$inject = [];
	function firebaseService() {
		var service = this;
    /*====================== Delegation Variables =========================== */
    /*====================== public Variables =============================== */
    /*====================== private Variables ============================== */
    /*====================== Services ======================================= */
    /*====================== Public Methods ================================= */
    /*====================== Private Methods ================================ */
    function init(){
      initializeFireBase();
    }
    function initializeFireBase(){
      console.log("starting firebaseapp");
      var config = {
         apiKey: "AIzaSyD9wFQXNmqInupKbaFOrX_lxq29FmaahFo",
         authDomain: "angular-todo-3c46d.firebaseapp.com",
         databaseURL: "https://angular-todo-3c46d.firebaseio.com/",
         //storageBucket: "bucket.appspot.com",
         //messagingSenderId: "<SENDER_ID>"
       };
       firebase.initializeApp(config);

       // Get a reference to the database service
       var database = firebase.database();
    }
    /*====================== Actions ======================================== */
    init();
	}

})();
