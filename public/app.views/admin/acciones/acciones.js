
/***************************************************************
 Listar acciones
 ***************************************************************/
app.controller('accionesList.ctrl', ['$scope',"$resource",'datacontext','Acciones','Global',
    function ($scope, $resource,datacontext,Acciones,Global) {
        $scope.accion="";
        $scope.editar=false;
        $scope.acciones={};

        $scope.signIn=Global.isSignedIn();
        $scope.authorized=false;

        if($scope.signIn) {
            $scope.loading=true;
            var vAccion= $resource('/admin/acciones');
            vAccion.query(function(res) {
                $scope.acciones=res;
                $scope.loading=false;
                $scope.authorized=true;
            },function(err){
                $scope.loading=false;
                if (err.status == 401) {
                    $scope.authorized=false;
                    alertar(err.data.error, "danger")
                }
            });
        }else{
            Global.goToSignIn();
        }

        $scope.habilitarEdicion=function(){
            $scope.editar=!$scope.editar;
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
        //endregion Mensajes
    }]);


/*
 $scope.accion="";
 $scope.editar=false;
 $scope.acciones={};
 $scope.signIn=Global.isSignedIn();
 $scope.loading=true;
 $scope.authorized=false;

 if($scope.signIn) {
 var vAccion = $resource('/admin/acciones');
 vAccion.query(function (res) {
 $scope.acciones=res;
 }, function (err) {
 $scope.loading = false;
 if (err.status == 401) {
 alert(err.data.error)
 }
 });
 }
 * */

/***************************************************************
 Update acciones Perfil: Modificar solo las acciones del perfil
 ***************************************************************/
/*
 app.controller('perfilAccionesUpdate.ctrl', ['$scope','$routeParams','$resource','datacontext','Perfiles','Acciones',
 function ($scope, $routeParams, $resource,datacontext,Perfiles,Acciones) {
 $scope.perfiles= {};
 $scope.message= {};
 $scope.perfil = {};
 $scope.acciones= {};

 $("#success").hide();
 $("#Container_Perfil").addClass("loadingContent");
 var vPerfiles= $resource('/admin/perfiles/:perfilId', {perfilId:$routeParams.perfilId});
 $scope.perfil= vPerfiles.get({perfilId:$routeParams.perfilId}, function(res) {
 $("#Container_Perfil").removeClass("loadingContent");
 $("#Container_Acciones").addClass("loadingContent").show();
 Acciones.query(function(res) {
 $scope.acciones=res;
 initList($scope.acciones,$scope.perfil.acciones,"code");
 $("#Container_Acciones").removeClass("loadingContent");
 $("#btnGuardar_Perfil").show();
 }, function(error) {});
 });

 $scope.guardarPerfil= function() {
 $scope.perfil.acciones=[];
 for (var d = 0, len = $scope.acciones.length; d < len; d += 1) {
 if ($scope.acciones[d].selected==true) {
 $scope.perfil.acciones.push($scope.acciones[d]);
 }
 }

 var perfil= new Perfiles($scope.perfil);
 $("#btnGuardar_Perfil").prop( "disabled", true );
 Perfiles.update({id: $scope.perfil._id}, $scope.perfil, function(res){
 if(res.result=="error"){
 alert(res.message);
 }else{
 // Save result!!
 $scope.perfil=res.data;
 }
 $("#btnGuardar_Perfil").prop( "disabled", false );
 });
 };
 }]);
 */

/***************************************************************
 Modificar Perfil
 ***************************************************************/
 /*
  -- -BORRAR ---
app.controller('accionUpdate.ctrl', ['$scope','$routeParams','$resource','$location','datacontext','Acciones',
    function ($scope,$routeParams,$resource,$location,datacontext,Acciones) {
        $scope.saveAccion= function() {

            if(typeof  $routeParams.accionId!='undefined'){
                $("#btnGuardar_Perfil").prop( "disabled", true );
                Acciones.update({id: $scope.perfil._id}, $scope.accion, function(res){
                    $("#btnGuardar_Accion").prop( "disabled", false );
                    console.log("btnGuardarAccion",res);
                    if(res.result=="error"){
                        alert(res.message);
                    }
                    else{
                        $location.path('acciones');
                    }
                });
            }


        }
    }]);
 */
/***************************************************************
 Crear Accion
 ***************************************************************/

app.controller('accionesCreate.ctrl', ['$scope','$routeParams','$resource','$location','datacontext','Acciones','Global',
    function ($scope,$routeParams,$resource,$location,datacontext,Acciones,Global) {
        $scope.accion={};
        $scope.signIn=Global.isSignedIn();
        $scope.authorized=true;
        $scope.loading=false;
        console.log("ACCIONES 1");
        if($scope.signIn) {
            if(typeof  $routeParams.accionId!='undefined'){
                $scope.loading=true;
                console.log("ACCIONES 2");
                Acciones.get({id:$routeParams.accionId}, function(res) {
                    console.log("OK",res);
                    $scope.accion=res;
                    $scope.loading=false;
                    $scope.authorized=true;

                },function(err){
                    console.log("err",err);
                    $scope.loading=false;
                    if (err.status == 401) {
                        $scope.authorized=false;
                        alertar(err.data.error, "danger")
                    }
                });
            }
        }else{
            Global.goToSignIn();
        }

        $scope.saveAccion= function() {
            $scope.loading=true;
            if(typeof  $routeParams.accionId!='undefined'){
                Acciones.update({id: $scope.accion._id}, $scope.accion, function(res){
                    if(res.result=="error"){
                        $scope.loading=false;
                        $scope.authorized=true;
                        alertar(res.message, "warning")
                    }
                    else{$location.path('acciones');}
                },function(err){
                    $scope.loading=false;
                    if (err.status == 401) {
                        $scope.authorized=false;
                        alertar(err.data.error, "danger")
                    }
                });
            }else{
                var vAccion= new Acciones($scope.accion);
                $("#btnGuardar_Accion").prop( "disabled", true );
                vAccion.$save(function(p){
                    if(p.result=="error"){
                        $scope.loading=false;
                        $scope.authorized=true;
                        alertar(p.message, "warning")
                    }else{
                        $location.path('acciones');
                    }
                },function(err){
                    $scope.loading=false;
                    if (err.status == 401) {
                        $scope.authorized=false;
                        alertar(err.data.error, "danger")
                    }
                });
            }
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
        //endregion Mensajes
    }]);


/***************************************************************
 Modificar Perfil: Modifica todo los datos del perfil.
 ***************************************************************/

app.controller('accionesDelete.ctrl', ['$scope','$routeParams','$resource','$location','datacontext','Acciones','Global',
    function ($scope,$routeParams,$resource,$location,datacontext, Acciones,Global) {
        $scope.accion= {};
        $scope.signIn=Global.isSignedIn();
        $scope.authorized=false;

        if($scope.signIn) {
            if(typeof  $routeParams.accionId!='undefined'){
                Acciones.get({id:$routeParams.accionId}, function(res) {
                    $scope.loading=false;
                    $scope.authorized=true;
                    $scope.accion=res;
                },function(err){
                    $scope.loading=false;
                    if (err.status == 401) {
                        $scope.authorized=false;
                        alertar(err.data.error, "danger")
                    }
                });
            }
        }else{
            Global.goToSignIn();
        }


        $scope.borrarAccion= function() {
            if(typeof  $routeParams.accionId!='undefined'){
                Acciones.delete({id: $scope.accion._id}, function(res){
                    if(res.result=="error"){
                        alertar(res.message, "warning")
                    }
                    else{
                        $location.path('acciones');
                    }
                });
            }
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
        //endregion Mensajes
    }]);
