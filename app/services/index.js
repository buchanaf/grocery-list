import angular from 'angular' ;
import HomeService from './home';
import AuthService from './auth';
import initializeService from './initialize';

angular.module('app.services', ['ngRoute'])
  .factory('HomeService', HomeService)
  .factory('AuthService', AuthService)
  .factory('initializeService', initializeService);

