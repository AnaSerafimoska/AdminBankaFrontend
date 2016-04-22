'use strict';

/**
 * @ngdoc overview
 * @name adminBankaFrontendApp
 * @description
 * # adminBankaFrontendApp
 *
 * Main module of the application.
 */
angular
  .module('adminBankaFrontendApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'mgcrea.ngStrap',
    'ui.select',
    'ngMask',
    'toastr',
    'ngDialog'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/vid-rabota/create', {
        templateUrl: 'views/vid-rabota-create.html',
        controller: 'VidRabotaCreateCtrl'
      })
      .when('/vid-rabota', {
        templateUrl: 'views/vid-rabota.html',
        controller: 'VidRabotaCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
      })
      .otherwise({
        redirectTo: '/main'
      });
  })
  .config(function(toastrConfig) {
    angular.extend(toastrConfig, {
      closeButton: true,
      autoDismiss: true,
      timeOut: 3000,
      positionClass: 'toast-bottom-right'
    });
  })
;
