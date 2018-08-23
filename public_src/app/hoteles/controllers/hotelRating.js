import {app} from '../../app.init';
export var ratingCtrl=function($scope) {
    var _this=this;
    $scope.stars=this.data;
    $scope.exists=typeof (this.exists=='undefined' || this.exists=="false")?false:true;
    
    $scope.getStar = function(index) {
         if(index<= $scope.stars){
            return "fa fa-star";
         } else{
            return "fa fa-star-o";
         }
    }
    $scope.getNumbers = function(param) {
        
        if (!_this.exists){
            return new Array(param);    
        }else{
            return new Array(_this.data);
        }
    }
}

ratingCtrl.$inject = ['$scope'];

let ratingView =          require('../views/hotelRating.html');

app.component('rating', {
  template: ratingView,
  bindings: {data: '=',exists:'='},
  controller: ratingCtrl
});
