import angular from 'angular' ;
import HomeService from './home';
import AuthService from './auth';
import InitializeService from './initialize';

angular.module('app.services', ['ngRoute'])
  .factory('HomeService', HomeService)
  .factory('AuthService', AuthService)
  .factory('InitializeService', InitializeService)

