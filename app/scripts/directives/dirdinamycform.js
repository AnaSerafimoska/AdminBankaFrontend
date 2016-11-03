'use strict';

/**
 * @ngdoc directive
 * @name adminBankaFrontendApp.directive:dirDinamycForm
 * @description
 * # dirDinamycForm
 */
angular.module('adminBankaFrontendApp')
    .directive('dirDinamycForm', function() {
        return {
            templateUrl: "/views/generateFormDir.html",
            restrict: 'E',
            //   replace: false,
            // template: '<div><label class="control-label">Value{{value}}</label>',
            scope: {
                value: '=',
                obj: '=ngModel',
                type: '=',
                desc: '=',
                disableall: '='
            },
            controller: function($scope, gatewayService, $filter, toastr, ngDialog, $route, $translate, utility, $q, $http, $rootScope) {

                    var niza = [];
                    var i = 0;

                    var output;
                    $scope.temp = {};

                    $scope.pom = [];

                    $scope.pom = [];

                    //console.log("ovde vo kontroler: ",$scope.prodID);

                    $scope.productBodyFetch = function() {
                        gatewayService.request("/api/ProductBody/1/ProductBodyFetchByIdType?ProductTypeID=" + $scope.type + "&ProductID=" + $scope.value, "GET").then(function(data, status, heders, config) {
                            $scope.productbody = data;


                        }, function(data, status, headers, config) {
                            console.log(status);
                        });
                    }

                    $scope.arrayBufferToString = function(buffer) {
                        var binary = '';
                        var bytes = new Uint8Array(buffer);
                        var len = bytes.byteLength;
                        for (var i = 0; i < len; i++) {
                            binary += String.fromCharCode(bytes[i]);
                        }
                        return binary;
                    }

                    $scope.readFile = function(file) {
                        console.log("Hiii")
                        var reader = new FileReader();

                        console.log("Read", file.files[0]);
                        var cert = file.files[0];
                        reader.readAsArrayBuffer(cert);
                        console.log("Reader", reader);

                        reader.onload = function(e) {

                            var arrayBuffer = e.target.result;
                            var array = new Uint8Array(arrayBuffer);
                            console.log("array", array);


                            var binaryString = String.fromCharCode.apply(null, array);

                            console.log(binaryString);

                            var contents = e.target.result;
                            console.log("contents", contents);


                            var pkcs12Der = $scope.arrayBufferToString(contents)
                            console.log("pkcs", pkcs12Der)

                            var pkcs12B64 = forge.util.encode64(pkcs12Der);
                            console.log("pkcs1", pkcs12B64)

                            var pkcs12Asn1 = forge.asn1.fromDer(pkcs12Der);
                            console.log("pkcs12Asn1", pkcs12Asn1)

                            var b64 = forge.util.binary.base64.encode(new Uint8Array(e.target.result));
                            console.log("b64", b64)


                            var p12Der = forge.util.binary.raw.encode(new Uint8Array(e.target.result));
                            console.log("p12Der", p12Der)

                            $scope.certificate = {
                                X509Certifikate: b64
                            };
                            console.log("cert", $scope.certificate);


                            gatewayService.request("/api/Baranja/1/readCert", "POST", $scope.certificate).then(function(data, status, heders, config) {

                                    var x509 = data;
                                    console.log("x509", x509);
                                    $rootScope.x509 = x509;

                                },
                                function(data, status, headers, config) {
                                    console.log(status);
                                });

                            // var pkcs12 = forge.pkcs12.pkcs12FromAsn1(pkcs12Asn1, "test1111");
                            // console.log("pkcs12", pkcs12);

                            // var asn1 = forge.pki.certificateToAsn1(contents);
                            // console.log("test", asn1);
                            // var cert_simpl = new org.pkijs.simpl.CERT({
                            //     schema: asn1.result
                            // });

                            // console.log("test", cert_simpl);


                            // var pkcs12DerDecode = forge.util.decode64(pkcs12B64);
                            // console.log("pkcs12DerDecode", pkcs12DerDecode);

                            // var pkcs12Asn1 = forge.asn1.fromDer(pkcs12DerDecode);
                            // var publicKey = forge.pki.publicKeyFromAsn1(pkcs12Asn1);


                            //   var p12Der = forge.util.decode64(pkcs12B64);
                            //   var p12Asn1 = forge.asn1.fromDer(p12Der);
                            //  console.log("p12Asn1", p12Asn1)
                            // var p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, 'password');
                            // console.log("p12", p12)

                            // var pkcs12Asn1 = forge.asn1.fromDer(pkcs12DerDecode);
                            // var pkcs12 = forge.pkcs12.pkcs12FromAsn1(pkcs12Asn1);
                            // var keyBags = p12.getBags({
                            //     bagType: forge.pki.oids.pkcs8ShroudedKeyBag
                            // });
                            // var bag = keyBags[forge.pki.oids.pkcs8ShroudedKeyBag][0];
                            // var privateKey = bag.key;
                        }

                    }


                    $scope.checkIsDisabled = function(item, disableall) {

                        if (disableall) {


                            return true;
                        } else {
                            var key = 'o'
                            key += item.$parent.$parent.value;
                            if (item.$parent.$parent.obj[key] != undefined) {

                                if (item.$parent.$parent.obj[key].isDisabled == true) {
                                    return true
                                } else {
                                    return false;
                                }
                            }
                        }

                    }


                    $scope.productBodyFetch();
                    $route.temp = $scope.temp;


                    $scope.fillDropdown = function() {


                        var arr = [];

                        for (var a = 0; a < $scope.productbody.length; ++a) {
                            if ($scope.productbody[a].FieldType == "Dropdown") {

                                arr.push($http.get("http://10.55.55.28" + $scope.productbody[a].FillApi));
                            } else {
                                arr.push(null);
                            }
                        }

                        $q.all(arr).then(function(ret) {

                            for (var a = 0; a < $scope.productbody.length; ++a) {
                                if ($scope.productbody[a].FieldType == "Dropdown") {
                                    $scope.productbody[a].ControlType = ret[a].data;

                                }
                            }

                        });


                    }

                    //   $scope.fillDropdown();
                    $scope.submit = function(api) {

                        angular.forEach($scope.pom, function(key) {

                            var tmpvalue = $filter('date')($scope.temp[key], "yyyy-MM-dd");

                            $scope.temp[key] = tmpvalue;

                            //  this[key][value]=(key + ': ' +    $filter('date')(   value, "yyyy-MM-dd"));


                        });
                        $scope.temp.ProductID = $rootScope.selectedValue.Spoeni_VidTipRabota;

                        gatewayService.request(api, "POST", $scope.temp).then(function(data, status, heders, config) {

                        }, function(data, status, headers, config) {
                            console.log(status);
                        });

                        $route.reload();
                        // console.log("root",$rootScope.selectedValue);
                        //  console.log($scope.temp);

                    }


                    $scope.filter = function(key) {

                        $scope.pom.push(key);

                    }


                }
                // link: function postLink(scope, element, attrs) {
                //   element.text('this is the generateForm directive');
                //  console.log("obj",$scope.value);
                //  }
        };
    });