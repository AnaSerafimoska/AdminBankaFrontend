'use strict'

angular.module('adminBankaFrontendApp')

.controller('HeaderCtrl', function($scope, $translate, $rootScope, localStorageService, $location, gatewayService, $filter, toastr, ngDialog, $route) {

    $scope.loggedUser = {};
    $scope.loggedUser = JSON.parse(localStorage.getItem("loginUser"));
    if (!$scope.loggedUser) {
        $location.path('/login');
    } else {
        var logiranUser = $scope.loggedUser.username;
        var now = new Date().getTime();
        var timestamp = localStorage.getItem("TimeS");

        if (now - timestamp > 900000) {
            localStorage.clear();
            console.log("CLEAR!!");
            toastr.error("Истечена сесија. Најавете се повторно!");
            $location.path('/login');
        }
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
        // console.log("header", dataPermisii)
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