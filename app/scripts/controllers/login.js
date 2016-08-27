'use strict';

/**
 * @ngdoc function
 * @name unicefApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the unicefApp
 */
angular.module('adminBankaFrontendApp')
  .controller('LoginCtrl',

    function ($scope, $location, toastr, gatewayService, $rootScope) {

/////////////// dodadeno od momir
      $rootScope.dataPermisii={};
      gatewayService.request("/api/Login/1/FetchUserRolePermission?user="+'LefkovskaS', "GET").then(function (data, status, heders, config) {
        $rootScope.dataPermisii = data;
        console.log("dataPermisii Login: ",$rootScope.dataPermisii);
      }, function (data, status, headers, config) {
        console.log(status);
      });
//////////////////////////////

      if(localStorage.getItem("loginData")){

        var authData = JSON.parse(localStorage.getItem("loginData"));
        console.log(authData);
      }


      if (authData) {
        $location.path('/main');
      }
      else{
        $location.path('/login');
      }
      $scope.loginData = {};

      $scope.login = function(){

        console.log('$scope.loginData',$scope.loginData);
        console.log('$scope.loginData',$scope.loginData.username);

        console.log('$scope.password',$scope.loginData.password);
        gatewayService.request("/api/Login/1/Login?Username="+$scope.loginData.username + "&Password="+ encodeURI($scope.loginData.password) , "GET").then(function (data, status, heders, config) {

          console.log("data new",data);
          if(data == "Y")
          {
            gatewayService.request("/api/Login/1/UserProfileFetchLogin?userProfileName="+$scope.loginData.username, "GET").then(function (data, status, heders, config) {
              if(data.length>0)
              {
                toastr.success("Успешна најава!");
                localStorage.setItem("loginData", JSON.stringify($scope.loginData));
                $location.path("/main")
              }
              else
              {
                toastr.warning("За да пристапите до апликацијата потребно е да бидете Администратор!");
              }
            },function(){
            });
            console.log("data login success",data);

          }
          else  if(data != "Y")
          {
            console.log("data login",data);
            toastr.warning("Невалиден корисник! Внесете валидно корисничко име и лозинка.");
          }
        },function(){
        });
      }
    }
  );
