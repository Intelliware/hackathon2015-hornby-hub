'use strict';

angular.module('hornbyApp')
  .controller('HornbyCtrl', function ($scope, $http, socket) {
    $scope.message = 'Hello';

    //$scope.users = [{name: "Moroni", age: 50},
    //  {name: "Tiancum", age: 43},
    //  {name: "Jacob", age: 27},
    //  {name: "Nephi", age: 29},
    //  {name: "Enos", age: 34}];

    $http.get('/api/measurements').success(function(measurements) {
      $scope.measurements = measurements;
      socket.syncUpdates('measurement', $scope.measurements);
    });

  });
