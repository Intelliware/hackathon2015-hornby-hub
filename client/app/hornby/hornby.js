'use strict';

angular.module('hornbyApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/hornby', {
        templateUrl: 'app/hornby/hornby.html',
        controller: 'HornbyCtrl'
      });
  });
