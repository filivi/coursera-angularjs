(function () {
  'use strict'; // BP to use this any time to protects defining global variables.

  angular.module('myApp', [])
  .controller('myController', MyController);

  MyController.$inject = ['$scope'];

  function MyController($scope) {
    $scope.name = "ICH";
    $scope.sayHello = function() {
      return "Hello Function";
  }


})();
