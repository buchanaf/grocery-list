import angular from 'angular';
import ngRoute from 'angular-route';
import routes from './app.routes';
import controllers from './controllers';

angular
  .module('app', [
    ngRoute,
    'app.controllers',
    'app.routes'
  ]);