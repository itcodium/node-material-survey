var page_perfil= {
    ES: {
        nombre_perfil: "Perfil",
        vigencia_desde: "Vigencia desde",
        vigencia_hasta: "Vigencia hasta",
        confimar_eliminar: "¿Realmente desea eliminar el perfil?",
        cancelar_eliminar: "Se ha cancelado la eliminacion.",
    },
    EN: {
        nombre_perfil: "EN_Perfil",
        vigencia_desde: "EN_Vigencia desde",
        vigencia_hasta: "EN_Vigencia hasta",
        confimar_eliminar: "EN_Realmente desea eliminar el modulo ?",
        cancelar_eliminar: "EN_Se ha cancelado la eliminacion.",
    },
    PT: {
        nombre_perfil: "PT_Perfil",
        vigencia_desde: "PT_Vigencia desde",
        vigencia_hasta: "PT_Vigencia hasta",
        confimar_eliminar: "PT_Realmente desea eliminar el usuario?",
        cancelar_eliminar: "PT_Se ha cancelado la eliminacion.",
    },
    getPage: function () {
        return this[APP_PAGE_LANGUAGE.getLanguage()];
    }
};

app.controller('perfilController', function ($scope, $http, AppControlText, Service_Caller, $httpParamSerializerJQLike) {
    $scope.AppControlText = AppControlText.getText();
    $scope.page_lang = page_perfil.getPage()
    
    // Codigo para testing
    $scope.perfil = {};
    $scope.perfil.perfil = "test";
    $scope.perfil.vigencia_desde = "2016/01/01";
    $scope.perfil.vigencia_hasta = "2018/01/01";
    $scope.perfil.creado_por = "test";
    
    $scope.submit = function () {
        Service_Caller.set(APP_PERFIL, $httpParamSerializerJQLike($scope.perfil), "", "").then(function (resp) {
            if (resp.status == 'OK') {
                $scope.perfil = {};
            }
      });
    }
})


app.controller('editperfilController', function ($scope, $filter, $http, AppControlText, Service_Caller, $httpParamSerializerJQLike) {
    $scope.AppControlText = AppControlText.getText();
    $scope.page_lang = page_perfil.getPage()

    $scope.select_item = false;
    $scope.edit = false ;
    $scope.search = function(){
        $scope.select_item = true;
        $scope.edit = false ;
        Service_Caller.get(APP_PERFIL , {}, true).then(function (resp) {
            $scope.perfiles = resp ;
        });
    };
    $scope.search();

    $scope.delete = function(index){
        alertify.confirm($scope.page_lang.confimar_eliminar, '',
                 function () {
                     Service_Caller.delete(APP_PERFIL, $scope.perfiles[index].id_perfil, "", "", "success").then(function (resp) {
                            if (resp.status == 'OK') {
                               $scope.perfiles.splice(index, 1);
                            }
                     });
                      }, 
                 function(){ 
                     alertify.warning($scope.page_lang.cancelar_eliminar);
                     $scope.cancel_update();
                    });
    };
   
    $scope.showforedit = function(index){
        $scope.select_item = false;
        $scope.edit = true;
        $scope.select_index= index;
        $scope.perfil_aux = angular.copy($scope.perfiles[index]);
        $scope.perfil = $scope.perfiles[index];

        $scope.perfil.vigencia_desde = $filter('date')($scope.perfil.vigencia_desde, 'yyyy/MM/dd');
        $scope.perfil.vigencia_hasta = $filter('date')($scope.perfil.vigencia_hasta, 'yyyy/MM/dd');

    };
     
    $scope.update = function(){

        $scope.perfil.modificado_por = 'Test';
        $scope.perfil.codigo = "perfil_24_MOD"; 
        $scope.perfil.habilitado = false;

        Service_Caller.put(APP_PERFIL, $scope.perfil.id_perfil, $httpParamSerializerJQLike($scope.perfil), "", "").then(function (resp) {
            if (resp.status != 'OK') {
                   $scope.cancel_update();
            }
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
         $scope.perfiles[index] = angular.copy($scope.perfil_aux)
     }

});

