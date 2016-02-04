import angular from 'angular' ;
import HomeController from './home';

angular.module('app.controllers', ['ngRoute'])
  .controller('HomeController', HomeController)
