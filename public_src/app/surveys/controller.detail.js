import {app} from '../app.init';
import {ApiCaller}  from '../api.caller';

//import {Components,ModalTemplate} from '../components/components';
//import {GridModalCrud} from '../components/grillaModalCrud';


export var SurveyCrud=function ($scope,$http, $routeParams,$compile,AppServiceCaller)
{   var _this=this;
    this.survey={};
    this.voted=false;
    this.api=null;
    this.setApiCaller=function(param){
        _this.api=new ApiCaller(param);
        _this.api.setCaller(AppServiceCaller)
    }
    this.getSurveyById=function(param){
        _this.api.getById(this.surveyDetail_callback,param);
    }
    this.surveyDetail_callback= function (res){
        $scope.survey=res.data;
        _this.survey=res.data;
        _this.renderSurvey();
    }
    this.sendSurvey=function(){
        console.log("Pendiente", $scope.survey)
        /*
            $scope.survey.questions.ciudadano=$routeParams.ce;
            $scope.sendSurvey= {ciudadano: $routeParams.ce, answers:$scope.survey.questions};
            SurveyVote.update({ surveyId:$scope.survey._id},$scope.sendSurvey  , function(res){
                console.log("- Survey Add - Update",res);
                if(typeof  res.res!='undefined'){
                    alertar(res.res, 'danger');
                }
            });
            for(var i=0;i<$scope.survey.questions.length;i++){
                if($scope.survey.questions[i].type.type=="CHECKLIST"){
                    console.log(i,$scope.survey.questions[i].list);
                }else{
                    console.log(i,$scope.survey.questions[i].response);
                }
            }

            if ($scope.yaenviado) {
                alertar('Encuesta ya fue enviada con anterioridad', "info");
                return;
            }
            $scope.yaenviado = true;
            alertar('Encuesta enviada. Muchas Gracias.', "info");
        */
    }
    this.setRenderObjectId=function(param){
        _this.renderObjectId=param;
    }
    this.setCompileObject=function(param){
        $(_this.renderObjectId).append($compile(param)($scope));
    }
    this.renderSurvey=function(){
        for(var i=0;i<$scope.survey.questions.length;i++){

            switch ($scope.survey.questions[i].type.type) {
                case "CUSTOM":   
                    this.setCompileObject('<div disabled="false" survey-custom orden="'+(i+1)+'" custom="survey.questions['+i+']" ></div>');                 
                    break;
                case "LIST":
                    this.setCompileObject('<div disabled="false" survey-radiolist orden="'+(i+1)+'" radio="survey.questions['+i+']" ></div>')                    
                    break;
                case "CHECKLIST":
                    this.setCompileObject('<div disabled="false" survey-checklist orden="'+(i+1)+'" check="survey.questions['+i+']" ></div>');                    
                    break;
                case "SELECT":
                    this.setCompileObject('<div disabled="false" survey-select orden="'+(i+1)+'" select="survey.questions['+i+']" ></div>');
                    break;
                case "QUALITY":   
                    this.setCompileObject('<div disabled="false" survey-quality orden="'+(i+1)+'"  quality="survey.questions['+i+']" ></div>');                 
                    break;
                case "MATRIX":                    
                    this.setCompileObject('<div disabled="false" survey-matrix orden="'+(i+1)+'"  matrix="survey.questions['+i+']" ></div>');
                    break;
                case "DATETIME":                    
                    this.setCompileObject('<div disabled="false" survey-datetime orden="'+(i+1)+'" date="survey.questions['+i+']" ></div>');
                    break;
                case "TIME":                    
                    this.setCompileObject('<div disabled="false" survey-timepicker orden="'+(i+1)+'" time="survey.questions['+i+']" ></div>');
                    break;    
                default:
                    var x="No value found";
            }
        }
    }
    
}


export var controllerSurveyDetail = function ($scope,$http, $routeParams,$compile,AppServiceCaller) {
    
    $scope.detail=new SurveyCrud($scope,  $http,  $routeParams,  $compile,  AppServiceCaller);
    $scope.detail.setApiCaller("survey");
    $scope.detail.getSurveyById($routeParams.id);
    $scope.detail.setRenderObjectId("#DinamicDiv");

    $scope.addQuestion=function(){
        window.location.href = "/#!/surveyAddQuestion/"+$routeParams.id;
    }
    

}

controllerSurveyDetail.$inject = ['$scope','$http','$routeParams','$compile','AppServiceCaller'];
app.controller('controllerSurveyDetail', ['$scope','$http','$routeParams','$compile','AppServiceCaller',controllerSurveyDetail])
 




