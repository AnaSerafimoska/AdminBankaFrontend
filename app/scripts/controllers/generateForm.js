'use strict';

/**
 * @ngdoc function
 * @name adminBankaFrontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the adminBankaFrontendApp
 */
angular.module('adminBankaFrontendApp')
  .controller('GenerateFormCtrl', function($scope, gatewayService, $filter, toastr,ngDialog,$route,$translate, utility, $q, $http){


    $scope.productbody=[

      {
          "ProductBodyID" : "1" ,
           "ProductTypeID" : "01",
           "ProductID" : "0001",
           "FieldID" : "1",
           "FieldName" : "Button",
           "Mandatory" : "O",
           "FieldType" : "Button",
           "FieldLength" : "15",
           "ControlType" : "nnnnnn" ,
           "FillApi" : "",
           "DefaultValue" : "Submit",
           "FieldDescription" : ""
      },
      {
          "ProductBodyID" : "2" ,
          "ProductTypeID" : "01",
          "ProductID" : "0001",
          "FieldID" : "2",
          "FieldName" : "ttttt",
          "Mandatory" : "З",
          "FieldType" : "Textbox",
          "FieldLength" : "20",
          "ControlType" : "" ,
          "FillApi" : "",
          "DefaultValue" : "",
          "FieldDescription" : "Vnesi tekst"
      },
      {
        "ProductBodyID" : "3" ,
        "ProductTypeID" : "01",
        "ProductID" : "0001",
        "FieldID" : "2",
        "FieldName" : "bbbbbb",
        "Mandatory" : "З",
        "FieldType" : "Datepicker",
        "FieldLength" : "20",
        "ControlType" : "" ,
        "FillApi" : "",
        "DefaultValue" : "",
        "FieldDescription" : "Date"
      },
      {
        "ProductBodyID" : "4" ,
        "ProductTypeID" : "01",
        "ProductID" : "0001",
        "FieldID" : "4",
        "FieldName" : "tttttdytr",
        "Mandatory" : "З",
        "FieldType" : "Datepicker",
        "FieldLength" : "20",
        "ControlType" : "" ,
        "FillApi" : "",
        "DefaultValue" : "19-05-2016",
        "FieldDescription" : "Date22"
      },
      {
        "ProductBodyID" : "5" ,
        "ProductTypeID" : "01",
        "ProductID" : "0001",
        "FieldID" : "5",
        "FieldName" : "jjjjj",
        "Mandatory" : "З",
        "FieldType" : "Number",
        "FieldLength" : "20",
        "ControlType" : "" ,
        "FillApi" : "",
        "DefaultValue" : "",
        "FieldDescription" : "Vnesi tekst"
      },
      {
        "ProductBodyID" : "6" ,
        "ProductTypeID" : "01",
        "ProductID" : "0001",
        "FieldID" : "6",
        "FieldName" : "sgjgjhyyy",
        "Mandatory" : "З",
        "FieldType" : "Dropdown",
        "FieldLength" : "15",
        "ControlType" : "" ,
        "FillApi" : "/api/ProductBody/1/FieldApiFetch",
        "DefaultValue" : "Search",
        "FieldDescription" : "Prebaruvaj"
      }
      ,
      {
        "ProductBodyID" : "7" ,
        "ProductTypeID" : "01",
        "ProductID" : "0001",
        "FieldID" : "7",
        "FieldName" : "sfjjtttttt",
        "Mandatory" : "З",
        "FieldType" : "Dropdown",
        "FieldLength" : "15",
        "ControlType" : "" ,
        "FillApi" : "/api/ProductTypes/1/ProductTypesFetch",
        "DefaultValue" : "Search",
        "FieldDescription" : "Prebaruvaj2"
      },
      {
        "ProductBodyID" : "8" ,
        "ProductTypeID" : "01",
        "ProductID" : "0001",
        "FieldID" : "8",
        "FieldName" : "sfjsj",
        "Mandatory" : "З",
        "FieldType" : "Textarea",
        "FieldLength" : "15",
        "ControlType" : "" ,
        "FillApi" : "api/ProductTypes/1/ProductTypesFetch",
        "DefaultValue" : "Search",
        "FieldDescription" : "Opis"
      },
      {
        "ProductBodyID" : "9" ,
        "ProductTypeID" : "01",
        "ProductID" : "0001",
        "FieldID" : "9",
        "FieldName" : "sfjgjjttt",
        "Mandatory" : "З",
        "FieldType" : "Dropdown",
        "FieldLength" : "15",
        "ControlType" : "" ,
        "FillApi" : "/api/ProductTypes/1/ProductTypesFetch",
        "DefaultValue" : "Search",
        "FieldDescription" : "Prebaruvaj3"
      }
      ,
      {
        "ProductBodyID" : "10" ,
        "ProductTypeID" : "01",
        "ProductID" : "0001",
        "FieldID" : "10",
        "FieldName" : "sfjj",
        "Mandatory" : "З",
        "FieldType" : "Checkbox",
        "FieldLength" : "15",
        "ControlType" : "" ,
        "FillApi" : "",
        "DefaultValue" : "",
        "FieldDescription" : "check"
      },
      {
        "ProductBodyID" : "11" ,
        "ProductTypeID" : "01",
        "ProductID" : "0001",
        "FieldID" : "11",
        "FieldName" : "fhj",
        "Mandatory" : "З",
        "FieldType" : "ButtonCancel",
        "FieldLength" : "15",
        "ControlType" : "" ,
        "FillApi" : "",
        "DefaultValue" : "Cancel",
        "FieldDescription" : "check"
      }
    ];
    var niza=[];
    var i = 0;
    var output;

    $scope.temp={};
    $scope.pom=[];


    $scope.fillDropdown = function (){


      var arr = [];

      for (var a = 0; a < $scope.productbody.length; ++a) {
        if($scope.productbody[a].FieldType == "Dropdown"){

          arr.push($http.get("http://localhost:58075"+$scope.productbody[a].FillApi));
        } else {
          arr.push(null);
        }
      }

      $q.all(arr).then(function (ret) {

        for (var a = 0; a < $scope.productbody.length; ++a) {
          if($scope.productbody[a].FieldType == "Dropdown") {
            $scope.productbody[a].ControlType = ret[a].data;

          }
        }

      });


    }

    $scope.fillDropdown();




    $scope.submit=function () {

       angular.forEach($scope.pom, function( key) {

        var tmpvalue = $filter('date')(  $scope.temp[key], "yyyy-MM-dd");

        $scope.temp[key] = tmpvalue;

      //  this[key][value]=(key + ': ' +    $filter('date')(   value, "yyyy-MM-dd"));


      });
       console.log($scope.temp);

    }



    $scope.filter=function ( key ) {

      $scope.pom.push(key);

    }



  });
