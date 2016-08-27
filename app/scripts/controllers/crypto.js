'use strict';

/**
 * @ngdoc function
 * @name adminBankaFrontendApp.controller:CryptoCtrl
 * @description
 * # CryptoCtrl
 * Controller of the adminBankaFrontendApp
 */
angular.module('adminBankaFrontendApp')
  .controller('CryptoCtrl', function ($scope) {

	$scope.cryptText={};

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