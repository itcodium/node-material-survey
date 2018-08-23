import {app} from './app.init';

export var appController =function($scope,$route) {
    /*
    if(!window.user){
        window.location.href="signin"
    }
    */
    $scope.appName = "RRHH";
    $scope.message = 'Ver. 0.0.1';
    $scope.titulo="";
    $scope.footer = "Version 0.0.1"; // &copy;
    $scope.screen = null;

    $scope.refresh=function(){
        $route.reload();
    }
 
    $scope.toogleNavBar=function(){
        console.log("test bar")
        $('#slide-out').attr("style","transform:translateX(-100%);transition-duration: 250ms;");
        $('#sidenav-overlay').remove();
    }
    
}


appController.$inject = ['$scope','$route'];

app.controller('appController',["$scope","$route","$templateCache", appController]);

