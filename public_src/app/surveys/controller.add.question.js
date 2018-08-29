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
    $scope.question.createModal("editQuestion","Questions","_id",require("./forms/addQuestion.html"));
    $scope.question.createGrid(
            Components,
            {
                url:"/api/survey/"+$routeParams.id,
                columns: QUESTIONS_COLUMNS,
                limit:5
            }
        );
    
    
    $scope.question.onOpenModal=function(){
        console.log("$scope.question.modal.model",$scope.question.modal.model.question)
        $scope.question.modal.title=$scope.question.modal.model.question;
    }
    $scope.question.grid.HttpGetFromDB(function(res){
        $scope.question.grid.data=res.data.questions;
        $scope.question.grid.title=res.data.name;
    });
   
    /*  -- Solo para pruebas abre el modal y llena el modelo de datos

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
    */



};

controllerAddQuestion.$inject =         ['$scope','$http','$filter','$routeParams','AppServiceCaller','AplicationText'];
app.controller('controllerAddQuestion', ['$scope','$http','$filter','$routeParams','AppServiceCaller','AplicationText', controllerAddQuestion])



