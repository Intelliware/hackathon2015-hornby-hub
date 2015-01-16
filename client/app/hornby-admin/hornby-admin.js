'use strict';

angular.module('hornbyApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/hornby-admin', {
        templateUrl: 'app/hornby-admin/hornby-admin.html',
        controller: 'HornbyAdminCtrl'
      });
  });
