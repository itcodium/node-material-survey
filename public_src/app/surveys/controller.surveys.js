    import {app} from '../app.init';
    import {ApiCaller}  from '../api.caller';
    import {API_METHOD}       from '../api.caller';
    import {Components,ModalTemplate} from '../components/components';
    
    require("jquery");
    require('bootstrap');
    
    export var controllerSurveys= function  ($scope,$http,$filter,AppServiceCaller, AplicationText) {
       
        var SURVEY_COLUMNS=[
            {show:false,name:'id',             field:'_id',            tip: '',               order:{desc:false}},
            {show:true ,name:'Name',           field:'name',           tip: '',               order:{desc:false}},
            {show:true ,name:'Vigencia desde', field:'vigenciaDesde',  tip: '',filter:'date', order:{desc:false}},
            {show:true ,name:'Vigencia hasta', field:'vigenciaHasta',  tip: '',filter:'date', order:{desc:false}},
            {show:true ,name:'Enabled',        field:'isEnabled',      tip: '',               order:{desc:false}},
            {show:true ,name:'Default',        field:'isDefault',      tip: '',               order:{desc:true}}
        ]
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
            api.setCaller(AppServiceCaller)
            
        $scope.AplicationText = AplicationText;
        
        $scope.modalEditSurvey = new ModalTemplate();
        $scope.modalEditSurvey.modal_name = "editSurvey";
        $scope.modalEditSurvey.title = "Survey";
        $scope.modalEditSurvey.key_id = "_id";
        $scope.modalEditSurvey.template =require("./forms/addSurvey.html"); 
        $scope.modalEditSurvey.pageText = $scope.pageText;
        $scope.modalEditSurvey.AplicationText = AplicationText;

        
        
        $scope.grillaSurvey=new Components.Grilla($http,$filter);
        $scope.grillaSurvey.config.url="/api/survey";
        $scope.grillaSurvey.config.columns=SURVEY_COLUMNS;
        $scope.grillaSurvey.setPageLimit(4)
        $scope.grillaSurvey.HttpGetFromDB();

        $scope.grillaSurvey.onDelete=function(){
            $scope.modalEditSurvey.open('DELETE'); 
        }

        $scope.grillaSurvey.onAdd=function(){
            $scope.modalEditSurvey.open('ADD'); 
        }

        $scope.grillaSurvey.onEdit=function(){
            $scope.modalEditSurvey.open('EDIT'); 
        }

        $scope.modalEditSurvey.onShow=function(){
            
        
 
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
 
        $scope.modalEditSurvey.submit = function (form) {
            
            this.form = form;
            if (form.$valid) {
            
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
                    $scope.grillaSurvey.HttpGetFromDB();
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
 
        
        /*
        function surveyGet_callBack (res) {
            console.log("res",res)
            $scope.grillaSurvey.data=res.data;
            $scope.grillaSurvey.config.loading=false;
        }
        */

    };
    
    controllerSurveys.$inject = ['$scope','$http','$filter','AppServiceCaller','AplicationText'];
    app.controller('controllerSurveys', ["$scope",'$http','$filter',"AppServiceCaller", "AplicationText", controllerSurveys])


 
