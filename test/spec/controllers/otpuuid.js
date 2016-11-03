'use strict';

describe('Controller: OtpuuidCtrl', function () {

  // load the controller's module
  beforeEach(module('adminBankaFrontendApp'));

  var OtpuuidCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OtpuuidCtrl = $controller('OtpuuidCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OtpuuidCtrl.awesomeThings.length).toBe(3);
  });
});
