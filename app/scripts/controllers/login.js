/**
 * Created by NikolovskiF on 06.04.2016.
 */

'use strict';

/**
 * @ngdoc function
 * @name adminBankaFrontendApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the adminBankaFrontendApp
 */
angular.module('adminBankaFrontendApp')
  .controller('LoginCtrl', function ($scope, authService, $location) {

    // $scope.loginData = {};


    $scope.login = function(loginData){

      authService.login(loginData).then(function (data, status, headers, config) {
        console.log(data);
        $location.path("/main")
      }, function (data, status, headers, config) {
        alert(data);
        console.log(data);
      });

    }


  });

