    import {app} from '../app.init';
    import {ApiCaller} from '../api.caller';
    
    
    export var controllerHoteles= function  ($scope,AppServiceCaller, AplicationText) {
        var api = new ApiCaller("hoteles");
            api.setCaller(AppServiceCaller)
            api.get(hotelesGet_callBack);

            $scope.AplicationText = AplicationText;
            $scope.hotelFilter=new FilterHoteles();
            $scope.hotelFilter.api=api;
            $scope.hotelFilter.data=$scope;

        function hotelesGet_callBack (res) {
                $scope.hotelesList= res.data.registros ;
            }
    };
    
    controllerHoteles.$inject = ['$scope','AppServiceCaller','AplicationText'];
    app.controller('controllerHoteles', ["$scope","AppServiceCaller", "AplicationText", controllerHoteles])

    
    export  var FilterHoteles= function () {
        var _this=this;
        this.filter={
            limit: 22,
            order: 'desc',
            page: 1,
            where: ''
        };
        this.data={}
        this.getFilter= function() {
            console.log(this)
        };
        this.setCallBack=function(param){
            _this.getCallBack=param;
        }
    }
 