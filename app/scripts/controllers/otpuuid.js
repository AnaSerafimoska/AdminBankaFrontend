'use strict';

/**
 * @ngdoc function
 * @name adminBankaFrontendApp.controller:OtpuuidCtrl
 * @description
 * # OtpuuidCtrl
 * Controller of the adminBankaFrontendApp
 */
angular.module('adminBankaFrontendApp')
  .controller('OtpuuidCtrl', function ($scope, $routeParams, gatewayService) {

  	

  	$scope.uuid = $routeParams.uuid;
  	
  		

  	$scope.Device = {};
  	$scope.DeviceLog=[];

  	$scope.viewDevice = function(uuid){

  		gatewayService.request("/api/OTP/1/ViewDeviceByUUID?UUID=" + uuid, "GET").then(function (data, status, heders, config) {
        
          $scope.Device=data;
        }, function (data, status, headers, config) {
             console.log(status);
     });
  	}

  	$scope.viewDevice($scope.uuid);

  	  $scope.viewLog = function(uuid){

  		gatewayService.request("/api/OTP/1/ViewLogByUUID?uuid=" + uuid, "GET").then(function (data, status, heders, config) {
          $scope.DeviceLog=data;
        }, function (data, status, headers, config) {
             console.log(status);
     });
  	}

  	$scope.viewLog($scope.uuid);


  $scope.viewByUUID = function(UUID){

  		 $location.path("/otp/user/"+UUID);
  	
  	};

    
  });
