(function(){
  'use strict'

  angular.module('ToDo')
  .controller('ToDoController',ToDoController);

  ToDoController.$inject = ['$q','firebaseService'];
  function ToDoController($q,firebaseService){
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
    //vm.logedIn = false;
    //<!> move to profile.controler
    vm.profileMode = "signIn";
    vm.profile
    vm.user;
    vm.userEmail = "";//<!> add encryption
    vm.userPassword = ""///<!> add encryption
    //</!> move to profile.controler
    vm.pageSize = 25;
    /*====================== private Variables ============================== */
    /*====================== Services ======================================= */
    var fbSvc = firebaseService;
    /*====================== Public Methods ================================= */
    function addItem(index,item){
        vm.list.splice(index,0,item);
        vm.inputData = "";
        addItemToDisplayList(index,item);
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
    }
    function editModeButton($index){
      if(vm.displayList[$index].editMode){
        console.log(vm.list[$index].value);
        editItem($index,vm.displayList[$index].value);
        console.log(vm.list[$index].value);
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
      if(vm.profileMode == "signIn"){
        console.log(vm.profileMode);
        fbSvc.signInUser(vm.userEmail,vm.userPassword)
        .then(function(userData){
          //console.log("success!");
          //console.log(userData);
          if(!userData.emailVerified){
            console.log("not verified");
            alert("user not verified");
            let resend = confirm("resend verification?")
            if(confirm != null ||confirm != "" ){
              //call fbSvc.emailConfirm
              console.log("confirming email");
              fbSvc.emailConfirm(userData);
            }
            signOutButton();
          }else{
            userDataCheck(userData);//<!> replace to profile controler call
          }
        });
      }
    }
    function signOutButton(){
      fbSvc.signOutUser()
      .then(function(user){
        vm.profileMode = "signIn";
      });
    }
    function signUpButton(){
      if(vm.profileMode == "signIn"){
        fbSvc.signUpUser(vm.userEmail,vm.userPassword)
        .then(function(user){
          //console.log(userData);
          alert("please verify user via the recived email, and then try login in, thank you! :) /n no need to refresh either.")
          //vm.profileMode = "profile";
        });
      }
    }
    function userDataCheck(_user){
      vm.user = _user;
      if(vm.user.displayName == "" || vm.user.displayName == null){
        var displayName = vm.user.email.split('@')[0];
        displayName = prompt("Enter your desired display name",displayName);
        vm.user.updateProfile({
          displayName: displayName,
          photoURL: ""
        }).then(function() {
          // Profile updated successfully!
          // "Jane Q. User"
           displayName = vm.user.displayName;
           //photoURL = user.photoURL;
        }, function(error) {
          // An error happened.
          console.error("display name could not be updated please contact support");
        });
      }
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
      var defer = $q.defer();
      fbSvc.writeData(vm.user.uid,"lists/","testList",_list)
      .then(function(){
        console.log("saved");
      },function(rejected){
        console.log(rejected);
      });
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
    }
    function loadList(){
      for(let i=0,l=vm.list.length;i<l;i++){
        addItemToDisplayList(i,vm.list[i]);
      }
    }
    /*====================== Actions ======================================== */
    init();
  }
})();
