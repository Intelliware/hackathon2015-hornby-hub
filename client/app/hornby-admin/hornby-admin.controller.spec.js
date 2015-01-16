'use strict';

describe('Controller: HornbyAdminCtrl', function () {

  // load the controller's module
  beforeEach(module('hornbyApp'));

  var HornbyAdminCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HornbyAdminCtrl = $controller('HornbyAdminCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
