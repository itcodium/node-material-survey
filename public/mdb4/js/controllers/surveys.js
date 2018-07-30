var survery_testing = {
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
var SurveyModule = (function () {
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
    var api = new ApiCaller("survey");
    var validate = new FormValidations();
    function SurveyBase($scope, AppServiceCaller, AplicationText) {
        $scope.pageText = PageText;
        $scope.AplicationText = AplicationText;
        api.setCaller(AppServiceCaller)
    };

    this.SurveyList = function ($scope, $route,$filter, AppServiceCaller, AplicationText) {
        SurveyBase.call(this, $scope, AppServiceCaller, AplicationText);
        $scope.title = "Survey List"
        $scope.modalEditSurvey = new ModalTemplate();
        api.get(surveyGet_callBack);
        $('[data-toggle="tooltip"]').tooltip()
        
        $scope.modalEditSurvey.setItems($scope.surveys);
        $scope.modalEditSurvey.title = "Edicion de usuario"
        $scope.modalEditSurvey.modal_name = "editSurvey";
        $scope.modalEditSurvey.key_id = "id_usuario";
        $scope.modalEditSurvey.template = { src: "mdb4/pages/survey/survey.html" };
        $scope.modalEditSurvey.pageText = $scope.pageText;
        $scope.modalEditSurvey.AplicationText = AplicationText;

        $scope.modalEditSurvey.submit = function (form) {
            this.form = form;
            if (form.$valid) {
                if (!validate.passwordEquals($scope.modalEditSurvey.model.password, $scope.modalEditSurvey.model.password_verify)) {
                    alert("La contraseñas no coinciden.")
                    return;
                }
                $scope.modalEditSurvey.model.vigencia_desde = $filter('date')($scope.modalEditSurvey.model.vigencia_desde, 'yyyy/MM/dd');
                $scope.modalEditSurvey.model.vigencia_hasta = $filter('date')($scope.modalEditSurvey.model.vigencia_hasta, 'yyyy/MM/dd');
                if (this.method == "EDIT") {
                    api.put($scope.modalEditSurvey.model.id_usuario, $scope.modalEditSurvey.model, surveyPut_callBack);
                }
                if (this.method == "DELETE") {
                    api.delete($scope.modalEditSurvey.model.id_usuario, surveyDelete_callBack);
                }
                if (this.method == "ADD") {
                    $scope.modalEditSurvey.model.id_perfil = 1
                    $scope.modalEditSurvey.model.creado_por="test"
                    api.post($scope.modalEditSurvey.model, surveyPost_callBack);
                }
            }
        }
        function surveyGet_callBack(res) {
            $scope.surveyList= res.data;
            $scope.modalEditSurvey.items = res.data;
        }
        function surveyPut_callBack(res) {
            if (!api.isError(res)) {
                if (res.data.status != 'OK') {
                    alert(res.data.message);
                } else {
                    $scope.modalEditSurvey.hide();
                    api.get(surveyGet_callBack);
                }
            }
        }
        var surveyPost_callBack = function (res) {
            if (!api.isError(res)) {
                if (res.data.status != 'OK') {
                    alert(res.data.message);
                } else {
                    $scope.modalEditSurvey.items.push($scope.modalEditSurvey.model)
                    $scope.modalEditSurvey.hide();
                     api.get(surveyGet_callBack);
                }
            }
        }
        var surveyDelete_callBack = function (res) {
            if (!api.isError(res)) {
                if (res.data.status != 'OK') {
                    alert(res.data.message);
                } else {
                    $scope.modalEditSurvey.hide();
                    api.get(surveyGet_callBack);
                }
            }
        }
    };

    this.SurveyInsert = function ($scope,$route, AppServiceCaller, AplicationText) {
        SurveyBase.call(this, $scope, AppServiceCaller, AplicationText);
        $scope.title = "Alta de usuarios"
        $scope.survey = usuario_testing;
        var surveyPost_callBack = function (res) {
            if (!api.isError(res)) {
                alert(res.data.message)
            }
        }
        $scope.submit = function (form) {
            if ($scope.form.$valid) {
                if (!validate.passwordEquals($scope.survey.password, $scope.survey.password_verify)) {
                    alert("La contraseñas no coinciden.")
                    return;
                }
                api.post($scope.survey, surveyPost_callBack);
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
        SurveyInsertController: this.SurveyInsert,
        SurveyListController: this.SurveyList
    };

})();


app.controller('controllerSurvey', ["$scope", "$route", "$filter", "AppServiceCaller", "AplicationText", SurveyModule.SurveyListController])
app.controller('controllerSurveyInsert', ["$scope", "$route", "AppServiceCaller", "AplicationText", SurveyModule.SurveyInsertController])


 


