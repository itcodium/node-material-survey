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
           // model.list=$scope.events.getList()
           console.log("enviar model -> ",model )
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
    
    $scope.events={
        init:function($scope){


            this.data=$scope.question.grid.selectedItem;
            console.log("this.data",this.data)
            if(!this.data){
                this.data={};
                this.data.list=[];
                this.data.columns=[];
                $scope.question.modal.model.list=this.data.list;
                $scope.question.modal.model.columns=this.data.columns;
            }

            this.selectedIndex=null;
            this.page={};
            // this.EditQuetion=false;
            // this.page.message="";
            this.editarLista=false;
            this.editarColumnas=false;

            this.tab_list_active=true;
            // this.columnText={"text":""};
            // this.listText={"text":""};
           this.tab_list_active=true;
        },
        onChangeTab:function(value){
            /*
            this.editarLista=false;
            this.tab_list_active=true;
            */
            this.tab_list_active=value;
            this.selectedIndex=null;
            console.log("onChangeTab")
        },
        activeTab:function(option,action){
            if((this.tab_list_active==true  && option=="list") || 
               (this.tab_list_active==false && option=="columns")){
                return action +" active"
            } 
            return ""
        }, 
        getList:function(){
            return this.data.list;
        },
        addItemToList: function(){
            if(typeof this.listText.$$hashKey!='undefined'){
                this.editarColumnas=false;
            }else{
                if(this.tab_list_active){
                    this.data.list.push(this.listText);
                } else{
                    this.data.columns.push(this.listText);
                }
            }
            this.listText={};
        },
        modificar_lista:function(item,index){
            this.ItemTextEdit=item;
            this.editarLista=true;
            this.selectedIndex=index;
        },
        addItemToColumn:function(){
            if(typeof this.listText.$$hashKey!='undefined'){
                this.editarColumnas=false;
            }else{
                this.data.columns.push(this.listText);
            }
            this.listText={};
        },
        modificar_columnas:function(item){
            this.ItemTextColumnEdit=item;
        },
        eliminar_lista:function(index){
            if(this.tab_list_active){
                this.data.list.splice(index, 1);
            }else{
                this.data.columns.splice(index, 1);
            }
        },
        editar_lista:function(){
            this.editarLista=!this.editarLista;
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
    $scope.question.modal.events=$scope.events;
    
    

    var callback_surveyType=function(res){
        
        $scope.question.modal.surveyTypes=res.data;
        $scope.question.grid.HttpGetFromDB({},
            function(res){
                $scope.question.modal.survey=res.data;
                $scope.question.grid.data   =res.data.questions;
                $scope.question.grid.title  =res.data.name;
              //  $scope.test_selectGridItem();
            }
        );
    }
 
    $scope.test_selectGridItem=function(){
        // Funcion solo para test 
        $scope.question.grid.selectedItem=$scope.question.grid.data[1]
        $scope.question.grid.onEdit();
    }
    $scope.question.onOpenModal=function(){
        
        var modal_type=$scope.question.modal.model.type;
        angular.forEach($scope.question.modal.surveyTypes, function (type, key) {
            if (typeof modal_type!='undefined' && type._id == modal_type._id) {
                $scope.question.modal.model.type=type;
            }
        });
        $scope.events.init($scope)
        $scope.events.tab_list_active=true;
        console.log("$scope.events.tab_list_active",$scope.events.tab_list_active)
    }

    var api=new ApiCaller("survey",AppServiceCaller);
        api.get(callback_surveyType,{},"getTypes")
   
    /* Solo para pruebas abre el modal y llena el modelo de datos */
    /*
    setTimeout(function(){ 
            console.log("$scope.grid",$scope.question.grid.data)
    }, 1000);
    */
};

controllerAddQuestion.$inject =         ['$scope','$http','$filter','$routeParams','AppServiceCaller','AplicationText'];
app.controller('controllerAddQuestion', ['$scope','$http','$filter','$routeParams','AppServiceCaller','AplicationText', controllerAddQuestion])


