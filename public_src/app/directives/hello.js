module.exports=function(app){
    
    app.directive('hello',function(){
        return{
            restrict:'E',
            scope:{},
            template: require('./hello.html'),
            controllerAs: 'vm',
            controller:function(){
                var vm=this;
                this.greeting='Hello webpack!!';
            }
        }
    })   
    
    .directive('modalInclude', ['$compile', function ($compile) {
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
  
    
}

 