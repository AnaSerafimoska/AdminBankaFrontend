angular.module('adminBankaFrontendApp')
  .controller('adminBaranjaCtrl', function($scope, gatewayService, $filter, toastr, $route, $rootScope, ngDialog, $parse) {


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
    $scope.FormaBody={};
    $scope.novPotpisnik = {};
    $scope.potpisnikFlag=false;
    $scope.korisnik.Privilegii = [];

    $scope.setTab = function(newTab){
      //console.log("set tab: ",newTab);
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum){
      //console.log("tab num: ",tabNum);
      return $scope.tab === tabNum;
    };

  $scope.dodadiSmetka = function(smetka){
     
      gatewayService.request("/api/Baranja/1/ProveriDaliPostoiSmetka?Partija="+smetka, "GET").then(function (data, status, heders, config) {
               if(data.Table.length != 0){
                    toastr.success('Сметката е успешно додадена.');
                   // console.log("************************");
                   // console.log("Dali postoi takva smetka: ",data);
                    $scope.novPotpisnik = data.Table[0];
                    $scope.potpisnikFlag = false;
                    $scope.temp.push($scope.novPotpisnik);
                   // console.log("potpisnikFlag:",$scope.potpisnikFlag);
                   // console.log("Nov Potpisnik:",$scope.novPotpisnik);
                   // console.log("************************");
               }
               else{
                    toastr.error('Сметката не постои.');
                    $scope.potpisnikFlag = true;
               }
          }, function (data, status, headers, config) {
            console.log(status);
          });
  }


  $scope.setirajFlagPotpisnik = function(){
      $scope.potpisnikFlag = false;
  }

 $scope.productBodyFetch = function () {
          gatewayService.request("/api/ProductBody/1/ProductBodyFetchByIdType?ProductTypeID="+$scope.type+"&ProductID="+$scope.value, "GET").then(function (data, status, heders, config) {
            $scope.FormaBody=data;
            console.log("Forma body:",$scope.FormaBody);

          }, function (data, status, headers, config) {
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


//////////////////////////// TUKA SE ZEMAAT PODATOCITE ZA PRIKAZ VO TABOVITE  ///////////////////////////////////////////////////////////////////////////////////////

    $scope.previewForEdit = function(item){
        
        $scope.productbody=item;
        $scope.prikazNaFormaDinamichka = true;
        console.log("THIS IS SELECTED ITEM: ",item);
        console.log("THIS IS SELECTED ITEM: ",$scope.KorisnikPrikazInfo.ProductTypeId);
        console.log("THIS IS SELECTED ITEM so substring: ",$scope.KorisnikPrikazInfo.ProductTypeId.substring(3,5));
        gatewayService.request("/api/Baranja/1/EbankingKorisniciServis_FetchPrivilegii?EdinstvenBroj=" + item.EdinstvenBroj  + "&ProductTypeID=" +  $scope.KorisnikPrikazInfo.ProductTypeId.substring(3,5) + "&Partija=" + item.Partija, "GET").then(function (data, status, heders, config) {
        console.log("Vrateni po datoci so PRIVILEGII: " ,data);
        $scope.KorisnikPrikazInfo.Partija = item.Partija;

        if(data.length != 0){
          $scope.korisnik.BrBaranje = data[0]["BrojBaranje"];
        }
        else{
          $scope.korisnik.BrBaranje = "";
        }

        $scope.finalno = {};

        for(var i = 0 ; i < data.length; i++){
          
          if(data[i]["EdinstvenBroj"] == item.EdinstvenBroj && data[i]["Partija"] == item.Partija){
              var pomoshna="";
              pomoshna = "o"+data[i]["ProductId"];
              $scope.korisnik.Privilegii[i] = pomoshna;
              console.log("TUKA SE POLNI SUBSTRING:", $scope.korisnik.Privilegii[i]);
              $scope.finalno[pomoshna] = {
              Privilegii : true
            }

          }

        }

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
      if($scope.KorisnikPrikazInfo.ProductTypeId.substring(3,5) == prod.ProductTypeID.substring(0,2))
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
      console.log("povikano flag visibility.");
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
   $scope.idSelectedVote = idSelectedVote;
};


    $scope.selectedRow = null;  // initialize our variable to null
    $scope.setClickedRow = function(index){  //function that sets the value of selectedRow to current index
      $scope.selectedRow = ($scope.selectedRow == index) ? null : index;
     // console.log("this is selected item: ",index);
    };


////////////////////////  PODATOCI ZA IDENTIFIKACIJA NA KORISNIK PO EMBG   ///////////////////
  $scope.zemiPodatociPo_EMBG = function(embg){

     // console.log("vlezeno vo proverka embg printa korisnik ",$scope.korisnik);
      gatewayService.request("/api/Baranja/1/EbankingFetchZaKomitent?EdinstvenBroj="+embg, "GET").then(function (data, status, heders, config) {
        console.log("tuka: ",data);
        $scope.korisnik.korisnichkoIme = data.Table[0].KorisnickoIme;
        $scope.korisnik.BrBaranje = data.Table[0].BrBaranje;
        
        $scope.KorisnikPrikazInfo.EdinstvenBroj = $scope.korisnik.embg;
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
         $scope.korisnik.BrLicnaKarta = data.Table[0]['BrLicnaKarta'];
         $scope.KorisnikPrikazInfo.Adresa = data.Table[0]['Adresa'];
      }, function (data, status, headers, config) {
        console.log(status);
      });
  };

////////////////////////  NG DIALOG   ///////////////////
  $scope.popUp = function() {
        ngDialog.open({
            template: 'templateId',
            scope: $scope
        });
  }

 ////////////////////////  TUKA SE POLNI TABELATA SO SMETKI   ///////////////////
  function polniTabela(){
    $scope.loading = true;
    $scope.temp=[];
    $scope.dodadenaSmetka={};
    $scope.tmp={};
    $scope.tmp=$route.temp;
    $scope.tmp
    console.log("tmp",$scope.tmp);
        gatewayService.request("/api/Baranja/1/EbankingKorisniciServisFetch?EdinstvenBroj="+$scope.korisnik.embg, "GET").then(function (data, status, heders, config) {
        console.log("ZA PRIKAZ VO TABELA: ",data);

        var the_string = 'o010005.TelefonskiBroj';

        // Get the model
        var model = $parse(the_string);
        model.assign($scope, "156156");

        $scope.TmpPodatoci = data;
        $scope.temp = data;
        $scope.loading = false;

      }, function (data, status, headers, config) {
        console.log(status);
      });

        

  };

  ///////////////  SNIMANJE NA BARANJE ////////////////////////////////////
  $scope.snimiBaranje = function(){
        $scope.KorisnikPrikazInfo.KorisnickoIme = $scope.korisnik.korisnichkoIme;

        if($scope.korisnik.korisnichkoIme == "" || $scope.korisnik.korisnichkoIme == null){
                toastr.warning("Внесете корисничко име.");
        }


        else{

                console.log("PRED DA SNIMI BARANJE: ",$scope.finalno);
                $scope.KorisnikPrikazInfo.BrBaranje = $scope.korisnik.BrBaranje; 
                $scope.KorisnikPrikazInfo.ReferentInsert="22"; /// statichki referent broj, treba da se smeni da zema od logiran referent
                $scope.KorisnikPrikazInfo.KorisnickoIme = $scope.korisnik.korisnichkoIme;
                $scope.KorisnikPrikazInfo.OrgDel = "00001"; /// fiksen org del treba da se smeni da zema od logiran referent
                $scope.KorisnikPrikazInfo.Status_S ="N";
                $scope.KorisnikPrikazInfo.Email = "";
                $scope.KorisnikPrikazInfo.SeriskiBrojSertifikat=""; /// treba da se vnesuva ili postoechki da se zema od ePartii
                $scope.KorisnikPrikazInfo.Sertifikat = "";
                $scope.KorisnikPrikazInfo.SertifikatOTP = "";
                $scope.KorisnikPrikazInfo.Zabeleshka="";
                $scope.KorisnikPrikazInfo.Limit = "";
                $scope.KorisnikPrikazInfo.StatusBaranje = "";
                $scope.KorisnikPrikazInfo.Email_Adresa="";
                $scope.KorisnikPrikazInfo.Privilegii="";
                $scope.KorisnikPrikazInfo.ProductId="000001";

                for(var i = 0; i < 3; i++){
                    //console.log("substring od productID:", $scope.finalno[$scope.korisnik.Privilegii[i]]);
                    console.log("substring od productID:", $scope.korisnik.Privilegii[i]);
                    gatewayService.request("/api/Baranja/1/ProductTypeBaranja_Insert", "POST", $scope.KorisnikPrikazInfo).then(function (data, status, heders, config) {
                
                     
                    }, function (data, status, headers, config) {
                         console.log(status);
                         toastr.error("Погрешен внес.");

                    });

                }
                 toastr.success("Успешно внесено барање.");
        }////end else
        
        
       
      console.log("baranje za korisnik:",$scope.KorisnikPrikazInfo);
  }

  $scope.test = function () {
  	   console.log($scope.user.items);
  };

  $scope.zemiSelektiranTipNaProdukt = function(item){
      $scope.selektiranTip = item;
      $scope.KorisnikPrikazInfo.ProductTypeId = item;

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
      }, function (data, status, headers, config) {
        console.log(status);
      });
    }

});
