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
            scope: { question: '=',orden:'=',disabled:'=', buttonOn:'=', target:'=', surveysize:'='}
        }
    }
)
    app.directive('surveyQuality', function () {
            return {
                restrict: 'EA',
                template: require('./views/survey/quality.html'),
                replace: true,
                scope: { question: '=',orden:'=',disabled:'=' , buttonOn:'=', target:'=', surveysize:'='}
            }
        }
    )

    var surveySelectController=function($scope) {
        var vm=this;
        this.$onInit = function() {
            vm.id=Math.random().toString(36).substring(2, 8) + Math.random().toString(36).substring(2, 8);
            setTimeout(function(){ 
                $('#'+vm.id).material_select();
                $('#'+vm.id).on('change', function() {
                    vm.select.input=$('#'+vm.id).val();
                 });
            }, 100);
        };
    }
    surveySelectController.$inject = ['$scope'];
    app.component('surveySelect',   {
        template: require('./views/survey/select.html'),
        bindings: {
            question: '=',
            orden:'=',
            selected:'=',
            disabled:'=' , 
            buttonOn:'=', 
            target:'=',
            surveysize:'='
        },
        controllerAs: 'vm',
        controller:surveySelectController 
    })



    app.directive('surveyChecklist', function () {
            return {
                restrict: 'EA',
                template: require('./views/survey/checklist.html'),
                replace: true,
                scope: { question: '=',orden:'=',disabled:'=', buttonOn:'=', target:'=', surveysize:'='}
            }
        }
    )
    app.directive('surveyRadiolist', function () {
            return {
                restrict: 'EA',
                template: require('./views/survey/radiolist.html'),
                replace: true,
                scope: { question: '=',orden:'=',disabled:'=', buttonOn:'=', target:'=', surveysize:'='}
            }
        }
    )

    app.directive('surveyMatrix', function () {
            return {
                restrict: 'EA',
                template: require('./views/survey/matrix.html'),
                replace: true,
                scope: { question: '=',orden:'=',disabled:'=', buttonOn:'=', target:'=', surveysize:'='}
            }
        }
    )
    app.directive('surveyDatetime', function () {
            return {
                restrict: 'EA',
                template: require('./views/survey/datetime.html'),
                replace: true,
                scope: { question:'=', orden:'=',disabled:'=', buttonOn:'=', target:'=', surveysize:'='}
            }
        }
    )
    app.directive('surveyTimepicker', function () {
        return {
            restrict: 'EA',
            template: require('./views/survey/timepicker.html'),
            replace: true,
            scope: { question: '=',orden:'=',disabled:'=', buttonOn:'=', target:'=', surveysize:'='},
            controller:function($scope){
                moment.locale('en')
                $scope.myDate = moment()
            }
        }
    }
)}

