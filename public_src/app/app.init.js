var  angular = require('angular');
var  ngRoute = require('angular-route');
import '../assets/css/angular-datepicker.css';
var  ngDatepicker = require('angularjs-datepicker');

import moment from 'moment';
window['moment'] = moment;
require('angular-moment-picker') 
moment.locale('en')



import {AppServiceCaller,AplicationText} from './services';


var routerProvider=function($routeProvider) {
    $routeProvider
   .when('/',{	template: require ('../app/hoteles/index.html'),
               controller: 'controllerHoteles'     	
             })
   .when('/surveys',{	template: require ('../app/surveys/index.html'),
             controller: 'controllerSurveys'     	
           })
   .when('/surveyDetail/:id',{	template: require ('../app/surveys/detail.html'),
           controller:'controllerSurveyDetail'     	// 'surveyCtrl'     	
         })
   .otherwise({redirectTo: '/'});
}
var locationProvider=function($locationProvider) {
   $locationProvider.hashPrefix("!");
}

export var app = angular.module("itcodium", ['ngRoute',  '720kb.datepicker','moment-picker','app.services']);
angular.module ('app.services', []).service('AppServiceCaller', AppServiceCaller);

app.config(['$routeProvider',       routerProvider]);
app.config(['$locationProvider',    locationProvider]);
app.factory('AplicationText',       AplicationText)

