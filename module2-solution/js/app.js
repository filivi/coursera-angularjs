(function () {
  'use strict'; // BP to use this any time to protects defining global variables.

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController (ShoppingListCheckOffService) {
    var toBuyList = this;

    toBuyList.items = ShoppingListCheckOffService.getToBuyItems();

    toBuyList.removeItemFromToBuyList = function (index) {
      var boughtItem = toBuyList.items[index];
      ShoppingListCheckOffService.addItemToAlreadyBoughtList(boughtItem.name, boughtItem.quantity);
      ShoppingListCheckOffService.removeItemFromToBuyList(index);
    };
  };

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController (ShoppingListCheckOffService) {
    var alreadyBoughtList = this;

    alreadyBoughtList.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
  };

  function ShoppingListCheckOffService() {
    var service = this;

    var toBuyItems = [
      {
        name: "cookies",
        quantity: 10
      },
      {
        name: "chips",
        quantity: 5
      },
      {
        name: "cupcakes",
        quantity: 20
      },
      {
        name: "strawberrys",
        quantity: 20
      },
      {
        name: "bananas",
        quantity: 20
      }
    ];
    var alreadyBoughtItems = [];

    service.getToBuyItems = function () {
      return toBuyItems;
    };

    service.removeItemFromToBuyList = function (index) {
      toBuyItems.splice(index, 1);
    };

    service.addItemToAlreadyBoughtList = function (itemName, itemQuantity) {
      var item = {
        name: itemName,
        quantity: itemQuantity
      };
      alreadyBoughtItems.push(item);
    };

    service.getAlreadyBoughtItems = function () {
      return alreadyBoughtItems;
    };
  }

})();
