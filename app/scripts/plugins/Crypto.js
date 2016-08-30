'use strict'

function DecodeString(manual_data) {

    var key = CryptoJS.enc.Utf8.parse('SRkTcJz5kt6Lft2r');
    var iv = CryptoJS.enc.Utf8.parse('5Zq4JLGR7TMCs4eP');
    var decrypted = CryptoJS.AES.decrypt(
      manual_data,
      key,
      {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
      }
    );
    //console.log('   decrypted, by hand: ' + decrypted.toString(CryptoJS.enc.Utf8));
    return decrypted.toString(CryptoJS.enc.Utf8);
}




function EncodeString(forEncode) {



   // var txtUserName = user.userName;
   // var keyCombo = txtUserName + "++" + key;
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
   // encodedString = "fe" + encodedString;
   // encodedString = encodeURIComponent(encodedString);


    return encodedString;
}