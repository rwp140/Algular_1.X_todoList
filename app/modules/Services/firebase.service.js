(function() {
	'use strict';

  angular.module('services')
		.service('firebaseService', firebaseService);

	firebaseService.$inject = [];
	function firebaseService() {
		var svc = this;
    /*====================== Delegation Variables =========================== */
    svc.signInUser = signInUser;
    svc.signOutUser = signOutUser;
    svc.signUpUser = signUpUser;
    svc.writeData = writeData;
    /*====================== public Variables =============================== */

    /*====================== private Variables ============================== */
    var database;
    var auth;
    /*====================== Services ======================================= */
    /*====================== Public Methods ================================= */
    function writeData(userID,path,dataID,data){
      var path = 'users/'+userID+"/"+path+dataID;
      //console.log(path);
      //console.log(data);
      var dataPoint = database.ref(path);
      dataPoint.set(data);
    }
    function signUpUser(email,password){
      auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
         alert('The password is too weak.');
        } else {
         alert(errorMessage);
        }
        //console.log(error);
        // [END_EXCLUDE]
      });
    }
    function signInUser(email,password){
      auth.signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });

    }
    function signOutUser(){

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
