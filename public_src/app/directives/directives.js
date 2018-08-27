var moment = require('moment');
module.exports=function(app){
 
    app.directive('modalInclude', ['$compile', function ($compile) {
        return { 
          restrict: 'E', 
          scope: {
            input: "=",
            ctrModal: "="
          },
          replace: true,
          link: function(scope, element, attrs) {
            
              var template = $compile(scope.input)(scope);
              element.replaceWith(template);               
          }
        }
    }])
    app.directive("modal", function () {
        return {
            template:require('./modal.html'),
            replace: true,
            scope: { input: '=' }
        };
    });

    var DFormattedInput=function($filter, $browser) {
        return {
            require: 'ngModel',
            scope: {
                formatType: '@'
            },
            link: function($scope, $element, $attrs, ngModelCtrl) {
                ngModelCtrl.$render = function() {
                    $element.val($filter($scope.formatType)(ngModelCtrl.$viewValue, false));
                };
            }
        };
    }
    DFormattedInput.$inject = ['$filter', '$browser'];
    
    app.directive('formattedInput',DFormattedInput )
    .filter('fecha', function () {
        return function (fecha) {
            if (!fecha) { return ''; }
            return moment(fecha).parseZone().format('YYYY/MM/DD');
 
        };
    });
}

 