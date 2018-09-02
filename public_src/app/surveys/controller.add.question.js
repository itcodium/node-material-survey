import {app} from '../app.init';
import {ApiCaller}  from '../api.caller';
import {Components,ModalTemplate} from '../components/components';
import {GridModalCrud} from '../components/grillaModalCrud';



export var controllerAddQuestion= function  ($scope,$http,$filter,$routeParams,AppServiceCaller, AplicationText) {
    var QUESTIONS_COLUMNS=[
        {show:false,name:'id',             field:'_id',            tip: '',       order:{desc:false}},
        {show:true ,name:'Question',       field:'question',       tip: '',       order:{desc:false}},
    ]

    $scope.question=new GridModalCrud($scope,$http,$filter,ModalTemplate,ApiCaller,AppServiceCaller,AplicationText);
    $scope.question.setApiCaller("survey");

    var submit = function (form) {
        var model=$scope.question.modal.model;
        var    id=$scope.question.modal.survey._id;
        this.form = form;
        if (form.$valid) {
            if (this.method == "ADD") {
               $scope.question.api.put(undefined,model, $scope.question.Put_callBack, "addQuestion/"+id);
            }
            if (this.method == "EDIT") {
               $scope.question.api.put( undefined,model, $scope.question.Put_callBack, "addQuestion/"+id);
            }
            if (this.method == "DELETE") {
                var q_id=$scope.question.modal.model._id;
                $scope.question.api.delete( undefined,$scope.question.Delete_callBack, id+"/"+q_id);
             }
        }
    }

    $scope.question.createModal("editQuestion","Questions","_id",require("./forms/addQuestion.html"),submit);
    $scope.question.createGrid(
            Components,
            {
                url:"/api/survey/"+$routeParams.id,
                columns: QUESTIONS_COLUMNS,
                limit:5
            }
        );
    
    $scope.question.modal.title="Add questions";

    var callback_surveyType=function(res){
        $scope.question.modal.surveyTypes=res.data;
        $scope.question.grid.HttpGetFromDB({},
            function(res){
                $scope.question.modal.survey=res.data;
                $scope.question.grid.data   =res.data.questions;
                $scope.question.grid.title  =res.data.name;
            }
        );
    }
 
    $scope.question.onOpenModal=function(){
        var modal_type=$scope.question.modal.model.type;
        angular.forEach($scope.question.modal.surveyTypes, function (type, key) {
            if (typeof modal_type!='undefined' && type._id == modal_type._id) {
                $scope.question.modal.model.type=type;
            }
        });
    }

    var api=new ApiCaller("survey",AppServiceCaller);
        api.get(callback_surveyType,{},"getTypes")
   
    /* Solo para pruebas abre el modal y llena el modelo de datos */
    /*          setTimeout(function(){ 
                $scope.question.grid.onAdd();
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
    */
};

controllerAddQuestion.$inject =         ['$scope','$http','$filter','$routeParams','AppServiceCaller','AplicationText'];
app.controller('controllerAddQuestion', ['$scope','$http','$filter','$routeParams','AppServiceCaller','AplicationText', controllerAddQuestion])


