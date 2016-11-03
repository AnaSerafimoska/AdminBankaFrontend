'use strict';

/**
 * @ngdoc function
 * @name adminBankaFrontendApp.controller:OtpuserCtrl
 * @description
 * # OtpuserCtrl
 * Controller of the adminBankaFrontendApp
 */
angular.module('adminBankaFrontendApp')
  .controller('OtpuserCtrl', function ($scope, $routeParams, gatewayService,$location,ngDialog) {

  	$scope.userName = $routeParams.userName;
  	$scope.Device = {};
  	$scope.DeviceLog=[];

  	$scope.viewDevice = function(username){

  		gatewayService.request("/api/OTP/1/ViewDevice?Username=" + username, "GET").then(function (data, status, heders, config) {
          $scope.Device=data;
        }, function (data, status, headers, config) {
             console.log(status);
     });
  	}

  	$scope.viewDevice($scope.userName);

  	  $scope.viewLog = function(username){

  		gatewayService.request("/api/OTP/1/ViewLogByUsername?Username=" + username, "GET").then(function (data, status, heders, config) {
          $scope.DeviceLog=data;
        }, function (data, status, headers, config) {
             console.log(status);
     });
  	}

  	$scope.viewLog($scope.userName);


  $scope.viewByUUID = function(UUID){
	
  		 $location.path("/otp/uuid/"+UUID);
  	
  	};


    $scope.removeUser = function(index){
      ngDialog.open({
        template: 'templateId',
        scope: $scope
      });
      //$scope.temp=index+1;
      // console.log("i",index);

      //$scope.productBody.splice(index, 1);

    }

    $scope.deleteUser=function(){



    		gatewayService.request("/api/OTP/1/DeleteDevice?UUID=" + $scope.Device.uUIDField, "GET").then(function (data, status, heders, config) {
              $location.path("/otp");
		        }, function (data, status, headers, config) {
		             console.log(status);
		     });
    		
    }







  });
