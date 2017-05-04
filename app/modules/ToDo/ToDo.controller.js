(function(){
  'use strict'

  angular.module('ToDo')
  .controller('ToDoController',ToDoController);

  function ToDoController(){
    var vm = this;
    /*====================== Delegation Variables ====================== */
    vm.addItem = addItem;
    /*====================== Variables ================================= */
    vm.displayList = [{value:" "},{value:" "}];
    vm.list = [{value:" "},{value:" "}];
    vm.pageSize = 25;
    vm.inputData = "";
    /*====================== Services ================================== */
    /*====================== Public Methods ============================ */
    function addItem($event){
      if($event.code === 'Enter'){
        var item = {value:vm.inputData};
        vm.list.push(item);
        vm.inputData = "";
        addItemToDisplayList(vm.list.length-1,item);
      }
    }
    /*====================== Private Methods =========================== */
    function addItemToDisplayList(index, item){
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
