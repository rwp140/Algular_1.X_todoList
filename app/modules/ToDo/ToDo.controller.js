(function(){
  'use strict'

  angular.module('ToDo')
  .controller('ToDoController',ToDoController);

  ToDoController.$inject = ['firebaseService'];
  function ToDoController(firebaseService){
    var vm = this;
    /*====================== Delegation Variables =========================== */
    vm.addItem = addItem;
    vm.addItemButton = addItemButton;
    vm.editItem = editItem;
    vm.editModeButton = editModeButton;
    vm.exitEditMode = exitEditMode;
    vm.removeItem = removeItem;
    /*====================== public Variables =============================== */
    vm.displayList = [{value:" "},{value:" "}];
    vm.list = [{value:" "},{value:" "}];
    vm.pageSize = 25;
    vm.inputData = "";
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
      saveList(vm.list)
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
