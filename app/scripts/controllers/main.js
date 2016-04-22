'use strict';

/**
 * @ngdoc function
 * @name eBankingAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eBankingAdminApp
 */
angular.module('adminBankaFrontendApp')
  .controller('MainCtrl', function ($scope, gatewayService, authService) {



    $scope.getTest = function () {
      gatewayService.request("/api/Portal/1/AllAccounts?embg=0101959415065&jazik=mk-MK", "GET").then(function (data, status, heders, config) {
        console.log("data" ,data);

      }, function (data, status, headers, config) {
        console.log(status);
      });

    }
    $scope.getTest();





  });
