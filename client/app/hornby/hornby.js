'use strict';

angular.module('hornbyApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/hornby/hornby.html',
        controller: 'HornbyCtrl'
      });
  });
