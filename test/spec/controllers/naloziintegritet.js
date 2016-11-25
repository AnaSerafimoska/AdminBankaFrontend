'use strict';

describe('Controller: NaloziintegritetCtrl', function () {

  // load the controller's module
  beforeEach(module('adminBankaFrontendApp'));

  var NaloziintegritetCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NaloziintegritetCtrl = $controller('NaloziintegritetCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NaloziintegritetCtrl.awesomeThings.length).toBe(3);
  });
});
