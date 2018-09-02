    import {app} from '../app.init';
    import {ApiCaller}  from '../api.caller';
    import {Components,ModalTemplate} from '../components/components';
    import {GridModalCrud} from '../components/grillaModalCrud';
    
    
    
    export var controllerSurveys= function  ($scope,$http,$filter,AppServiceCaller, AplicationText) {
         
        
        var SURVEY_COLUMNS=[
            {show:false,name:'id',             field:'_id',            tip: '',               order:{desc:false}},
            {show:true ,name:'Name',           field:'name',           tip: '',               order:{desc:false},
             link:{page:"surveyDetail",param:"_id"}},
            {show:true ,name:'Vigencia desde', field:'vigenciaDesde',  tip: '',filter:'date', order:{desc:false}},
            {show:true ,name:'Vigencia hasta', field:'vigenciaHasta',  tip: '',filter:'date', order:{desc:false}},
            {show:true ,name:'Enabled',        field:'isEnabled',      tip: '',               order:{desc:false}},
            {show:true ,name:'Default',        field:'isDefault',      tip: '',               order:{desc:true}},
        ]
        $scope.survey=new GridModalCrud($scope,$http,$filter,ModalTemplate,ApiCaller,AppServiceCaller,AplicationText);
        

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
        $scope.survey.grid.title="Survey"
        $scope.survey.grid.config.query.field='name';

        $scope.survey.modal.title="Survey Modal"
        $scope.survey.grid.HttpGetFromDB();
        

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
    controllerSurveys.$inject = ['$scope','$http','$filter','AppServiceCaller','AplicationText'];
    app.controller('controllerSurveys', ["$scope",'$http','$filter',"AppServiceCaller", "AplicationText", controllerSurveys])


 
