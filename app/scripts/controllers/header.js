'use strict'

angular.module('adminBankaFrontendApp')
  .controller('HeaderCtrl', function($scope,$translate,localStorageService){

    $scope.loggedUser = {};

    // $scope.loggedUser = "filip NIkolovski"
    //$rootScope.loggedUser.KindergardenName = "kinder garden name"





    $scope.changeLanguage = function (langKey) {

      $translate.use(langKey);
      localStorage.setItem('lang', langKey);



    };
  });
