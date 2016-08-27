'use strict'

angular.module('adminBankaFrontendApp')

  .controller('HeaderCtrl', function($scope,$translate,$rootScope,localStorageService,$location, gatewayService, $filter, toastr,ngDialog,$route){
    //$rootScope.dataPermisii={};

    ////////// DODADENO OD KOLEGA MOKI /////////////
    $scope.loggedUser = {};
    $scope.loggedUser = JSON.parse(localStorage.getItem("loginData"));
    // var logiranUser = $scope.loggedUser.username;
    // gatewayService.request("/api/Login/1/FetchUserRolePermission?user="+logiranUser, "GET").then(function (data, status, heders, config) {
    //   $rootScope.dataPermisii = data;
    //   console.log("dataPermisii header: ",$rootScope.dataPermisii);
    //   }, function (data, status, headers, config) {
    //      console.log(status);
    //   });
    //
    $scope.hasPermission = function(permision){
      //console.log("Ova tuka e logiraniout user: ",logiranUser);
      if($rootScope.dataPermisii != null) {
        for (var i = 0; i < $rootScope.dataPermisii.length ; i++) {
            //console.log("permisija vratena od baza: "+dataPermisii[i].PermissionDescription);
            if(permision == $rootScope.dataPermisii[i].PermissionDescription){
              return true;
            }
          }
      }
      else{

        return false;
      }
    }

    // if (!$scope.hasPermission('odobruvanjeBaranja')) {
    //   console.log("vleguva vo has premission odobruvanje baranje i menuva pateka.");
    //   $location.path('/');
    // };
    /////////////////////////////////////////////////





    // $scope.loggedUser = "filip NIkolovski"
    //$rootScope.loggedUser.KindergardenName = "kinder garden name"
    $rootScope.tmp = true;


    $scope.changeLang = function(tmp){
      $translate.use(tmp);
      localStorage.setItem("key",tmp);
      $rootScope.tmp = !$rootScope.tmp;
    }



    $scope.changeLanguage = function (langKey) {

      $translate.use(langKey);
      localStorage.setItem('lang', langKey);

    };

    $scope.logOut=function () {
      $location.path('/login');
      localStorage.clear();
    }




  });
