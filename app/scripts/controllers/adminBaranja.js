angular.module('adminBankaFrontendApp')
  .controller('adminBaranjaCtrl', function($scope, gatewayService, $filter, toastr, $route, $rootScope) {

   	$scope.ListtoShow = [];
   	$scope.ListtoSave = [];
  	$scope.ProductToShow = {
  		'ProductBody_ID':'',
  		'ProductID':'',
  	};
    $scope.korisnik=[];

  // $scope.productsBody = [
  //   {id: 1, text: 'guest'},
  //   {id: 2, text: 'user'},
  //   {id: 3, text: 'customer'},
  //   {id: 4, text: 'admin'}
  // ];

  $scope.user = {
    items: []
  };
  //$scope.prodID - 	DEFINIRANA VO DIREKTIVATA dirSearchTipVid.js zaradi zemanje na selectirana vrednost i upotreba vo procedura za vlechenje podatoci od baza  
  $scope.flag = true;
  $scope.fetchFromBody = function(){
 	$scope.flag = false;
  }	


  $scope.funkcija = function(){
  	 //$scope.ListtoSave.push(item.ProductBodyID);  
  	//console.log("$scope.user.items[i]: ",$scope.user.items[i]);
	for(var i = 0 ; i < $scope.user.items.length; i++){
		gatewayService.request("/api/ProductBody/1/admin_baranja_insert?productBodyID="+$scope.user.items[i]+"&productID=1111", "GET").then(function (data, status, heders, config) {
          //console.log("uspeshen zapis. ");
        }, function (data, status, headers, config) {
             console.log(status);
     });		
	}  	
  		$route.reload();
        toastr.success('Записот е успешно снимен.');
        $scope.flag = true;
  }

  $scope.proverka = function(){
  		//console.log("PRED DA ZEME OD BAZA: ",$scope.user.items);
  		//console.log("product ID: ",$scope.user.items);
  		gatewayService.request("/api/ProductBody/1/admin_Baranja_Fetch_Inserted", "GET", $scope.prodID).then(function (data, status, heders, config) {
         
		$scope.user.items = [];

        for (var i = data.length - 1; i >= 0; i--) {
			$scope.user.items.push(data[i].ProductBodyID);
		}

		console.log("ZEMENO OD BAZA. ",$scope.user.items);
        }, function (data, status, headers, config) {
             console.log(status);
     	});

  }

  $scope.zemiPodatociPo_EMBG = function(embg){

      console.log("vlezeno vo proverka embg printa korisnik ",$scope.korisnik);
      gatewayService.request("/api/Baranja/1/EbankingFetchZaKomitent?EdinstvenBroj="+embg, "GET").then(function (data, status, heders, config) {
        console.log("data: ",data);
        console.log(" KorisnickoIme: ",data.Table[0].KorisnickoIme );
        $scope.korisnik.korisnichkoIme = data.Table[0].KorisnickoIme;
        $scope.korisnik.datum = $filter('date')(new Date(),"yyyy-MM-dd"); 

      }, function (data, status, headers, config) {
        console.log(status);
      });


  }


  $scope.test = function () {
  	   console.log($scope.user.items);
  }


  });