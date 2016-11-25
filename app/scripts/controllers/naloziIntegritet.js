'use strict';

/**
 * @ngdoc function
 * @name adminBankaFrontendApp.controller:CryptoCtrl
 * @description
 * # CryptoCtrl
 * Controller of the adminBankaFrontendApp
 */

angular.module('adminBankaFrontendApp')
    .controller('NaloziintegritetCtrl', function($scope, $rootScope, $location, $translate, ngDialog, gatewayService, $filter) {

        $scope.NalogInfo = {};
        $scope.Nalozi = {
            Partija: ""
        };
        $scope.result = [];
        $scope.result_nalozi = [];
        $scope.result_razliki_integ = [];

        $scope.Nalog = {};
        $scope.brnalog = "";

        $scope.init = function() {
            $scope.Nalozi.OpeningDate = new Date();
            $scope.Nalozi.ClosingDate = new Date();
        }


        $scope.nalogpopup = function(nalogtip, brojnalog) {

            $scope.brnalog = brojnalog;

            var fetchNlg = $scope.result;
            var integritet;

            for (var i = 0; i < fetchNlg.NalogDetali.length; i++) {
                var brNal = fetchNlg.NalogDetali[i].BrojNalog;
                if (brNal == brojnalog) {
                    $scope.result_nalozi = fetchNlg.NalogDetali[i];
                    integritet = fetchNlg.NalogDetali[i].Integritet;
                    if (integritet == "1") {
                        for (var k = 0; k < fetchNlg.Razliki.length; k++) {
                            var br_nal = fetchNlg.Razliki[k].BrojNalog;
                            if (br_nal == brojnalog) {
                                $scope.result_razliki_integ = fetchNlg.Razliki[k];
                            }
                        }
                    } else {
                        $scope.result_razliki_integ = null;
                    }
                    //	console.log(brNal + " - " + i);
                }

            }

            $scope.showDialog(nalogtip);

            // ngDialog.open({
            // 	template: '../../views/'+nalogtip+'.html'
            // });


        }

        $scope.switchKey = function(naziv) {
            switch (naziv) {
                case 'NazivKorist':
                    return 'Назив на примач';
                    break;
                case 'DatumValuta':
                    return 'Датум валута';
                    break;
                case 'DatumNalog':
                    return 'Датум налог';
                    break;
                case 'ZiroTeret':
                    return 'Трансакциска сметка на налогодавач';
                    break;
                case 'NazivTeret':
                    return 'Назив на налогодавач';
                    break;

                case 'AdresaTeret':
                    return 'Адреса на налогодавач';
                    break;

                case 'ImeBankaTeret':
                    return 'Банка на налогодавач';
                    break;
                case 'CelDoznaka':
                    return 'Цел на дознака';
                    break;
                case 'PovikuvanjeBrojKorist':
                    return 'Повикување на број (Одобрување)';
                    break;
                case 'SifraPlakanje':
                    return 'Шифра плаќање';
                    break;
                case 'PovikuvanjeBrojTeret':
                    return 'Повикување на број (Задолжување)';
                    break;
                case 'PovikuvanjeBrojKorist':
                    return 'Повикување на број (Одобрување)';
                    break;
                case 'AdresaKorist':
                    return 'Седиште на примач';
                    break;
                case 'Iznos':
                    return 'Износ';
                    break;
                default:
                    return naziv;
                    break;
            }
        }

        $scope.checkFilter = function() {
            var filter_opt = $scope.Nalozi.Radio;

            if (filter_opt == 1) {
                return true;
            } else {
                return false;
            }
        }

        $scope.showDialog = function(nalogtip) {
            ngDialog.open({
                template: '../../views/' + nalogtip + '.html',
                scope: $scope
            });
        }

        $scope.FetchNalozi = function() {

            var item = {};
            item.Partija = $scope.Nalozi.Partija;
            item.OpeningDate = $filter('date')($scope.Nalozi.OpeningDate, "yyyyMMdd");
            item.ClosingDate = $filter('date')($scope.Nalozi.ClosingDate, "yyyyMMdd");
            gatewayService.request("/api/NaloziIntegritet/1/Test?Partija=" + item.Partija + "&DatumOd=" + item.OpeningDate + "&DatumDo=" + item.ClosingDate, "GET").then(function(data, status, heders, config) {
                $scope.result = data;
                //

                var obj = data;
                var nalozi = [];
                /*
        var filter_option = $scope.Nalozi.Radio;

        if(filter_option == "0"){
        	
        	console.log($scope.result);
        }else{
        	for(var i=0;i<data.NalogDetali.length;i++){
        		var integr = data.NalogDetali[i].Integritet;
        		if(integr == "1"){
        			$scope.result = data.NalogDetali[i];
        			//nalozi[cnt] = data.NalogDetali[i];
        			//cnt++;
        		}
        	}
        	//$scope.result = nalozi;
        	console.log($scope.result);
        }
		*/
                /*
        for(var i=0;i<obj.NalogDetali.length;i++){
        	for(var temp in obj.NalogDetali[i]){
	      		var integ = obj.NalogDetali[i][temp];
	      		if(temp.localeCompare("Integritet") == 0){
	      			console.log(obj.NalogDetali[i][temp]);
	      		}
	      	}
	      }
		*/



                //console.log(obj[Object.keys(obj)[0]]);

            }, function(data, status, headers, config) {
                console.log(status);
            });

        }

    });