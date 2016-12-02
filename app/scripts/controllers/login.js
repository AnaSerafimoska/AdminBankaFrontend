'use strict';

/**
 * @ngdoc function
 * @name unicefApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the unicefApp
 */
angular.module('adminBankaFrontendApp')
    .controller('LoginCtrl',

        function($scope, $location, toastr, gatewayService, $rootScope) {

            $rootScope.dataPermisii = {};


            if (localStorage.getItem("loginUser")) {
                var loginUser = JSON.parse(localStorage.getItem("loginUser"));

            }


            if (loginUser) {
                console.log("loginUser  -   ", loginUser)
                $location.path('/adminBaranja');
            } else {
                console.log("loginUser  -   ELSE")
                $location.path('/login');
            }

            $scope.loginData = {};

            $scope.login = function() {

                gatewayService.request("/api/Login/1/Login?Username=" + $scope.loginData.username + "&Password=" + encodeURI($scope.loginData.password), "GET").then(function(data, status, heders, config) {



                    if (data == "Y") {
                        gatewayService.request("/api/Login/1/UserProfileFetchLogin?userProfileName=" + $scope.loginData.username, "GET").then(function(data, status, heders, config) {
                            if (data.length > 0) {


                                localStorage.setItem("loginUser", JSON.stringify($scope.loginData));

                                localStorage.setItem("TimeS", new Date().getTime());



                                gatewayService.request("/api/Login/1/FetchUserRolePermission?UserName=" + $scope.loginData.username, "GET")
                                    .then(function(data, status, heders, config) {

                                        localStorage.setItem("Permisii", JSON.stringify(data));
                                        //  lscache.set('loginU', JSON.stringify($scope.loginData), 2);
                                        console.log("permisii", data);
                                        if (data.length > 0) {
                                            $location.path(data['0'].PermissionName);
                                        } else {
                                            toastr.error("Немате привилегии за да пристапите до некоја форма од апликацијата!");
                                        }

                                        //  toastr.success("Успешна најава!");

                                        // $location.path("/adminBaranja");

                                    }, function(data, status, headers, config) {

                                        console.log(status);

                                    });


                            } else {
                                toastr.warning("Немате привилегија да пристапите до апликацијата!");
                            }
                        }, function() {});


                    } else if (data != "Y") {

                        toastr.warning("Невалиден корисник! Внесете валидно корисничко име и лозинка.");
                    }
                }, function() {});


            }




        }
    );