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
      controller: function($scope,gatewayService){
      	
      	$scope.Products=[];
      	$scope.productsBody=[];
      	
      	$scope.sendConcatenatedIDs = function(seelectedItem){
 			gatewayService.request("/api/FormCreating/1/getProductBodyByProductTypeIdAndProductIDConcatenatedIDs?ConcatID="+seelectedItem.Spoeni_VidTipRabota, "GET").then(function (data, status, heders, config) {
				$scope.productsBody = data;
        		$scope.prodID = seelectedItem.Spoeni_VidTipRabota.substring(2,6);
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
