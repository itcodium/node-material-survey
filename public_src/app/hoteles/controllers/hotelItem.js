import {app} from '../../app.init';

export var hotelItemCtrl=function($scope) {
    $scope.item=this.data;
    
}
hotelItemCtrl.$inject = ['$scope'];

let hotelItemView =       require('../views/hotelItem.html');

app.component('hotelItem', {
  template: hotelItemView,
  bindings: {data: '='},
  controller: hotelItemCtrl
});
