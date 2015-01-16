'use strict';

angular.module('hornbyApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/main', {
        //templateUrl: 'app/main/main.html',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });
