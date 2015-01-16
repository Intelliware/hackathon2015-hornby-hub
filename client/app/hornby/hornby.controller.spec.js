'use strict';

describe('Controller: HornbyCtrl', function () {

  // load the controller's module
  beforeEach(module('hornbyApp'));

  var HornbyCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HornbyCtrl = $controller('HornbyCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
