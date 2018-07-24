var usuario_testing = {
    "usuario": "test",
    "nombre": "test",
    "apellido": "test",
    "email": "test@test.com",
    "password": "",
    "vigencia_desde": "2016-01-01",
    "vigencia_hasta": '',
    "creado_por": "test",
    "id_perfil": 1,
}
var UserModule = (function () {
    var PageText = {
        "usuario": "Usuario",
        "nombre": "Nombre",
        "apellido": "Apellido",
        "email": "Email",
        "password": "Password",
        "perfil": "Perfil",
        "vigencia_desde": "Vigencia desde",
        "vigencia_hasta": "Vigencia hasta",
        "usuario_minlength": "Ingresar al menos 3 caracteres",
        "password_verify": "Reescribir la contraseña"
    };
    var api = new ApiCaller("usuarios");
    var validate = new FormValidations();
    function UserBase($scope, AppServiceCaller, AplicationText) {
        $scope.pageText = PageText;
        $scope.AplicationText = AplicationText;
        api.setCaller(AppServiceCaller)
    };

    this.UserList = function ($scope, $route,$filter, AppServiceCaller, AplicationText) {
        UserBase.call(this, $scope, AppServiceCaller, AplicationText);
        $scope.title = "Listado de usuarios"
        $scope.modalEditUser = new ModalTemplate();
        api.get(userGet_callBack);

        $scope.modalEditUser.setItems($scope.users);
        $scope.modalEditUser.title = "Edicion de usuario"
        $scope.modalEditUser.modal_name = "editUser";
        $scope.modalEditUser.key_id = "id_usuario";
        $scope.modalEditUser.template = { src: "assets/pages/user/user.html" };
        $scope.modalEditUser.pageText = $scope.pageText;
        $scope.modalEditUser.AplicationText = AplicationText;

        $scope.modalEditUser.submit = function (form) {
            this.form = form;
            if (form.$valid) {
                if (!validate.passwordEquals($scope.modalEditUser.model.password, $scope.modalEditUser.model.password_verify)) {
                    alert("La contraseñas no coinciden.")
                    return;
                }
                $scope.modalEditUser.model.vigencia_desde = $filter('date')($scope.modalEditUser.model.vigencia_desde, 'yyyy/MM/dd');
                $scope.modalEditUser.model.vigencia_hasta = $filter('date')($scope.modalEditUser.model.vigencia_hasta, 'yyyy/MM/dd');
                if (this.method == "EDIT") {
                    api.put($scope.modalEditUser.model.id_usuario, $scope.modalEditUser.model, userPut_callBack);
                }
                if (this.method == "DELETE") {
                    api.delete($scope.modalEditUser.model.id_usuario, userDelete_callBack);
                }
                if (this.method == "ADD") {
                    $scope.modalEditUser.model.id_perfil = 1
                    $scope.modalEditUser.model.creado_por="test"
                    api.post($scope.modalEditUser.model, userPost_callBack);
                }
            }
        }
        function userGet_callBack(res) {
            $scope.modalEditUser.items = res.data;
        }
        function userPut_callBack(res) {
            if (!api.isError(res)) {
                if (res.data.status != 'OK') {
                    alert(res.data.message);
                } else {
                    $scope.modalEditUser.hide();
                    api.get(userGet_callBack);
                }
            }
        }
        var userPost_callBack = function (res) {
            if (!api.isError(res)) {
                if (res.data.status != 'OK') {
                    alert(res.data.message);
                } else {
                    $scope.modalEditUser.items.push($scope.modalEditUser.model)
                    $scope.modalEditUser.hide();
                     api.get(userGet_callBack);
                }
            }
        }
        var userDelete_callBack = function (res) {
            if (!api.isError(res)) {
                if (res.data.status != 'OK') {
                    alert(res.data.message);
                } else {
                    $scope.modalEditUser.hide();
                    api.get(userGet_callBack);
                }
            }
        }
    };

    this.UserInsert = function ($scope,$route, AppServiceCaller, AplicationText) {
        UserBase.call(this, $scope, AppServiceCaller, AplicationText);
        $scope.title = "Alta de usuarios"
        $scope.user = usuario_testing;
        var userPost_callBack = function (res) {
            if (!api.isError(res)) {
                alert(res.data.message)
            }
        }
        $scope.submit = function (form) {
            if ($scope.form.$valid) {
                if (!validate.passwordEquals($scope.user.password, $scope.user.password_verify)) {
                    alert("La contraseñas no coinciden.")
                    return;
                }
                api.post($scope.user, userPost_callBack);
            }
        }

        $scope.reset = function (form) {
            if (form) {
                form.$setPristine();
                form.$setUntouched();
            }
        };
    };

    return {
        UserInsertController: this.UserInsert,
        UserListController: this.UserList
    };

})();


app.controller('controllerUserList', ["$scope", "$route", "$filter", "AppServiceCaller", "AplicationText", UserModule.UserListController])
app.controller('controllerUserInsert', ["$scope", "$route", "AppServiceCaller", "AplicationText", UserModule.UserInsertController])


 


