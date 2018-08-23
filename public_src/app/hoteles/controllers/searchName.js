import {app} from '../../app.init';
export var hotelSearchNameCtrl=function($scope) {
    $scope.filter=this.value;
    $scope.serchByName=function(){
        $scope.param = angular.copy($scope.filter.filter);
        $scope.param.stars =$scope.param.stars.toString();
        $scope.filter.api.get(hotelesGet_callBack,$scope.param);
    }
    
    function hotelesGet_callBack(res) {
        $scope.filter.data.hotelesList=res.data.registros ;
    }
    
    
}
hotelSearchNameCtrl.$inject = ['$scope'];

 
let hotelSearchNameView = require('../views/searchName.html');

app.component('searchName', {
  template: hotelSearchNameView,
  bindings: {value: '='},
  controller: hotelSearchNameCtrl
});