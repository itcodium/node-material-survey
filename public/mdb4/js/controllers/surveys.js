var survery_testing = {
    "name": "test_0002",
    "isEnabled": true,
    "isDefault": false,
    "vigenciaDesde": "2018/01/01",
    "vigenciaHasta": "2019/12/31",
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
        "vigenciaDesde": "Vigencia desde",
        "vigenciaHasta": "Vigencia hasta",
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
        
        // $scope.modalEditSurvey.model=survery_testing;
        
        $scope.modalEditSurvey.init=function(){
            // console.log("survery_testing",survery_testing)
            // this.model=survery_testing;
        }
        api.get(surveyGet_callBack);
        
        $('[data-toggle="tooltip"]').tooltip();


        // $scope.modalEditSurvey.setItems($scope.surveys);
        $scope.modalEditSurvey.title = "New survey"
        $scope.modalEditSurvey.modal_name = "editSurvey";
        $scope.modalEditSurvey.key_id = "id_usuario";
        $scope.modalEditSurvey.template = { src: "mdb4/pages/survey/add.html" };
        $scope.modalEditSurvey.pageText = $scope.pageText;
        $scope.modalEditSurvey.AplicationText = AplicationText;
        
        $scope.modalEditSurvey.initCalendar("vigenciaDesde");
        $scope.modalEditSurvey.initCalendar("vigenciaHasta");
        

        $scope.modalEditSurvey.submit = function (form) {
            this.form = form;
            if (form.$valid) {
                /*if (!validate.passwordEquals($scope.modalEditSurvey.model.password, $scope.modalEditSurvey.model.password_verify)) {
                    alert("La contraseñas no coinciden.")
                    return;
                }*/

                $scope.modalEditSurvey.model.vigenciaDesde = $("#vigenciaDesde").val();
                $scope.modalEditSurvey.model.vigenciaHasta = $("#vigenciaHasta").val();
                
                console.log("Model -> ", $scope.modalEditSurvey.model,$scope.survey)

                
                if (this.method == "EDIT") {
                    $scope.modalEditSurvey.model.vigenciaDesde= new Date($("#vigenciaDesde").val()).toJSON();
                    $scope.modalEditSurvey.model.vigenciaHasta= new Date($("#vigenciaHasta").val()).toJSON();
                    api.put($scope.modalEditSurvey.model._id, $scope.modalEditSurvey.model, surveyPut_callBack);
                }

                if (this.method == "DELETE") {
                    api.delete($scope.modalEditSurvey.model._id, surveyDelete_callBack);
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
                if (res.statusText != 'OK') {
                    toastr.error(res.data.message);
                } else {
                    $scope.modalEditSurvey.hide();
                    api.get(surveyGet_callBack);
                }
            }
        }

        var surveyPost_callBack = function (res) {
            if (!api.isError(res)) {
                if (res.statusText != 'OK') {
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
                if (res.statusText != 'OK') {
                    toastr.error(res.data.message);
                } else {
                    $scope.modalEditSurvey.hide();

                    toastr.success(res.data.message);
                    // api.get(surveyGet_callBack);
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


 


