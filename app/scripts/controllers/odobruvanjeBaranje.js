/**
 * Created by TalevskaM on 07.07.2016.
 */

angular.module('adminBankaFrontendApp')
    .controller('odobruvanjeBaranjaCtrl', function($scope, gatewayService, $filter, toastr, $route, $rootScope, ngDialog, $parse, $location) {
        $scope.flagVisibility = false;
        $scope.obj = {};
        $scope.prikazNaFormaDinamichka = false;
        $scope.vnesipodatoci = false;
        $scope.nemapodatoci = false;
        $scope.flagDisableButtons = true;
        $scope.flagDisableLozinka = true;
        $scope.showButtons = false;
        $scope.odobreni = {};
        $scope.KorisnickoImeinfo = {};


        ////////////////////////////////// DODADENO OD MOMIR
        $scope.openWord = function() {
            window.open("dokumenti/revidiran.doc", "_blank");
        }

        //$rootScope.dataPermisii={};
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
            //console.log("Ova tuka e logiraniout user: ",logiranUser);
            if (dataPermisii != null) {
                for (var i = 0; i < dataPermisii.length; i++) {
                    if (permision == dataPermisii[i].PermissionName) {
                        //console.log("dataPermisii odobruvanje baranje: ", $rootScope.dataPermisii);
                        return true;
                    }
                }
            } else {
                toastr.error("Овој корисник нема привилегии.");
                return false;
            }
        }

        if (!$scope.hasPermission('odobruvanjeBaranja')) {
            //console.log("vleguva vo has premission odobruvanje baranje i menuva pateka.");
            $location.path('/');
        };



        $scope.loading = true;
        $scope.flagVisibilityTabs = false;

        $scope.checkEMBG = function() {
            if ($scope.obj.EdinstvenBroj == null || $scope.obj.EdinstvenBroj == "") {
                toastr.error('Единствен број е задолжително поле!');

            }
        };



        $scope.prikaziBaranja = function() {
            if ($rootScope.EdinstvenBrojKomitent == null || $rootScope.EdinstvenBrojKomitent == "") {
                $scope.vnesipodatoci = true;
                $scope.flagVisibility = true;
                $scope.loading = false;
            } else {
                $scope.vnesipodatoci = false;
                $scope.flagVisibility = true;
                $scope.baranja = {};
                $scope.loading = true;
                console.log($scope.loading);
                $scope.obj.EdinstvenBroj = $rootScope.EdinstvenBrojKomitent;

                gatewayService.request("/api/OdobruvanjeBaranja/1/FetchNeodobreniBaranja?EdinstvenBroj=" + $scope.obj.EdinstvenBroj, "GET").then(function(data, status, heders, config) {

                    $scope.loading = false;
                    if (data.length > 0) {
                        console.log("baranja", data);
                        $scope.baranja = data;
                    } else {
                        $scope.nemapodatoci = true;
                    }



                }, function(data, status, headers, config) {
                    console.log(status);
                });

                gatewayService.request("/api/OdobruvanjeBaranja/1/FetchAllNeodobreniBaranja?EdinstvenBroj=" + $scope.obj.EdinstvenBroj, "GET").then(function(data, status, heders, config) {
                    // $scope.loading = false;

                    // console.log("baranja",data);

                    $scope.neodobreniBaranja = data;
                    console.log("neodobreni", data);



                }, function(data, status, headers, config) {
                    console.log(status);
                });
            }


        }

        $scope.baranje = {};
        $scope.baranjaZaOdobruvanje = [];
        var KorisnickoIme = "";

        $scope.previewForEdit = function(item) {
            if ($scope.selectedRow != null) {

                $scope.prikazNaFormaDinamichka = true;
                $scope.baranje = item;
                console.log("Baranje", $scope.baranje)

                $scope.finalno = {};
                $scope.baranjaZaOdobruvanje = [];
                $scope.ePartii = [];
                var today = new Date();
                if ($scope.baranje.ProductTypeId.substring(5, 7) == '02') {
                    console.log("UKINUVANJEEEE");

                    for (var i = 0; i < $scope.neodobreniBaranja.length; i++) {
                        if ($scope.neodobreniBaranja[i].BrojBaranje == $scope.baranje.BrojBaranje && $scope.neodobreniBaranja[i].Privilegii == "1") {
                            console.log("tuka sme", $scope.neodobreniBaranja[i])
                            var pomoshna = "";
                            pomoshna = "o" + $scope.neodobreniBaranja[i].ProductId;
                            console.log("pom", pomoshna);
                            //$scope.korisnik.Privilegii[i] = pomoshna;
                            // console.log("TUKA SE POLNI SUBSTRING:", $scope.korisnik.Privilegii[i]);
                            $scope.finalno[pomoshna] = {
                                Privilegii: true,
                                isDisabled: false
                            }
                            $scope.neodobreniBaranja[i].DatumOdobruvanje = $filter('date')(today, "yyyy-MM-dd");
                            $scope.neodobreniBaranja[i].OrgDelOdobruvanje = "";
                            $scope.neodobreniBaranja[i].Status_S = "O";
                            $scope.neodobreniBaranja[i].StatusBaranje = "Одобрено";
                            $scope.neodobreniBaranja[i].ReferentOdobril = logiranUser;


                            $scope.baranjaZaOdobruvanje.push($scope.neodobreniBaranja[i]);
                            $scope.odobreni = {};
                            gatewayService.request("/api/OdobruvanjeBaranja/1/FetchAllOdobreniBaranja?EdinstvenBroj=" + $scope.neodobreniBaranja[i].EdinstvenBroj + "&Partija=" + $scope.baranje.Partija, "GET").then(function(data, status, heders, config) {
                                $scope.odobreni = data;
                                console.log("odobreni", $scope.odobreni);
                                for (var j = 0; j < $scope.odobreni.length; j++) {
                                    console.log("OdobrenoBaranje", $scope.odobreni[j]);

                                    $scope.odobreni[j].DatumUkinuvanje = $filter('date')(today, "yyyy-MM-dd");
                                    $scope.odobreni[j].OrgDelUkinuvanje = "";
                                    $scope.odobreni[j].Status_S = "U";
                                    $scope.odobreni[j].StatusBaranje = "Укинато";
                                    $scope.odobreni[j].ReferentUkinal = logiranUser;
                                    $scope.odobreni[j].BrojBaranjeZaUkinuvanje = $scope.baranje.BrojBaranje;

                                    $scope.baranjaZaOdobruvanje.push($scope.odobreni[j]);

                                    $scope.ePartija = {};
                                    $scope.ePartija.EdinstvenBroj = $scope.odobreni[j].EdinstvenBroj;
                                    $scope.ePartija.Banka = "";
                                    $scope.ePartija.OrgDel = $scope.odobreni[j].OrgDel;
                                    $scope.ePartija.VidRabota = $scope.odobreni[j].ProductTypeId.substring(3, 5);
                                    $scope.ePartija.Partija = $scope.odobreni[j].Partija;
                                    $scope.ePartija.KorisnickoIme = $scope.odobreni[j].KorisnickoIme;
                                    var KorisnickoIme = $scope.odobreni[j].KorisnickoIme;


                                    $scope.ePartija.Lozinka = "xxx";
                                    $scope.ePartija.SifraNacinElektronskoPlakanje = "";
                                    $scope.ePartija.LozinkaDatumIstekuvanje = "2050-12-31 00:00:00";
                                    $scope.ePartija.DatumIstekuvanje = "2050-12-31 00:00:00";
                                    $scope.ePartija.DaliPrvoNajavuvanje = false;
                                    $scope.ePartija.SeriskiBrojToken = $scope.odobreni[j].SeriskiBrojSertifikat;
                                    $scope.ePartija.SifraStatus = "U";
                                    $scope.ePartija.DatumOtvaranje = $filter('date')(today, "yyyy-MM-dd");;
                                    $scope.ePartija.Emaili = "";
                                    $scope.ePartija.SifraInicijativaUkinuvanje = "";
                                    $scope.ePartija.DatumUkinuvanje = "2050-12-31 00:00:00";
                                    $scope.ePartija.ZabeleskaUkinuvanje = "";
                                    $scope.ePartija.DopolnitelniInformacii = "";
                                    $scope.ePartija.ReferentInsert = logiranUser;
                                    $scope.ePartija.SifraPrivilegija = "";
                                    $scope.ePartija.SifraFormat = "";
                                    $scope.ePartija.MinimalenBrojPotpisi = 1;
                                    $scope.ePartija.TipNalog = "";
                                    $scope.ePartija.Limit = "";
                                    $scope.ePartija.SifraNadomest = "";
                                    $scope.ePartija.IznosNadomest = "";
                                    $scope.ePartija.ZabeleskaNadomest = "";
                                    $scope.ePartija.SifraVidSertifikat = "";
                                    $scope.ePartija.TipProvizija = "";
                                    $scope.ePartija.SifraPaket = "";
                                    $scope.ePartija.BrBaranje = "";
                                    $scope.ePartija.CertDatumValidenOd = "";
                                    $scope.ePartija.CertDatumValidenDo = "";
                                    $scope.ePartija.CertStatus = "";
                                    $scope.ePartija.TelBroj = $scope.odobreni[j].TelefonskiBroj;
                                    $scope.ePartija.ProductTypeID = $scope.odobreni[j].ProductTypeId;
                                    $scope.ePartija.ProductID = $scope.odobreni[j].ProductId;
                                    $scope.ePartija.BrojBaranje = $scope.odobreni[j].BrojBaranje;
                                    $scope.ePartija.BrojDogovor = "";

                                    $scope.ePartii.push($scope.ePartija);

                                }

                            }, function(data, status, headers, config) {
                                console.log(status);
                            });


                        }





                    }
                } else {
                    for (var i = 0; i < $scope.neodobreniBaranja.length; i++) {
                        if ($scope.neodobreniBaranja[i].BrojBaranje == $scope.baranje.BrojBaranje && $scope.neodobreniBaranja[i].Privilegii == "1") {
                            console.log("tuka sme", $scope.neodobreniBaranja[i])
                            var pomoshna = "";
                            pomoshna = "o" + $scope.neodobreniBaranja[i].ProductId;
                            console.log("pom", pomoshna);
                            //$scope.korisnik.Privilegii[i] = pomoshna;
                            // console.log("TUKA SE POLNI SUBSTRING:", $scope.korisnik.Privilegii[i]);

                            console.log("certinfo", $scope.neodobreniBaranja[i].CertificateInfo)
                            $scope.finalno[pomoshna] = {
                                Privilegii: true,
                                isDisabled: false,
                                CertificateInfo: $scope.neodobreniBaranja[i].CertificateInfo,
                                Email: $scope.neodobreniBaranja[i].Email,
                                TelefonskiBroj: $scope.neodobreniBaranja[i].TelefonskiBroj

                            }
                            $scope.neodobreniBaranja[i].DatumOdobruvanje = $filter('date')(today, "yyyy-MM-dd");
                            $scope.neodobreniBaranja[i].OrgDelOdobruvanje = "";
                            $scope.neodobreniBaranja[i].Status_S = "O";
                            $scope.neodobreniBaranja[i].StatusBaranje = "Одобрено";
                            $scope.neodobreniBaranja[i].ReferentOdobril = logiranUser;

                            $scope.baranjaZaOdobruvanje.push($scope.neodobreniBaranja[i]);

                            $scope.ePartija = {};
                            $scope.ePartija.EdinstvenBroj = $scope.neodobreniBaranja[i].EdinstvenBroj;
                            $scope.ePartija.Banka = "";
                            $scope.ePartija.OrgDel = $scope.neodobreniBaranja[i].OrgDel;
                            $scope.ePartija.VidRabota = $scope.neodobreniBaranja[i].ProductTypeId.substring(3, 5);
                            $scope.ePartija.Partija = $scope.neodobreniBaranja[i].Partija;
                            $scope.ePartija.KorisnickoIme = $scope.neodobreniBaranja[i].KorisnickoIme;
                            KorisnickoIme = $scope.neodobreniBaranja[i].KorisnickoIme;
                            $scope.ePartija.Lozinka = "xxx";
                            $scope.ePartija.SifraNacinElektronskoPlakanje = "";
                            $scope.ePartija.LozinkaDatumIstekuvanje = "2050-12-31 00:00:00";
                            $scope.ePartija.DatumIstekuvanje = "2050-12-31 00:00:00";
                            $scope.ePartija.DaliPrvoNajavuvanje = false;
                            $scope.ePartija.SeriskiBrojToken = $scope.neodobreniBaranja[i].Sertifikat;
                            $scope.ePartija.SifraStatus = "O";
                            $scope.ePartija.DatumOtvaranje = $filter('date')(today, "yyyy-MM-dd");
                            $scope.ePartija.Emaili = $scope.neodobreniBaranja[i].Email;
                            $scope.ePartija.SifraInicijativaUkinuvanje = "";
                            $scope.ePartija.DatumUkinuvanje = "2050-12-31 00:00:00";
                            $scope.ePartija.ZabeleskaUkinuvanje = "";
                            $scope.ePartija.DopolnitelniInformacii = "";
                            $scope.ePartija.ReferentInsert = logiranUser;

                            $scope.ePartija.SifraPrivilegija = "";
                            $scope.ePartija.SifraFormat = "";
                            $scope.ePartija.MinimalenBrojPotpisi = 1;
                            $scope.ePartija.TipNalog = "";
                            $scope.ePartija.Limit = "";
                            $scope.ePartija.SifraNadomest = "";
                            $scope.ePartija.IznosNadomest = "";
                            $scope.ePartija.ZabeleskaNadomest = "";
                            $scope.ePartija.SifraVidSertifikat = "";
                            $scope.ePartija.TipProvizija = "";
                            $scope.ePartija.SifraPaket = "";
                            $scope.ePartija.BrBaranje = "";
                            $scope.ePartija.CertDatumValidenOd = $scope.neodobreniBaranja[i].NotAfter;
                            $scope.ePartija.CertDatumValidenDo = $scope.neodobreniBaranja[i].NotBefore;
                            $scope.ePartija.CertStatus = "";
                            $scope.ePartija.TelefonskiBroj = $scope.neodobreniBaranja[i].TelefonskiBroj;
                            $scope.ePartija.X509Certificate = $scope.neodobreniBaranja[i].X509Certifikate;
                            $scope.ePartija.ProductTypeID = $scope.neodobreniBaranja[i].ProductTypeId;
                            $scope.ePartija.ProductID = $scope.neodobreniBaranja[i].ProductId;
                            $scope.ePartija.BrojBaranje = $scope.neodobreniBaranja[i].BrojBaranje;
                            $scope.ePartija.BrojDogovor = "";

                            $scope.ePartii.push($scope.ePartija);

                        }
                    }
                }





            } else {
                $scope.baranje = {};
                $scope.products = {};
                $scope.finalno = {};
                $scope.prikazNaFormaDinamichka = false;
                // console.log("Show",$scope.showDir);
                $scope.flagVisibilityTabs = false;


            }
        };


        $scope.selectedRow = null; // initialize our variable to null
        $scope.setClickedRow = function(index) { //function that sets the value of selectedRow to current index
            $scope.selectedRow = ($scope.selectedRow == index) ? null : index;
            console.log("this is selected item: ", index);
        };


        //Fetch na site vidovi rabota
        $scope.productsFetch = function(y) {
            gatewayService.request("/api/Products/1/ProductsFetchByProductType?ProductTypeID=" + y.ProductTypeId, "GET").then(function(data, status, heders, config) {
                $scope.products = data;
                console.log("products", data);
                // $scope.prikazNaFormaDinamichka=true;
            }, function(data, status, headers, config) {
                console.log(status);
            });
        }

        $scope.setVisibility = function() {
            $scope.flagVisibilityTabs = true;
            console.log("povikano flag visibility.");
        };


        // obj = {
        //   Baranja: $scope.baranjaZaOdobruvanje,
        //   OrgDel: "1000"
        // }

        $scope.password = "";
        $scope.randomPassword = function(length) {

                var chars = "ABCDEFGHIJKLMNOP";
                var pass = "";
                for (var x = 0; x < 5; x++) {
                    var i = Math.floor(Math.random() * chars.length);
                    pass += chars.charAt(i);
                }

                chars = "abcdefghijklmnopqrstuvwxyz";

                //   var pass = "";
                for (var x = 0; x < 5; x++) {
                    var i = Math.floor(Math.random() * chars.length);
                    pass += chars.charAt(i);
                }

                chars = "1234567890";
                //  var pass = "";
                for (var x = 0; x < 3; x++) {
                    var i = Math.floor(Math.random() * chars.length);
                    pass += chars.charAt(i);
                }


                chars = "!@$";
                //var pass = "";
                for (var x = 0; x < 1; x++) {
                    var i = Math.floor(Math.random() * chars.length);
                    pass += chars.charAt(i);
                }
                console.log("Password", pass);
                $scope.password = pass;
                // console.log("Pass",password);
            }
            // $scope.randomPassword(10);


        $scope.odobriBaranje = function() {
            console.log("KorisnickoIme", KorisnickoIme);
            $scope.KorisnickoImeinfo = {};
            gatewayService.request("/api/OdobruvanjeBaranja/1/CheckKorisniskoIme?KorisnickoIme=" + $scope.baranje.KorisnickoIme, "GET").then(function(data, status, heders, config) {
                $scope.KorisnickoImeinfo = data;
                console.log("Info korisnicko ime", data);
                if ($scope.KorisnickoImeinfo.length > 0) {
                    $scope.flagDisableButtons = false;

                    $scope.object = {
                        Baranja: $scope.baranjaZaOdobruvanje,
                        OrgDel: '000001',
                        ePartii: $scope.ePartii
                    }

                    // $scope.obj.push($scope.baranjaZaOdobruvanje);
                    // $scope.obj.push("1000");

                    console.log("Obj", $scope.object)

                    gatewayService.request("/api/OdobruvanjeBaranja/1/odobriBaranja", "POST", $scope.object).then(function(data, status, heders, config) {
                        $scope.flagDisableButtons = false;
                        toastr.success("Барањата се успешно одобрени!");


                    }, function(data, status, headers, config) {
                        console.log(status);

                    });
                } else {
                    $scope.randomPassword(15);
                    console.log("KorisnickoIme", $scope.baranje.KorisnickoIme);
                    console.log("Password", $scope.password);
                    $scope.flagDisableLozinka = false;
                    $scope.flagDisableButtons = false;
                    $scope.object = {
                        Baranja: $scope.baranjaZaOdobruvanje,
                        OrgDel: '000001',
                        ePartii: $scope.ePartii
                    }


                    gatewayService.request("/api/OdobruvanjeBaranja/1/CreateADUser?userName=" + $scope.baranje.KorisnickoIme + "&userPassword=" + $scope.password, "GET").then(function(data, status, heders, config) {

                        // $scope.obj.push($scope.baranjaZaOdobruvanje);
                        // $scope.obj.push("1000");

                        console.log("Obj", $scope.object)

                        gatewayService.request("/api/OdobruvanjeBaranja/1/odobriBaranja", "POST", $scope.object).then(function(data, status, heders, config) {
                            $scope.flagDisableButtons = false;
                            toastr.success("Барањата се успешно одобрени!");

                        }, function(data, status, headers, config) {
                            console.log(status);

                        });

                    }, function(data, status, headers, config) {
                        console.log(status);

                    });

                }


            }, function(data, status, headers, config) {
                console.log(status);

            });


        };





        ////////////////////////  NG DIALOG   ///////////////////
        $scope.popUp = function() {
            ngDialog.open({
                template: 'templateid',
                scope: $scope
            });
        }

        $scope.popUpDogovor = function() {
            ngDialog.open({
                template: 'templateDogovor',
                scope: $scope
            });
        }

        $scope.printDiv = function(divname) {
            console.log("Div", divname);
            var printContents = document.getElementById(divname).innerHTML;
            var popupWin = window.open('', '_blank');
            popupWin.document.open();
            popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
            popupWin.document.close();
        }



        $scope.printDivDogovor = function(divname) {

            var KomitentInfoDog = $rootScope.KomitentInfoDog;
            console.log("KomitentInfoDog", KomitentInfoDog);

            var loadFile = function(url, callback) {
                JSZipUtils.getBinaryContent(url, callback);
            }
            loadFile("revidiran.docx", function(err, content) {
                if (err) {
                    throw e
                };
                var doc = new Docxgen(content);
                doc.setData({
                        "firstLastName": KomitentInfoDog.ImeNaziv + " " + KomitentInfoDog.Prezime,
                        "address": KomitentInfoDog.Adresa,
                        "embg": KomitentInfoDog.EdinstvenBroj
                            // "description":"New Website"
                    }) //set the templateVariables
                doc.render() //apply them (replace all occurences of {first_name} by Hipp, ...)
                var out = doc.getZip().generate({
                        type: "blob"
                    }) //Output the document using Data-URI

                var outName = "newoutput.docx"

                saveAs(out, outName)
            })


            // console.log("Div",divname);
            // var printContents = document.getElementById(divname).innerHTML;
            // var popupWin = window.open('', '_blank');
            // popupWin.document.open();
            // popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
            // popupWin.document.close();
        }


        $scope.prikazhi = function() {
            ngDialog.open({
                template: 'zabeleska',
                scope: $scope
            });
        };



        $scope.odbivanje = function(zabeleska) {

            var tmp = "Причина за одбивање: "

            tmp += zabeleska;


            for (var i = 0; i < $scope.baranjaZaOdobruvanje.length; i++) {
                $scope.baranjaZaOdobruvanje[i].Status_S = "R";
                $scope.baranjaZaOdobruvanje[i].Zabeleshka = tmp;
                $scope.baranjaZaOdobruvanje[i].StatusBaranje = "Oдбиено";

            }
            console.log($scope.baranjaZaOdobruvanje);
            gatewayService.request("/api/Baranja/1/ProductTypeBaranjaUpdates", "POST", $scope.baranjaZaOdobruvanje).then(function(data, status, heders, config) {
                toastr.success("Барањата се успешно одбиени!");
                $route.reload();

            }, function(data, status, headers, config) {
                console.log(status);
                toastr.error("Барањата не се одбиени!");

            });


        }


    });