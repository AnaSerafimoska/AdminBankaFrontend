'use strict';

describe('Directive: dirPaginate', function () {

  // load the directive's module
  beforeEach(module('adminBankaFrontendApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<dir-paginate></dir-paginate>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the dirPaginate directive');
  }));
});
