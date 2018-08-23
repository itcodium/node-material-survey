import {app} from '../../app.init';
export var hotelFilterCtrl=function($scope) {
  $scope.filter=this.filter;
}

hotelFilterCtrl.$inject = ['$scope'];

let hotelFilterView =     require('../views/hotelFilter.html');

app.component('hotelFilter', {
  template: hotelFilterView,
  bindings: {filter: '='},
  controller: hotelFilterCtrl
});
