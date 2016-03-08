import angular from 'angular' ;
import HomeService from './home';
import AuthService from './auth';

angular.module('app.services', ['ngRoute'])
  .factory('HomeService', HomeService)
  .factory('AuthService', AuthService)
