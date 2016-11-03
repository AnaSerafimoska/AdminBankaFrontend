'use strict';

describe('Controller: OtpCtrl', function () {

  // load the controller's module
  beforeEach(module('adminBankaFrontendApp'));

  var OtpCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OtpCtrl = $controller('OtpCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OtpCtrl.awesomeThings.length).toBe(3);
  });
});
