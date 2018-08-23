import {app} from '../../app.init';
export var hotelSearchStarCtrl=function($scope) {
    $scope.filter=this.value;
    $scope.starsNumbers=[
        {star:"1", value:false},
        {star:"2", value:false},
        {star:"3", value:false},
        {star:"4", value:false},
        {star:"5", value:false}
    ]
    
    $scope.getNumbers = function(param) {
        return new Array(param-1);
    }
    $scope.toggleAll = function(param) {
        $scope.checkall = !$scope.checkall;
        for(var key in $scope.starsNumbers) {
          $scope.starsNumbers[key].value = $scope.checkall;
        }
    };
    $scope.getChecked=function(){
        var o= _.where($scope.starsNumbers, {value: true});
        $scope.filter.filter.stars=_.pluck(o, 'star');
        return o.length==$scope.starsNumbers.length;
    }
 
}

hotelSearchStarCtrl.$inject = ['$scope'];

let hotelSearchStarView = require('../views/searchStars.html');
app.component('searchStar', {
  template: hotelSearchStarView,
  bindings: {value: '='},
  controller: hotelSearchStarCtrl
});
