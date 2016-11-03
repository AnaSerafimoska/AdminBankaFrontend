'use strict';

/**
 * @ngdoc function
 * @name adminBankaFrontendApp.controller:OtpCtrl
 * @description
 * # OtpCtrl
 * Controller of the adminBankaFrontendApp
 */
angular.module('adminBankaFrontendApp')
  .controller('OtpCtrl', function ($scope, gatewayService, $filter, toastr, $route, $rootScope, ngDialog, $parse, $location) {


  	$scope.allUsers = [];

  	$scope.gatAllusers = function(){

  	gatewayService.request("/api/OTP/1/GetAllDevices", "GET").then(function (data, status, heders, config) {
        
          $scope.allUsers=data;
         
        }, function (data, status, headers, config) {
             console.log(status);
     });
  	}
  	$scope.gatAllusers();



  	$scope.viewByUser = function(userName){
  	
  	   	$location.path("/otp/user/"+userName);


  	};

  	$scope.viewByUUID = function(UUID){

  	
  		   $location.path("/otp/uuid/"+UUID);
  	
  	};


  });
