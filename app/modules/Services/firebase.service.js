(function() {
	'use strict';

  angular.module('services')
		.service('firebaseService', firebaseService);

	firebaseService.$inject = [];
	function firebaseService() {
		var svc = this;
    /*====================== Delegation Variables =========================== */
    svc.writeData = writeData;
    /*====================== public Variables =============================== */

    /*====================== private Variables ============================== */
    var database;
    var auth;
    /*====================== Services ======================================= */
    /*====================== Public Methods ================================= */
    function writeData(userID,path,dataID,data){
      var dataPoint = svc.database.ref('users/'+userID+path+dataID);
      dataPoint.set(data);
    }
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
       var fbApp = firebase.initializeApp(config);

       // Get a reference to the database service
       database = fbApp.database();
       auth = fbApp.auth();
    }
    /*====================== Actions ======================================== */
    init();
	}

})();
