(function(){
  'use strict'

  angular.module('ToDo')
  .controller('ToDoController',ToDoController);

  ToDoController.$inject = ['$q','firebaseService','profileService'];
  function ToDoController($q,firebaseService,profileService){
    var vm = this;
    /*====================== Delegation Variables =========================== */
    vm.addItem = addItem;
    vm.addItemAction = addItemAction;
    vm.editItem = editItem;
    vm.addList = addList;
    vm.addListAction = addListAction;
    vm.createNewListAction = createNewListAction;
    vm.deleteListAction = deleteListAction;
    vm.editModeAction = editModeAction;
    vm.exitEditMode = exitEditMode;
    vm.saveAction = saveAction;
    vm.selectListAction = selectListAction;
    vm.signInAction = signInAction;
    vm.signOutAction = signOutAction;
    vm.signUpAction = signUpAction;
    vm.removeItem = removeItem;
    /*====================== public Variables =============================== */
    vm.displayList = [{value:" "},{value:" "}];
    vm.inputData = "";
    vm.list = [{value:" ",done:false},{value:" ",done:false}];
    vm.tabs = null;//[{name:"testList",colour:"",tags:["test","tasks"]}];
    vm.indexer = 0;
    //vm.logedIn = false;
    //<!> move to profile.controler
    vm.profileMode = "signIn";//<!> temp
    vm.listCreation = false;
    vm.tabName ="";//<!>
    vm.tabTags = "";
    //vm.user;
    //vm.userEmail = "";//<!> add encryption
    //vm.userPassword = ""///<!> add encryption
    //</!> move to profile.controler
    vm.pageSize = 25;
    /*====================== private Variables ============================== */
    var oldTabName;
    /*====================== Services ======================================= */
    var fbSvc = firebaseService;
    var pSvc = profileService;
    /*====================== Public Methods ================================= */
    function addItem(index,item){
        vm.list.splice(index,0,item);
        vm.inputData = "";
        addItemToDisplayList(index,item);
        saveAction();
    }
    function addItemAction($event){
        if($event.code === 'Enter'){
          var item = {value:vm.inputData, done: false, editMode: false};
          addItem(vm.list.length,item);
        }
    }
    function addList(_tab){
      vm.tabs.push(_tab);
      sortTabList();
      //console.log(vm.tabs);
      var index = 0;
      for(let i=0,l=vm.tabs.length; i<l; i++){
        if(vm.tabs[i].name == _tab.name){
          index = i;
        }
      }
      saveTab();
      selectListAction(index);
    }
    function addListAction(){
      //switches content to create list
      vm.listCreation = !vm.listCreation;
      vm.tabName ="";
    }
    function createNewListAction(){//$event){
      //if($event.code === 'Enter'){
        var _name = vm.tabName;
        var _tags = vm.tabTags.split(',');
        var tab_ = {name:_name,colour:"",tags:_tags}
        //console.log(tab_);
        addList(tab_);
        //vm.list = [];
        //console.log(vm.tabs);
      //}
    }
    function deleteListAction($index){
      //vm.tabs.splice($index,1);
      //console.log(vm.tabs[$index].name);

      var defer = $q.defer();
      let path ="users/"+pSvc.user.uid+"/lists/"+vm.tabs[$index].name;
      //console.log(path);
      fbSvc.removeDataPoint(path)
      .then(function(){
        //path = "users/"+pSvc.user.uid+"/tabs/"+$index;//vm.tabs[$index].name;
        //console.log(path);
        vm.tabs.splice($index,1);
        //fbSvc.removeDataPoint(path);

        //vm.indexer = 0;
        saveTab();
        //loadTabs(pSvc.user.uid);
        selectListAction(0);
        defer.resolve();
      },function(error){
        defer.reject();
      });
      return defer.promise();
    }
    function editItem(index, content,_done){
      vm.list[index].value = content;
      vm.list[index].done = _done;
      vm.displayList[index].value = content;
      vm.displayList[index].done = _done;
      if(vm.displayList[index].done){
        vm.displayList[index].line = 'line-through';
      } else {
        vm.displayList[index].line = '';
      }
      saveAction();
    }
    function editModeAction($index){
      if(vm.displayList[$index].editMode){
        //console.log(vm.list[$index].value);
        editItem($index,vm.displayList[$index].value,vm.displayList[$index].done);
        //console.log(vm.list[$index].value);
      }
      vm.displayList[$index].editMode = !vm.displayList[$index].editMode;
    }
    function exitEditMode($event,$index){
      if($event.code === 'Enter'){
        editModeAction($index);
      }
    }
    function removeItem(index){
      vm.list.splice(index,1);
      clearDisplay();
      loadList();
      saveAction();
    }
    function saveAction(){
      //console.log("ping;");
      //saveTab();
      //set up save list
      //to get rid of angular hash key and keys used only client side
      var list_ = []
      for(let i =0, l =vm.list.length; i < l; i++){
        list_.push({value:vm.list[i].value, done: vm.list[i].done});
      }
      //console.log(list_);
      saveList(list_);
    }
    function selectListAction(_indexer){
      vm.listCreation = false;
      vm.indexer = _indexer;
      //console.log(vm.tabs[_indexer].name);
      loadListData(pSvc.user.uid);
    }
    function signInAction(){
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
            signOutAction();
          }else{
            userDataCheck(userData);//<!> replace to profile controler call
            //<!>move to load list data function
            loadTabs(userData.uid);
            //loadListData(userData.uid);
            pSvc.profileMode = "profile";
            vm.profileMode = "profile";
          }
        });
      }
    }
    function signOutAction(){
      fbSvc.signOutUser()
      .then(function(user){
        pSvc.profileMode = "signIn";
        vm.profileMode = "signIn";
        clearDisplay();
        pSvc.ClearUserData();
      });
    }
    function signUpAction(){
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
        //console.log(pSvc.user.displayName);
      }
    }
    /*====================== Private Methods ================================ */
    function addItemToDisplayList(index, item){//clunky way of getting around my lack of html finise ;)
      //console.log(item);
      var line_;
      if(item.done){
        line_ = 'line-through';
      } else {
        line_ = '';
      }
      vm.displayList[index] = {value:item.value, done: item.done, editMode: false, line:line_};
    }
    function clearDisplay(){
      vm.displayList = [];
      vm.displayList = createEmptyList(vm.pageSize);
      vm.inputData = "";
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
      vm.indexer = 0;
      vm.displayList = createEmptyList(vm.pageSize);
      vm.list = [];
      fbSvc.initializeFireBase();
      fbSvc.checkUserSession().then(function(user){
        pSvc.user = user;
        userDataCheck(user);
        loadTabs(user.uid);
        //loadListData(user.uid);
        //.then(function(_test){
          //console.log(_test);
          //console.log(vm.tabs);
        //});
        pSvc.profileMode = "profile";
        vm.profileMode = "profile";
      },function(){

      });
      //console.log();
    }

    function loadListData(_uid){
      //console.log(vm.tabs);
      //console.log(vm.indexer);
      var tab = vm.tabs[vm.indexer];
      //console.log(tab);
      //console.log(tab.name);
      //clearDisplay();
      fbSvc.readDataOnce('users/'+_uid+"/lists/"+tab.name)
      .then(function(_list){
        //console.log(vm.list);
        vm.list = _list;
        loadList();
      },function(error){
      });
    }
    function loadList(){
      if(vm.list == null) vm.list = [];
      clearDisplay();
      for(let i=0,l=vm.list.length;i<l;i++){
        addItemToDisplayList(i,vm.list[i]);
      }
      sortTabList();
    }
    function loadTabs(_uid){
      //loadTabData(_uid)
      fbSvc.readDataOn("users/"+_uid+"/tabs/",loadTabData);
      // .then(function(_tabs){
      //   if(_tabs == null){
      //     vm.tabs = [];
      //     vm.list = [];
      //   } else {
      //     vm.tabs = _tabs;
      //     loadListData(_uid);
      //   }

        // let keys = Object.keys(_tabs);
        // for(let i = 0, l = keys.length; i<l; i++){
        //   let tab = {name:keys[i],colour:_tabs[keys[i]].colour,tags:_tabs[keys[i]].tags}
        //   //console.log(tab);
        //   vm.tabs.push(tab);
        // }
        //vm.indexer = 0;
        //sortTabList();
      //});
    }
    function loadTabData(_tabs){
      if(_tabs == null ){
        vm.tabs = [];
        vm.list = [];
      } else {
        vm.tabs = _tabs;
        loadListData(pSvc.user.uid);
      }

      //console.log("loading tabs");
      // var deferred = $q.defer();
      // let tabs;
      // //vm.tabs = [];
      // .then(function(data){
      //   //console.log(data);
      //   tabs = data;
      //   //console.log(tabs);
      //   //vm.tabs = tabs;
      //   deferred.resolve(tabs);
      // },function(error){
      //   console.error(error.code);
      //   console.error(error.meesage);
      //   deferred.reject();
      // });
      // return deferred.promise;
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
      // console.log(vm.displayList);
      // console.log(vm.list);
      // console.log(_list);
      var defer = $q.defer();
      fbSvc.writeData(pSvc.user.uid,"lists/",vm.tabs[vm.indexer].name,_list)
      .then(function(){
        //console.log("saved");
        defer.resolve();
      },function(rejected){
        console.log(rejected.message);
        defer.reject();
      });

      return defer.promise;
    }

    function saveTab(){
      //var tab_ = {colour:vm.tabs[vm.indexer].colour,tags:vm.tabs[vm.indexer].tags};
      //var tabName_ = vm.tabs[vm.indexer].name;
      var defer = $q.defer();
      var tabs_ = [];
      for(let i =0, l=vm.tabs.length; i<l; i++){
        let tab_ = {name:vm.tabs[i].name,colour:vm.tabs[i].colour,tags:vm.tabs[i].tags};
        tabs_.push(tab_);
      }
      console.log(vm.tabs);
      fbSvc.writeData(pSvc.user.uid,"tabs/","",tabs_) //need to sit down and re normalize this
      .then(function(){
        defer.resolve();
      },function(rejected){
        console.log(rejected.message);
        defer.reject();
      });

      return defer.promise;
    }


    function sortTabList(){
      if(vm.tabs.length>=2){
        vm.tabs.sort(function(a,b){

          if(a.name < b.name)//if
            return -1;
          if(a.name > b.name)//else
            return 1;
          return 0//else
        });
      }

    }
    /*====================== Actions ======================================== */
    init();
  }
})();
