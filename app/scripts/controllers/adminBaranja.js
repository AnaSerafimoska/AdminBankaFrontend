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
<<<<<<< HEAD
    $scope.Flag_Prikazhi = true;
    $scope.korisnik.FlagDisableSnimi = true;
=======
    $scope.valueA = 'AA';

>>>>>>> refs/remotes/origin/master
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
       // $scope.KorisnikPrikazInfo.Partija = item['Партија'];

        /// PREVZEMANJE PODATOCI OD KOGA KJE SE KLIKNE NA SMETKA ///
        gatewayService.request("/api/Baranja/1/Fetch_By_VidAplikacija_From_Sifrarnik?VidAplikacija="+item["VidAplikacija"], "GET").then(function (data, status, heders, config) {
                console.log("PODATOCI PREVZEMENI PO VID APPLIKACIJA:  ", data);
               $scope.korisnikSmetka.ProductTypeID = data.Table[0]['ProductTypeID'];
              $scope.KorisnikPrikazInfo.ProductTypeID = data.Table[0]['ProductTypeID'];
               /// PREVZEMANJE PODATOCI ZA PRIKAZ NA DINAMICHKA FORMA DOLU VO BARANJA ///
               gatewayService.request("/api/Baranja/1/ProductBodyFetchByProductTypeID?productTypeID="+$scope.korisnikSmetka.ProductTypeID, "GET").then(function (data, status, heders, config) {
                  console.log("PODATOCI PREVZEMENI PO PRODUCT BODY PO SELEKTIRANA SMETKA ZA DINAMICHKO KREIRANJE FORMA:  ", data);
                  $scope.productsBodyNew = data;
                  }, function (data, status, headers, config) {
                   console.log(status);
                  });
              }, function (data, status, headers, config) {
                   console.log(status);
           });
          /// END NA PREVZEMANJE PODATOCI OD KOGA KJE SE KLIKNE NA SMETKA ///

        if( item["VidAplikacija"] == "DPP"){
           //console.log("vlezeno vo DPP");
        }

        else if( item["VidAplikacija"] == "" || item["VidAplikacija"]=="PLP" ){
            //console.log("vlezeno vo TRANSAKCISKI");
            gatewayService.request("/api/ProductBody/1/ProductBodyFetchByIdType?ProductTypeID=00&ProductID=000003", "GET").then(function (data, status, heders, config) {
                //console.log("uspeshno od baza povlecheni za select na red od tabela:  ", data);
                $scope.tabsTSM = data;
                $scope.productsBody = data;
              }, function (data, status, headers, config) {
                   console.log(status);
           });
        }

        else if( item["VidAplikacija"] == "CM" || item["VidAplikacija"]=="CMS" ){
            //console.log("kreditni kartichki");
        }
        else if(item["VidAplikacija"] == "KR"){
            //console.log("kredit");
        }
        else{}

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
        $scope.temp=[];
        gatewayService.request("/api/Baranja/1/EbankingKorisniciServisFetch?EdinstvenBroj="+$scope.korisnik.embg, "GET").then(function (data, status, heders, config) {
        console.log("ZA PRIKAZ VO TABELA: ",data);
        $scope.TmpPodatoci = data;

        $scope.temp = data;
        //$scope.KorisnikPrikazInfo.ImePrezime = data.Table[0]['Име и презиме'];
        // console.log("Ime prezime: ", data.Table[0]['Име и презиме']);

        $scope.KorisnikPrikazInfo.ImePrezime = data.Table[0]['Име и презиме'];

        console.log("Ime prezime: ", data.Table[0]['Име и презиме']);

        for(var i = 0 ; i < data.Table.length; i++){

          if(data.Table[i]['VidAplikacija'] ==  $scope.SifrarnikVidAplikacija.trim() ){
              $scope.temp.push(data.Table[i]);
              console.log("podatoci:  ",$scope.temp);
          }


       // $scope.SmetkaVidAplikacija = data.Table[0]['VidAplikacija'];
      }, function (data, status, headers, config) {
        console.log(status);
      };

//////////// POVIK ZA PREVZEMANJE NA SHIFRARNIK PO PRODUCT_TYPE////////
        gatewayService.request("/api/Baranja/1/Fetch_ByProductType_From_Sifrarnik?productTypeID="+$scope.selektiranTip, "GET").then(function (data, status, heders, config) {
          console.log("PREVZEMENO OD SHIFRARNIK: ",data);
          $scope.SifrarnikVidAplikacija = data[0]['VidAplikacija'];
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
