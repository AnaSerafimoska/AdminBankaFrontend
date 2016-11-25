'use strict';

/**
 * @ngdoc function
 * @name adminBankaFrontendApp.controller:ResetpasswordCtrl
 * @description
 * # ResetpasswordCtrl
 * Controller of the adminBankaFrontendApp
 */
angular.module('adminBankaFrontendApp')
    .controller('ResetpasswordCtrl', function($scope, gatewayService, $filter, toastr, $route, $rootScope, ngDialog, $parse, $location) {


        $scope.Korisnik = {};
        $scope.infoData = {};
        $scope.flagDisabled = true;

        $scope.ResetPasswordFetchInfo = function(embg, korisnickoime) {

            gatewayService.request("/api/ResetirajLozinka/1/ResetPasswordFetchInfo?EdinstvenBroj=" + embg + "&KorisnickoIme=" + korisnickoime, "GET").then(function(data, status, heders, config) {

                if (data.length < 1) {
                    if (embg != "" && embg != undefined) {
                        toastr.error("Не постои корисник со единствен број " + embg + "!");
                        $scope.Korisnik.KorisnickoIme = "";

                    } else if (korisnickoime != "" && korisnickoime != undefined) {
                        toastr.error("Не постои корисник со корисничко име " + korisnickoime + "!");
                        $scope.Korisnik.EdinstvenBroj = "";
                    }

                } else {
                    $scope.infoData = data['0'];
                    console.log("info", $scope.infoData);

                    if (embg != "") {

                        $scope.Korisnik.KorisnickoIme = data['0'].KorisnickoIme;
                        $scope.flagDisabled = false;
                    } else if (korisnickoime != "") {

                        $scope.Korisnik.EdinstvenBroj = data['0'].EdinstvenBroj;
                        $scope.flagDisabled = false;
                    }


                }

            }, function(data, status, headers, config) {
                console.log(status);

            });

        }

        $scope.password = "";

        $scope.randomPassword = function(length) {

            var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP1234567890";
            var pass = "";
            for (var x = 0; x < length; x++) {
                var i = Math.floor(Math.random() * chars.length);
                pass += chars.charAt(i);
            }
            console.log("Password", pass);
            $scope.password = pass;
            // console.log("Pass",password);
        }


        $scope.resetiraj = function() {
            $scope.randomPassword(10);

            gatewayService.request("/api/ResetirajLozinka/1/ResetADUserPassword?userName=" + $scope.Korisnik.KorisnickoIme + "&userPassword=" + $scope.password + "&Edinstvenbroj=" + $scope.Korisnik.EdinstvenBroj + "&Email=" + $scope.infoData.Email, "GET").then(function(data, status, heders, config) {
                toastr.success("Лозинката е успешно променета!")


            }, function(data, status, headers, config) {
                console.log(status);

            });


        }

    });