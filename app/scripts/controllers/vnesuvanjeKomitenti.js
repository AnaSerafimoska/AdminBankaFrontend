/**
 * Created by TalevskaM on 06.06.2016.
 */

'use strict';

/**
 * @ngdoc function
 * @name eBankingAdminApp.controller:VidRabotaCtrl
 * @description
 * # VidRabotaCtrl
 * Controller of the eBankingAdminApp
 */

angular.module('adminBankaFrontendApp')
  .controller('KomitentiCtrl', function($scope, gatewayService, $filter, toastr,ngDialog,$route,$translate) {


    $scope.vidKomitent = [
      {'Vid': 'Домашно физичко'},
      {'Vid': 'Домашно правно'},
      {'Vid': 'Странско физичко'},
      {'Vid': 'Странско правно'}
    ];

    $scope.vidPol = [
      {'Pol': 'М'},
      {'Pol': 'Ж'}
    ];

    $scope.Komitent = {
      "DatumInsert":null,
      "DatumPromena":null,
      "DatumRaganje":null,
      "Pol":null
    };


    $scope.checkVidKomitent = function () {
      if ($scope.Komitent.VidKomitent == null || $scope.Komitent.VidKomitent == "") {
        toastr.error('Вид комитент е задолжително поле!');

      }
    }

    $scope.checkEdinstvenBroj = function () {
      if ($scope.Komitent.EdinstvenBroj == null || $scope.Komitent.EdinstvenBroj == "") {
        toastr.error('Единствен број е задолжително поле!');

      }
    }

    $scope.checkImeNaziv = function () {
      if ($scope.Komitent.ImeNaziv == null || $scope.Komitent.ImeNaziv == "") {
        toastr.error('Име/Назив е задолжително поле!');

      }
    }

    $scope.checkAdresa = function () {
      if ($scope.Komitent.Adresa == null || $scope.Komitent.Adresa == "") {
        toastr.error('Адреса е задолжително поле!');

      }
    }

    $scope.checkOpstina = function () {
      if ($scope.Komitent.Opstina == null || $scope.Komitent.Opstina == "") {
        toastr.error('Општина е задолжително поле!');

      }
    }

    $scope.checkMesto = function () {
      if ($scope.Komitent.Mesto == null || $scope.Komitent.Mesto == "") {
        toastr.error('Место на живеење е задолжително поле!');

      }
    }

    $scope.checkDrzava = function () {
      if ($scope.Komitent.Drzava == null || $scope.Komitent.Drzava == "") {
        toastr.error('Држава е задолжително поле!');

      }
    }

    $scope.insertKomitent = function () {
       console.log("Kom",$scope.Komitent);
      var item={};
      item.Type="I";
      item.EdinstvenBroj=$scope.Komitent.EdinstvenBroj;
      item.VidKomitent=$scope.Komitent.VidKomitent.Vid;

      if(item.VidKomitent=='Домашно правно')
      {
        item.VidKomitent="ДП";
      }
      else if(item.VidKomitent=="Домашно физичко")
          {
            item.VidKomitent="ДФ";
          }
          else if(item.VidKomitent=="Странско правно")
                {
                  item.VidKomitent="СП";
                }
              else {
                  item.VidKomitent="СФ";
              }
      console.log("Pol",$scope.Komitent.Pol);
      if($scope.Komitent.Pol!=null )
      {
        console.log("vleguva tuka");
        item.Pol=$scope.Komitent.Pol.Pol;
      }
      else {
        item.Pol="";
      }

      //item.Pol=$scope.Komitent.Pol.Pol;
      item.ImeNaziv=$scope.Komitent.ImeNaziv;
      item.Prezime=$scope.Komitent.Prezime;
      item.Roditel=$scope.Komitent.Roditel;
      item.DatumRaganje=$scope.Komitent.DatumRaganje;
      item.MestoRaganje=$scope.Komitent.MestoRaganje;
      item.MaticenBrojFirma=$scope.Komitent.MaticenBrojFirma;
      item.BrLicnaKarta=$scope.Komitent.BrLicnaKarta;
      item.BrojPasos=$scope.Komitent.BrojPasos;
      item.Adresa=$scope.Komitent.Adresa;
      item.PostenskiBroj=$scope.Komitent.PostenskiBroj;
      item.Mesto=$scope.Komitent.Mesto;
      item.Opstina=$scope.Komitent.Opstina;
      item.Drzava=$scope.Komitent.Drzava;
      item.Telefon=$scope.Komitent.Telefon;
      item.Mobilen=$scope.Komitent.Mobilen;
      item.Email=$scope.Komitent.Email;
      item.Fax=$scope.Komitent.Fax;
      item.KorisnickoIme=$scope.Komitent.KorisnickoIme;
      item.Lozinka=$scope.Komitent.Lozinka;
      item.Opis=$scope.Komitent.Opis;
      item.Status=$scope.Komitent.Status;
      item.DatumPromena=$scope.Komitent.DatumPromena;
      item.DatumInsert= new Date();
      item.ReferentInsert="001";

      console.log("Item",item);

      gatewayService.request("/api/Komitent/1/KomitentFetchByEdinstvenBroj?EdinstvenBroj="+item.EdinstvenBroj, "GET").then(function (data, status, heders, config) {
        if(data.length>0) {

          item.Type="U";
          console.log("itemU",item);
          gatewayService.request("/api/Komitent/1/KomitentInsertUpdate", "POST", item).then(function (data, status, heders, config) {

            toastr.success('Записот е успешно изменет');
            $route.reload();
          }, function (data, status, headers, config) {
            console.log(status);
          });

        }
        else {

          gatewayService.request("/api/Komitent/1/KomitentInsertUpdate", "POST", item).then(function (data, status, heders, config) {

            toastr.success('Записот е успешно снимен');
            $route.reload();
          }, function (data, status, headers, config) {
            console.log(status);
          });

        }


      }, function (data, status, headers, config) {
        console.log(status);
      });




    }

    $scope.valueForSearch="Единствен број"
    $scope.flag="0";
    $scope.Komitenti={};
    $scope.SearchValue="";

    $scope.changeValue=function (val) {
      if(val=='0')
      {
        $scope.valueForSearch="Единствен број"
        $scope.flag="0";
        $scope.SearchValue="";
        $scope.Komitenti={};
      }
      else if(val=="1")
      {
        $scope.valueForSearch="Име или презиме";
        $scope.flag="1";
        $scope.SearchValue="";
        $scope.Komitenti={};
      }
    }


    $scope.searchRecord=function (val) {
      console.log("flag", $scope.flag)
      console.log("val", $scope.valueForSearch)
      gatewayService.request("/api/Komitent/1/KomitentSearch?Type="+$scope.flag+"&Value="+ val, "GET").then(function (data, status, heders, config) {
        console.log(data)
        $scope.Komitenti=data;

      }, function (data, status, headers, config) {
        console.log(status);
      });

    }


    $scope.isActive=false;
    $scope.ImeNaziv="Име";

    $scope.disableFields=function () {
      if($scope.Komitent.VidKomitent.Vid=="Домашно правно" || $scope.Komitent.VidKomitent.Vid=="Странско правно")
      {
        $scope.isActive=true;
        $scope.ImeNaziv="Назив";
      }
      else
      {
        $scope.isActive=false;
        $scope.ImeNaziv="Име";
      }
    }


    $scope.selectedRow = null;  // initialize our variable to null

    $scope.setClickedRow = function(index){  //function that sets the value of selectedRow to current index
      $scope.selectedRow = ($scope.selectedRow == index) ? null : index;
      console.log("this is selected item: ",index);
      $scope.temp=index;
    };

    $scope.previewForEdit = function(item) {
      //console.log("selectedRow",$scope.selectedRow);
      if($scope.selectedRow!=null) {
        //console.log("this is the item: ", item);
        $scope.Komitent = item;

        $scope.Komitent.VidKomitent={Vid:item.VidKomitent};
        if(item.VidKomitent=="ДП")
        {
          $scope.Komitent.VidKomitent={Vid:'Домашно правно'};
          item.VidKomitent=='Домашно правно';

        }
        else if(item.VidKomitent=="ДФ")
        {
          $scope.Komitent.VidKomitent={Vid:"Домашно физичко"};
        }
        else if(item.VidKomitent=="СП")
        {
          $scope.Komitent.VidKomitent={Vid:"Странско правно"};

        }
        else {
          $scope.Komitent.VidKomitent={Vid:"Странско Физичко"};
          item.VidKomitent=='Странско Физичко';

        }
      //  $scope.Komitenti[$scope.selectedRow].VidKomitent= $scope.Komitent.VidKomitent.Vid;
        if(item.Pol=="М")
        {
          $scope.Komitent.Pol={Pol:'М'};


        }
        else if(item.Pol=="Ж")
        {
          $scope.Komitent.Pol={Pol:'Ж'};
        }


      }
      else {
        $scope.Komitent={};
      }

    }


  });

