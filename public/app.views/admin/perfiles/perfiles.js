/*
app.factory('perfiles',['$http',function($http){
    var o = {perfiles: [] };
    o.agregarAccion = function(perfiles) {
        return $http.put('/admin/perfiles/' + perfiles._id + '/acciones')
            .success(function(data){
                console.log("-> data perfiles acciones <-",data );
            });
    };
    return o;
}]);

*/


/***************************************************************
    Listar Perfil
 ***************************************************************/
app.controller('perfilList.ctrl', ['$scope',"$resource",'datacontext','Perfiles','Global',
    function ($scope, $resource,datacontext,Perfiles,Global) {
        //console.log("useruser  vuseruseruser",user);
        $scope.user=user;
        $scope.perfil="";
        $scope.editar=false;
        $scope.perfiles={};
        $scope.show=Global.isSignedIn();
        $scope.loading=true;
        $scope.authorized=false;
        if($scope.show){
                    var vPerfil= $resource('/admin/perfiles');
                    vPerfil.query({nivelSeguridad:user.perfiles[0].nivelSeguridad},function(res) {
                        $scope.perfiles=res;
                        $scope.loading=false;
                        $scope.authorized=true;
                    },function(err){
                        $scope.loading=false;
                        if(err.status==401){
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

app.controller('perfilUpdate.ctrl', ['$scope','$routeParams','$resource','$location','datacontext','Perfiles','Acciones',
    function ($scope,$routeParams,$resource,$location,datacontext,  Perfiles,  Acciones) {
        $scope.perfil = {};
        $scope.acciones= [];

        var vPerfiles= $resource('/admin/perfiles/:perfilId', {perfilId:$routeParams.perfilId});
        var vPerfilesAcciones= $resource('/admin/perfiles/acciones', {});
        $("#Container_Perfil").addClass("loadingContent");
         vPerfiles.get({perfilId:$routeParams.perfilId}, function(res) {
             $scope.perfil=res;
             $scope.acciones=$scope.perfil.acciones;
             initList($scope.acciones,$scope.perfil.acciones,"code");
             $("#formPerfil").show();
             $("#btnGuardar_Perfil").show();
             $("#Container_Acciones").removeClass("loadingContent");
             $("#Container_Perfil").removeClass("loadingContent");
            /* $("#Container_Perfil").removeClass("loadingContent");
             $("#formPerfil").show();
             $("#Container_Acciones").addClass("loadingContent");
            vPerfilesAcciones.query(function(res) {
                $scope.acciones=res;
                initList($scope.acciones,$scope.perfil.acciones,"code");
                $("#Container_Acciones").removeClass("loadingContent");
                $("#btnGuardar_Perfil").show();
            }, function(err) {
                if(err.status==401){
                    $("#Container_Acciones").removeClass("loadingContent").html(err.data.error);
                }
            });
             */
        }, function(err) {
             if(err.status==401){
                 alertar(err.data.error, "danger")
             }
         });



        $scope.savePerfil= function() {
            if(typeof  $routeParams.perfilId!='undefined'){
                $scope.perfil.acciones=[];
                for (var d = 0; d < $scope.acciones.length; d++) {
                    if ($scope.acciones[d].selected==true) {
                        $scope.perfil.acciones.push($scope.acciones[d]);
                    }
                }
                $("#btnGuardar_Perfil").prop( "disabled", true );
                Perfiles.update({id: $scope.perfil._id}, $scope.perfil, function(res){
                    $("#btnGuardar_Perfil").prop( "disabled", false );
                    console.log("btnGuardarPerfil",res);
                    if(res.result=="error"){
                        alertar(res.message, "warning")
                    }
                     else{
                         $location.path('perfiles');
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
    Crear Perfil
 ***************************************************************/

app.controller('perfilCreate.ctrl', ['$scope','$routeParams','$resource','$location','datacontext','Perfiles','Acciones','Global',
    function ($scope,$routeParams,$resource,$location,datacontext,  Perfiles,  Acciones,Global) {

        $scope.perfil = {};
        $scope.acciones= {};
        $scope.accion={};
        $scope.signIn=Global.isSignedIn();
        $scope.authorized=true;
        $scope.loading=false;
        console.log("ACCIONES 1");

        var vPerfilesAcciones= $resource('/admin/perfiles/acciones', {});

            $("#Container_Acciones").addClass("loadingContent").show();
            vPerfilesAcciones.query(function(res) {
                $scope.acciones=res;
                $("#Container_Acciones").removeClass("loadingContent");
                $("#btnGuardar_Perfil").show();
                console.log("OK",res);
                $scope.accion=res;
                $scope.loading=false;
                $scope.authorized=true;
            }, function(err) {
                console.log("err",err);
                $scope.loading=false;
                if (err.status == 401) {
                    $scope.authorized=false;
                    alertar(err.data.error, "danger")
                }
            });



        $scope.savePerfil= function() {
                $scope.perfil.acciones=[];
                for (var d = 0; d < $scope.acciones.length; d++) {
                    if ($scope.acciones[d].selected==true) {
                        console.log("$scope.acciones","selected");
                        $scope.perfil.acciones.push($scope.acciones[d]);
                    }
                }

            var perfil= new Perfiles($scope.perfil);
            $("#btnGuardar_Perfil").prop( "disabled", true );
                perfil.$save(function(p){
                    console.log("p.result",p.result);
                    if(p.result=="error"){
                        alertar(p.message, "warning")
                    }else{
                        $location.path('perfiles');
                    }

                });
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


app.controller('perfilDelete.ctrl', ['$scope','$routeParams','$resource','$location','datacontext','Perfiles','Acciones',
    function ($scope,$routeParams,$resource,$location,datacontext,  Perfiles,  Acciones) {
        $scope.perfil = {};
        $scope.acciones= {};

        var vPerfiles= $resource('/admin/perfiles/:perfilId', {perfilId:$routeParams.perfilId});
        $("#Container_Acciones").addClass("loadingContent");
        $scope.perfil= vPerfiles.get({perfilId:$routeParams.perfilId}, function(res) {
            console.log("resres v resresres",res);
             $("#Container_Acciones").removeClass("loadingContent");
        });

        $scope.deletePerfil= function() {
            if(typeof  $routeParams.perfilId!='undefined'){

                Perfiles.delete({id: $scope.perfil._id}, function(res){
                    if(res.result=="error"){
                        alertar(res.message, "warning")
                    }
                    else{
                        $location.path('perfiles');
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
    Detalle del perfil
 ***************************************************************/
/*
app.controller('perfilItem.ctrl', ['$scope','$routeParams','$resource','datacontext','Perfiles','Acciones',
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
                // console.log("$scope.acciones[0].selected", $scope.acciones[d].selected);
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
                    $scope.perfil=res.data;
                    console.log("saved",res.data);
                }
                $("#btnGuardar_Perfil").prop( "disabled", false );
            });
        };
    }]);
*/

/*

app.controller('perfiles.ctrl', ['$scope','datacontext','Perfiles','Acciones',
                        function ($scope,  datacontext,  Perfiles,  Acciones) {

    $scope.perfiles= {};
    $scope.message= {};
    $scope.perfil = {};

    $("#success").hide();
    Perfiles.query(function(res) {
        $scope.perfiles=res;
        $("#Container_Perfil").removeClass("loadingContent");

        console.log("Perfiles Loaded -> user",user);
    }, function(error) {});

    $scope.EditarPerfil= function(perfil){
        $scope.perfil=perfil;
        $scope.acciones={};
        console.log("Perfiles Loaded -> ",perfil);

        $("#Container_Acciones").addClass("loadingContent").show();
        Acciones.query(function(res) {
            $scope.acciones=res;
            initList($scope.acciones,$scope.perfil.acciones,"code");
            $("#Container_Acciones").removeClass("loadingContent");
        }, function(error) {});
    }


                            $scope.EditarAcciones = function toggleSelection(accion){
        console.log("** UPDATE **");
        var item=searchItem( $scope.perfil.acciones,"code",accion["code"]);
        if(accion.selected==true){
            $scope.perfil.acciones.push(accion);
            var pp=$scope.perfil;
            console.log("$scope.perfil._id",pp._id); //{agregarAccion: pp._id},
            Perfiles.agregarAccion( pp, function(p){
                // $scope.perfil=p;
                console.log("p.result",p);
            });

            var perfil= new Perfiles($scope.perfil);
            perfil.$update(function(p){
            if(p.result=="error"){
                    alert(p.message);
                }else{
                    console.log(p);
                }
            })
            console.log("agregar",accion.selected)
        }else{
            console.log("Quitar",accion.selected)
        }
        console.log("$scope.perfil",$scope.perfil);
        //console.log("Perfil.acciones",user.perfiles,  $scope.perfil.acciones);
    };

    $scope.updateAccion = function(accion){
        console.log("** updateAccion **",accion);
    }




}]);

*/

/*
 Ej1: var item=searchItem(array,"key",item);
 Ej2: var item=searchItem($scope.acciones,"code",accion["code"]);
 */

function searchItem(arr,key, value) {
    for (var d = 0, len = arr.length; d < len; d += 1) {
        if (arr[d][key] === value) {
            return arr[d];
        }
    }
}

function initList(listCompleta,SelectedItems, key) {
    for (var i = 0; i < SelectedItems.length; i++) {
        var item=searchItem(listCompleta,key, SelectedItems[i][key]);
        if (!(typeof item === 'undefined')){
            if(item[key]==SelectedItems[i][key]){
                item.selected=true;
            }
        }
    }
}




/*

app.controller('perfilNew.ctrl', ['$scope','$routeParams','$resource','datacontext','Perfiles','Acciones',
    function ($scope,$routeParams,$resource,datacontext,  Perfiles,  Acciones) {

        $scope.perfil=Perfiles.get({id: $routeParams.perfilId });
        var vAcciones= $resource('/admin/acciones');
        $scope.acciones=vAcciones.query({});
        initList($scope.acciones,$scope.perfil.acciones,"code");

        $scope.inicializar_lista= function (listCompleta, subLista,key){

            for (var i = 0, len = subLista.length; i < len; i += 1) {
                var item=searchItem(listCompleta,key, subLista[i][key]);
                if (!(typeof item === 'undefined')){
                    console.log("Init List",item)
                }
            }
        }
        $scope.searchItem=function(arr,key, value) {
            for (var d = 0, len = arr.length; d < len; d += 1) {
                if (arr[d][key] === value) {
                    return arr[d];
                }
            }
        }

        if (typeof $scope.perfil.acciones!='undefined'){
            $scope.inicializar_lista($scope.acciones, $scope.perfil.acciones,"_id");
        }
        $scope.isCollapsed = false;

        $scope.panelNewPerfil= function() {
            $scope.isCollapsed = false;
        }

        $scope.savePerfil= function() {
            console.log("formPerfil.perfil.$valid",$scope.formPerfil.perfil.$valid);
            if(typeof  $routeParams.perfilId!='undefined'){
                for(i=0;i<$scope.perfil.acciones.length;i++){
                    console.log(i," - ",$scope.perfil.acciones[i]);
                    if($scope.perfil.acciones[i].check !=true){
                        $scope.perfil.acciones.splice(i, 1);

                    }
                }
                console.log("$scope.perfil.acciones",$scope.perfil.acciones);

                Perfiles.update({id: $scope.perfil._id}, $scope.perfil, function(res){
                    if(res.result=="error"){
                        alert(res.message);
                    }
                    // else{$location.path('polls');}
                });
            }else{
                var perfil= new Perfiles($scope.perfil);
                perfil.$save(function(p){
                    console.log("p.result",p.result);
                    if(p.result=="error"){
                        alert(p.message);
                    }else{
                        $scope.cancelPerfil();
                    }
                });
            }

        }

        $scope.cancelPerfil= function() {
            $scope.isCollapsed = true;
            $scope.perfil="";
        }

    }]);


 */