var app = angular.module("rrhh", ['ngRoute', 'app.services']);
 
 

app.controller('homeController', function ($scope) {
     $scope.message = 'Angular';
});

app.controller("appController", function($scope,$http,$location) {
    $scope.appName = "RRHH";
    $scope.titulo="";
    $scope.footer = "Footer"; // &copy;
    
    $scope.refreshLink = function (pPageTitle) {
        $scope.titulo = pPageTitle;
    }
 
    if ($scope.titulo == "" || $location.path() == "") {
        $scope.titulo = "Home";
    }


});
 

 