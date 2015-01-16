'use strict';

angular.module('hornbyApp')
  .controller('HornbyAdminCtrl', function ($scope, $http, socket, $log) {

    var refreshMeasurements = function () {
      $http.get('/api/measurements').success(function(measurements) {
        $scope.measurements = measurements;
        $log.log("measurements: ", measurements);
        socket.syncUpdates('measurement', $scope.measurements);
      })
    };

    $http.get('/api/measurements').success(function(measurements) {
      $scope.measurements = measurements;
      $log.log("measurements: ", measurements);
      socket.syncUpdates('measurement', $scope.measurements);
    });

    $scope.saveMeasurement = function (measurement) {
      $http.put('/api/measurements/' + measurement.uid, measurement);
      refreshMeasurements();
    };

    $scope.sendMeasurement = function (measurement) {
      var copyMeasurement = angular.copy(measurement);
      copyMeasurement.name = null;
      copyMeasurement.video.data += 1000;

      $http.put('/api/measurements/' + copyMeasurement.uid, copyMeasurement);
    };

    refreshMeasurements();

  });
