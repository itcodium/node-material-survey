var survery_testing = {
    "name": "test_0002",
    "isEnabled": true,
    "isDefault": false,
    "vigenciaDesde": "2019/01/01",
    "vigenciaHasta": "2019/01/31",
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

        
        this.onCancel=function(){
            $("#vigenciaDesde").val('');
            $("#vigenciaHasta").val('');
                
        }

        $scope.modalEditSurvey.onShow=function(){

            var from_input=$('#vigenciaDesde').pickadate({  format: 'yyyy/mm/dd',  
                                selectMonths: true,
                                selectYears: true,
                                formatSubmit: 'yyyy/mm/dd'
                         });

            $('#vigenciaHasta').pickadate({  format: 'yyyy/mm/dd',  
                                        selectMonths: true,
                                        selectYears: true,
                                        formatSubmit: 'yyyy/mm/dd'   
                                        
                                    });
 
            if (this.method == API_METHOD.ADD) {
                $("#vigenciaDesde").val();
                $("#vigenciaHasta").val();
                $scope.modalEditSurvey.title = "New survey"
            }else{
                    this.model.vigenciaDesde=$filter('date')(  this.model.vigenciaDesde, "yyyy/MM/dd") ;
                    this.model.vigenciaHasta=$filter('date')(  this.model.vigenciaHasta, "yyyy/MM/dd") ;
                    $("#vigenciaHasta").val(this.model.vigenciaHasta);
                    $("#vigenciaDesde").val(this.model.vigenciaDesde);
                 if (this.method == API_METHOD.DELETE) {
                    $scope.modalEditSurvey.title = "Delete survey"  
                 }
                 if (this.method == API_METHOD.EDIT) {
                    $scope.modalEditSurvey.title = "Update survey"  
                 }
            }
        }
        api.get(surveyGet_callBack);
        
        $('[data-toggle="tooltip"]').tooltip();
        
        $scope.modalEditSurvey.modal_name = "editSurvey";
        $scope.modalEditSurvey.key_id = "id_usuario";
        $scope.modalEditSurvey.template = { src: "mdb4/pages/survey/add.html" };
        $scope.modalEditSurvey.pageText = $scope.pageText;
        $scope.modalEditSurvey.AplicationText = AplicationText;

        $scope.modalEditSurvey.submit = function (form) {
            
            this.form = form;
            if (form.$valid) {
                /*if (!validate.passwordEquals($scope.modalEditSurvey.model.password, $scope.modalEditSurvey.model.password_verify)) {
                    alert("La contraseñas no coinciden.")
                    return;
                }*/
                if (this.method == "EDIT") {
                    $scope.modalEditSurvey.model.vigenciaDesde= $("#vigenciaDesde").val();
                    $scope.modalEditSurvey.model.vigenciaHasta= $("#vigenciaHasta").val();
                    api.put($scope.modalEditSurvey.model._id, $scope.modalEditSurvey.model, surveyPut_callBack);
                }

                if (this.method == "DELETE") {
                    api.delete($scope.modalEditSurvey.model._id, surveyDelete_callBack);
                }

                if (this.method == "ADD") {
                    $scope.modalEditSurvey.model.vigenciaDesde= $("#vigenciaDesde").val();
                    $scope.modalEditSurvey.model.vigenciaHasta= $("#vigenciaHasta").val();
                    $scope.modalEditSurvey.model.id_perfil = 1
                    $scope.modalEditSurvey.model.creado_por="test"
                    api.post($scope.modalEditSurvey.model, surveyPost_callBack);
                }
            }
        }
        function surveyGet_callBack(res) {
            $scope.surveyList= res.data;
            $scope.modalEditSurvey.setItems(res.data);
        }
        function surveyPut_callBack(res) {
            console.log(" surveyPut_callBack -> ",res)
            if (!api.isError(res)) {
                if (res.statusText != 'OK') {
                    toastr.error(res.data.message);
                } else {
                    $scope.modalEditSurvey.hide();
                }
            }
        }

        var surveyPost_callBack = function (res) {
            console.log(" surveyPost_callBack -> ",res)
            if (!api.isError(res)) {
                if (res.statusText != 'OK') {
                    toastr.error(res.data.message);
                } else {
                    $scope.modalEditSurvey.items.push(res.data)
                    $scope.modalEditSurvey.hide();
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
                /*
                if (!validate.passwordEquals($scope.survey.password, $scope.survey.password_verify)) {
                    alert("La contraseñas no coinciden.")
                    return;
                }
                */
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


 


