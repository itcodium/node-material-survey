window.angular.module('ab.controllers.header', [])
	.controller('HeaderController', ['$scope', 'Global', '$location',


        function ($scope, Global, $location) {
            $scope.global = Global;

            //En global estan subtitulo y menu
            $scope.selected = "";

            $scope.cambia = function(){

                //alert('#!/' + $scope.selected );
                $location.path($scope.selected);

                };

    }]);