var angular = require('angular');

angular
  .module('groceryList', ['ngRoute'])
  .config(function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    // routes
    $routeProvider
      .when("/", {
        templateUrl: "./partials/partial1.html",
        controllerAs: "Main",
        controller: "MainController"
      })
      .otherwise({
         redirectTo: '/s'
      });
    }
  );

  //Load controller
  angular.module('groceryList')

  .controller('MainController', function($scope) {
    Main.test = "Testing...";
  });

function test() { 'test'; }