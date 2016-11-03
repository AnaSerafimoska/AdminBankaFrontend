'use strict'

angular.module('adminBankaFrontendApp')

.controller('HeaderCtrl', function($scope, $translate, $rootScope, localStorageService, $location, gatewayService, $filter, toastr, ngDialog, $route) {

    $scope.loggedUser = {};
    $scope.loggedUser = JSON.parse(localStorage.getItem("loginUser"));
    if (!$scope.loggedUser) {
        $location.path('/login');
    } else {
        var logiranUser = $scope.loggedUser.username;
    }

    var startLang = "mk";

    if (localStorage.getItem("lang")) {
        startLang = localStorage.getItem("lang");
    } else {
        startLang = "mk";
    }

    $translate.use(startLang);


    if (localStorage.getItem("Permisii")) {

        var dataPermisii = JSON.parse(localStorage.getItem("Permisii"));
        console.log("header", dataPermisii)
        $scope.hasPermission = function(permision) {

            if (dataPermisii != null) {
                for (var i = 0; i < dataPermisii.length; i++) {
                    if (permision == dataPermisii[i].PermissionName) {
                        return true;
                    }
                }
            } else {

                return false;
            }
        }



    }

    $rootScope.tmp = true;


    $scope.changeLanguage = function(langKey) {

        $translate.use(langKey);
        localStorage.setItem('lang', langKey);

    };

    $scope.logOut = function() {
        localStorage.clear();
        $location.path('/login');
    }

    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    };





});