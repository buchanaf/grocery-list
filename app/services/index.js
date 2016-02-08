import angular from 'angular' ;
import HomeService from './home';

angular.module('app.services', ['ngRoute'])
  .factory('HomeService', HomeService)
