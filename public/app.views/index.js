window.angular.module('ab.controllers.index', [])
  .controller('IndexController', ['$scope','Global',


    function ($scope, Global) {

        $scope.global = Global;
        $scope.myInterval = 55000;
        $scope.signIn=Global.isSignedIn();
        $scope.submnu1 = 'block'

        var slides;
        slides = $scope.slides = [];
        var frases = $scope.frases = [
            ['', '', '', '', '']
        ];

        $scope.subMenu = function(num) {
            if (num == 1) { if ($scope.submnu1 == 'none') {$scope.submnu1 = 'block';} else {$scope.submnu1 = 'none'}}

        };

        var altura = $scope.altura = [385,385,445,185,385,385, 385, 385, 385, 445,385,385, 385]
        var rightleft = $scope.rightleft = ['left', 'right', 'center', 'right', 'right', 'right', 'right', 'right', 'right', 'left', 'center', 'left', 'right']
        var cocolor = $scope.cocolor = ['white', 'black', 'black', 'black', '#858a8f', '#efefef', '#858a8f', 'white', 'black', 'white', 'black', 'black', 'black' ]

        $scope.addSlide = function() {
            /*var newWidth = 200 + ((slides.length + (1255 * slides.length)) % 50);*/
            var newWidth =  (slides.length ) ;

            slides.push({
                image: '../img/f/f' + newWidth + '.jpg',
                text: frases[slides.length % 5],
                estilo: 'bottom: '+ altura[(slides.length )] + 'px; ' +
                        'text-align: ' + rightleft[(slides.length )] + '; ' +
                        'color: ' + cocolor[(slides.length )]

            });
        };

        for (var i=0; i<13; i++) {
            $scope.addSlide();
        }
    }


]);


