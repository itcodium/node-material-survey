var  angular = require('angular');
var  ngRoute = require('angular-route');
import '../assets/css/angular-datepicker.css';
var  ngDatepicker = require('angularjs-datepicker');



import {AppServiceCaller,AplicationText} from './services';


var routerProvider=function($routeProvider) {
    $routeProvider
   .when('/',{	template: require ('../app/hoteles/index.html'),
               controller: 'controllerHoteles'     	
             })
   .when('/surveys',{	template: require ('../app/surveys/index.html'),
             controller: 'controllerSurveys'     	
           })
   .otherwise({redirectTo: '/'});
}
var locationProvider=function($locationProvider) {
   $locationProvider.hashPrefix("!");
}

export var app = angular.module("itcodium", ['ngRoute',  '720kb.datepicker','app.services']);
angular.module ('app.services', []).service('AppServiceCaller', AppServiceCaller);

app.config(['$routeProvider',       routerProvider]);
app.config(['$locationProvider',    locationProvider]);
app.factory('AplicationText',       AplicationText)