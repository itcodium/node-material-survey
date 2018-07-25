
var page_usuario = {
    ES: {
        usuario: "Nombre de usuario",
        nombre: "Nombre",
        apellido: "Apellido",
        email: "Email",
        password: "Contraseña",
        re_password: "Reingresar contraseña",
        perfil: "Perfil",
        vigencia_desde: "Vigencia desde",
        vigencia_hasta: "Vigencia hasta",
        confimar_eliminar: "¿Realmente desea eliminar el usuario?",
        cancelar_eliminar: "Se ha cancelado la eliminacion",
    },
    EN: {
        usuario: "EN_Nombre de usuario",
        nombre: "EN_Nombre",
        apellido: "EN_Apellido",
        email: "EN_Email",
        password: "EN_Contraseña",
        re_password: "EN_Reingresar contraseña",
        perfil: "EN_Perfil",
        vigencia_desde: "EN_Vigencia desde",
        vigencia_hasta: "EN_Vigencia hasta",
        confimar_eliminar: "EN_Realmente desea eliminar el usuario?",
        cancelar_eliminar: "EN_Se ha cancelado la eliminacion",
    },
    PT: {
        usuario: "PT_Nombre de usuario",
        nombre: "PT_Nombre",
        apellido: "PT_Apellido",
        email: "PT_Email",
        password: "PT_Contraseña",
        re_password: "PT_Reingresar contraseña",
        perfil: "PT_Perfil",
        vigencia_desde: "PT_Vigencia desde",
        vigencia_hasta: "PT_Vigencia hasta",
        confimar_eliminar: "PT_Realmente desea eliminar el usuario?",
        cancelar_eliminar: "PT_Se ha cancelado la eliminacion",
    },
    getPage: function () {
        return this[APP_PAGE_LANGUAGE.getLanguage()];
    }
};



app.controller('userController', function ($scope, $http, AppControlText, Service_Caller, $httpParamSerializerJQLike) {
    $scope.AppControlText = AppControlText.getText();
    $scope.page_lang = page_usuario.getPage()

    $scope.usuario = {};
    $scope.usuario.usuario = "test";
    $scope.usuario.nombre = "nombre";
    $scope.usuario.apellido = "apellido";
    $scope.usuario.email = "test@com.ar";
    $scope.usuario.password = "123123";
    $scope.usuario.re_password = "123123";
    $scope.usuario.id_perfil = 1; // otro valor inicializa el select 
    $scope.usuario.vigencia_desde = "2016/01/01";
    $scope.usuario.vigencia_hasta = "2018/01/01";
    $scope.usuario.creado_por = "test";

    $scope.submit = function () {
        Service_Caller.set(APP_USUARIO, $httpParamSerializerJQLike($scope.usuario), true).then(function (resp) {
            if (resp.status == 'OK') {
                $scope.usuario = {};
            }
        });
    }

    Service_Caller.get(APP_PERFIL, {}, true).then(function (resp) {
        $scope.items = resp;
    });

})


app.controller('edituserController', function ($scope, $filter, $http, AppControlText, Service_Caller, $httpParamSerializerJQLike) {
    $scope.AppControlText = AppControlText.getText();
    $scope.page_lang = page_usuario.getPage()
    $scope.usuario = {};
    
    $scope.select_item = false;
    $scope.edit = false;
    $scope.search = function () {
        $scope.select_item = true;
        $scope.edit = false;
        Service_Caller.get(APP_USUARIO , {}, true).then(function (resp) {
            $scope.usuarios = resp;
        });
    };
    $scope.search();

    $scope.delete = function (index) {
        alertify.confirm($scope.page_lang.confimar_eliminar, '',
                 function () {
                     Service_Caller.delete(APP_USUARIO, $scope.usuarios[index].id_usuario, true).then(function (resp) {
                         if (resp.status == 'OK') {
                             $scope.usuarios.splice(index, 1);
                         }
                     });
                 },
                 function () {
                     alertify.warning($scope.page_lang.cancelar_eliminar)
                     $scope.cancel_update();
                 });
    };

    $scope.showforedit = function (index) {
        $scope.select_item = false;
        $scope.edit = true;
        $scope.select_index = index;
        $scope.usuario_aux = angular.copy($scope.usuarios[index]);
        $scope.usuario = $scope.usuarios[index];
        console.log("index", index, $scope.usuario_aux)
        $scope.usuario.vigencia_desde = $filter('date')($scope.usuario.vigencia_desde, 'yyyy/MM/dd');
        $scope.usuario.vigencia_hasta = $filter('date')($scope.usuario.vigencia_hasta, 'yyyy/MM/dd');
    };



    $scope.update = function () {
        $scope.usuario.codigo = "usuario_24_MOD";
        $scope.usuario.habilitado = false; 
        Service_Caller.put(APP_USUARIO, $scope.usuario.id_usuario, $httpParamSerializerJQLike($scope.usuario), "success").then(function (resp) {
            if (resp.status != 'OK') {
                $scope.cancel_update();
            }
            if (resp.status == 'OK') {
                $scope.select_item = true;
                $scope.edit = false;
            }
        });
    };
    $scope.cancel_update = function () {
        $scope.select_item = true;
        $scope.edit = false;
        $scope.revert($scope.select_index)
    };
    $scope.revert = function (index) {
        $scope.usuarios[index] = angular.copy($scope.usuario_aux)
    }

    Service_Caller.get(APP_PERFIL , {}, true).then(function (resp) {
        $scope.items = resp;
    });

});

