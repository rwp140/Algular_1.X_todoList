(function() {
	'use strict';

  angular.module('services')
		.service('firebaseService', firebaseService);

	firebaseService.$inject = ['$q'];
	function firebaseService($q) {
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
      var deferred = $q.defer();
      //note you can do .then(resolution/success,resolution/success instead of  .then(resolution/success).catch(resolution/success)
      auth.createUserWithEmailAndPassword(email, password)
      .then(function(user){
        emailConfirm(user);
        deferred.resolve(user);
      }).catch(function(error) {
        // Handle Errors here.
        //var errorCode = error.code;
        //var errorMessage = error.message;
        // [START_EXCLUDE]
        if (error.code == 'auth/weak-password') {
         alert('The password is too weak.');
        } else {
         alert(error.message);
        }
        deferred.reject(error);
        //console.log(error);
        // [END_EXCLUDE]
      });

      return deferred.promise;
    }
    function signInUser(email,password){
      var deferred = $q.defer();
      //note you can do .then(resolution/success,resolution/success instead of  .then(resolution/success).catch(resolution/success)
      auth.signInWithEmailAndPassword(email, password)
      .then(function(user){
        //console.log("then succes");
        deferred.resolve(user);
      })
      .catch(function(error) {
        //console.log("then failure");
        // Handle Errors here.
        //var errorCode = error.code;
        //var errorMessage = error.message;
        deferred.reject(error);
        // ...
      });

      return deferred.promise;
    }
    function signOutUser(){
      auth.signOut();
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
