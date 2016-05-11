angular.module('angularTranslateApp', ['pascalprecht.translate'])
  .config(function($translateProvider) {

    ////////////////////////////////  Prevod za forma Vid rabota //////////////////////////////////////
    $translateProvider.translations('mk', {
      'lblTipRabota_p': 'Тип на работа',
      'lblVidRabota_p': 'Вид на работа',
      'lblOpis_p': 'Опис',
      'lblStatus_p': 'Статус',
      'lblDatumOtvaranje_p': 'Датум отварање',
      'lblDatumZatvaranje_p': 'Датум затворање',
      'btnSnimi_p': 'Сними',
      'btnOtkazi_p': 'Откажи',
      'lblLabela_p': 'Лабела',
      'lblPoleTabela_p': 'Поле од табела',
      'lblTipPole_p': 'Тип поле',
      'lblDolzina_p': 'Должина',
      'lblVrednost_p': 'Вредност',
      'lblZad_p': 'Зад/\\Опц',
      'lblRedosled_p': 'Редослед',
      'headerVidoviRabota_p': 'Видови работа',
      'headerSnimiZapis_p': 'Сними запис',
      'searchVidRabota_p': 'Пребарај по Вид на работа/Опис...',
      'searchApi_p': 'Пребарај API...',
      'lblAktiven_p': 'Активен',
      'errorTipRabota_p': 'Тип на работа е задолжително поле!',
      'errorOpis_p': 'Опис е задолжително поле!',
      'errorVidRabota_p': 'Вид работа е задолжително поле!',
      'errorVidRabotaExist_p': 'Видот на работа постои!',
      'meniVidoviRabota_p': 'Вид работа',
      'zadolzitelno_p': 'З',
      'opcionalno_p': 'О',
      'zacuvanZapis_p' : 'Записот е успешно снимен!'


    });

    $translateProvider.translations('en', {
      'lblTipRabota_p': 'Product type',
      'lblVidRabota_p': 'Product',
      'lblOpis_p': 'Description',
      'lblStatus_p': 'Status',
      'lblDatumOtvaranje_p': 'Opening date',
      'lblDatumZatvaranje_p': 'Closing date',
      'btnSnimi_p': 'Submit',
      'btnOtkazi_p': 'Cancel',
      'lblLabela_p': 'Label',
      'lblPoleTabela_p': 'Field name',
      'lblTipPole_p': 'Field type',
      'lblDolzina_p': 'Length',
      'lblVrednost_p': 'Default value',
      'lblZad_p': 'Mandatory ',
      'lblRedosled_p': 'FieldID',
      'headerVidoviRabota_p': 'Products',
      'headerSnimiZapis_p': 'Сними запис',
      'searchVidRabota_p': 'Search by Product/Description...',
      'searchApi_p': 'Search API...',
      'lblAktiven_p': 'Active',
      'errorTipRabota_p': 'Product type is mandatory!',
      'errorOpis_p': 'Description is mandatory!',
      'errorVidRabota_p': 'Product is mandatory!',
      'errorVidRabotaExist_p': 'This product exist!',
      'meniVidoviRabota_p': 'Products',
      'zadolzitelno_p': 'M',
      'opcionalno_p': 'O',
     

    });


      $translateProvider.preferredLanguage(localStorage.getItem('lang'));



  });


angular.module('adminBankaFrontendApp')
  .controller('translateCtrl', function ($scope, gatewayService, authService) {



  });
