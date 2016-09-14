(function () {
  'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.dishes = "";
  $scope.message = "";
  $scope.messageStyle = "";
  $scope.borderColor = "";
  $scope.checkIfTooMuch = function() {

    // check for empty dishes
    if ($scope.dishes == false) {
      $scope.message = "Please enter data first";
      $scope.messageStyle = "red";
      $scope.borderColor = "red";
      return;
    }

    var dishesSize = countValidDishes($scope.dishes);
    if(dishesSize === 0) {
      $scope.message = "Please enter data first";
      $scope.messageStyle = "red";
      $scope.borderColor = "red";
    } else if(dishesSize <= 3) {
      $scope.message = "Enjoy!";
      $scope.messageStyle = "green";
      $scope.borderColor = "green";
    } else if(dishesSize > 3) {
      $scope.message = "Too Much!";
      $scope.messageStyle = "green";
      $scope.borderColor = "green";
    }
  };

  function countValidDishes(wholeDishes) {
    var dishesArray = wholeDishes.split(',');
    return dishesArray.filter(checkIfStringIsEmpty).length;
  }

  function checkIfStringIsEmpty(dish) {
    return dish.trim().length !== 0;
  }
}

})();
