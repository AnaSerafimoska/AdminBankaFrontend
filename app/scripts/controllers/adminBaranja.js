angular.module('adminBankaFrontendApp')
  .controller('adminBaranjaCtrl', function($scope, gatewayService, $filter, toastr, $route, $rootScope, ngDialog) {
$scope.loading = true;

   	$scope.ListtoShow = [];
   	$scope.ListtoSave = [];
  	$scope.ProductToShow = {
  		'ProductBody_ID':'',
  		'ProductID':'',
  	};
    $scope.tabsTSM = [];
    $scope.korisnik=[];
    $scope.flagVisibilityTabs = false;
    $scope.prikazNaFormaDinamichka = false;
    $scope.SmetkaVidAplikacija="";
    $scope.SifrarnikVidAplikacija="";
    $scope.tab = 1;
    $scope.TmpPodatoci={};
    $scope.KorisnikPrikazInfo={};
    $scope.korisnikSmetka = {};
    $scope.productsBodyNew =[];
    $scope.Flag_Prikazhi = true;
    $scope.korisnik.FlagDisableSnimi = true;
    $scope.valueA = 'AA';

    $scope.setTab = function(newTab){
      //console.log("set tab: ",newTab);
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum){
      //console.log("tab num: ",tabNum);
      return $scope.tab === tabNum;
    };


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


//////////////////////////// TUKA SE ZEMAAT PODATOCITE ZA PRIKAZ VO TABOVITE  ///////////////////////////////////////////////////////////////////////////////////////

    $scope.previewForEdit = function(item){
        console.log("this is the item: ",item);
        $scope.productbody=item;
        $scope.prikazNaFormaDinamichka = true;
        gatewayService.request("/api/Baranja/1/fetchPrivilegiiZaSmetka?EdinstvenBroj=" + item.EdinstvenBroj + "&Banka=" + item.Banka + "&OrgDel=" + item.OrgDel + "&ProductID=" + item.ProductID+ "&ProductTypeID=" + item.ProductTypeID + "&Partija="+item.Partija, "GET").then(function (data, status, heders, config) {
        console.log("Vrateni po datoci so PRIVILEGII: " ,data);
        console.log("red od Forma fo BARANJA.js",$rootScope.productbody)

        }, function (data, status, headers, config) {
          console.log(status);
        });
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  //////////////////////////////// Fetch na ProductTypes //////////////////////////////////

    $scope.ProductTypes = function () {
      gatewayService.request("/api/ProductTypes/1/ProductTypesFetch", "GET").then(function (data, status, heders, config) {
       //  console.log("data" ,data);
        $scope.productTypes = data;

      }, function (data, status, headers, config) {
        console.log(status);
      });
    }

    $scope.ProductTypes();

    $scope.getDigit = function(prod){
      if($scope.KorisnikPrikazInfo.ProductId.substring(3,5) == prod.ProductTypeID.substring(0,2))
        {
          return true;
        }
      else{return false;}

    }


//////////////////////////////// Fetch na Products //////////////////////////////////

    $scope.GetProducts = function () {
      gatewayService.request("/api/Products/1/ProductsFetch", "GET").then(function (data, status, heders, config) {
        
        $scope.products = data;

      }, function (data, status, headers, config) {
        console.log(status);
      });

    }

    $scope.GetProducts();
    $scope.setVisibility = function(){
      $scope.flagVisibilityTabs = true;
    };

  

  $scope.user = {
    items: []
  };
  //$scope.prodID - DEFINIRANA VO DIREKTIVATA dirSearchTipVid.js zaradi zemanje na selectirana vrednost i upotreba vo procedura za vlechenje podatoci od baza
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

////////////////////////  TUKA ZA SELECT OD TABELATA   ///////////////////
$scope.idSelectedVote = null;
$scope.setSelected = function (idSelectedVote) {
  console.log("this is selected item: ",idSelectedVote);
   $scope.idSelectedVote = idSelectedVote;
};


    $scope.selectedRow = null;  // initialize our variable to null
    $scope.setClickedRow = function(index){  //function that sets the value of selectedRow to current index
      $scope.selectedRow = ($scope.selectedRow == index) ? null : index;
      console.log("this is selected item: ",index);
    };


////////////////////////  PODATOCI ZA IDENTIFIKACIJA NA KORISNIK PO EMBG   ///////////////////
  $scope.zemiPodatociPo_EMBG = function(embg){

     // console.log("vlezeno vo proverka embg printa korisnik ",$scope.korisnik);
      gatewayService.request("/api/Baranja/1/EbankingFetchZaKomitent?EdinstvenBroj="+embg, "GET").then(function (data, status, heders, config) {
        console.log("tuka: ",data);
        $scope.korisnik.korisnichkoIme = data.Table[0].KorisnickoIme;
        $scope.korisnik.BrBaranje = data.Table[0].BrBaranje;
        $scope.KorisnikPrikazInfo.BrojBaranje = data.Table[0].BrBaranje;
        
        $scope.KorisnikPrikazInfo.EMBG = $scope.korisnik.embg;
        $scope.KorisnikPrikazInfo.DatumBaranje="2016-05-31";
        
        //console.log("broj na baranje: ",$scope.korisnik.BrBaranje);
        $scope.korisnik.datum = $filter('date')(new Date(),"yyyy-MM-dd");
        $scope.KorisnikPrikazInfo.DatumInsert = $scope.korisnik.datum;

        polniTabela(); /// povik do proceduri od core za polnenje tabela
      }, function (data, status, headers, config) {
        console.log(status);
      });
  };


  ////////////////////////  LICNI PODATOCI OD CORE ZA KORISNIK PO EMBG   ///////////////////
  $scope.zemiPodatoci_CORE = function(embg){
      gatewayService.request("/api/Baranja/1/FetchPersonalInfo_CORE?EdinstvenBroj="+embg, "GET").then(function (data, status, heders, config) {
         console.log("LICHNI PODATOCI: ",data);
         $scope.KorisnikPrikazInfo.TelefonskiBroj = data.Table[0]['Mobilen'];
         $scope.KorisnikPrikazInfo.BrLicnaKarta = data.Table[0]['BrLicnaKarta'];
         $scope.KorisnikPrikazInfo.Adresa = data.Table[0]['Adresa'];
      }, function (data, status, headers, config) {
        console.log(status);
      });
  };


 ////////////////////////  TUKA SE POLNI TABELATA SO SMETKI   ///////////////////
  function polniTabela(){
    $scope.loading = true;
    $scope.temp=[];
        gatewayService.request("/api/Baranja/1/EbankingKorisniciServisFetch?EdinstvenBroj="+$scope.korisnik.embg, "GET").then(function (data, status, heders, config) {
        console.log("ZA PRIKAZ VO TABELA: ",data);

        $scope.TmpPodatoci = data;
        $scope.temp = data;
        $scope.loading = false;

       // $scope.SmetkaVidAplikacija = data.Table[0]['VidAplikacija'];
      }, function (data, status, headers, config) {
        console.log(status);
      });

        

  };

  ///////////////  SNIMANJE NA BARANJE ////////////////////////////////////
  $scope.snimiBaranje = function(){
        $scope.KorisnikPrikazInfo.KorisnickoIme = $scope.korisnik.korisnichkoIme;

        if($scope.korisnik.korisnichkoIme == "" || $scope.korisnik.korisnichkoIme == null){
          console.log("korisnicko ime e prazno");
          toastr.warning("Внесете корисничко име.");
        }

        $scope.KorisnikPrikazInfo.ReferentInsert="1";
        $scope.KorisnikPrikazInfo.OrgDel = "4444";
        $scope.KorisnikPrikazInfo.Status_S ="";
        $scope.KorisnikPrikazInfo.Email = "";
        $scope.KorisnikPrikazInfo.SeriskiBrojSertifikat="";
        $scope.KorisnikPrikazInfo.Sertifikat = "";
        $scope.KorisnikPrikazInfo.Zabeleshka="";
        $scope.KorisnikPrikazInfo.Limit = "";
        $scope.KorisnikPrikazInfo.StatusBaranje = "";
        $scope.KorisnikPrikazInfo.Email_Adresa="";
        $scope.KorisnikPrikazInfo.Pregled_izveshtai="";
        $scope.KorisnikPrikazInfo.Pregled_nalozi = "";
        $scope.KorisnikPrikazInfo.Vnesuvanje_nalozi = "";
        $scope.KorisnikPrikazInfo.Prakjanje_nalozi = "";
        $scope.KorisnikPrikazInfo.Potpishuvanje_nalozi = "";
        $scope.KorisnikPrikazInfo.Pregled_na_izveshtai_depoziti = "";
        $scope.KorisnikPrikazInfo.Pregled_na_izveshtai_krediti = "";
        $scope.KorisnikPrikazInfo.Pregled_na_izveshtai_kartichki = "";

        gatewayService.request("/api/Baranja/1/ProductTypeBaranja_Insert", "POST", $scope.KorisnikPrikazInfo).then(function (data, status, heders, config) {
          //$route.reload();
          toastr.success("Успешно внесено барање.");
        }, function (data, status, headers, config) {
             console.log(status);
             toastr.error("Погрешен внес.");

        });

      console.log("baranje za korisnik:",$scope.KorisnikPrikazInfo);
  }



  $scope.test = function () {
  	   console.log($scope.user.items);
  };

  $scope.zemiSelektiranTipNaProdukt = function(item){
      $scope.selektiranTip = item;
      $scope.KorisnikPrikazInfo.ProductId = item;

  };

  $scope.prikazhi = function(){
    ngDialog.open({ template: 'templateId', className: 'ngdialog-theme-default' });
  };

  $scope.setFlagToPrikazhi = function(){
    if($scope.korisnik.embg != null && $scope.form.$valid){
      $scope.Flag_Prikazhi = false;
    }
    else{
      toastr.error("Внесете единствен број.");
    }
  };


    $scope.products={};
    $scope.showDir=false;
    //Fetch na site vidovi rabota
    $scope.productsFetch=function (selektiranTip) {
      gatewayService.request("/api/Products/1/ProductsFetchByProductType?ProductTypeID="+selektiranTip, "GET").then(function (data, status, heders, config) {
        $scope.products=data;
        console.log("data",data);
        $scope.showDir=true;
        // for(var i=0;i<$scope.products.length;i++)
        // {
        //   $scope.productID=$scope.products[i].ProductID;
        // //  console.log( $scope.productID);
        // }
      }, function (data, status, headers, config) {
        console.log(status);
      });
    }

});
