'use strict';

describe('Controller: OtpuserCtrl', function () {

  // load the controller's module
  beforeEach(module('adminBankaFrontendApp'));

  var OtpuserCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OtpuserCtrl = $controller('OtpuserCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OtpuserCtrl.awesomeThings.length).toBe(3);
  });
});
