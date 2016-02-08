import angular from 'angular';
import ngRoute from 'angular-route';
import routes from './app.routes';
import services from './services';
import controllers from './controllers';

angular
  .module('app', [
    ngRoute,
    'app.services',
    'app.controllers',
    'app.routes'
  ]);