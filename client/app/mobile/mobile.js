'use strict';

angular.module('hornbyApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/mobile', {
        templateUrl: 'app/mobile/mobile.html',
        controller: 'MobileCtrl'
      });
  });
