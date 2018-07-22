app.controller('pentaho.ctrl', ['$scope',"$resource","$http",'$routeParams', 'Global', '$sce','datacontext','Pentaho',
    function ($scope, $resource,$http,$routeParams, Global, $sce,datacontext,Pentaho) {


        Global.setModule('visor');

        $scope.roots = new Array();
        $scope.paths = [];
        $scope.path = [];
        $scope.auditoria = "/public/Secretaría Naciona de la Administración Pública/Auditoria";
        $scope.pentahoUrl="http://192.168.70.22:8080/pentaho/api/repos/";
        $scope.pentahoUrlRoot="http://192.168.70.22:8080/pentaho";

        $scope.getReport=function(report){
            $scope.reporte="";
            var isAnalyzer= report.indexOf(".xanalyzer",0 );
            if(isAnalyzer>0){
                report=$scope.pentahoUrl+report+"/editor";
                console.log("report",report);
                window.open(report);
            }else{
                // Codigo para mostrar el reporte en la misma pagina
                $("#Report_content").addClass("loadingContent");
                $http.post( '/pentaho/report', {path: report}).then(function(response) {
                    $("#Report_content").removeClass("loadingContent").show();
                    var pentaho=response.data.replace(/\/pentaho/g,$scope.pentahoUrlRoot);
                    $scope.reporte = $sce.trustAsHtml(pentaho);
                });
            }
        }

        $scope.getRoot=function(path){
            $scope.roots=[];
            $("#Report_root").addClass("loadingContent");
            $http({ url: '/pentaho/root', method: "GET", params: {path: encodeURI(path)} }).then(function(response) {
                $scope.roots=[];
                $("#Report_root").removeClass("loadingContent").show();
                console.log("response.data",response.data);
                $($.parseXML(response.data)).find('repositoryFileDtoes').find('repositoryFileDto').each (function() {
                    var root={  name:$(this).find('name').text(),
                        path:$(this).find('path').text(),
                        title:$(this).find('title').text(),
                        folder:$(this).find('folder').text()};

                    $scope.roots.push(root);
                });
            },
                function(data) {
                    alertar("Error", "danger");
                    console.log("Error",data)
                })
        }


       $scope.openItem=function(p){
           $scope.reporte="";
           if (typeof p!="number"){
               $scope.callUrl(p);
           }else{
               $scope.path = { folder:$scope.roots[p].folder,
                                path:$scope.roots[p].path};
               $scope.callUrl($scope.path);
           }
        }

        $scope.callUrl=function(param){
            if(param.folder=="true"){
                $scope.paths.push(param);
                $scope.getRoot(param.path.replace("/", ":"));
            }else{console.log("*** ********aram.path",param.path);

                $scope.getReport(encodeURI(param.path.replace(/[/]/g,':')));
            }
        }

        $scope.back=function(){
            // se hacen 2 pop para obtener el path anterior sino se devuelve el path actual
            var p= $scope.paths.pop();
                p= $scope.paths.pop();
            $scope.path=p;
            $scope.openItem($scope.path);
        }

        // inicio
        try {
            // obtener param auditoria
            console.log("**********",$routeParams);
            console.log("$routeParams.pollId",$routeParams.path,$routeParams);
            if ($routeParams.path=="auditoria") {
            $scope.path={folder:"true",path: $scope.auditoria};}
            else
            {$scope.path={folder:"true",path: "/"};}

            $scope.openItem($scope.path );
        }catch(err) {
            alertar(err.message, "danger");
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
