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
 
    app.directive('surveyQuality', function () {
            return {
                restrict: 'EA',
                template: require('./views/quality.html'),
                replace: true,
                scope: { quality: '=',orden:'=',disabled:'=' }
            }
        }
    )
    app.directive('surveySelect', function () {
        return {
            restrict: 'EA',
            template: require('./views/select.html'),
            replace: true,
            scope: { select: '=',orden:'=',selected:'=',disabled:'=' }
        }
    })
    app.directive('surveyChecklist', function () {
            return {
                restrict: 'EA',
                template: require('./views/checklist.html'),
                replace: true,
                scope: { check: '=',orden:'=',disabled:'='}
            }
        }
    )
    app.directive('surveyRadiolist', function () {
            return {
                restrict: 'EA',
                template: require('./views/radiolist.html'),
                replace: true,
                scope: { radio: '=',orden:'=',disabled:'='}
            }
        }
    )
    app.directive('surveyCustom', function () {
            return {
                restrict: 'EA',
                template: require('./views/custom.html'),
                replace: true,
                scope: { custom: '=',orden:'=',disabled:'='}
            }
        }
    )
    app.directive('surveyMatrix', function () {
            return {
                restrict: 'EA',
                template: require('./views/matrix.html'),
                replace: true,
                scope: { matrix: '=',orden:'=',disabled:'='}
            }
        }
    )
    app.directive('surveyDatetime', function () {
            return {
                restrict: 'EA',
                template: require('./views/datetime.html'),
                replace: true,
                scope: { input:'=', orden:'='}
            }
        }
    )
    app.directive('surveyTimepicker', function () {
        return {
            restrict: 'EA',
            template: require('./views/timepicker.html'),
            replace: true,
            scope: { input: '=',orden:'='},
            controller:function($scope){
                moment.locale('en')
                $scope.myDate = moment()
            }
        }
    }
)}

