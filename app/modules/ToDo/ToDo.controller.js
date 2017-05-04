(function(){
  'use strict'

  angular.module('ToDo')
  .controller('ToDoController',ToDoController);

  function ToDoController(){
    var vm = this;
    /*====================== Delegation Variables ====================== */
    vm.addItem = addItem;
    vm.addItemButton = addItemButton;
    vm.removeItem = removeItem;
    /*====================== Variables ================================= */
    vm.displayList = [{value:" "},{value:" "}];
    vm.list = [{value:" "},{value:" "}];
    vm.pageSize = 25;
    vm.inputData = "";
    /*====================== Services ================================== */
    /*====================== Public Methods ============================ */
    function addItem(){
        var item = {value:vm.inputData};
        vm.list.push(item);
        vm.inputData = "";
        addItemToDisplayList(vm.list.length-1,item);
    }
    function addItemButton($event){
        if($event.code === 'Enter'){
          addItem()
        }
    }
    function removeItem(index){
      vm.list.splice(index,1);
      clearDisplay();
      loadList();
    }
    /*====================== Private Methods =========================== */
    function addItemToDisplayList(index, item){//clunky way of getting around my lack of html finise ;)
      vm.displayList[index] = item;
    }
    function createEmptyList(_size){
      //create empty list at variable size!
      var list_ = [];//out going list
      for(let i =0, l = _size; i<l; i++){
        list_.push({value:" ",empty:true});
      }
      return list_
    }
    function init(){
      vm.displayList = createEmptyList(vm.pageSize);
      vm.list = [];
    }
    /*====================== Actions =================================== */
    init();
  }
})();
