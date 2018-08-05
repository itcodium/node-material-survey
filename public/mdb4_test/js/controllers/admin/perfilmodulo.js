
function searchItem(arr, key, value) {
    for (var d = 0, len = arr.length; d < len; d += 1) {
        
        //&& SelectedItems[i]["enabled"] == "1"
        if (arr[d][key] === value) {
            return arr[d];
        }
    }
}

function initList(listCompleta, SelectedItems, key) {
    console.log("SelectedItems[i]", listCompleta, SelectedItems);
    for (var i = 0; i < SelectedItems.length; i++) {
        var item = searchItem(listCompleta, key, SelectedItems[i][key]);
        if (!(typeof item === 'undefined') ) {
            if (item[key] == SelectedItems[i][key] && SelectedItems[i]["enabled"] == 1) {
               item.selected = true;
            }
        }
    }
}

function resetList(listCompleta, key) {
    for (var i = 0; i < listCompleta.length; i++) {
        listCompleta[i].selected = false;
    }
}

var page_perfil_modulo = {
    ES: {
        perfil: "Perfil",
    },
    EN: {
        perfil: "EN_Perfil",
    },
    PT: {
        perfil: "PT_Perfil",
    },
    getPage: function () {
        return this[APP_PAGE_LANGUAGE.getLanguage()];
    }
};



 

app.controller('editperfilmoduloController', function ($scope, $filter,$http,AppControlText, Service_Caller, $httpParamSerializerJQLike) {
    $scope.AppControlText = AppControlText.getText();
    $scope.page_lang = page_perfil_modulo.getPage()

    $scope.select_item= false;
    $scope.edit = false ;
    $scope.search = function(){
        $scope.select_item = true;
        $scope.edit = false ;
        Service_Caller.get(APP_PERFIL, {}, true).then(function (resp) {
            $scope.perfiles = resp;
        });
        resetList($scope.modulos);
    };
    
   
       Service_Caller.get(APP_MODULO , {}, true).then(function (resp) {
            $scope.modulos = resp;
        });
   
        $scope.aceptar= function () {
            $scope.select_item = true;
            $scope.edit = false;
            resetList($scope.modulos);
        }
    $scope.showforedit = function(index){
        $scope.select_item = false;
         $scope.edit = true;
         $scope.perfil = $scope.perfiles[index]
         var urlPerfilModulos = APP_PERFIL_MODULO+"/ByPerfil/" + $scope.perfil.id_perfil+'?' + getTokenParam()
         $http({
             method: 'GET',
             url:urlPerfilModulos
         }).then(function successCallback(response) {
             $scope.perfilesModulos = response.data;
             initList($scope.modulos, $scope.perfilesModulos , "id_modulo")
         }, function errorCallback(response) {
             console.log("perfilesModulos", response);
         });
    };
    $scope.cancel_update = function () {
        $scope.select_item = true;
        $scope.edit = false;
    };

    $scope.perfilModulo = {};

    $scope.onchange = function (index) {
        console.log("index", index, $scope.modulos[index]);
        $scope.perfilModulo.id_perfil = $scope.perfil.id_perfil
        $scope.perfilModulo.id_modulo = $scope.modulos[index].id_modulo;
        $scope.perfilModulo.enabled= $scope.modulos[index].selected;
        Service_Caller.set(APP_PERFIL_MODULO, $httpParamSerializerJQLike($scope.perfilModulo),false).then(function (resp) {
            if (resp.status != 'OK') {
                $scope.modulos[index].selected = !$scope.modulos[index].selected;
            }
            console.log("$scope.perfilModulo", $scope.perfilModulo, $scope.modulos[index])
        });
        
    }

});

