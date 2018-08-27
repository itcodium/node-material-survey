import {app} from '../app.init';
import {ApiCaller}  from '../api.caller';
import {Components,ModalTemplate} from '../components/components';
import {GridModalCrud} from '../components/grillaModalCrud';


// ,datacontext, Global,SurveyVote


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
        // Pendiente ....
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
                    this.setCompileObject('<div survey-custom orden="'+(i+1)+'" custom="survey.questions['+i+']" ></div>');                 
                    break;
                case "LIST":
                    this.setCompileObject('<div disabled="true"  survey-radiolist orden="'+(i+1)+'" radio="survey.questions['+i+']" ></div>')                    
                    break;
                case "CHECKLIST":
                    this.setCompileObject('<div disabled="false" survey-checklist orden="'+(i+1)+'" check="survey.questions['+i+']" ></div>');                    
                    break;
                case "SELECT":
                    this.setCompileObject('<div disabled="false"   survey-select orden="'+(i+1)+'" select="survey.questions['+i+']" ></div>');
                    break;
                case "QUALITY":   
                    this.setCompileObject('<div   survey-quality orden="'+(i+1)+'"  quality="survey.questions['+i+']" ></div>');                 
                    break;
                case "MATRIX":                    
                    this.setCompileObject('<div   survey-matrix orden="'+(i+1)+'"  matrix="survey.questions['+i+']" ></div>');
                    break;
                case "DATETIME":                    
                    this.setCompileObject('<div disabled="false"   survey-datetime orden="'+(i+1)+'" input="survey.questions['+i+']" ></div>');
                    break;
                case "TIME":                    
                    this.setCompileObject('<div disabled="false"   survey-timepicker orden="'+(i+1)+'" input="survey.questions['+i+']" ></div>');
                    break;    
                default:
                    var x="No value found";
            }

             /*
            if($scope.survey.questions[i].type.type=="CUSTOM"){
                
            }
            if($scope.survey.questions[i].type.type=="LIST"){
                
            }
            if(_this.survey.questions[i].type.type=="CHECKLIST"){
                
            }
            if($scope.survey.questions[i].type.type=="SELECT"){
                var selectedItem=-1;
                for(var j=0;j<$scope.survey.questions[i].list.length;j++){
                
                    if($scope.survey.questions[i].list[j].text==$scope.survey.questions[i].selected.text){
                        selectedItem=j;
                        break;
                    }
                    
                }
                this.setCompileObject('<div disabled="true"  survey-select selected="survey.questions['+i+'].list['+selectedItem+']" orden="'+(i+1)+'" select="survey.questions['+i+']" ></div>');

            }

           
            if(_this.survey.questions[i].type.type=="QUALITY") {
                
            }

            if(_this.survey.questions[i].type.type=="MATRIX") {
                
            }

            if(_this.survey.questions[i].type.type=="DATETIME") {
                var strHtml='<div>  \
                    <p>'+i+'. {{survey.questions['+i+'].question}}</p><br>  \
                    <div class="col-md-2">  \
                        <input   placeholder="yy/mm/dd" ng-model="survey.questions['+i+'].response" class="form-control input-sm" type="text" id="datepicker'+i+'" name="datepicker'+i+'" ng-model="datepicker'+i+'"/>  \
                    </div>  \
                    </div> <br><br> \
                <script> \
                    $("#datepicker'+i+'").datepicker({ \
                        defaultDate: "+1w", \
                        changeYear: true, \
                        dateFormat: "yy/mm/dd",\
                        changeMonth: true, \
                        numberOfMonths: 1 \
                    });\
                </script>';
                //var html= $compile(strHtml)($scope);
                //$(_this.renderObjectId).append(html);
                
            }
            if(_this.survey.questions[i].type.type=="TIME") {
                var strHtml='   <div class="form-group"> \
                                        <p>'+i+'. {{survey.questions['+i+'].question}}</p> \
                                <div class="input-group bootstrap-timepicker timepicker"> \
                                    <input   id="timepicker'+i+'" ng-model="survey.questions['+i+'].response" data-minute-step="1" type="text" class="form-control input-small"> \
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span> \
                                </div> \
                                <script type="text/javascript"> \
                                    $("#timepicker'+i+'").timepicker(); \
                                </script> \
                                <!--http://jdewit.github.io/bootstrap-timepicker/--> \
                                </div>';


                // var html= $compile(strHtml)($scope);
                // $(_this.renderObjectId).append(html);
            }
            */
        }
    }
    
}


export var controllerSurveyDetail = function ($scope,$http, $routeParams,$compile,AppServiceCaller) {
    
    $scope.detail=new SurveyCrud($scope,  $http,  $routeParams,  $compile,  AppServiceCaller);
    $scope.detail.setApiCaller("survey");
    $scope.detail.getSurveyById($routeParams.id);
    $scope.detail.setRenderObjectId("#DinamicDiv");

}

controllerSurveyDetail.$inject = ['$scope','$http','$routeParams','$compile','AppServiceCaller'];
app.controller('controllerSurveyDetail', ['$scope','$http','$routeParams','$compile','AppServiceCaller',controllerSurveyDetail])
 




