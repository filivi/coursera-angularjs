(function() {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
  .directive('foundItems',  FoundItemsDirective);


  function FoundItemsDirective () {
    var ddo = {
      restrict: 'E',
      templateUrl: 'foundItems.html',
      scope: {
        list: '<foundItems',
        onRemove: '&'
      }
    };

    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var list = this;

    list.searchTerm = "";
    list.errorMessage = "";
    list.found = [];

    list.foundMatchedMenuItems = function () {
      var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);
      promise.then(function (response) {
        list.found = response;
        list.errorMessage = "";
      })
      .catch(function(error) {
        list.found = [];
        list.errorMessage = error.message;
      });
    };

    list.removeItem = function (itemIndex) {
      list.found = MenuSearchService.removeItem(list.found, itemIndex.index);
    };
  };

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      }).then(function (result) {

        if(!searchTerm) {
          throw new Error("Nothing found!");
        }

        // process result and only keep items that match
        var foundItems = result.data.menu_items.filter(function(item) {
          return item.description.includes(searchTerm);
        });

        if(!foundItems.toString()) {
          throw new Error("Nothing found!");
        }

        // return processed items
        return foundItems;
      });
    };

    service.removeItem = function(items, itemIndex) {
      items.splice(itemIndex, 1);
      return items;
    };
  };

})();
