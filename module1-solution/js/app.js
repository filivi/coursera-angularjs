(function () {
  'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.dishes = "";
  $scope.message = "";
  $scope.checkIfTooMuch = function() {

    // check for empty dishes
    if ($scope.dishes == false) {
      $scope.message = "Please enter data first";
      showErrorView();
      return;
    }

    var dishesSize = countValidDishes($scope.dishes);
    if(dishesSize === 0) {
      $scope.message = "Please enter data first";
      showErrorView();
    } else if(dishesSize <= 3) {
      $scope.message = "Enjoy!";
      showSuccessView();
    } else if(dishesSize > 3) {
      $scope.message = "Too Much!";
      showSuccessView();
    }
  };

  function countValidDishes(wholeDishes) {
    var dishesArray = wholeDishes.split(',');
    return dishesArray.filter(checkIfStringIsEmpty).length;
  }

  function checkIfStringIsEmpty(dish) {
    return dish.trim().length !== 0;
  }

  function showErrorView() {
    document.getElementsByClassName("message")[0].style.color="red";
    document.getElementById("lunch-menu").style.border="1px solid red";
  }

  function showSuccessView() {
    document.getElementsByClassName("message")[0].style.color="green";
    document.getElementById("lunch-menu").style.border="1px solid green";
  }
}

})();
