/**
 * Created by Moki on 4/11/2016.
 */
'use strict';
angular.module('adminBankaFrontendApp')
    .controller('TipRabotaCreate', function($scope, gatewayService, $filter, toastr, $route, $rootScope, $location) {

        $scope.productTypes = [];


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

        if (!$scope.hasPermission('tip-rabota')) {
            $location.path('/');
        };



        $scope.flag = false;
        $scope.flag1 = false;
        $scope.blokirajIzmeni = false;
        $scope.StatusZaDatumZatvoranje = "";
        $scope.Products = {
            'ProductTypeID': null,
            "Description": null,
            "WorkingTable": null,
            "Status": true,
            "OpeningDate": null,
            "ClosingDate": null

        };
        $scope.iminjaTabeliOdBaza = [];
        $scope.onSelectUI_validation = true;
        var PID = null;
        var ProduktTip = '';


        $scope.init = function() {
            $scope.Products.OpeningDate = new Date();
        }

        $scope.tblNameChange = function() {
            $scope.tblName = 'ProducTypes'
        }



        $scope.ProductTypes = function() {
            gatewayService.request("/api/ProductTypes/1/ProductTypesFetch", "GET").then(function(data, status, heders, config) {

                $scope.productTypes = data;

            }, function(data, status, headers, config) {
                console.log(status);
            });

        }

        $scope.ProductTypes();



        $scope.submit = function(Prod) {

            var fullDate1 = $filter('date')($scope.Products.ClosingDate, "yyyy-MM-dd");
            var fullDate2 = $filter('date')($scope.Products.OpeningDate, "yyyy-MM-dd");
            Prod.ClosingDate = fullDate1;
            Prod.OpeningDate = fullDate2;

            if ($scope.Products.Status == true) {
                $scope.Products.Status = '1';
            } else {
                $scope.Products.Status = '0';
            }

            if ($scope.form.$valid) {
                ProduktTip += $scope.Products.WorkingTable;
                $scope.Products.WorkingTable = ProduktTip;

                gatewayService.request("/api/ProductTypes/1/ProductTypesInsert", "POST", Prod).then(function(data, status, heders, config) {
                    $route.reload();
                    toastr.success($filter('translate')('lblDbSuccess_pt'));
                }, function(data, status, headers, config) {
                    console.log(status);
                    toastr.warning($filter('translate')('lblDbError_pt'));

                });

            }

            ProduktTip = "";

        }

        // SUBMIT OD EDIT
        $scope.zachuvaj = function(Prod) {
            var fullDate1 = $filter('date')(Prod.ClosingDate, "yyyy-MM-dd");
            var fullDate2 = $filter('date')(Prod.OpeningDate, "yyyy-MM-dd");
            Prod.ClosingDate = fullDate1;
            Prod.OpeningDate = fullDate2;

            if (Prod.Status == true) {
                Prod.Status = '1';
            } else {
                Prod.Status = '0';
            }

            ProduktTip += $scope.Products.WorkingTable;
            $scope.Products.WorkingTable = ProduktTip;

            gatewayService.request("/api/ProductTypes/1/ProductTypesUpdate", "PUT", Prod).then(function(data, status, heders, config) {
                $route.reload();
                toastr.success($filter('translate')('lblDbSuccessEdit_pt'));
            }, function(data, status, headers, config) {
                console.log(status);
                toastr.warning($filter('translate')('lblDbError_pt'));

            });


            ProduktTip = "";

        }


        $scope.close = function() {
            $scope.blokirajIzmeni = false;
            $route.reload();
        }

        $scope.sort = function(keyname) {
            $scope.sortKey = keyname;
            $scope.reverse = !$scope.reverse;
            $scope.verify = !$scope.verify;

        }


        // PROVERKA DALI TOJ TIP RABOTA GO IMA VEKJE VO BAZA 
        $scope.checkTipInDb = function(prodWeSearchWith) {

            gatewayService.request("/api/ProductTypes/1/FetchProductTypes_ByProductTypeId?productTypeID=" + prodWeSearchWith, "GET").then(function(data, status, heders, config) {

                if ($scope.isEmpty(data) != true) {
                    toastr.error($filter('translate')('lblTipExist_pt'));
                    $scope.flag = true;
                } else {
                    $scope.flag = false;
                }

            }, function(data, status, headers, config) {
                //console.log("greshka: ",status);
            });

        }


        // PROVERKA VO EDIT DALI TOJ TIP RABOTA GO IMA VEKJE VO BAZA 
        $scope.checkTipInDbEdit = function(prodWeSearchWith) {
            console.log("vleguva vo edit ");
            gatewayService.request("/api/ProductTypes/1/FetchProductTypes_ByProductTypeId?productTypeID=" + prodWeSearchWith, "GET").then(function(data, status, heders, config) {

                if ($scope.isEmpty(data) != true) {
                    toastr.error($filter('translate')('lblTipExist_pt'));
                    $scope.flag1 = true;
                } else {
                    $scope.flag1 = false;
                }

            }, function(data, status, headers, config) {
                //console.log("greshka: ",status);
            });

        }



        $scope.izmeni = function(ob) {
            PID = ob.ProductTypeID;
            if (ob.Status == "1") {
                ob.Status = true;
            } else {
                ob.Status = false;
            }
            $scope.blokirajIzmeni = true;
        }



        // FUNKCIJA KOJA PROVERUVA DALI OBJEKTOT E PRAZEN 
        $scope.isEmpty = function(obj) {


            if (obj == null) return true;

            if (obj.length > 0) return false;
            if (obj.length === 0) return true;


            for (var key in obj) {
                if (hasOwnProperty.call(obj, key)) return false;
            }

            return true;
        }

        // PROVERKA ZA ERROR POP UP
        $scope.checkTip = function() {
            if ($scope.Products.ProductTypeID == null) {
                toastr.error($filter('translate')('lblTipError_pt'));
            }
        }

        $scope.checkOpis = function() {
            if ($scope.Products.Description == null) {
                toastr.error($filter('translate')('lblOpisError_pt'));
            }
        }

        $scope.checkWTable = function() {
            if ($scope.Products.WorkingTable == null) {
                toastr.error($filter('translate')('lblWTableError_pt'));
            }
        }


        $scope.checkTipEdit = function(tip) {
            if (tip == null) {
                toastr.error($filter('translate')('lblTipError_pt'));
            }
        }

        $scope.checkOpisEdit = function(opis) {
            if (opis == null) {
                toastr.error($filter('translate')('lblOpisError_pt'));
            }
        }

        $scope.checkWTableEdit = function(wtable) {
            if (wtable == null) {
                toastr.error($filter('translate')('lblWTableError_pt'));
            }
        }

        $scope.reset = function() {
            $scope.Products.OpenningDate = new Date();
            $scope.Products.ClosingDate = null;
            $scope.Products.Description = null;
            $scope.Products.WorkingTable = null;
            $scope.Products.ProductTypeID = null;
            $scope.Products.chkStatus = false;

        }



        $scope.showEditRow = function(r) {
            if ($scope.active != r) {
                $scope.active = r;
            } else {
                $scope.active = null;
            }
            console.log("active: ", $scope.active);
        };

        $scope.setirajDatumZatvaranje = function(item, status) {
            if (status == true) {
                item['ClosingDate'] = "";
            } else if (status == false) {

                item['ClosingDate'] = new Date();
            }
        };


        $scope.fetchTableNames = function() {
            gatewayService.request("/api/Baranja/1/admin_bank_Fetch_Table_Names", "GET").then(function(data, status, heders, config) {
                $scope.iminjaTabeliOdBaza = data;

            }, function(data, status, headers, config) {
                console.log(status);

            });
        };


        $scope.onSelectUIvalidation = function() {
            $scope.onSelectUI_validation = false;

        };


    });