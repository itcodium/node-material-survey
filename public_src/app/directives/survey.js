module.exports=function(app){
  /*  app.directive('hello',function(){
        return{
            restrict:'E',
            scope: {
                message: "="
              },
            template: require('./views/hello.html'),
            controllerAs: 'vm',
            controller:function($scope){
                var vm=this;
                console.log("hello -> ",$scope)
                this.greeting=$scope.message;
            }
        }
    })  */
 
    app.directive('surveyCustom', function () {
        return {
            restrict: 'EA',
            template: require('./views/survey/custom.html'),
            replace: true,
            scope: { custom: '=',orden:'=',disabled:'='}
        }
    }
)
    app.directive('surveyQuality', function () {
            return {
                restrict: 'EA',
                template: require('./views/survey/quality.html'),
                replace: true,
                scope: { quality: '=',orden:'=',disabled:'=' }
            }
        }
    )
    app.directive('surveySelect', function () {
        return {
            restrict: 'EA',
            template: require('./views/survey/select.html'),
            replace: true,
            scope: { select: '=',orden:'=',selected:'=',disabled:'=' }
        }
    })
    app.directive('surveyChecklist', function () {
            return {
                restrict: 'EA',
                template: require('./views/survey/checklist.html'),
                replace: true,
                scope: { check: '=',orden:'=',disabled:'='}
            }
        }
    )
    app.directive('surveyRadiolist', function () {
            return {
                restrict: 'EA',
                template: require('./views/survey/radiolist.html'),
                replace: true,
                scope: { radio: '=',orden:'=',disabled:'='}
            }
        }
    )

    app.directive('surveyMatrix', function () {
            return {
                restrict: 'EA',
                template: require('./views/survey/matrix.html'),
                replace: true,
                scope: { matrix: '=',orden:'=',disabled:'='}
            }
        }
    )
    app.directive('surveyDatetime', function () {
            return {
                restrict: 'EA',
                template: require('./views/survey/datetime.html'),
                replace: true,
                scope: { date:'=', orden:'=',disabled:'='}
            }
        }
    )
    app.directive('surveyTimepicker', function () {
        return {
            restrict: 'EA',
            template: require('./views/survey/timepicker.html'),
            replace: true,
            scope: { time: '=',orden:'=',disabled:'='},
            controller:function($scope){
                moment.locale('en')
                $scope.myDate = moment()
            }
        }
    }
)}

