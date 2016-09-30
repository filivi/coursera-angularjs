(function () {
  'use strict'; // BP to use this any time to protects defining global variables.

  angular.module('myFirstApp', [])
  .controller('myFirstController', MyFirstController);

  MyFirstController.$inject = ['$scope'];

  function MyFirstController($scope) {
    $scope.name = "ICH";
    $scope.sayHello = function() {
      return "Hello Function";
    };
  }


})();
