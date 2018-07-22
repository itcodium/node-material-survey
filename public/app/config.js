window.app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
	    .when('/', 	        {	 templateUrl: 'app.views/index.html'     	})
        .when('/main',               { templateUrl: "app/zz.main.view.html" , controller: 'gf.main.ctrl'  })
        
        .when('/upload.file',        { templateUrl: "app.views/upload/uploaddata.html", controller: 'uploaddata.ctrl'  })

        .when('/acciones',              { templateUrl: 'app.views/admin/acciones/list.html', controller: 'accionesList.ctrl' })
        .when('/acciones.create',          { templateUrl: 'app.views/admin/acciones/create.html', controller: 'accionesCreate.ctrl' })
        .when('/acciones.delete',          { templateUrl: 'app.views/admin/acciones/delete.html', controller: 'accionesDelete.ctrl' })

        .when('/perfiles',              { templateUrl: 'app.views/admin/perfiles/list.html', controller: 'perfilList.ctrl' })
        .when('/perfiles/:perfilId',    { templateUrl: 'app.views/admin/perfiles/item.html', controller: 'perfilItem.ctrl' })
        .when('/perfiles.create',          { templateUrl: 'app.views/admin/perfiles/create.html', controller: 'perfilCreate.ctrl' })
        .when('/perfiles.update',          { templateUrl: 'app.views/admin/perfiles/update.html', controller: 'perfilUpdate.ctrl' })
        .when('/perfiles.delete',          { templateUrl: 'app.views/admin/perfiles/delete.html', controller: 'perfilDelete.ctrl' })
        .when('/perfiles.accionesUpdate',          { templateUrl: 'app.views/admin/perfiles/accionesUpdate.html', controller: 'perfilAccionesUpdate.ctrl' })

        .when('/usuarios',     {    templateUrl: "app.views/usuarios/usuarios.html" , controller: 'usuarios.ctrl'  })
        .when('/pentaho',              { templateUrl: 'app.views/pentaho/index.html', controller: 'pentaho.ctrl' })
        .when('/pentaho/:path',       { templateUrl: 'app.views/pentaho/index.html', controller: 'pentaho.ctrl' })

        
        .when('/survey',                        { templateUrl: 'app.views/survey/surveyList.html', controller: 'surveyListCtrl' })
        .when('/survey/:surveyId/:ce',          { templateUrl: 'app.views/survey/survey.html', controller: 'surveyCtrl' })
        .when('/surveyView/:surveyId/:ce',      { templateUrl: 'app.views/survey/surveyView.html', controller: 'surveyViewCtrl' })
        .when('/survey/:surveyId',              { templateUrl: 'app.views/survey/survey.html', controller: 'surveyCtrl' })
        .when('/surveyCreate',                  { templateUrl: 'app.views/survey/surveyCreate.html', controller: 'surveyCreate.ctrl' })
        .when('/surveyEdit/:surveyId',          { templateUrl: 'app.views/survey/surveyCreate.html', controller: 'surveyEditCtrl' })
        .when('/surveyAddQuestion/:surveyId',   { templateUrl:'app.views/survey/surveyAddQuestion.html', controller: 'surveyAddQuestion.ctrl' })




        //.when('/pollList',              { templateUrl: 'app.views/polllist/polllist.html', controller: 'pollList.ctrl' })
        //.when('/pollList.create',       { templateUrl: 'app.views/polllist/polllistCreate.html', controller: 'pollListCreate.ctrl' })
        //.when('/pollListAnswer/:pollListId', { templateUrl: 'app.views/polllist/pollListAnswer.html', controller: 'pollAnswerList.ctrl' })
        //.when('/pollList/:pollListId',       { templateUrl: 'app.views/polllist/pollListEdit.html', controller: 'pollListEdit.ctrl' })

        

        //.when('/polls',              { templateUrl: 'app.views/polls/list.html', controller: 'pollsList.ctrl' })
        //.when('/polls/:pollId',       { templateUrl: 'app.views/polls/item.html', controller: 'pollItem.ctrl' })
        //.when('/polls.new',           { templateUrl: 'app.views/polls/new.html', controller: 'pollNew.ctrl' })
        //.when('/polls.results',           { templateUrl: 'app.views/polls/results.html', controller: 'pollResults.ctrl' })

	.otherwise({redirectTo: '/'});
}]);

//Removing tomcat unsupported headers
window.app.config(['$httpProvider', function($httpProvider, Configuration) {
    //delete $httpProvider.defaults.headers.common["X-Requested-With"];
}]);

//Setting HTML5 Location Mode
window.app.config(['$locationProvider', function($locationProvider) {
    //$locationProvider.html5Mode(true);
    $locationProvider.hashPrefix("!");
}]);