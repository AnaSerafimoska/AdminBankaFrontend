/**
 * Created by TalevskaM on 06.06.2016.
 */

'use strict';

/**
 * @ngdoc function
 * @name eBankingAdminApp.controller:VidRabotaCtrl
 * @description
 * # VidRabotaCtrl
 * Controller of the eBankingAdminApp
 */

angular.module('adminBankaFrontendApp')
    .controller('KomitentiCtrl', function($scope, $rootScope, gatewayService, $filter, toastr, ngDialog, $route, $translate, $location) {


        $scope.vidKomitent = [{
            'desc': 'Домашно физичко',
            'id': 'ДФ'
        }, {
            'desc': 'Домашно правно',
            'id': 'ДП'
        }, {
            'desc': 'Странско физичко',
            'id': 'СФ'
        }, {
            'desc': 'Странско правно',
            'id': 'СП'
        }];

        $scope.vidPol = [{
            'Pol': 'М'
        }, {
            'Pol': 'Ж'
        }];

        $scope.Komitent = {
            "DatumInsert": null,
            "DatumPromena": null,
            "DatumRaganje": null,
            "Pol": null
        };


        // var converttext = cyrillicToLatin('Ћирилица је писмо које користи седам словенских језика (белоруски, бугарски, македонски, руски, српски, украјински и де јуре бошњачки)')
        // console.log("text", converttext);



        $scope.KomitentNew = {};
        $scope.flagdisabled = false;

        $scope.tooltip = {

            "title": "Внесете датум во следниот формат: dd-MM-yyyy!",
            "checked": false
        };

        $scope.setKorisnickoIme = function() {
            if (($scope.Komitent.ImeNaziv != "" && $scope.Komitent.ImeNaziv != undefined) && ($scope.Komitent.Prezime != "" && $scope.Komitent.Prezime != undefined)) {
                var converttext = cyrillicToLatin($scope.Komitent.ImeNaziv.substring(0, 1) + $scope.Komitent.Prezime);
                var chars = "1234567890";
                var pass = "";
                for (var x = 0; x < 3; x++) {
                    var i = Math.floor(Math.random() * chars.length);
                    pass += chars.charAt(i);
                }
                converttext += pass;

                $scope.Komitent.KorisnickoIme = converttext;
            }

        }



        $scope.loggedUser = {};
        $scope.loggedUser = JSON.parse(localStorage.getItem("loginUser"));
        if (!$scope.loggedUser) {
            $location.path('/login');
        } else {
            var logiranUser = $scope.loggedUser.username;
        }


        if (localStorage.getItem("Permisii")) {
            var dataPermisii = JSON.parse(localStorage.getItem("Permisii"));
        } else {
            $location.path('/main');
        }



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

        if (!$scope.hasPermission('komitenti')) {
            $location.path('/');
        };


        $scope.checkVidKomitent = function() {
            if ($scope.Komitent.VidKomitent == null || $scope.Komitent.VidKomitent == "") {
                toastr.error('Вид комитент е задолжително поле!');

            }
        }

        $scope.checkEdinstvenBroj = function() {
            if ($scope.Komitent.EdinstvenBroj == null || $scope.Komitent.EdinstvenBroj == "") {
                toastr.error('Единствен број е задолжително поле!');

            }
        }

        $scope.checkImeNaziv = function() {
            if ($scope.Komitent.ImeNaziv == null || $scope.Komitent.ImeNaziv == "") {
                toastr.error('Име/Назив е задолжително поле!');

            }
        }

        $scope.checkAdresa = function() {
            if ($scope.Komitent.Adresa == null || $scope.Komitent.Adresa == "") {
                toastr.error('Адреса е задолжително поле!');

            }
        }

        $scope.checkOpstina = function() {
            if ($scope.Komitent.Opstina == null || $scope.Komitent.Opstina == "") {
                toastr.error('Општина е задолжително поле!');

            }
        }

        $scope.checkMesto = function() {
            if ($scope.Komitent.Mesto == null || $scope.Komitent.Mesto == "") {
                toastr.error('Место на живеење е задолжително поле!');

            }
        }



        $scope.checkDrzava = function() {
            if ($scope.Komitent.Drzava == null || $scope.Komitent.Drzava == "") {
                toastr.error('Држава е задолжително поле!');

            }
        }

        $scope.insertKomitent = function() {
            //    console.log("Kom", $scope.Komitent);
            var item = {};
            item.Type = "I";
            item.EdinstvenBroj = $scope.Komitent.EdinstvenBroj;
            item.VidKomitent = $scope.Komitent.VidKomitent.Vid;

            if (item.VidKomitent == 'Домашно правно') {
                item.VidKomitent = "ДП";
            } else if (item.VidKomitent == "Домашно физичко") {
                item.VidKomitent = "ДФ";
            } else if (item.VidKomitent == "Странско правно") {
                item.VidKomitent = "СП";
            } else {
                item.VidKomitent = "СФ";
            }
            //     console.log("Pol", $scope.Komitent.Pol);
            if ($scope.Komitent.Posl != null) {
                console.log("vleguva tuka");
                item.Pol = $scope.Komitent.Pol.Pol;
            } else {
                item.Pol = "";
            }

            $scope.testtekst = ["Da", "Neeeeee"];

            //item.Pol=$scope.Komitent.Pol.Pol;
            item.ImeNaziv = $scope.Komitent.ImeNaziv;
            item.Prezime = $scope.Komitent.Prezime;
            item.Roditel = $scope.Komitent.Roditel;
            item.DatumRaganje = $filter('date')($scope.Komitent.DatumRaganje, "yyyy-MM-dd");
            item.MestoRaganje = $scope.Komitent.MestoRaganje;
            item.MaticenBrojFirma = $scope.Komitent.MaticenBrojFirma;
            item.BrLicnaKarta = $scope.Komitent.BrLicnaKarta;
            item.BrojPasos = $scope.Komitent.BrojPasos;
            item.Adresa = $scope.Komitent.Adresa;
            item.PostenskiBroj = $scope.Komitent.PostenskiBroj;
            item.Mesto = $scope.Komitent.Mesto;
            item.Opstina = $scope.Komitent.Opstina;
            item.Drzava = $scope.Komitent.Drzava;
            item.Telefon = $scope.Komitent.Telefon;
            item.Mobilen = $scope.Komitent.Mobilen;
            item.Email = $scope.Komitent.Email;
            item.Fax = $scope.Komitent.Fax;
            item.KorisnickoIme = $scope.Komitent.KorisnickoIme;
            item.Lozinka = $scope.Komitent.Lozinka;
            item.Opis = $scope.Komitent.Opis;
            if ($scope.Komitent.Status == true) {
                item.Status = "1";
            } else {
                item.Status = "0";
            }
            item.DatumPromena = $scope.Komitent.DatumPromena;
            item.DatumInsert = new Date();
            item.ReferentInsert = "001";

            //  console.log("item", item);

            gatewayService.request("/api/Komitent/1/KomitentFetchByEdinstvenBroj?EdinstvenBroj=" + item.EdinstvenBroj, "GET").then(function(data, status, heders, config) {
                if (data.length > 0) {

                    item.Type = "U";

                    gatewayService.request("/api/Komitent/1/KomitentUpdate", "POST", item).then(function(data, status, heders, config) {

                        toastr.success('Записот е успешно изменет');
                        $route.reload();
                    }, function(data, status, headers, config) {
                        console.log(status);
                    });

                } else {

                    gatewayService.request("/api/Komitent/1/KomitentInsertUpdate", "POST", item).then(function(data, status, heders, config) {

                        toastr.success('Записот е успешно снимен');
                        $route.reload();
                    }, function(data, status, headers, config) {
                        console.log(status);
                    });

                }


            }, function(data, status, headers, config) {
                console.log(status);
            });




        }


        $scope.valueForSearch = "Единствен број"
        $scope.flag = "0";
        $scope.Komitenti = {};
        $scope.SearchValue = "";

        $scope.changeValue = function(val) {
            if (val == '0') {
                $scope.valueForSearch = "Единствен број"
                $scope.flag = "0";
                $scope.SearchValue = "";
                $scope.Komitenti = {};
            } else if (val == "1") {
                $scope.valueForSearch = "Име или презиме";
                $scope.flag = "1";
                $scope.SearchValue = "";
                $scope.Komitenti = {};
            }
        }


        $scope.searchRecord = function(val) {

            gatewayService.request("/api/Komitent/1/KomitentSearch?Type=" + $scope.flag + "&Value=" + val, "GET").then(function(data, status, heders, config) {
                //    console.log(data)
                if (data.length < 1) {
                    toastr.warning("Не постојат податоци.");
                }
                $scope.Komitenti = data;

            }, function(data, status, headers, config) {
                console.log(status);

            });

        }


        $scope.states = [];
        $scope.statesFetch = function() {

            gatewayService.request("/api/Komitent/1/StatesFetch", "GET").then(function(data, status, heders, config) {
                $scope.states = data;
                // console.log(data)

            }, function(data, status, headers, config) {
                console.log(status);
            });

        }
        $scope.statesFetch();

        $scope.places = []
        $scope.placesFetch = function(statename) {

            gatewayService.request("/api/Komitent/1/PlacesFetch?StateName=" + statename, "GET").then(function(data, status, heders, config) {

                $scope.places = data;

            }, function(data, status, headers, config) {
                console.log(status);
            });

        }
        $scope.municipalities = [];
        $scope.municipalityFetch = function(place) {
            for (var i = 0; i < $scope.places.length; i++) {
                if ($scope.places[i].Place == place) {
                    $scope.Komitent.PostenskiBroj = $scope.places[i].PostalCode;
                }
            }
            gatewayService.request("/api/Komitent/1/MunicipalityFetch?PlaceName=" + place, "GET").then(function(data, status, heders, config) {
                $scope.municipalities = data;

            }, function(data, status, headers, config) {
                console.log(status);
            });

        }
        $scope.checkMod11 = function() {
            if ($scope.Komitent.VidKomitent == 'ДФ') {
                gatewayService.request("/api/Komitent/1/CheckMod11?embg=" + $scope.Komitent.EdinstvenBroj, "GET").then(function(data, status, heders, config) {
                    console.log("data", data);
                    if (data.length > 0) {
                        if (data['0'] == false) {
                            toastr.error("Невалиден единствен број!");
                            $scope.flagdisabled = true;
                        } else {
                            $scope.flagdisabled = false;
                        }

                    }


                }, function(data, status, headers, config) {
                    console.log(status);
                });
            }

        }

        $scope.postalCodefetch = function(place) {
            console.log("place", place);
            gatewayService.request("/api/Komitent/1/PostalCodeFetch?PlaceName=" + place, "GET").then(function(data, status, heders, config) {
                console.log("data", data);
                if (data.length > 0) {
                    $scope.Komitent.PostenskiBroj = data;
                } else {
                    $scope.Komitent.PostenskiBroj = "";
                }

            }, function(data, status, headers, config) {
                console.log(status);
            });

        }


        $scope.checkEdinstvenBrojInDb = function(embg) {
            gatewayService.request("/api/Komitent/1/CheckEdinstvenBrojInDb?EdinstvenBroj=" + embg, "GET").then(function(data, status, heders, config) {

                if (data.length > 0) {
                    $scope.flagdisabled = true;
                    toastr.error("Веќе постои корисник со единствен број " + embg + "!");
                } else {
                    gatewayService.request("/api/Komitent/1/FetchKomitentCore?Type=0&Value=" + embg, "GET").then(function(data, status, heders, config) {

                        if (data.length > 0) {
                            $scope.flagdisabled = true;
                            toastr.error("Веќе постои корисник со единствен број " + embg + "!");
                        }



                    }, function(data, status, headers, config) {
                        console.log(status);
                    });

                }


            }, function(data, status, headers, config) {
                console.log(status);
            });

        }

        $scope.checkKorisnickoImeInDb = function(KorisnickoIme) {
            gatewayService.request("/api/Komitent/1/CheckKorisnickoImeInDb?KorisnickoIme=" + KorisnickoIme, "GET").then(function(data, status, heders, config) {
                console.log("data", data);
                if (data.length > 0) {
                    toastr.error("Веќе постои корисник со корисничко име " + KorisnickoIme + "!");
                }


            }, function(data, status, headers, config) {
                console.log(status);
            });

        }



        $scope.isActive = false;
        $scope.ImeNaziv = "Име";

        $scope.cancel = function() {

            $route.reload();
        }


        $scope.disableFields = function() {
            if ($scope.Komitent.VidKomitent == "ДП" || $scope.Komitent.VidKomitent == "СП") {
                $scope.isActive = true;
                $scope.ImeNaziv = "Назив";
            } else {
                $scope.isActive = false;
                $scope.ImeNaziv = "Име";
            }
        }


        $scope.selectedRow = null;

        $scope.setClickedRow = function(index) {
            $scope.selectedRow = ($scope.selectedRow == index) ? null : index;
            $scope.temp = index;
        };

        $scope.previewForEdit = function(item) {
            //    console.log("selectedRow", $scope.selectedRow);

            if ($scope.selectedRow != null) {
                //console.log("this is the item: ", item);
                $scope.Komitent = item;
                if (item.Status == 0) {
                    $scope.Komitent.Status = false;
                } else {
                    $scope.Komitent.Status = true;
                }

                //  $scope.KomitentNew.VidKomitent=item.VidKomitent.Vid;

                // $scope.Komitent.VidKomitent={Vid:item.VidKomitent};
                // if(item.VidKomitent=="ДП")
                // {
                //   $scope.Komitent.VidKomitent={Vid:'Домашно правно'};
                //   item.VidKomitent=='Домашно правно';
                //
                // }
                // else if(item.VidKomitent=="ДФ")
                // {
                //   $scope.Komitent.VidKomitent={Vid:"Домашно физичко"};
                // }
                // else if(item.VidKomitent=="СП")
                // {
                //   $scope.Komitent.VidKomitent={Vid:"Странско правно"};
                //
                // }
                // else {
                //   $scope.Komitent.VidKomitent={Vid:"Странско Физичко"};
                //   item.VidKomitent=='Странско Физичко';
                //
                // }
                //  $scope.Komitenti[$scope.selectedRow].VidKomitent= $scope.Komitent.VidKomitent.Vid;
                $scope.KomitentNew.VidKomitent = item.VidKomitent.Vid;
                if (item.Pol == "М") {
                    $scope.Komitent.Pol = {
                        Pol: 'М'
                    };


                } else if (item.Pol == "Ж") {
                    $scope.Komitent.Pol = {
                        Pol: 'Ж'
                    };
                }


            } else {
                $scope.Komitent = {};
            }

        }


    });