import angular from 'angular' ;
import HomeController from './home';
import LoginController from './login';

angular.module('app.controllers', ['ngRoute'])
  .controller('HomeController', HomeController)
  .controller('LoginController', LoginController)
