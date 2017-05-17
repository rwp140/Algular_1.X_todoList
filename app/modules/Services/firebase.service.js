(function() {
	'use strict';

  angular.module('services')
		.service('firebaseService', firebaseService);

	firebaseService.$inject = ['$q'];
	function firebaseService($q) {
		var svc = this;
    /*====================== Delegation Variables =========================== */
    svc.checkUserSession = checkUserSession;
    svc.emailConfirm = emailConfirm;
    svc.initializeFireBase = initializeFireBase;
    svc.readChildKeysOnce = readChildKeysOnce;
    svc.readKeysOnce = readKeysOnce;
    svc.readDataOnce = readDataOnce;
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
    function checkUserSession(){
      var deferred = $q.defer();
      auth.onAuthStateChanged(function(user) {
       if (user) {
         // User is signed in.
         deferred.resolve(user);
       } else {
         // No user is signed in.
         deferred.reject();
       }
     });

     return deferred.promise;
    }
    function emailConfirm(_user){
      _user.sendEmailVerification()
      .catch(function(error){
        console.error(error.code+':'+error.message);
      });
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
    function readDataOnce(userID,path,dataID){
      var deferred = $q.defer();
      //var uid = auth.currentUser.uid;
      var path = 'users/'+userID+"/"+path+dataID;
      var data;
      var dataPoint = database.ref(path);
      dataPoint.once('value')
      .then(function(snapshot){
        data = snapshot.val();
        //console.log(data);
        deferred.resolve(data);
      }).catch(function(error){
        deferred.reject(error);
      });
      return deferred.promise;
    }
    function readKeyOnce(userID,_path){
      var deferred = $q.defer();
      //var uid = auth.currentUser.uid;
      var path = 'users/'+userID+"/"+_path;
      var keyName;
      var dataPoint = database.ref(path);
      dataPoint.once('value')
      .then(function(snapshot){
        keyName = snapshot.key();
        console.log(data);
        deferred.resolve(keyName);
      }).catch(function(error){
        deferred.reject(error);
      });
      return deferred.promise;
    }

    function readChildKeysOnce(userID,_path){
      var deferred = $q.defer();
      //var uid = auth.currentUser.uid;
      var path = 'users/'+userID+"/"+_path;
      var keyNames = [];
      var dataPoint = database.ref(path).orderByKey();
      dataPoint.once('value')
      .then(function(snapshot){
        snapshot.forEach(function(childSnapshot){
          var key = childSnapshot.key
          keyNames.push(key);
        });
        // keyName = snapshot.key();
        // console.log(data);
        deferred.resolve(keyNames);
      }).catch(function(error){
        deferred.reject(error);
      });
      return deferred.promise;
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
      var deferred = $q.defer();
      //note you can do .then(resolution/success,resolution/success instead of  .then(resolution/success).catch(resolution/success)
      auth.signOut().then(function(){
        deferred.resolve(true);
      }).catch(function(error){
        deferred.reject(error);
      });

      return deferred.promise;
    }
    function writeData(userID,basePath,dataID,data){
      var deferred = $q.defer();
      var path = 'users/'+userID+"/"+basePath+dataID;
      //console.log(path);
      //console.log(data);
      var dataPoint = database.ref(path);
      dataPoint.set(data).then(function(){
        deferred.resolve();
      }).catch(function(error){
        deferred.reject(error);
      });

      return deferred.promise;
    }
    /*====================== Private Methods ================================ */
    function init(){
      //initializeFireBase();
    }

    /*====================== Actions ======================================== */
    init();
	}

})();
