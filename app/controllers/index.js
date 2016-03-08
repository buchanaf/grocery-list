import angular from 'angular' ;
import HomeController from './home';
import LoginController from './login';
import InitializeController from './initialize';

angular.module('app.controllers', ['ngRoute'])
  .controller('HomeController', HomeController)
  .controller('LoginController', LoginController)
  .controller('DataController', InitializeController)
