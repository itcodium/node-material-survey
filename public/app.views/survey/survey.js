
app.factory('Survey', ['$resource', function($resource){
    return $resource('/survey/:id', null, {
        'update': { method:'PUT' }
    });
}]);

app.controller('surveyViewCtrl', ['$scope','$routeParams','$resource','$compile','datacontext', 'Global','SurveyVote',
    function ($scope, $routeParams, $resource,$compile,datacontext, Global,SurveyVote) {
        var vSurvey= $resource('/survey/encuestaPorVotoCiudadano');
        var query={id :$routeParams.surveyId ,ciudadano: $routeParams.ce};

        vSurvey.get(query,function(response){
            $scope.survey=response;
            for(var i=0;i<$scope.survey.questions.length;i++){
                if($scope.survey.questions[i].type.type=="CUSTOM"){
                    $("#DinamicDiv").append($compile('<div disabled="true" survey-custom orden="'+(i+1)+'" custom="survey.questions['+i+']" ></div>')($scope));
                }

                if($scope.survey.questions[i].type.type=="LIST"){
                    $("#DinamicDiv").append($compile('<div disabled="true"  survey-radiolist orden="'+(i+1)+'" radio="survey.questions['+i+']" ></div>')($scope));
                }

                if($scope.survey.questions[i].type.type=="CHECKLIST"){
                    $("#DinamicDiv").append($compile('<div disabled="true"  survey-checklist orden="'+(i+1)+'" check="survey.questions['+i+']" ></div>')($scope));
                }

                if($scope.survey.questions[i].type.type=="SELECT"){
                    var selectedItem=-1;
                    for(var j=0;j<$scope.survey.questions[i].list.length;j++){
                        if($scope.survey.questions[i].list[j].text==$scope.survey.questions[i].selected.text){
                            selectedItem=j;
                            break;
                        }
                    }

                    $("#DinamicDiv").append($compile('<div disabled="true"  survey-select selected="survey.questions['+i+'].list['+selectedItem+']" orden="'+(i+1)+'" select="survey.questions['+i+']" ></div>')($scope));
                }

                if($scope.survey.questions[i].type.type=="QUALITY") {
                    $("#DinamicDiv").append($compile('<div disabled="true" survey-quality orden="'+(i+1)+'"  quality="survey.questions['+i+']" ></div>')($scope));
                }

                if($scope.survey.questions[i].type.type=="MATRIX") {
                   $("#DinamicDiv").append($compile('<div disabled="true" survey-matrix orden="'+(i+1)+'"  matrix="survey.questions['+i+']" ></div>')($scope));
                }

                if($scope.survey.questions[i].type.type=="DATETIME") {
                    var strHtml='<div>  \
                        <p>'+i+'. {{survey.questions['+i+'].question}}</p><br>  \
                        <div class="col-md-2">  \
                            <input disabled="disabled" placeholder="yy/mm/dd" ng-model="survey.questions['+i+'].response" class="form-control input-sm" type="text" id="datepicker'+i+'" name="datepicker'+i+'" ng-model="datepicker'+i+'"/>  \
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
                    var html= $compile(strHtml)($scope);
                    $("#DinamicDiv").append(html);
                }
                if($scope.survey.questions[i].type.type=="TIME") {
                    var strHtml='   <div class="form-group"> \
                                            <p>'+i+'. {{survey.questions['+i+'].question}}</p> \
                                    <div class="input-group bootstrap-timepicker timepicker"> \
                                        <input disabled="disabled" id="timepicker'+i+'" ng-model="survey.questions['+i+'].response" data-minute-step="1" type="text" class="form-control input-small"> \
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span> \
                                    </div> \
                                    </div>';


                    var html= $compile(strHtml)($scope);
                    $("#DinamicDiv").append(html);
                }

            }

                console.log("*** r response ***",response);
        },function(data){
            alert(data.data)
        })

    }]);

//region    CONTROLADOR para armar el formulario de encuesta
app.controller('surveyCtrl', ['$scope','$routeParams','$resource','$compile','datacontext', 'Global','SurveyVote',
    function ($scope, $routeParams, $resource,$compile,datacontext, Global,SurveyVote) {


        $scope.yaenviado = false;
        $scope.survey={};
        $scope.message= {"msg":"", "class":"hide",type:"success"};
        Global.setModule('poll');
        $scope.totalItems=0;


        console.log("** $routeParams **",$routeParams)

        try {
        var vSurvey= $resource('/survey/'+$routeParams.surveyId, {});
        vSurvey.get({}, function(res) {
                   console.log("res -> ", res) 
            $scope.survey=res;
          
            for(var i=0;i<$scope.survey.questions.length;i++){

                if($scope.survey.questions[i].type.type=="CUSTOM"){
                    $("#DinamicDiv").append($compile('<div survey-custom orden="'+(i+1)+'" custom="survey.questions['+i+']" ></div>')($scope));
                }

                if($scope.survey.questions[i].type.type=="LIST"){
                    $("#DinamicDiv").append($compile('<div  survey-radiolist orden="'+(i+1)+'" radio="survey.questions['+i+']" ></div>')($scope));
                }

                if($scope.survey.questions[i].type.type=="CHECKLIST"){
                    $("#DinamicDiv").append($compile('<div disabled="false" survey-checklist orden="'+(i+1)+'" check="survey.questions['+i+']" ></div>')($scope));
                }

                if($scope.survey.questions[i].type.type=="SELECT"){
                    console.log("$scope.survey.questions[i]",$scope.survey.questions[i]);
                    $("#DinamicDiv").append($compile('<div disabled="false"   survey-select orden="'+(i+1)+'" select="survey.questions['+i+']" ></div>')($scope));
                }

                if($scope.survey.questions[i].type.type=="QUALITY") {
                    $("#DinamicDiv").append($compile('<div   survey-quality orden="'+(i+1)+'"  quality="survey.questions['+i+']" ></div>')($scope));
                }

                if($scope.survey.questions[i].type.type=="MATRIX") {
                    $("#DinamicDiv").append($compile('<div   survey-matrix orden="'+(i+1)+'"  matrix="survey.questions['+i+']" ></div>')($scope));
                }

                if($scope.survey.questions[i].type.type=="DATETIME") {
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
                    var html= $compile(strHtml)($scope);
                    $("#DinamicDiv").append(html);
                }
                if($scope.survey.questions[i].type.type=="TIME") {
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


                    var html= $compile(strHtml)($scope);
                    $("#DinamicDiv").append(html);
                }
            }
             
        },function(err){
            console.log(err);
        });
            
            
        }
        catch(err) {
            alertar(err.message, "danger");
        }
            
            
            
        $scope.enviarEncuesta=function(){
            // console.log("Enviar encuesta",$routeParams.ce,$scope.survey);

            $scope.survey.questions.ciudadano=$routeParams.ce;
            $scope.sendSurvey= {ciudadano: $routeParams.ce, answers:$scope.survey.questions};

            console.log("$scope.sendSurvey",$scope.sendSurvey)

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

        }

        //region Mensajes
        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            if (index) {
                $scope.alerts.splice(index, 1);
            } else {
                $scope.alerts = [];
            }
        };

        function alertar(mensaje, type, timoff, strong, linkText, linkFunc) {
            datacontext.alertar($scope.alerts, mensaje, type, timoff, strong, linkText, linkFunc);
            refreshView();
        }

        function refreshView(obj) {
            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                $scope.$apply();
            }
        }
        //endregion
        
        
    }]);
//endregion


/*
 http://localhost:1616/#!/surveyAddQuestion/56548b0c6085437be67120e1
 http://localhost:1616/#!/survey/56548b0c6085437be67120e1
 */



app.controller('surveyAddQuestion.ctrl', ['$scope','$routeParams','$resource','datacontext','Survey',
    function ($scope, $routeParams, $resource,datacontext,Survey) {
      $scope.loading=true;
        $scope.cboTypeDisabled=true;
        $scope.type="";

        var vSurvey= $resource('/survey/'+$routeParams.surveyId, {});
        var vSurveyType= $resource('/survey.GetTypes', {});
        $scope.surveyList= vSurveyType.query({}, function(res) {
            $scope.cboTypeDisabled=false;

            vSurvey.get({}, function(res) {
                $scope.loading=false;
                console.log("GET SURVEY res ",res);
                $scope.survey=res;
                // console.log("$scope.survey",$scope.survey.questions[0].type,$scope.survey);
                $scope.data=$scope.survey.questions[0];
                $scope.type=$scope.surveyList[0];
            });
        },function(err){
            console.log(err);
            $scope.loading=false;
        });
 
    }]);



app.controller('SurveyItemList', ['$scope','$routeParams','$resource','datacontext','Survey','SurveyListAdd',
    function ($scope, $routeParams, $resource,datacontext,Survey,SurveyListAdd) {
        $scope.cboTypeDisabled=true;
        $scope.type="";
        $scope.loading=true;
        $scope.savingQuestion=false;
        $scope.initAddQuestion=function(){
            $scope.page={};
            $scope.EditQuetion=false;
            $scope.page.message="";
            $scope.editarColumnas=false;
            $scope.editarLista=false;
            $scope.columnText={"text":""};
            $scope.listText={"text":""};
            if(typeof $scope.survey=='undefined'){
                $scope.survey= {};
            }
            $scope.data={};
            $scope.data.list=[];
            $scope.data.columns=[];

        }

        $scope.initAddQuestion();
        var vSurvey= $resource('/survey/'+$routeParams.surveyId, {});
        var vSurveyType= $resource('/survey.GetTypes', {});
        $scope.surveyList= vSurveyType.query({}, function(res) {
            $scope.cboTypeDisabled=false;
              vSurvey.get({}, function(res) {
                  $scope.loading=false;
                  $scope.survey=res;
               });
        },function(err){
            console.log(err);
            $scope.loading=false;
        });

        $scope.editarPregunta=function(index){
            console.log("$scope.data",$scope.data)
            $scope.EditQuetion=true;
            $scope.data=$scope.survey.questions[index];
            angular.forEach($scope.surveyList, function (type, key) {
                if (type._id == $scope.survey.questions[index].type._id) {
                    $scope.data.type=type;
                }
            });
        }

        $scope.addItemToList=function(){

            if(typeof $scope.listText.$$hashKey!='undefined'){
                $scope.editarColumnas=false;
            }else{
                console.log("ELSE $scope.ItemText",$scope.listText);
                $scope.data.list.push($scope.listText);
            }
            $scope.listText={};
        }

        $scope.addItemToColumn=function(){
            if(typeof $scope.columnText.$$hashKey!='undefined'){
                $scope.editarColumnas=false;
            }else{
                $scope.data.columns.push($scope.columnText);
            }
            $scope.columnText={};
        }



        $scope.accept=function(){
            console.log("$scope.data",$scope.data);
            $("#btnUpdateQuestionList").prop('disabled', true);
            $scope.savingQuestion=true;
            SurveyListAdd.update({ surveyId:$scope.survey._id}, $scope.data, function(res){
                console.log("- Survey Add - Update",res);
                if($scope.EditQuetion==false){
                    $scope.survey.questions.push(res);
                }
                $scope.page.message="La encuesta ha sido actualizada";
                $scope.initAddQuestion();
                $("#SurveyMessage").show();
                $("#btnUpdateQuestionList").prop('disabled', false);
                $scope.savingQuestion=false;
                window.setTimeout(function() { $("#SurveyMessage").fadeOut("slow");$scope.page.message=""; }, 6000);
            },function(err){
                $("#btnUpdateQuestionList").prop('disabled', false);
                $scope.savingQuestion=false;
            });
        }

        $scope.modificar_columnas=function(item){
            console.log("- modificarColumna - Update",item);
            $scope.ItemTextColumnEdit=item;
          //  $scope.editing=false;
          //  $scope.itemEditing=true;
        }

        $scope.modificar_lista=function(item){
            console.log("- modificar_lista - Update",item);
            $scope.ItemTextEdit=item;
           // $scope.editing=false;
           // $scope.itemEditing=true;
        }

        $scope.eliminar_columnas=function(index){
            console.log("- eliminarColumna - Update",index);
            $scope.data.columns.splice(index, 1);
        }
        $scope.eliminar_lista=function(index){
            $scope.data.list.splice(index, 1);
        }

        $scope.editar_lista=function(){
           $scope.editarLista=!$scope.editarLista;
            ItemTextEdit.text="";
        }

    }]);

app.directive('surveyItemList', function() {
    return {

        restrict: 'EA',
        templateUrl: 'app.views/survey/survey_item_list.html'
        //replace: true,
        //scope: { survey: '=' }
    };
});

app.directive('surveyQuality', function () {
        return {
            restrict: 'EA',
            templateUrl: 'app.views/survey/quality.html',
            replace: true,
            scope: { quality: '=',orden:'=',disabled:'=' }
        }
    }
)

// surveySelect

 app.directive('surveySelect', function () {
 return {
 restrict: 'EA',
 templateUrl: 'app.views/survey/select.html',
 replace: true,
 scope: { select: '=',orden:'=',selected:'=',disabled:'=' }
 }
 }
 )

app.directive('surveyChecklist', function () {
        return {
            restrict: 'EA',
            templateUrl: 'app.views/survey/checklist.html',
            replace: true,
            scope: { check: '=',orden:'=',disabled:'='}
        }
    }
)

app.directive('surveyRadiolist', function () {
        return {
            restrict: 'EA',
            templateUrl: 'app.views/survey/radiolist.html',
            replace: true,
            scope: { radio: '=',orden:'=',disabled:'='}
        }
    }
)

app.directive('surveyCustom', function () {
        return {
            restrict: 'EA',
            templateUrl: 'app.views/survey/custom.html',
            replace: true,
            scope: { custom: '=',orden:'=',disabled:'='}
        }
    }
)

app.directive('surveyMatrix', function () {
        return {
            restrict: 'EA',
            templateUrl: 'app.views/survey/matrix.html',
            replace: true,
            scope: { matrix: '=',orden:'=',disabled:'='}
        }
    }
)

app.directive('surveyTime', function () {
        return {
            restrict: 'EA',
            templateUrl: 'app.views/survey/timepicker.html',
            replace: true,
            scope: { time: '=',orden:'='}
        }
    }
)


app.controller('surveyCreate.ctrl', ['$scope','$routeParams','$resource','datacontext','Survey', 'Global', '$location',
    function ($scope, $routeParams, $resource,datacontext,Survey,Global, $location) {
        $scope.title="Crear encuestas";

        Global.setModule('poll');

        //region Mensajes
        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            if (index) {
                $scope.alerts.splice(index, 1);
            } else {
                $scope.alerts = [];
            }
        };


        function alertar(mensaje, type, timoff, strong, linkText, linkFunc) {
            datacontext.alertar($scope.alerts, mensaje, type, timoff, strong, linkText, linkFunc);
            refreshView();
        }

        function refreshView(obj) {
            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                $scope.$apply();
            }
        }
        //endregion Mensajes


        //region datepicker
        $(function() {
            $.datepicker.regional['es'] = {
                closeText: 'Cerrar',
                prevText: '<Ant',
                nextText: 'Sig>',
                currentText: 'Hoy',
                monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
                dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sab'],
                dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sa'],
                weekHeader: 'Sm',
                dateFormat: 'yy/mm/dd',
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: false,
                yearSuffix: ''
            };
            $.datepicker.setDefaults($.datepicker.regional['es']);
            $( "#vigenciaDesde" ).datepicker({
                defaultDate: "+1w",
                changeYear: true,
                changeMonth: true,
                numberOfMonths: 2,
                onClose: function( selectedDate ) {
                    $( "#vigenciaHasta" ).datepicker( "option", "minDate", selectedDate );
                }
            });
            $( "#vigenciaHasta" ).datepicker({
                defaultDate: "+1w",
                changeYear: true,
                changeMonth: true,
                numberOfMonths: 2,
                onClose: function( selectedDate ) {
                    $( "#vigenciaDesde" ).datepicker( "option", "maxDate", selectedDate );
                }
            });
        });
        //endregion



        $scope.accept=function(){
            var newSurvey= new Survey($scope.survey);
            newSurvey.$save(function(p, res) {
                alertar('Encuesta creada correctamente', 'succces');
                $location.path('surveyAddQuestion/'+p._id);
                console.log("SAVE $scope.survey",p._id);
            });
        }


    }]);


app.controller('surveyEditCtrl', ['$scope','$routeParams','$resource','$filter','datacontext','Survey',
    function ($scope, $routeParams, $resource,$filter,datacontext ,Survey) {
        //region Mensajes

        $scope.loading=true;
        $scope.loadingTaxonomia=false;
        $scope.alerts = [];
        $scope.closeAlert = function (index) {
            if (index) {
                $scope.alerts.splice(index, 1);
            } else {
                $scope.alerts = [];
            }
        };

        function alertar(mensaje, type, timoff, strong, linkText, linkFunc) {
            datacontext.alertar($scope.alerts, mensaje, type, timoff, strong, linkText, linkFunc);
            refreshView();
        }

        function refreshView(obj) {
            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                $scope.$apply();
            }
        }

        $scope.data={};
        $scope.data.instituciones=user.instituciones;

        var vSurvey= $resource('/survey/'+$routeParams.surveyId, {});
        vSurvey.get({}, function(res) {
            $scope.survey=res;
            $scope.loading=false;
            angular.forEach($scope.data.instituciones, function (institucion, key) {
                if ($scope.survey.institucion != null) {
                    if (institucion._id == $scope.survey.institucion._id) {
                        $scope.survey.institucion = institucion;
                        $scope.getTaxonomiaPorInstitucion();
                    }
                }
            });
        });

        $scope.accept=function(){
            $("#btnEnviarEncuesta").prop('disabled', true);
            Survey.update({id: $scope.survey._id}, $scope.survey, function(res){
                alertar("Se actualizó la encuesta.", "success");
                $("#btnEnviarEncuesta").prop('disabled', false);
            },function(err){
                alertar(err.message, "danger");
            });
        }

        $scope.getTaxonomiaPorInstitucion= function(){
            $scope.data.taxonomias={};


            console.log("$scope.survey.institucion",$scope.survey.institucion);
            if($scope.survey.institucion!=null){
                $scope.loadingTaxonomia=true;
                var vTaxonomia= $resource('/taxonomia/porInstitucion');
                try {

                    vTaxonomia.query({taxInstitucion:$scope.survey.institucion.insSigla},function(res) {
                        $scope.data.taxonomias=res;
                        $scope.loadingTaxonomia=false;
                        if(typeof  $routeParams.surveyId!='undefined'){
                            angular.forEach($scope.data.taxonomias, function(taxonomia, key) {
                                if($scope.survey.taxonomia!=null){
                                    if(taxonomia._id==$scope.survey.taxonomia._id){
                                        console.log("taxonomia",taxonomia);
                                        $scope.survey.taxonomia=taxonomia;
                                    }
                                }
                            });
                        }

                    },function(err){
                        $scope.loadingTaxonomia=false;
                        $scope.loading=false;
                    });
                }
                catch(err) {
                    alertar(err.message, "danger");
                }
            }
        }


        $scope.$watch('survey', function(p) {
            p.vigenciaDesde=$filter('date')(p.vigenciaDesde, "yyyy/MM/dd") ;
            p.vigenciaHasta=$filter('date')(p.vigenciaHasta, "yyyy/MM/dd");
        });


        $(function() {
            $.datepicker.regional['es'] = {
                closeText: 'Cerrar',
                prevText: '<Ant',
                nextText: 'Sig>',
                currentText: 'Hoy',
                monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
                dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sab'],
                dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sa'],
                weekHeader: 'Sm',
                dateFormat: 'yy/mm/dd',
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: false,
                yearSuffix: ''
            };
            $.datepicker.setDefaults($.datepicker.regional['es']);
            $( "#vigenciaDesde" ).datepicker({
                defaultDate: "+1w",
                changeYear: true,
                changeMonth: true,
                numberOfMonths: 2,
                onClose: function( selectedDate ) {
                    $( "#vigenciaHasta" ).datepicker( "option", "minDate", selectedDate );
                }
            });
            $( "#vigenciaHasta" ).datepicker({
                defaultDate: "+1w",
                changeYear: true,
                changeMonth: true,
                numberOfMonths: 2,
                onClose: function( selectedDate ) {
                    $( "#vigenciaDesde" ).datepicker( "option", "maxDate", selectedDate );
                }
            });
        });

    }]);

app.controller('surveyListCtrl', ['$scope','$routeParams','$resource','datacontext',
    function ($scope, $routeParams, $resource,datacontext) {
        $scope.loading=true;
        var vSurvey= $resource('/survey', {});
        vSurvey.query({}, function(res) {
            $scope.surveyList=res;
            $scope.loading=false;
        },function(err){
            console.log(err);
            $scope.loading=false;
        });

        $scope.habilitarEdicion=function(){
            $scope.editar=!$scope.editar;
        }
    }]);