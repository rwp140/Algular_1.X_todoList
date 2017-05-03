(function(){
  'use strict'

  angular.module('ToDo')
  .controller('ToDoController',ToDoController);

  function ToDoController(){
    var vm = this;
    /*====================== Delegation Variables ====================== */
    vm.AddItem = AddItem;
    /*====================== Variables ================================= */
    vm.list = ["a","b"]
    /*====================== Services ================================== */
    /*====================== Public Methods ============================ */
    function AddItem(){

    }
    /*====================== Private Methods =========================== */

    function init(){
    }
    /*====================== Actions =================================== */
    init();
  }
})();
