'use strict';

describe('Directive: dirDinamycForm', function () {

  // load the directive's module
  beforeEach(module('adminBankaFrontendApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<dir-dinamyc-form></dir-dinamyc-form>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the dirDinamycForm directive');
  }));
});
