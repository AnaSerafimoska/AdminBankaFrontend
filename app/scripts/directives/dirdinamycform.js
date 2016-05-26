'use strict';

/**
 * @ngdoc directive
 * @name adminBankaFrontendApp.directive:dirDinamycForm
 * @description
 * # dirDinamycForm
 */
angular.module('adminBankaFrontendApp')
  .directive('dirDinamycForm', function () {
    return {
      template: "/views/generateFormDir.html",
    
      restrict: 'E',

     link: function postLink(scope, element, attrs) {
       element.text('this is the generateForm directive');
      console.log("obj",obj);
      }
    };
  });
