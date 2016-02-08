import angular from 'angular';
import ngRoute from 'angular-route';

angular
  .module('app.routes', [ngRoute])
  .config(function($locationProvider, $routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "app/views/home.html",
        controllerAs: "home",
        controller: "HomeController"
      })
      .otherwise({
         redirectTo: '/'
      });
    }
  );