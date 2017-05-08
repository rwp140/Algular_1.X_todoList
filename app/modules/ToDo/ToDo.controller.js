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
        fbSvc.signUpUser(vm.userEmail,vm.userPassword);
        //after promis return
        vm.profileMode = "profile";
      }
    }
    function saveList(_list){
      fbSvc.writeData("testUser","lists/","testList",_list);
    }
    /*====================== Private Methods ================================ */
    function addItemToDisplayList(index, item){//clunky way of getting around my lack of html finise ;)
      vm.displayList[index] = item;
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
