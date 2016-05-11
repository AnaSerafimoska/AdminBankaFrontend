'use strict'

angular.module('adminBankaFrontendApp')
  .controller('HeaderCtrl', function($scope, $translate, $rootScope, localStorageService){

    $scope.loggedUser = {};

    $rootScope.tmp = true;

    $scope.changeLang = function(tmp){
    	$translate.use(tmp);
    	localStorage.setItem("key",tmp);
    	$rootScope.tmp = !$rootScope.tmp;
    }

  });
