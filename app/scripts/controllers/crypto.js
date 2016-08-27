'use strict';

/**
 * @ngdoc function
 * @name adminBankaFrontendApp.controller:CryptoCtrl
 * @description
 * # CryptoCtrl
 * Controller of the adminBankaFrontendApp
 */
angular.module('adminBankaFrontendApp')
  .controller('CryptoCtrl', function ($scope, $rootScope, $location) {

	$scope.cryptText={};


/*

//ZA MENU PRIVILEGII

    $scope.hasPermission = function(permision){
      //console.log("Ova tuka e logiraniout user: ",logiranUser);
      if($rootScope.dataPermisii != null) {
        for (var i = 0; i < $rootScope.dataPermisii.length; i++) {
          if (permision == $rootScope.dataPermisii[i].PermissionDescription) {
            //console.log("dataPermisii odobruvanje baranje: ", $rootScope.dataPermisii);
            return true;
          }
        }
      }
      else{
        return false;
      }
    }

    if (!$scope.hasPermission('crypto')) {
      //console.log("vleguva vo has premission odobruvanje baranje i menuva pateka.");
      $location.path('/');
    };
*/



  	$scope.ecryptText = function(){
  		console.log($scope.cryptText.textForEncrypt);
  		$scope.cryptText.encriptedText = EncodeString($scope.cryptText.textForEncrypt);
  	}

  // 	$scope.copyEcryptedText = function(){
		// console.log("copy");

  // 		window.prompt("Copy to clipboard: Ctrl+C, Enter", $scope.cryptText.encriptedText);
  // 	}

  });















function EncodeString(forEncode) {

    var key = CryptoJS.enc.Utf8.parse('SRkTcJz5kt6Lft2r');
    var iv = CryptoJS.enc.Utf8.parse('5Zq4JLGR7TMCs4eP');

    var encryptedlogin = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(forEncode), key,
   {
       keySize: 128 / 8,
       iv: iv,
       mode: CryptoJS.mode.CBC,
       padding: CryptoJS.pad.Pkcs7
   });

    var encodedString = encryptedlogin.ciphertext.toString(CryptoJS.enc.Base64); //console.log("encripted", encodedString);

	console.log(encodedString);

    return encodedString;
}