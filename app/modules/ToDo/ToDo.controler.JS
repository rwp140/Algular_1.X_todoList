(function(){
  'use strict'

  angular.module('ToDo')
  .controller(toDoControler,'toDoControler');

  function toDoControler(){
    var vm = this;
    /*====================== Delegation Variables ====================== */
    vm.AddItem = AddItem;
    /*====================== Variables ================================= */
    /*====================== Services ================================= */
    /*====================== Public Methods =========================== */
    function AddItem(){

    }
    /*====================== Private Methods ========================== */

    function init(){

    }
    /*====================== Actions ================================= */
    init();
  }
})();
