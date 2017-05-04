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
    }
    /*====================== Private Methods =========================== */

    function init(){
    }
    /*====================== Actions =================================== */
    init();
  }
})();
