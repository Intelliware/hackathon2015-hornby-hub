'use strict';

describe('Controller: MobileCtrl', function () {

  // load the controller's module
  beforeEach(module('hornbyApp'));

  var MobileCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MobileCtrl = $controller('MobileCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
