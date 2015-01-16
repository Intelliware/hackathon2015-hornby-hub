'use strict';

angular.module('hornbyApp')
  .controller('HornbyAdminCtrl', function ($scope, $http, socket) {

    $http.get('/api/measurements').success(function(measurements) {
      $scope.measurements = measurements;
      socket.syncUpdates('measurement', $scope.measurements);
    });

    $scope.saveMeasurement = function (measurement) {
      $http.put('/api/measurements/' + measurement.uid, measurement);
    }

  });
