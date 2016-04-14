'use strict'

angular.module('adminBankaFrontendApp')
  .controller('HeaderCtrl', function($scope){

    $scope.loggedUser = {};

    // $scope.loggedUser = "filip NIkolovski"
    $rootScope.loggedUser.KindergardenName = "kinder garden name"
  });
