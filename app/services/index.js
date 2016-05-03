import angular from 'angular' ;
import AuthService from './auth';
import ListService from './list';
import initializeService from './initialize';

angular.module('app.services', ['ngRoute'])
  .factory('AuthService', AuthService)
  .factory('ListService', ListService)
  .factory('initializeService', initializeService);

