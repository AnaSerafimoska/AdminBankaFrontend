angular.module('adminBankaFrontendApp')
    .controller('partiiCtrl', function($scope, gatewayService, $filter, toastr, $route, $rootScope, ngDialog, $parse, $location) {

        //Za prikaz na info
        $scope.KorisnikPrikazInfo = {};
        $scope.Korisnik = {};
        $scope.Flag_Prikazhi = true;
        $scope.valueForSearch = "Единствен број"
        $scope.flagS = "0";
        $scope.Partii = {};
        $scope.SearchValue = "";
        $scope.a = true;
        $scope.loading = false;
        $scope.tmp = {};
        $scope.showDir = false;
        $scope.flagVisibilityInput = false;
        $scope.selectedPartija = {};
        $scope.IzbranaPartija = {};

        $scope.infogrupa = {};
        $scope.loading = false;
        $scope.infopotpisnicipartija = [];
        $scope.flagVisibility = false;
        $scope.finalnopotpisnici = [];


        $scope.loggedUser = JSON.parse(localStorage.getItem("loginUser"));
        // $scope.loginU = lscache.get('loginU');
        if (!$scope.loggedUser) {
            $location.path('/login');
        } else {
            var logiranUser = $scope.loggedUser.username;

            // console.log("vreme " + (now - timestamp));

        }




        //$rootScope.dataPermisii={};
        // $scope.loggedUser = {};
        // $scope.loggedUser = JSON.parse(localStorage.getItem("loginData"));

        // if (!$scope.loggedUser) {
        //     $location.path('/login');
        // } else {
        //     var logiranUser = $scope.loggedUser.username;
        // }

        // if (localStorage.getItem("dataPermisii")) {
        //     var dataPermisii = JSON.parse(localStorage.getItem("dataPermisii"));
        // } else {
        //     $location.path('/main');
        // }

        // $scope.hasPermission = function(permision) {

        //     if (dataPermisii != null) {
        //         for (var i = 0; i < dataPermisii.length; i++) {
        //             if (permision == dataPermisii[i].PermissionDescription) {

        //                 return true;
        //             }
        //         }
        //     } else {
        //         // return false;
        //     }
        // }

        // if (!$scope.hasPermission('partii')) {
        //     $location.path('/');
        // };



        $scope.epartii = {
            MinBrojPotpisnici: 1,
            BrojNaPotpisi: 1
        };



        // //Prebaruvanje na komitentot
        // $scope.changeValue = function(val) {
        //     if (val == '0') {
        //         $scope.valueForSearch = "Единствен број"
        //         $scope.flagS = "0";
        //         $scope.SearchValue = "";
        //         $scope.Partii = {};
        //         $scope.a = true;
        //         $scope.flagVisibilityInput = false;
        //     } else if (val == "1") {
        //         $scope.valueForSearch = "Партија";
        //         $scope.flagS = "1";
        //         $scope.SearchValue = "";
        //         $scope.Partii = {};
        //         $scope.a = false;
        //         $scope.flagVisibilityInput = false;
        //     }
        // }


        $scope.ePartiiFetchMinimalenBrojPotpisnici = function(Partija) {
            $scope.flagVisibility = true;
            $scope.infopotpisnicipartija = {};
            $scope.infogrupa = {};

            gatewayService.request("/api/Partii/1/ePartiiFetchMinimalenBrojPotpisnici?Partija=" + Partija, "GET").then(function(data, status, heders, config) {
                console.log("data", data);

                if (data.length > 0) {
                    $scope.epartii.MinBrojPotpisnici = parseInt(data, 10);
                } else {
                    $scope.epartii.MinBrojPotpisnici = 1;
                }


            }, function(data, status, headers, config) {
                console.log(status);

            });
            $scope.loading = true;

            gatewayService.request("/api/Partii/1/EbankingePartiiLimitiPotpisniciGrupiFetch?Partija=" + Partija, "GET").then(function(data, status, heders, config) {
                console.log("data", data);

                $scope.infogrupa = data;
                if (data.length > 0) {
                    $scope.epartii.BrojNaPotpisi = parseInt(data['0'].BrojNaPotpisi, 10);
                    gatewayService.request("/api/Partii/1/EbankingePartiiLimitiPotpisniciFetchByPartija?Partija=" + Partija, "GET").then(function(data, status, heders, config) {
                        console.log("data", data);
                        $scope.loading = false;

                        $scope.infopotpisnicipartija = data;

                    }, function(data, status, headers, config) {
                        console.log(status);

                    });
                } else {
                    $scope.epartii.BrojNaPotpisi = 1;
                }


            }, function(data, status, headers, config) {
                console.log(status);

            });







        }



        $scope.snimi = function() {
            console.log("potpisnici", $scope.infopotpisnicipartija)
            for (var i = 0; i < $scope.infopotpisnicipartija.length; i++) {
                if ($scope.infopotpisnicipartija[i].inGroup == true) {
                    $scope.finalnopotpisnici.push($scope.infopotpisnicipartija[i]);
                }
            }
            console.log("finalno", $scope.finalnopotpisnici);



            if ($scope.infogrupa.length > 0) {
                if ($scope.finalnopotpisnici.length > 0) {




                    gatewayService.request("/api/Partii/1/EbankingePartiiLimitiPotpisniciGrupiInsertUpdate?Partija=" + $scope.epartii.Partija + "&BrojNaPotpisi=" + $scope.epartii.BrojNaPotpisi + "&Referent=" + logiranUser + "&SifraLimitGrupa=" + $scope.infogrupa['0'].SifraLimitGrupa, "GET").then(function(data, status, heders, config) {

                        gatewayService.request("/api/Partii/1/EbankingePartiiLimitiPotpisniciDelete?SifraLimitGrupa=" + $scope.infogrupa['0'].SifraLimitGrupa, "GET").then(function(data, status, heders, config) {
                            for (var i = 0; i < $scope.finalnopotpisnici.length; i++) {

                                var statusPotpisnik = "A";
                                if ($scope.finalnopotpisnici[i].StatusPotpisnik == false) {
                                    statusPotpisnik = "N";
                                }
                                gatewayService.request("/api/Partii/1/EbankingePartiiLimitiPotpisniciInsertUpdate?SifraLimitGrupa=" + $scope.infogrupa['0'].SifraLimitGrupa + "&EdinstvenBroj=" + $scope.finalnopotpisnici[i].EdinstvenBroj + "&SifraVidPotpisnik=O&StatusPotpisnik=" + statusPotpisnik + "&Referent=" + logiranUser, "GET").then(function(data, status, heders, config) {


                                }, function(data, status, headers, config) {
                                    console.log(status);

                                });

                            }
                            toastr.success("Податоците за групата и потписниците се успешно внесени!")

                        }, function(data, status, headers, config) {
                            console.log(status);

                        });





                    }, function(data, status, headers, config) {
                        console.log(status);

                    });

                } else {
                    toastr.info("Немате избрано ниту еден потписник за креирање/ажурирање на групата со потписници!")
                }

            } else if ($scope.finalnopotpisnici.length > 0) {

                gatewayService.request("/api/Partii/1/EbankingePartiiLimitiPotpisniciGrupiInsertUpdate?Partija=" + $scope.epartii.Partija + "&BrojNaPotpisi=" + $scope.epartii.BrojNaPotpisi + "&Referent=" + logiranUser + "&SifraLimitGrupa=", "GET").then(function(data, status, heders, config) {


                    for (var i = 0; i < $scope.finalnopotpisnici.length; i++) {
                        var statusPotpisnik = "A";
                        if ($scope.finalnopotpisnici[i].StatusPotpisnik == false) {
                            statusPotpisnik = "N";
                        }
                        gatewayService.request("/api/Partii/1/EbankingePartiiLimitiPotpisniciInsertUpdate?SifraLimitGrupa=&EdinstvenBroj=" + $scope.finalnopotpisnici[i].EdinstvenBroj + "&SifraVidPotpisnik=O&StatusPotpisnik=" + statusPotpisnik + "&Referent=" + logiranUser, "GET").then(function(data, status, heders, config) {


                        }, function(data, status, headers, config) {
                            console.log(status);

                        });

                    }
                    toastr.success("Податоците за групата и потписниците се успешно внесени!")

                }, function(data, status, headers, config) {
                    console.log(status);

                });


            }

            gatewayService.request("/api/Partii/1/ePartiiSetMinimalenBrojPotpisnici?Partija=" + $scope.epartii.Partija + "&MinimalenBrojPotpisnici=" + $scope.epartii.MinBrojPotpisnici, "GET").then(function(data, status, heders, config) {
                //  toastr.success("Успешно е внесен бројот на минимален број потписници!");
                //  console.log(data);
                // $route.reload();

            }, function(data, status, headers, config) {
                console.log(status);
            });

            // gatewayService.request("/api/Partii/1/ePartiiSetMinimalenBrojPotpisnici?Partija=" + $scope.epartii.Partija + "&MinimalenBrojPotpisnici=" + $scope.epartii.MinBrojPotpisnici, "GET").then(function(data, status, heders, config) {
            //     toastr.success("Успешно е внесен бројот на минимален број потписници!");
            //     $route.reload();

            // }, function(data, status, headers, config) {
            //     console.log(status);

            // });

        }

        // $scope.searchRecord = function(val) {
        //     console.log("flag", $scope.flagS)
        //     console.log("val", $scope.valueForSearch)
        //     gatewayService.request("/api/Partii/1/FetchPartiieBankCore?Type=" + $scope.flagS + "&Value=" + val, "GET").then(function(data, status, heders, config) {
        //         //    console.log(data)
        //         if (data.length < 1) {
        //             toastr.warning("Не постојат податоци.");
        //         }
        //         $scope.Partii = data;
        //         console.log(data);

        //     }, function(data, status, headers, config) {
        //         console.log(status);

        //     });


        //     $scope.fetchPartija = function() {
        //         $scope.Flag_Prikazhi = false;
        //     }

        //     $scope.setVisibility = function() {
        //         $scope.flagVisibilityInput = true;
        //     }







        // console.log("Partija", angular.fromJson($scope.selectedPartija).Partija);

        // gatewayService.request("/api/Partii/1/ePartiiFetchPartija?Type=1&Value=" +angular.fromJson($scope.selectedPartija).Partija, "GET").then(function (data, status, heders, config) {
        //   //    console.log(data)
        //   if (data.length < 1) {

        //     toastr.warning("Немате електронско банкарство за оваа сметка!");
        //     $route.reload();

        //   }
        //   else {
        //     $scope.IzbranaPartija = angular.fromJson($scope.selectedPartija);
        //     $scope.IzbranaPartija.MinimalenBrojPotpisi=$scope.epartii.MinBrojPotpisnici;
        //     console.log("IzbranaPartija",$scope.IzbranaPartija);

        //     gatewayService.request("/api/Partii/1/ePartiiUpdate", "POST",$scope.IzbranaPartija).then(function (data, status, heders, config) {

        //       toastr.success("Записот е успешно снимен!");
        //       $route.reload();

        //     }, function (data, status, headers, config) {
        //       console.log(status);

        //     });


        //   }


        // }, function (data, status, headers, config) {
        //   console.log(status);

        // });


        // }








    });