(function(){
  'use strict'

  angular.module('ToDo')
  .controller('ToDoController',ToDoController);

  ToDoController.$inject = ['$q','firebaseService','profileService'];
  function ToDoController($q,firebaseService,profileService){
    var vm = this;
    /*====================== Delegation Variables =========================== */
    vm.addItem = addItem;
    vm.addItemButton = addItemButton;
    vm.editItem = editItem;
    vm.editModeButton = editModeButton;
    vm.exitEditMode = exitEditMode;
    vm.saveButton = saveButton;
    vm.signInButton = signInButton;
    vm.signOutButton = signOutButton;
    vm.signUpButton = signUpButton;
    vm.removeItem = removeItem;
    /*====================== public Variables =============================== */
    vm.displayList = [{value:" "},{value:" "}];
    vm.inputData = "";
    vm.list = [{value:" "},{value:" "}];
    vm.tab = {name:"testList",colour:"",tags:["test","tasks"]};
    //vm.logedIn = false;
    //<!> move to profile.controler
    vm.profileMode = "signIn";//<!> temp
    //vm.user;
    //vm.userEmail = "";//<!> add encryption
    //vm.userPassword = ""///<!> add encryption
    //</!> move to profile.controler
    vm.pageSize = 25;
    /*====================== private Variables ============================== */
    /*====================== Services ======================================= */
    var fbSvc = firebaseService;
    var pSvc = profileService;
    /*====================== Public Methods ================================= */
    function addItem(index,item){
        vm.list.splice(index,0,item);
        vm.inputData = "";
        addItemToDisplayList(index,item);
        saveButton();
    }
    function addItemButton($event){
        if($event.code === 'Enter'){
          var item = {value:vm.inputData, editMode: false};
          addItem(vm.list.length,item)
        }
    }
    function editItem(index, content){
      vm.list[index].value = content;
      vm.displayList[index].value = content;
      saveButton();
    }
    function editModeButton($index){
      if(vm.displayList[$index].editMode){
        //console.log(vm.list[$index].value);
        editItem($index,vm.displayList[$index].value);
        //console.log(vm.list[$index].value);
      }
      vm.displayList[$index].editMode = !vm.displayList[$index].editMode;
    }
    function exitEditMode($event,$index){
      if($event.code === 'Enter'){
        editModeButton($index);
      }
    }
    function removeItem(index){
      vm.list.splice(index,1);
      clearDisplay();
      loadList();
      saveButton();
    }
    function saveButton(){
      //set up save list
      //to get rid of angular hash key and keys used only client side
      var list_ = []
      for(let i =0, l =vm.list.length; i < l; i++){
        list_.push({value:vm.list[i].value});
      }
      saveList(list_);
    }
    function signInButton(){
      if(pSvc.profileMode == "signIn"){
        //console.log(pSvc.profileMode);
        //console.log(pSvc.userEmail);
        fbSvc.signInUser(pSvc.userEmail,pSvc.userPassword)
        .then(function(userData){
          //console.log("success!");
          //console.log(userData);
          if(!userData.emailVerified){
            //console.log("not verified");
            alert("user not verified");
            let resend = confirm("resend verification?")
            if(confirm != null ||confirm != "" ){
              //call fbSvc.emailConfirm
              //console.log("confirming email");
              fbSvc.emailConfirm(userData);
            }
            signOutButton();
          }else{
            userDataCheck(userData);//<!> replace to profile controler call
            //<!>move to load list data function
            loadListData(userData.uid);
            pSvc.profileMode = "profile";
            vm.profileMode = "profile";
          }
        });
      }
    }
    function signOutButton(){
      fbSvc.signOutUser()
      .then(function(user){
        pSvc.profileMode = "signIn";
        vm.profileMode = "signIn";
        clearDisplay();
        pSvc.ClearUserData();
      });
    }
    function signUpButton(){
      if(pSvc.profileMode == "signIn"){
        fbSvc.signUpUser(pSvc.userEmail,pSvc.userPassword)
        .then(function(user){
          //console.log(userData);
          alert("please verify user via the recived email, and then try login in, thank you! :) /n no need to refresh either.")
          //pSvc.profileMode = "profile";
        });
      }
    }
    function userDataCheck(_user){
      pSvc.user = _user;
      if(pSvc.user.displayName == "" || pSvc.user.displayName == null){
        var displayName = pSvc.user.email.split('@')[0];
        displayName = prompt("Enter your desired display name",displayName);
        pSvc.user.updateProfile({
          displayName: displayName,
          photoURL: ""
        }).then(function() {
          // Profile updated successfully!
          // "Jane Q. User"
           displayName = pSvc.user.displayName;
           //photoURL = user.photoURL;
        }, function(error) {
          // An error happened.
          console.error("display name could not be updated please contact support");
        });
      }else{
        console.log(pSvc.user.displayName);
      }
    }
    /*====================== Private Methods ================================ */
    function addItemToDisplayList(index, item){//clunky way of getting around my lack of html finise ;)
      vm.displayList[index] = {value:item.value, editMode: false};
    }
    function clearDisplay(){
      vm.displayList = createEmptyList(vm.pageSize);
    }
    function createEmptyList(_size){
      //create empty list at variable size!
      var list_ = [];//out going list
      for(let i =0, l = _size; i<l; i++){
        list_.push({value:" ",empty:true, editMode: false});
      }
      return list_
    }
    function init(){
      vm.displayList = createEmptyList(vm.pageSize);
      vm.list = [];
      fbSvc.initializeFireBase();
      fbSvc.checkUserSession().then(function(user){
        pSvc.user = user;
        userDataCheck(user);
        loadListData(user.uid);
        pSvc.profileMode = "profile";
        vm.profileMode = "profile";
      },function(){

      });
      console.log();
    }
    function loadListData(_uid){
      clearDisplay();
      fbSvc.readDataOnce(_uid,"lists/",vm.tab.name+"/list")
      .then(function(_list){
        //console.log(vm.list);
        vm.list = _list;
        loadList();


      });
      //</!>
    }
    function loadList(){
      for(let i=0,l=vm.list.length;i<l;i++){
        addItemToDisplayList(i,vm.list[i]);
      }
    }
    function loadTabData(_uid){
      //get number of tabs?
      //start loop [for]
        //load tab name
        //load tab colour
        //load tab list
      //end loop repeate tell index equals tab count

    }
    function saveTab(){

    }
    function saveList(_list){
    //  let promise = new Promise((resolve, reject) => {
      //  if (/* some async task is all good */) {
      //    resolve('Success!');
      //  } else {
      //    reject('Oops... something went wrong');
      //  }
      //});
      /* ^ default promise
       Q/promise notes
       as promiseVar.then(resolutionFunction(),RegectionFunction(error))
       both results are q/promises
       promises are native to JS since 2015, as well as angulars Q
      */
      //vm.tab.list = _list;
      var defer = $q.defer();
      fbSvc.writeData(pSvc.user.uid,"lists/",vm.tab.name+"/list",_list)
      .then(function(){
        //console.log("saved");
        fbSvc.writeData(pSvc.user.uid,"lists/",vm.tab.name+"/tags",vm.tab.tags)
        .then(function(){
          //console.log("saved");
          fbSvc.writeData(pSvc.user.uid,"lists/",vm.tab.name+"/colour",vm.tab.colour)
          .then(function(){
            //console.log("saved");

          },function(rejected){
            console.log(rejected.message);
          });
        },function(rejected){
          console.log(rejected.message);
        });
      },function(rejected){
        console.log(rejected.message);
      });
    }
    /*====================== Actions ======================================== */
    init();
  }
})();
