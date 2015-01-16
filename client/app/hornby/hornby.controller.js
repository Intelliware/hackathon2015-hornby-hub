'use strict';

angular.module('hornbyApp')
  .controller('HornbyCtrl', function ($scope, $http, socket) {
    $scope.message = 'Hello';


    $http.get('/api/measurements').success(function(measurements) {
      $scope.measurements = measurements;
      socket.syncUpdates('measurement', $scope.measurements);
    });

  });
