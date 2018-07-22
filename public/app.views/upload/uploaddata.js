/**
 * Created by CAOB on 8/06/2015.
 */

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

app.controller('uploaddata.ctrl', ['$scope', function ($scope) {
    $scope.message= {"msg":"", "class":"hide",type:"success"};
    $scope.fileName="Seleccionar archivos de datos"
    $scope.progress="none";
    $scope.showMessage= function(message) {
        if (message.status =="ERR"){
                $scope.message= {"msg":message.msg, "class":"show",type:"danger"};
        }
        else{
                $scope.message= {"msg":message.msg, "class":"show",type:"success"};
        }
        if(!$scope.$$phase) {
            $scope.$apply();
        }

    };
    $scope.fileNameChanged=function(p){
        $scope.message= {"msg":"", "class":"hide",type:""};
        $scope.fileName=p.files[0].name  ;
          }

    $scope.upload = function(){
        $('div.progress div.progress-bar').css('width', '0%');
        var file = $scope.fileInput;
        var formData = new FormData();

        if(typeof file == "undefined"){
            $scope.showMessage({status:"ERR", msg:"Debe ingresar un archivo."});
            return;
        }

        formData.append('fileInput', file);
        var xhr = new XMLHttpRequest();
        xhr.open('post', '/upload', true);
        xhr.upload.onprogress = function(e) {
            if (e.lengthComputable) {
                var percentage = (e.loaded / e.total) * 100;
                $('div.progress div.progress-bar').css('width', percentage + '%');
            }
        };
        xhr.onerror = function(e) {
            console.log("xhr.onerror ",e, e.target.status);
            $scope.progress="none";
            $scope.showMessage({status:"ERR", msg:"Ocurrio un error al enviar los datos."});
        };
        xhr.onload = function(){
            $scope.progress="none";
            $scope.showMessage(JSON.parse(this.responseText));

        }
        $scope.progress="block";
        xhr.send(formData);

    };

}]);
