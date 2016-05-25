'use strict';

/**
 * @ngdoc directive
 * @name adminBankaFrontendApp.directive:forma
 * @description
 * # forma
 */
angular.module('adminBankaFrontendApp')
  .directive('searchVidTip', function () {
    return {
      templateUrl: "/views/dirSearchTipVidCustomize.html",
      restrict: 'E',
      controller: function($scope,gatewayService, $rootScope){

      	$scope.Products=[];
      	$scope.productsBody=[];
        $scope.prodID='huhu';
        $rootScope.opis="";

      	$scope.sendConcatenatedIDs = function(seelectItem){
 			    gatewayService.request("/api/FormCreating/1/getProductBodyByProductTypeIdAndProductIDConcatenatedIDs?ConcatID="+seelectedItem.Spoeni_VidTipRabota, "GET").then(function (data, status, heders, config) {
				  $scope.productsBody = data;
       // console.log($scope.productsBody);
            $scope.spoeni = seelectedItem.Spoeni_VidTipRabota.substring(0,8);
            $scope.tip = seelectedItem.Spoeni_VidTipRabota.substring(0,2);
            $scope.vid= seelectedItem.Spoeni_VidTipRabota.substring(2,8);
            $rootScope.opis= seelectedItem.Description;
         console.log("ovde vo kontroler: ",$rootScope.opis);
     		}, function (data, status, headers, config) {
        		//console.log(status);
      		});
		}


      	$scope.fetchProducts_searchByType = function(){
 			gatewayService.request("/api/FormCreating/1/getProductTypeByProductTypeIdAndProductIDConcatenatedIDs", "GET").then(function (data, status, heders, config) {
				$scope.Products = data;
        		//console.log("ova e toa: ",$scope.Products);
     		}, function (data, status, headers, config) {
        		//console.log(status);
      		});
		}



      }//------------------  end of controller
    };
  });
