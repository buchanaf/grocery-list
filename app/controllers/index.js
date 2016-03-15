import angular from 'angular' ;
import HomeController from './home';
import LoginController from './login';
import ListController from './list';

angular.module('app.controllers', ['ngRoute'])
  .controller('HomeController', HomeController)
  .controller('LoginController', LoginController)
  .controller('ListController', ListController);
