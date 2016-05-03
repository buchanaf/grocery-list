import angular from 'angular' ;
import inputLimit from './input-limit';
import friendSearch from './friend-search';
import foodSearch from './food-search';

angular.module('app.directives', ['ngRoute'])
  .directive('inputLimit', inputLimit)
  .directive('friendSearch', friendSearch)
  .directive('foodSearch', foodSearch);

