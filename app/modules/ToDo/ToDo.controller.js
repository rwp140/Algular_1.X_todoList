(function(){
  'use strict'

  angular.module('ToDo')
  .controller('ToDoController',ToDoController);

  function ToDoController(){
    var vm = this;
    /*====================== Delegation Variables ====================== */
    vm.addItem = addItem;
    /*====================== Variables ================================= */
    vm.list = ["a","b"]
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

    function init(){
    }
    /*====================== Actions =================================== */
    init();
  }
})();
