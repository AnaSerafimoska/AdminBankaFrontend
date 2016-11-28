'use strict';
angular.module('adminBankaFrontendApp')
    .controller('adminBaranjaCtrl', function($scope, gatewayService, $filter, toastr, $route, $rootScope, ngDialog, $parse, $location) {




        var s = "MIIELDCCAxSgAwIBAgIKHb8HLgAAAAAE4TANBgkqhkiG9w0BAQUFADAmMSQwIgYDVQQDExtTdG9wYW5za2EgQmFua2EgYS5kLiBCaXRvbGEwHhcNMTUxMTEzMTM1ODQ0WhcNMTYxMTA3MjEzOTMxWjA8MRcwFQYDVQQDEw5WUkVNRU5BIFNNRVRLQTEhMB8GCSqGSIb3DQEJARYSdGVzdEBuZXZhemVja2kuY29tMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDQrecly+7JyuOzBPt8hcruSs2+diZv0LNMVeDaYHcOROneP3KPgJFnCGhfFK9towYoHQXK7BkiVM3MwnfbX5vTCzvSEhbvYBMoKPOEi4JlkdufSfqXGpT1tWboniIuvGgJtViTrUeVqaABI4OcClOxovdveYynKtj7vYO+iFdFmwIDAQABo4IByDCCAcQwDgYDVR0PAQH/BAQDAgTwMBMGA1UdJQQMMAoGCCsGAQUFBwMCMB0GA1UdDgQWBBTRECYGcw+zrN0tNfL6mKik9JHo6TAfBgNVHSMEGDAWgBRAgSN0txzluJQcx9hNLhy5ggecdDCBkgYDVR0fBIGKMIGHMIGEoIGBoH+GOmZpbGU6Ly9FQkFOSy1DQS9DZXJ0RW5yb2xsL1N0b3BhbnNrYSBCYW5rYSBhLmQuIEJpdG9sYS5jcmyGQWh0dHA6Ly93d3cuc3RiYnQuY29tLm1rL0NSTC9TdG9wYW5za2ElMjBCYW5rYSUyMGEuZC4lMjBCaXRvbGEuY3JsMIG5BggrBgEFBQcBAQSBrDCBqTBPBggrBgEFBQcwAoZDZmlsZTovL0VCQU5LLUNBL0NlcnRFbnJvbGwvRUJBTkstQ0FfU3RvcGFuc2thIEJhbmthIGEuZC4gQml0b2xhLmNydDBWBggrBgEFBQcwAYZKaHR0cDovL3d3dy5zdGJidC5jb20ubWsvQ1JML0VCQU5LLUNBX1N0b3BhbnNrYSUyMEJhbmthJTIwYS5kLiUyMEJpdG9sYS5jcnQwDAYDVR0TAQH/BAIwADANBgkqhkiG9w0BAQUFAAOCAQEAxJq0ymVaPMOE2wHCCIrYjKvB8QhMP3dAryCiEz0dsdKXHwMChh8wmDMsXe6frn9YMndHjI+CHqcPv+nl4Mn3eCysiGOrLdlKDlgreNijA1pG3UoEeMXfgaKsUny3x23x3VIBo6ITWOJnlpJ4atUy4HKWCA4Dd5D/yeyJSJ/AuQkEudm+2oH9zoYkrL/BN+Oq4m+KLHM8JznyNFicAzBMHW//IrMA9y1u7y9PyHeIMpFPhv+1exKHCcw5QrsfupwfF5Yj6m+h4I3xkn/AHFcfaRHWHFH+8W52yeFMGeIumBtC+5yIRA/5lJUbNDCTKMeVkkE/zeIbIX6a5/iCKwgA5Q=="
        console.log(s.length);

        $scope.KorisnikPrikazInfo = {
            "BrBaranje": "Test2"
        }

        $scope.brojbaranjeN = {
            "broj": ""
        };

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
            console.log("adm hasPermission");
            if (dataPermisii != null) {
                console.log("adm hasPermission  dataPermisii != null");
                for (var i = 0; i < dataPermisii.length; i++) {
                    if (permision == dataPermisii[i].PermissionName) {
                        return true;
                    }
                }
            } else {}
        }

        if (!$scope.hasPermission('adminBaranja')) {
            console.log("adm baranja1");
            $location.path('/');
        };


        //true za denarski
        $scope.tipDodadismetka = true;
        //Za prikaz na info
        $scope.KorisnikPrikazInfo = {};
        $scope.Korisnik = {};
        $scope.prikazNaFormaDinamichka = false;
        //Flag za enable i dable na kopceto prikazi
        $scope.Flag_Prikazhi = true;
        $scope.products = {};

        //da nema dodadi smetka kaj ukinuvanje
        $scope.hideDodadiSmetka = true;

        //Prebaruvanje na komitentot
        $scope.valueForSearch = "Единствен број"
        $scope.flagS = "0";
        $scope.Komitenti = {};
        $scope.SearchValue = "";
        $scope.flagDisableKorsnickoIme = false;


        //Podatoci za polni tabela
        $scope.loading = false;
        $scope.tmp = {};
        $scope.showDir = false;

        //Flag so kazuva dali ima nselektirano tip na produkt
        $scope.flagSelektiranTip = true;


        $scope.searchEmbg = true;

        $scope.tooltip = {

            "title": "Пребарај",
            "checked": false
        };



        //Prebaruvanje na komitentot
        $scope.changeValue = function(val) {
            if (val == '0') {
                $scope.valueForSearch = "Единствен број"
                $scope.flagS = "0";
                $scope.searchEmbg = true;
                $scope.SearchValue = "";
                $scope.Komitenti = {};
                $scope.KorisnikPrikazInfo = {};


            } else if (val == "1") {
                $scope.valueForSearch = "Име/Назив/Презиме";
                $scope.flagS = "1";
                $scope.searchEmbg = false;
                $scope.SearchValue = "";
                $scope.Komitenti = {};
                $scope.KorisnikPrikazInfo = {};

            }
        }

        $scope.searchRecord = function(val) {
            if (val == "" || val == null) {
                toastr.error("Внесете податоци за пребарување!")
                $scope.KorisnikPrikazInfo = {};
                $scope.Flag_Prikazhi = false;
            } else {

                gatewayService.request("/api/Baranja/1/FetchKomitentiCoreIeBanking?Type=" + $scope.flagS + "&Value=" + val, "GET").then(function(data, status, heders, config) {

                    if (data.length < 1) {
                        toastr.warning("Не постојат податоци за " + val + ".");

                        $scope.KorisnikPrikazInfo = {};
                        $scope.Flag_Prikazhi = false;
                    }
                    if (data.length == 1) {
                        $scope.Komitenti = data;
                        // $scope.Komitent = $scope.Komitenti[0];
                        $scope.fetchKomitent(data[0]);
                        $scope.selectiranTip = {};
                        $scope.flagVisibilityTabs = false;

                    } else {

                        $scope.Komitenti = data;
                        $scope.KorisnikPrikazInfo = {};
                        $scope.Flag_Prikazhi = true;
                        $scope.selectiranTip = {};
                        $scope.flagVisibilityTabs = false;
                    }




                }, function(data, status, headers, config) {
                    console.log(status);

                });


            }

        }


        //Polnenje na polinjata so podatoci za komitentot
        $scope.fetchKomitent = function(val) {
            $scope.Flag_Prikazhi = false;
            $scope.Korisnik = {};
            $scope.KorisnikPrikazInfo = {};
            $scope.selectiranTip = {};
            $scope.flagVisibilityTabs = false;
            $scope.Korisnik = angular.fromJson(val);
            $scope.KorisnikPrikazInfo.embg = $scope.Korisnik.EdinstvenBroj;
            $scope.KorisnikPrikazInfo.ImePrezime = $scope.Korisnik.ImeNaziv + " " + $scope.Korisnik.Prezime;
            $scope.KorisnikPrikazInfo.TelefonskiBroj = $scope.Korisnik.Mobilen;
            $scope.KorisnikPrikazInfo.BrLicnaKarta = $scope.Korisnik.BrLicnaKarta;
            $scope.KorisnikPrikazInfo.Adresa = $scope.Korisnik.Adresa;
        }


        //FETCH NA SELEKTIRANIOT TIP NA RABOTA
        $scope.zemiSelektiranTipNaProdukt = function(item) {
            console.log("item", item.substring(5, 7))
            if (item.substring(3, 5) == '03' || item.substring(3, 5) == '04' || item.substring(3, 5) == '05') {
                //za devizni smetki
                $scope.tipDodadismetka = false;
            } else {
                $scope.tipDodadismetka = true;

            }

            if (item.substring(5, 7) == '02') {
                //za devizni smetki
                $scope.hideDodadiSmetka = false;
            } else {
                $scope.hideDodadiSmetka = true;

            }
            $scope.selektiranTip = "";
            $scope.showDir = false;

            $scope.selektiranTip = item;
            $scope.KorisnikPrikazInfo.ProductTypeId = item;
            $scope.KorisnikPrikazInfo.PTID = $scope.KorisnikPrikazInfo.ProductTypeId.substring(3, 5);
            if ($scope.selektiranTip == "" || $scope.selektiranTip == null) {
                $scope.flagSelektiranTip = true;
            } else {
                $scope.flagSelektiranTip = false;
            }


        };

        //FETCH NA PRODUCT TYPES ZA POLNENJE NA COMBOTO
        $scope.ProductTypes = function() {
            gatewayService.request("/api/ProductTypes/1/ProductTypesFetch", "GET").then(function(data, status, heders, config) {
                //  console.log("data" ,data);
                $scope.productTypes = data;

            }, function(data, status, headers, config) {
                console.log(status);
            });
        }
        $scope.ProductTypes();


        // PODATOCI ZA IDENTIFIKACIJA NA KORISNIK PO EMBG
        $scope.zemiPodatociPo_EMBG = function(embg) {

            gatewayService.request("/api/Baranja/1/EbankingFetchZaKomitent?EdinstvenBroj=" + embg, "GET").then(function(data, status, heders, config) {
                console.log("tuka: ", data);
                if (data.Table[0].KorisnickoIme != "") {
                    $scope.KorisnikPrikazInfo.korisnichkoIme = data.Table[0].KorisnickoIme;
                    $scope.flagDisableKorsnickoIme = true;
                } else {
                    $scope.KorisnikPrikazInfo.korisnichkoIme = "";
                    $scope.flagDisableKorsnickoIme = false;
                }



                $scope.KorisnikPrikazInfo.EdinstvenBroj = $scope.Korisnik.EdinstvenBroj;

                $scope.Korisnik.datum = $filter('date')(new Date(), "yyyy-MM-dd");
                $scope.KorisnikPrikazInfo.DatumInsert = $scope.Korisnik.datum;
                polniTabela();

            }, function(data, status, headers, config) {
                console.log(status);
            });
        };


        //  LICNI PODATOCI OD CORE ZA KORISNIK PO EMBG
        $scope.zemiPodatoci_CORE = function(embg) {
            gatewayService.request("/api/Baranja/1/FetchPersonalInfo_CORE?EdinstvenBroj=" + embg, "GET").then(function(data, status, heders, config) {
                console.log("LICHNI PODATOCI: ", data);
                $scope.KorisnikPrikazInfo.TelefonskiBroj = data.Table[0]['Mobilen'];
                $scope.Korisnik.BrLicnaKarta = data.Table[0]['BrLicnaKarta'];
                $scope.KorisnikPrikazInfo.Adresa = data.Table[0]['Adresa'];
            }, function(data, status, headers, config) {
                console.log(status);
            });
        };


        //TUKA SE POLNI TABELATA SO SMETKI
        function polniTabela() {

            $scope.loading = true;
            $scope.temp = [];
            $scope.dodadenaSmetka = {};
            $scope.tmp = {};
            $scope.final = [];
            $scope.tmp = $route.temp;

            console.log("tmp", $scope.tmp);

            gatewayService.request("/api/Baranja/1/FetchPartiieBankCore?EdinstvenBroj=" + $scope.Korisnik.EdinstvenBroj, "GET").then(function(data, status, heders, config) {

                console.log("Core: ", data);
                $scope.loading = false;

                var the_string = 'o010005.TelefonskiBroj';

                var model = $parse(the_string);
                model.assign($scope, "156156");

                $scope.TmpPodatoci = data;

                for (var i = 0; i < data.length; i++) {
                    $scope.temp.push(data[i]);
                }


            }, function(data, status, headers, config) {
                console.log(status);
            });


            $scope.polniFinal();

        };


        $scope.polniFinal = function() {
            $scope.final = $scope.temp;
        }





        //Fetch na site vidovi rabota
        $scope.productsFetch = function(selektiranTip) {
            console.log("selectiran tip", selektiranTip);
            gatewayService.request("/api/Products/1/ProductsFetchByProductType?ProductTypeID=" + selektiranTip, "GET").then(function(data, status, heders, config) {
                $scope.products = data;
                console.log("data", data);
                $scope.showDir = true;
            }, function(data, status, headers, config) {
                console.log(status);
            });
            //  console.log("Y",y);
            //  $scope.products={};
            //  var getBaranjeType="";
            // // console.log("Types",$scope.productTypes)
            //  for(var i=0;i< $scope.productTypes.length;i++)
            //  {
            //  //  console.log("Tuka1", $scope.productTypes[i].ProductTypeID.substring(3,5))
            // //   console.log("Tuka2", $scope.selektiranTip)
            //    if($scope.productTypes[i].ProductTypeID.substring(3,5)==$scope.selektiranTip.substring(0,2))
            //    {
            //
            //   //   console.log("Tuka")
            //
            //      getBaranjeType=$scope.productTypes[i].ProductTypeID;
            //    }
            //  }
            //  gatewayService.request("/api/Products/1/ProductsFetchByProductType?ProductTypeID="+getBaranjeType, "GET").then(function (data, status, heders, config) {
            //    $scope.products=data;
            //    console.log("products",data);
            //    $scope.showDir=true;
            //  }, function (data, status, headers, config) {
            //    console.log(status);
            //  });
        }



        //Za dodavanje na nova partija
        $scope.info = "";
        $scope.getInfo = function(partija) {


            $scope.ePartija = {};

            if (partija.length == 13 || partija.length == 15) {

                //$scope.info="Naziv";
                gatewayService.request("/api/Baranja/1/ProveriDaliPostoiPartijaBIS?Partija=" + partija, "GET").then(function(data, status, heders, config) {

                    if (data.length > 0) {
                        var jaima = false;
                        for (var i = 0; i < $scope.temp.length; i++) {
                            if ($scope.temp[i].Partija == partija) {
                                jaima = true;

                            } else {

                            }
                        }
                        if (jaima) {
                            $scope.info = "Сметката е веќе внесена.";
                            $scope.potpisnikFlag = true;
                        } else {
                            console.log("data", data[0])
                            $scope.info = data[0].NazivPartija;
                            $scope.potpisnikFlag = false;

                            $scope.ePartija.Banka = "";
                            $scope.ePartija.OrgDel = "";
                            $scope.ePartija.Partija = data[0].Partija;
                            $scope.ePartija.EdinstvenBroj = $scope.KorisnikPrikazInfo.EdinstvenBroj
                            $scope.ePartija.ProductTypeID = "";
                            $scope.ePartija.ProductID = "";
                            $scope.ePartija.DatumInsert = new Date();
                            $scope.ePartija.DatumInsert = $filter('date')($scope.ePartija.DatumInsert, "yyyy-MM-dd");
                            $scope.ePartija.DatumOtvaranje = new Date();
                            $scope.ePartija.DatumOtvaranje = $filter('date')($scope.ePartija.DatumOtvaranje, "yyyy-MM-dd");
                            $scope.ePartija.DatumIstekuvanje = "2050-12-31";
                            $scope.ePartija.SifraServis = "";
                            $scope.ePartija.SifraStatus = "V";
                            $scope.ePartija.KorisnickoIme = $scope.KorisnikPrikazInfo.korisnichkoIme;
                            $scope.ePartija.Lozinka = "xxx";
                            $scope.ePartija.VidRabota = data[0].ProductTypeID.substring(0, 2);
                            $scope.ePartija.ReferentInsert = logiranUser;

                            gatewayService.request("/api/Baranja/1/FetchUserePartii?EdinstvenBroj=" + $scope.KorisnikPrikazInfo.EdinstvenBroj, "GET").then(function(data, status, heders, config) {
                                if (data.length > 0) {
                                    $scope.ePartija.DaliPrvoNajavuvanje = false;

                                } else {
                                    $scope.ePartija.DaliPrvoNajavuvanje = true;
                                }

                            }, function(data, status, headers, config) {
                                console.log(status);
                            });

                            console.log("partija nova", $scope.ePartija);

                        }


                    } else {
                        $scope.info = "Не постои таква сметка."
                        $scope.potpisnikFlag = true;
                    }

                }, function(data, status, headers, config) {
                    console.log(status);
                });



            } else {
                $scope.info = "";
            }
        }


        // $scope.setFlagToPrikazhi = function(){
        //   if($scope.korisnik.embg != null && $scope.form.$valid){
        //     $scope.Flag_Prikazhi = false;
        //   }
        //   else{
        //     toastr.error("Внесете податоци за пребарување.");
        //   }
        // };





        $scope.dodadiSmetka = function(smetka) {

            // gatewayService.request("/api/Baranja/1/ProveriDaliPostoiSmetka?Partija="+smetka, "GET").then(function (data, status, heders, config) {
            //          if(data.Table.length != 0){
            //               toastr.success('Сметката е успешно додадена.');
            //              // console.log("************************");
            //              // console.log("Dali postoi takva smetka: ",data);
            //               $scope.novPotpisnik = data.Table[0];
            //               $scope.potpisnikFlag = false;
            //               $scope.temp.push($scope.novPotpisnik);
            //              // console.log("potpisnikFlag:",$scope.potpisnikFlag);
            //              // console.log("Nov Potpisnik:",$scope.novPotpisnik);
            //              // console.log("************************");
            //          }
            //          else{
            //               toastr.error('Сметката не постои.');
            //               $scope.potpisnikFlag = true;
            //          }
            //     }, function (data, status, headers, config) {
            //       console.log(status);
            //     });
            gatewayService.request("/api/Baranja/1/ePartiiInsert", "POST", $scope.ePartija).then(function(data, status, heders, config) {
                toastr.success("Сметката е успешно внесена");

                $route.reload();

            }, function(data, status, headers, config) {
                console.log(status);

            });

        }


        $scope.setirajFlagPotpisnik = function() {
            $scope.potpisnikFlag = false;
        }

        $scope.productBodyFetch = function() {
            gatewayService.request("/api/ProductBody/1/ProductBodyFetchByIdType?ProductTypeID=" + $scope.type + "&ProductID=" + $scope.value, "GET").then(function(data, status, heders, config) {
                $scope.FormaBody = data;
                console.log("Forma body:", $scope.FormaBody);

            }, function(data, status, headers, config) {
                console.log(status);
            });
        }

        /////////////////////////// ***************** SNIMANJE NA BARANJA ******************/////////////////////////////////////////////
        // {
        //     "BrojBaranje":"",
        //     "KorisnickoIme":"moki",
        //     "DatumInsert":"2016-09-24",
        //     "EMBG":"2409991470010",
        //     "ProductID":"1111",
        //     "OrgDel":"11111",
        //     "Partija":"151515151515",
        //     "Status_S":"1",
        //     "DatumBaranje":"2016-09-24",
        //     "ReferentInsert":"",
        //     "Email":"momir@hotmail.com",
        //     "SeriskiBrojSertifikat":"",
        //     "Sertifikat":"",
        //     "TelefonskiBroj":"072233296",
        //     "Zabeleshka":"",
        //     "Limit":"",
        //     "StatusBaranje":"",
        //     "Email_Adresa":"",
        //     "Pregled_izveshtai":"",
        //     "Pregled_nalozi":"",
        //     "Vnesuvanje_nalozi_pp30":"",
        //     "Prakjanje_nalozi":"",
        //     "Vnesuvanje_nalozi_pp53":"",
        //     "Potpishuvanje_nalozi":"",
        //     "Vnesuvanje_nalozi_pp50":"",
        //     "Pregled_na_izveshtai_depoziti":"",
        //     "Pregled_na_izveshtai_krediti":"",
        //     "Pregled_na_izveshtai_kartichki":""
        // }
        /////////END SNIMANJE BARANJA    /////////////////////


        $scope.old = [];

        // TUKA SE ZEMAAT PODATOCITE ZA PRIKAZ VO TABOVITE  

        $scope.previewForEdit = function(item) {
            $scope.finalno = {};
            $scope.odobreni = [];
            $scope.neodobreni = [];
            $scope.sitevneseni = [];

            $scope.prikazNaFormaDinamichka = true;
            $scope.KorisnikPrikazInfo.BrBaranje = "";
            if ($scope.selectedRow != null) {

                $scope.productbody = item;
                $scope.prikazNaFormaDinamichka = true;
                $scope.KorisnikPrikazInfo.Partija = item.Partija;

                // Ako e baranje za odobruvanje
                if ($scope.selektiranTip.substring(5, 7) == '01') {

                    gatewayService.request("/api/Baranja/1/EbankingKorisniciServis_FetchPrivilegii?EdinstvenBroj=" + $scope.KorisnikPrikazInfo.EdinstvenBroj + "&ProductTypeID=" + $scope.KorisnikPrikazInfo.ProductTypeId.substring(3, 5) + "&Partija=" + item.Partija, "GET").then(function(data, status, heders, config) {


                        for (var i = 0; i < data.length; i++) {
                            $scope.sitevneseni.push(data[i]);
                            console.log(data[i]);

                            if (data[i]["EdinstvenBroj"] == $scope.KorisnikPrikazInfo.EdinstvenBroj && data[i]["Partija"] == item.Partija) {
                                var pomoshna = "";
                                pomoshna = "o" + data[i]["ProductId"];

                                // $scope.KorisnikPrikazInfo.Privilegii[i] = pomoshna;
                                // console.log("TUKA SE POLNI SUBSTRING:", $scope.KorisnikPrikazInfo.Privilegii[i]);
                                //$scope.odobreni.push( pomoshna);

                                var Sertifikat = data[i]["CertificateInfo"];
                                var TelefonskiBroj = data[i]["TelefonskiBroj"];
                                var Email = data[i]["Email"];
                                console.log("Sertifikat", Sertifikat)

                                if (data[i]["Status_S"] == 'O') {
                                    if (data[i]["Privilegii"] == "1") {
                                        if (Sertifikat != null || Sertifikat != "") {
                                            console.log("1")
                                            $scope.finalno[pomoshna] = {
                                                CertificateInfo: Sertifikat,
                                                Privilegii: true,
                                                isDisabled: true,
                                                TelefonskiBroj: TelefonskiBroj,
                                                Email: Email

                                            }

                                        } else {
                                            console.log("2")
                                            $scope.finalno[pomoshna] = {

                                                Privilegii: true,
                                                isDisabled: true
                                            }
                                        }
                                    }


                                    $scope.odobreni.push(data[i]);
                                    //  $scope.sitevneseni.push(data[i]);

                                } else if (data[i]["Status_S"] == 'N') {
                                    if ($scope.brojbaranjeN.broj == "") {
                                        console.log('----------------------------');
                                        console.log(data[i]["BrojBaranje"]);
                                        console.log(data[i]);
                                        console.log('----------------------------');
                                        $scope.brojbaranjeN.broj = data[i]["BrojBaranje"];
                                    }
                                    if ($scope.brojbaranjeN.broj != "" || $scope.brojbaranjeN.broj != null || $scope.brojbaranjeN.broj != undefined) {

                                        $scope.KorisnikPrikazInfo.BrBaranje = $scope.brojbaranjeN.broj;
                                    } else {
                                        $scope.KorisnikPrikazInfo.BrBaranje = "";
                                    }

                                    if (data[i]["Privilegii"] == "1") {
                                        $scope.finalno[pomoshna] = {
                                            CertificateInfo: Sertifikat,
                                            Privilegii: true,
                                            isDisabled: false,
                                            TelefonskiBroj: TelefonskiBroj,
                                            Email: Email
                                        }
                                    }

                                    console.log("1")

                                    $scope.neodobreni.push(data[i]);
                                    //   $scope.sitevneseni.push(data[i]);

                                    //   }
                                    // else {
                                    //   console.log("1")
                                    //   $scope.finalno[pomoshna]={
                                    //
                                    //     Privilegii : true,
                                    //     isDisabled: false
                                    //   }
                                    //   $scope.neodobreni.push(data[i]);
                                    //   $scope.sitevneseni.push(data[i]);



                                }

                                //$scope.finalno[pomoshna].Privilegii.attr('disabled', true);

                            }
                            // $scope.zemiNovi();

                        }


                    }, function(data, status, headers, config) {
                        console.log(status);
                    });

                } else if ($scope.selektiranTip.substring(5, 7) == '02') {

                    console.log("Za ukinuvananje");
                    gatewayService.request("/api/Baranja/1/EbankingKorisniciServis_FetchPrivilegii?EdinstvenBroj=" + $scope.KorisnikPrikazInfo.EdinstvenBroj + "&ProductTypeID=" + $scope.KorisnikPrikazInfo.ProductTypeId.substring(3, 5) + "&Partija=" + item.Partija, "GET").then(function(data, status, heders, config) {
                        console.log("Vrateni po datoci so PRIVILEGII: ", data);



                        for (var i = 0; i < data.length; i++) {
                            console.log(data[i]["ProductTypeId"].substring(5, 7));
                            $scope.sitevneseni.push(data[i]);
                            if (data[i]["EdinstvenBroj"] == $scope.KorisnikPrikazInfo.EdinstvenBroj && data[i]["Partija"] == item.Partija && data[i]["ProductTypeId"].substring(5, 7) == '02') {

                                console.log("Uslovot e ispolnet");

                                var pomoshna = "";
                                pomoshna = "o" + data[i]["ProductId"];

                                if (data[i]["Status_S"] == 'N') {
                                    if (data[i]["Privilegii"] == "1") {


                                        $scope.finalno[pomoshna] = {
                                            Privilegii: true,
                                            isDisabled: false

                                        }
                                    }

                                    $scope.neodobreni.push(data[i]);
                                    //    $scope.brojbaranjeN.broj="";
                                    //    $scope.brojbaranjeN.broj=data[i]["BrojBaranje"];
                                    //     $scope.sitevneseni.push(data[i]);
                                }



                            }

                        }

                    }, function(data, status, headers, config) {
                        console.log(status);
                    });

                }


            } else {
                $scope.finalno = {};
                $scope.old = [];
                $scope.products = {};
                $scope.prikazNaFormaDinamichka = false;

            }
        };


        $scope.zemiNovi = function() {
            console.log("old", $scope.old);
        }






        $scope.getDigit = function(prod) {
            if ($scope.KorisnikPrikazInfo.ProductTypeId != null && $scope.KorisnikPrikazInfo.ProductTypeId != "") {
                if ($scope.KorisnikPrikazInfo.ProductTypeId.substring(3, 5) == prod.ProductTypeID.substring(0, 2)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }

        }


        // //////////////////////////////// Fetch na Products //////////////////////////////////
        //
        //     $scope.GetProducts = function () {
        //       gatewayService.request("/api/Products/1/ProductsFetch", "GET").then(function (data, status, heders, config) {
        //
        //         $scope.products = data;
        //         console.log("Products",$scope.products);
        //
        //       }, function (data, status, headers, config) {
        //         console.log(status);
        //       });
        //
        //     }

        //    $scope.GetProducts();
        $scope.setVisibility = function() {
            $scope.flagVisibilityTabs = true;
            console.log("povikano flag visibility.");
        };



        $scope.user = {
            items: []
        };
        //$scope.prodID - DEFINIRANA VO DIREKTIVATA dirSearchTipVid.js zaradi zemanje na selectirana vrednost i upotreba vo procedura za vlechenje podatoci od baza
        $scope.flag = true;

        $scope.fetchFromBody = function() {
            $scope.flag = false;
        }


        $scope.funkcija = function() {
            //$scope.ListtoSave.push(item.ProductBodyID);
            //console.log("$scope.user.items[i]: ",$scope.user.items[i]);
            for (var i = 0; i < $scope.user.items.length; i++) {
                gatewayService.request("/api/ProductBody/1/admin_baranja_insert?productBodyID=" + $scope.user.items[i] + "&productID=1111", "GET").then(function(data, status, heders, config) {
                    //console.log("uspeshen zapis. ");
                }, function(data, status, headers, config) {
                    console.log(status);
                });
            }
            $route.reload();
            toastr.success('Записот е успешно снимен.');
            $scope.flag = true;
        }

        $scope.proverka = function() {

            gatewayService.request("/api/ProductBody/1/admin_Baranja_Fetch_Inserted", "GET", $scope.prodID).then(function(data, status, heders, config) {

                $scope.user.items = [];

                for (var i = data.length - 1; i >= 0; i--) {
                    $scope.user.items.push(data[i].ProductBodyID);
                }

                console.log("ZEMENO OD BAZA. ", $scope.user.items);
            }, function(data, status, headers, config) {
                console.log(status);
            });

        }

        // TUKA ZA SELECT OD TABELATA   
        $scope.idSelectedVote = null;
        $scope.setSelected = function(idSelectedVote) {
            $scope.idSelectedVote = idSelectedVote;
        };


        $scope.selectedRow = null; // initialize our variable to null
        $scope.setClickedRow = function(index) { //function that sets the value of selectedRow to current index
            $scope.selectedRow = ($scope.selectedRow == index) ? null : index;
            // console.log("this is selected item: ",index);
        };




        $scope.snimiBaranje = function() {
            if ($scope.KorisnikPrikazInfo.korisnichkoIme == null || $scope.KorisnikPrikazInfo.korisnichkoIme == "") {
                toastr.error("Внесете корисничко име!");

            } else {


                if ($scope.KorisnikPrikazInfo.BrBaranje == "") {
                    gatewayService.request("/api/Baranja/1/generateBrojbaranje?OrgDel=000001", "GET").then(function(data, status, heders, config) {

                        $scope.KorisnikPrikazInfo.BrBaranje = data[0].Column1;
                        console.log("broj baranje", $scope.KorisnikPrikazInfo.BrBaranje);
                        $scope.vnesiBaranja();

                    }, function(data, status, headers, config) {
                        console.log(status);
                    });

                } else {
                    $scope.vnesiBaranja();
                }



            }
        }


        $scope.vnesiBaranja = function() {
            console.log('509', $rootScope.x509)
            var cert = $rootScope.x509;
            console.log("Neodobreni", $scope.neodobreni);
            console.log("finalno", $scope.finalno);
            console.log("Site vneseni", $scope.sitevneseni);

            var noviBaranja = [];
            var authData = JSON.parse(localStorage.getItem("loginUser"));
            for (var keyName in $scope.finalno) {
                var key = keyName;
                var value = angular.fromJson($scope.finalno[keyName]);


                console.log("val", value);
                for (var i = 0; i < $scope.neodobreni.length; i++) {
                    if (key.substring(1, 7) == $scope.neodobreni[i].ProductId) {
                        console.log("idneod", $scope.neodobreni[i].Privilegii);
                        console.log("idval", value.Privilegii);
                        if ((value.Privilegii == true && $scope.neodobreni[i].Privilegii == '0') || (value.Privilegii == false && $scope.neodobreni[i].Privilegii == '1')) {
                            console.log("Vleguva tuka");
                            var objNe = {};
                            objNe = $scope.neodobreni[i];
                            console.log("onbj", objNe)
                            if (value.Privilegii == true) {
                                objNe.Privilegii = '1';
                            } else if (value.Privilegii == false) {
                                objNe.Privilegii = '0';
                            }
                            console.log("obj", objNe);
                            gatewayService.request("/api/Baranja/1/ProductTypeBaranjaUpdate", "POST", objNe).then(function(data, status, heders, config) {
                                toastr.success("Барањата се успешно изменети");

                            }, function(data, status, headers, config) {
                                console.log(status);

                            });
                        }


                    }
                }
                var old = false;

                for (var i = 0; i < $scope.sitevneseni.length; i++) {
                    if (key.substring(1, 6) == $scope.sitevneseni[i].ProductId) {
                        var old = true;

                        break;

                    }


                }

                if (old == false) {

                    var obj = {};
                    obj.BrojBaranje = $scope.KorisnikPrikazInfo.BrBaranje;
                    obj.KorisnickoIme = $scope.KorisnikPrikazInfo.korisnichkoIme;
                    obj.DatumInsert = $filter('date')($scope.KorisnikPrikazInfo.DatumInsert, "yyyy-MM-dd HH:mm:ss.sss")
                    obj.EdinstvenBroj = $scope.KorisnikPrikazInfo.EdinstvenBroj;
                    obj.ProductId = key.substring(1, 7);
                    obj.ProductTypeId = $scope.selectiranTip;
                    obj.OrgDel = '000001';
                    obj.Partija = $scope.KorisnikPrikazInfo.Partija;
                    obj.Status_S = "N";
                    obj.DatumBaranje = $filter('date')($scope.KorisnikPrikazInfo.DatumInsert, "yyyy-MM-dd HH:mm:ss.sss");
                    obj.ReferentInsert = authData.username;
                    obj.Email = $scope.finalno['o' + obj.ProductId].Email;
                    if (obj.ProductId == '000003') {
                        console.log("cert", cert)
                            // obj.Sertifikat = $scope.finalno['o' + obj.ProductId].Sertifikat.replace(/[\s]/g, '');
                        if (cert != undefined) {
                            obj.Sertifikat = cert.Thumbprint;
                            obj.NotAfter = cert.NotAfter;
                            obj.NotBefore = cert.NotBefore;
                            obj.X509Certifikate = cert.X509Certifikate;
                            obj.CertificateInfo = 'Issued to: ' + cert.SubjectCN + ";   Issued by: " + cert.IssuerCN + "\nValid from " + $filter('date')(cert.NotBefore, "yyyy-MM-dd HH:mm:ss") + ' to ' + $filter('date')(cert.NotAfter, "yyyy-MM-dd HH:mm:ss");

                        }

                    } else {
                        obj.SeriskiBrojSertifikat = "";
                    }

                    obj.SeriskiBrojSertifikat = "";
                    obj.SertifikatOTP = "";
                    obj.TelefonskiBroj = $scope.finalno['o' + obj.ProductId].TelefonskiBroj;
                    obj.Zabeleska = "";
                    obj.Limit = "";
                    if (obj.ProductTypeId.substring(5, 7) == '01') {
                        obj.StatusBaranje = "Чекање за одобрување";
                    } else {
                        obj.StatusBaranje = "Чекање за укинување";
                    }

                    obj.Privilegii = "1";
                    obj.SeriskiBrojSertifikat = "";
                    obj.ReferentOdobril = "";
                    obj.DatumOdobruvanje = "";
                    obj.BrojDogovor = "";
                    obj.OrgDelUkinuvanje = "";
                    obj.ReferentUkinal = "";
                    obj.DatumUkinuvanje = "";
                    obj.BrojBaranjeZaUkinuvanje = "";


                    noviBaranja.push(obj);
                }


            }

            console.log("Novi", noviBaranja);
            if (noviBaranja.length == 0) {
                $route.reload();

            } else {
                $scope.zaVnesuvanje = {
                    Baranja: noviBaranja,
                    OrgDel: '000001'
                }

                console.log('obj', $scope.zaVnesuvanje);
                gatewayService.request("/api/Baranja/1/vnesiBaranja", "POST", $scope.zaVnesuvanje).then(function(data, status, heders, config) {
                    toastr.success("Барањата се успешно внесени!")
                    $route.reload();

                }, function(data, status, headers, config) {
                    console.log(status);

                });
            }

        }

        $scope.test = function() {
            console.log($scope.user.items);
        };



        $scope.prikazhi = function() {
            ngDialog.open({
                template: 'templateId',
                className: 'ngdialog-theme-default'
            });
        };

        $scope.cancel = function() {
            $route.reload();
        }



        $scope.popUp = function() {
            ngDialog.open({
                template: 'templateId',
                scope: $scope
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



    });