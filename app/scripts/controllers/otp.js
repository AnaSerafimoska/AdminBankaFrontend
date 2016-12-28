'use strict';

/**
 * @ngdoc function
 * @name adminBankaFrontendApp.controller:OtpCtrl
 * @description
 * # OtpCtrl
 * Controller of the adminBankaFrontendApp
 */
angular.module('adminBankaFrontendApp')
    .controller('OtpCtrl', function($scope, gatewayService, $filter, toastr, $route, $rootScope, ngDialog, $parse, $location) {


        $scope.allUsers = [];
        $scope.valueForSearch = "Корисничко име";
        $scope.showhistory = false;
        $scope.labelUsername = true;

        $scope.changeValue = function(val) {
            if (val == '0') {
                $scope.valueForSearch = "Корисничко име"
                $scope.flagS = "0";




            } else if (val == "1") {
                $scope.valueForSearch = "UUID";
                $scope.flagS = "1";



            }
        }
        $scope.searchRecord = function(val) {
            $scope.showhistory = true;
            if ($scope.valueForSearch == 'Корисничко име') {
                $scope.labelUsername = true;
                gatewayService.request("/api/OTP/1/ViewLogByUsername?Username=" + val, "GET").then(function(data, status, heders, config) {
                    if (data.length > 0) {
                        $scope.DeviceLog = data;
                        console.log(data);
                    } else {
                        toastr.info("Нема податоци за корисникот " + val + "!");
                    }

                }, function(data, status, headers, config) {
                    console.log(status);
                });
            } else {
                $scope.labelUsername = false;
                gatewayService.request("/api/OTP/1/ViewLogByUUID?uuid=" + val, "GET").then(function(data, status, heders, config) {
                    if (data.length > 0) {
                        $scope.DeviceLog = data;
                        console.log(data);
                    } else {
                        toastr.info("Нема податоци за уредот " + val + "!");
                    }

                }, function(data, status, headers, config) {
                    console.log(status);
                });

            }
        }


        $scope.gatAllusers = function() {

            gatewayService.request("/api/OTP/1/GetAllDevices", "GET").then(function(data, status, heders, config) {

                $scope.allUsers = data;

            }, function(data, status, headers, config) {
                console.log(status);
            });
        }
        $scope.gatAllusers();



        $scope.viewByUser = function(userName) {

            $location.path("/otp/user/" + userName);


        };

        $scope.viewByUUID = function(UUID) {


            $location.path("/otp/uuid/" + UUID);

        };


    });