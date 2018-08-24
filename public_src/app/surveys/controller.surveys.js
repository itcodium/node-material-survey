    import {app} from '../app.init';
    import {ApiCaller}  from '../api.caller';
    import {Components,ModalTemplate} from '../components/components';
    import {SurveyApp} from './survey.logic';
    
    //require("jquery");
    //require('bootstrap');
    
    export var controllerSurveys= function  ($scope,$http,$filter,AppServiceCaller, AplicationText) {
         
        var SURVEY_COLUMNS=[
            {show:false,name:'id',             field:'_id',            tip: '',               order:{desc:false}},
            {show:true ,name:'Name',           field:'name',           tip: '',               order:{desc:false}},
            {show:true ,name:'Vigencia desde', field:'vigenciaDesde',  tip: '',filter:'date', order:{desc:false}},
            {show:true ,name:'Vigencia hasta', field:'vigenciaHasta',  tip: '',filter:'date', order:{desc:false}},
            {show:true ,name:'Enabled',        field:'isEnabled',      tip: '',               order:{desc:false}},
            {show:true ,name:'Default',        field:'isDefault',      tip: '',               order:{desc:true}}
        ]
        $scope.survey=new SurveyApp($scope,$http,$filter,ModalTemplate,ApiCaller,AppServiceCaller,AplicationText);
        

        $scope.survey.setApiCaller("survey");
        $scope.survey.createModal("editSurvey","Survey","_id",require("./forms/addSurvey.html"));
        $scope.survey.createGrid(
                Components,
                {
                    url:"/api/survey",
                    columns: SURVEY_COLUMNS,
                    limit:5
                }
            );
        $scope.survey.grid.HttpGetFromDB();
        

        setTimeout(function(){ 
            $scope.survey.grid.onAdd();
        }, 1000);

        var date = new Date;
            var hms=date.getHours().toString()+":"+ date.getMinutes().toString()+":"+ date.getSeconds().toString();
            $scope.survey.modal.enviroment="test"
            $scope.survey.modal.setModel({
                name:"Test -> "+ hms,
                vigenciaDesde:"2018/01/01",
                vigenciaHasta:"2018/12/31",
                isEnabled:true,
                isDefault:true
            });

    /*
        // Copiado hasta aca

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
 */
    };
    
    controllerSurveys.$inject = ['$scope','$http','$filter','AppServiceCaller','AplicationText'];
    app.controller('controllerSurveys', ["$scope",'$http','$filter',"AppServiceCaller", "AplicationText", controllerSurveys])


 
