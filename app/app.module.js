import angular from 'angular';
import ngRoute from 'angular-route';
import ngAnimate from 'angular-animate';
import ngAria from 'angular-aria';
import routes from './app.routes';
import services from './services';
import controllers from './controllers';

const app = [services, routes, controllers];//eslint-disable-line

angular
  .module('app', [
    ngRoute,
    ngAnimate,
    ngAria,
    'app.services',
    'app.controllers',
    'app.routes',
  ]);
