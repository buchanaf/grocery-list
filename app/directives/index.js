import angular from 'angular' ;
import inputLimit from './input-limit';

angular.module('app.directives', ['ngRoute'])
  .directive('inputLimit', inputLimit);
