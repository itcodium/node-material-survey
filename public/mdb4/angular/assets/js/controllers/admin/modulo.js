
var page_modulo= {
    ES: {
        nombre_modulo: "Modulo",
        vigencia_desde: "Vigencia desde",
        vigencia_hasta: "Vigencia hasta",
        confimar_eliminar: "¿Realmente desea eliminar el modulo?",
        cancelar_eliminar:"Se ha cancelado la eliminacion",
    },
    EN: {
        nombre_modulo: "EN_Modulo",
        vigencia_desde: "EN_Vigencia desde",
        vigencia_hasta: "EN_Vigencia hasta",
        confimar_eliminar: "EN_Realmente desea eliminar el modulo ?",
        cancelar_eliminar: "EN_Se ha cancelado la eliminacion",
    },
    PT: {
        nombre_modulo: "PT_Modulo",
        vigencia_desde: "PT_Vigencia desde",
        vigencia_hasta: "PT_Vigencia hasta",
        confimar_eliminar: "PT_Realmente desea eliminar el modulo ?",
        cancelar_eliminar: "PT_Se ha cancelado la eliminacion",
    },
    getPage: function () {
        return this[APP_PAGE_LANGUAGE.getLanguage()];
    }
};




app.controller('moduloController', function ($scope, $http, AppControlText, Service_Caller, $httpParamSerializerJQLike) {
    $scope.AppControlText = AppControlText.getText();
    $scope.page_lang = page_modulo.getPage()
    $scope.modulo = {};
    $scope.modulo.modulo = "test";
    $scope.modulo.vigencia_desde = "2016/01/01";
    $scope.modulo.vigencia_hasta = "2018/01/01";
    $scope.modulo.creado_por = "test";
    $scope.submit = function () {
        Service_Caller.set(APP_MODULO, $httpParamSerializerJQLike($scope.modulo), "", "").then(function (resp) {
        if(resp.status == 'OK'){
            $scope.modulo = {} ;
        }
      });
    }
})

app.controller('editmoduloController', function ($scope, $filter, $http, AppControlText,Service_Caller, $httpParamSerializerJQLike) {
    $scope.AppControlText = AppControlText.getText();
    $scope.page_lang = page_modulo.getPage()

    $scope.modulo = {};
    $scope.select_item = false;
    $scope.edit = false ;
    $scope.search = function(){
        $scope.select_item = true;
        $scope.edit = false ;
        Service_Caller.get(APP_MODULO , {}, true).then(function (resp) {
            $scope.modulos = resp ;
        });
    };
    $scope.search();

    $scope.delete = function (index) {
        alertify.confirm($scope.page_lang.confimar_eliminar, '',
                 function(){ 
                     Service_Caller.delete(APP_MODULO, $scope.modulos[index].id_modulo, "", "", "success").then(function (resp) {
                                if(resp.status == 'OK'){
                                    $scope.modulos.splice(index, 1);
                                }
                          });
                      }, 
                 function(){ 
                     alertify.warning($scope.page_lang.cancelar_eliminar)
                     $scope.cancel_update();
                 });
    };
   
    $scope.showforedit = function(index){
        $scope.select_item = false;
        $scope.edit = true;
        $scope.select_index = index;
        $scope.modulo_aux = angular.copy($scope.modulos[index]);
        $scope.modulo = $scope.modulos[index];
        var videsde = new Date($scope.modulo.vigencia_desde);
        var vihasta = new Date($scope.modulo.vigencia_hasta);
        $scope.modulo.vigencia_desde = $filter('date')($scope.modulo.vigencia_desde, 'yyyy/MM/dd');
        $scope.modulo.vigencia_hasta = $filter('date')($scope.modulo.vigencia_hasta, 'yyyy/MM/dd');
    };

     $scope.update = function(modulo){
        $scope.modulo.modificado_por = 'Test' ;
        $scope.modulo.codigo = "modulo_24_MOD"; 
        $scope.modulo.habilitado = false;

        Service_Caller.put(APP_MODULO, $scope.modulo.id_modulo, $httpParamSerializerJQLike($scope.modulo), "", "").then(function (resp) {
                if (resp.status != 'OK'){
                    $scope.cancel_update();
                };
                if (resp.status == 'OK') {
                    $scope.select_item = true;
                    $scope.edit = false;
                }
        });
     };
     $scope.cancel_update = function(){
         $scope.select_item = true;
        $scope.edit = false;
        $scope.revert($scope.select_index)
     };

     $scope.revert = function (index) {
         $scope.modulos[index] = angular.copy($scope.modulo_aux)
     }

});
