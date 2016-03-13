import angular from 'angular';
import ngRoute from 'angular-route';

angular
  .module('app.routes', [ngRoute])
  .config(function($locationProvider, $routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "app/views/home.html",
        controllerAs: "home",
        controller: "HomeController",
        resolve: {
          initialData: function(InitializeService) {
            return InitializeService();
          }
        }
      })
      .when("/list/:id", {
        templateUrl: "/app/views/list.html",
        controllerAs: "list",
        controller: "ListController",
        resolve: {
          initialData: function(InitializeService) {
            return InitializeService();
          }
        },
      })
      .when("/login", {
        templateUrl: "app/views/login.html",
        controllerAs: "login",
        controller: "LoginController"
      })
      .otherwise({
         redirectTo: '/'
      });
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    }
  );