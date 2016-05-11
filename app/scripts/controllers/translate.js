angular.module('angularTranslateApp', ['pascalprecht.translate'])
  .config(function($translateProvider) {

  	  $translateProvider.translations('en', {
  	  	'lblHeaderTip_pt': 'Product types',
        'lblTip_pt': 'Product type',
        'lblOpis_pt': 'Description',
        'lblWorkingTbl_pt': 'Working table',
        'lblStatus_pt': 'Status',
        'lblOpis_pt': 'Description',
        'lblActive_pt': 'Active',
        'lblDateOpen_pt': 'Opening date',
        'lblDateClose_pt': 'Closing date',
        'lblFormName_pt1': 'Create input',
        'lblFormName_pt2': 'Preview inputs',
        'btnOtkazhi_pt': 'Cancel',
        'btnSnimi_pt': 'Submit',
        'lblProductTupeTbl_pt': 'Product type',
        'lblAction_pt':'Action',
        'lblEdit_pt':'Edit',
        'lblSave_pt':'Save',
        'lblTipExist_pt':'This product type already exist. ',
        'lblWTableError_pt':'Working table is mandatory field.',
        'lblOpisError_pt':'Description is mandatory field.',
        'lblTipError_pt':'Product type is mandatory field.',
        'lblDbError_pt':'Database error while saving.',
        'lblDbSuccess_pt':'The input was saved successfully.',
        'lblDbSuccessEdit_pt':'The input was edited successfully.',
        'placeholderSearch_pt': 'Search ...'
      });
     
      $translateProvider.translations('mk', {
        'lblHeaderTip_pt': 'Тип на продукт',
        'lblTip_pt': 'Тип на продукт',
        'lblOpis_pt': 'Опис',
        'lblWorkingTbl_pt': 'Работна табела',
        'lblStatus_pt': 'Статус',
        'lblOpis_pt': 'Опис',
        'lblActive_pt': 'Активен',
        'lblDateOpen_pt': 'Датум отворање',
        'lblDateClose_pt': 'Датум затворање',
        'lblFormName_pt1': 'Сними запис',
        'lblFormName_pt2': 'Преглед на записи',
        'btnOtkazhi_pt': 'Откажи',
        'btnSnimi_pt': 'Сними',
        'lblProductTupeTbl_pt': 'Тип на продукт',
        'lblAction_pt':'Акција',
        'lblEdit_pt':'Измени',
        'lblSave_pt':'Зачувај',
        'lblTipExist_pt':'Типот на продукт постои.',
        'lblWTableError_pt':'Работна табела е задолжително поле.',
        'lblOpisError_pt':'Опис е задолжително поле.',
        'lblTipError_pt':'Тип на продукт е задолжително поле.',
        'lblDbError_pt': 'Грешка при запишување во база.',
        'lblDbSuccess_pt':'Записот е успешно снимен.',
        'lblDbSuccessEdit_pt':'Записот е успешно едитиран.',
        'placeholderSearch_pt': 'Пребарувај ...'
      });
     
      $translateProvider.preferredLanguage(localStorage.getItem("key"));

  });

angular.module('adminBankaFrontendApp')
  .controller('langCtrl', function($scope,$translate, gatewayService, $filter, toastr, $route) {

});

  
