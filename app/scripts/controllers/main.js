'use strict';

/**
 * @ngdoc function
 * @name eBankingAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eBankingAdminApp
 */
angular.module('adminBankaFrontendApp')
    .controller('MainCtrl', function($scope, $rootScope, gatewayService, localStorageService, $location, authService, $filter, toastr, ngDialog, $route, $translate) {



        $scope.loggedUser = {};

        if (localStorage.getItem("loginUser")) {

            var authData = JSON.parse(localStorage.getItem("loginUser"));
            //console.log(authData);
        }

        if (authData) {
            $scope.loggedUser = JSON.parse(localStorage.getItem("loginUser"));
            var logiranUser = $scope.loggedUser.username;
        } else {
            localStorage.clear();
            $location.path('/login');
        }








    });