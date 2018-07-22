app.factory('Usuarios', ['$resource', function($resource){
  return $resource('/usuarios/traer/:id', null, {
    'update': { method:'PUT' }
  });
}]);

app.factory('Institucion', ['$resource', function($resource){
  return $resource('/Institucion/:id', null, {
    'update': { method:'PUT' }
  });
}]);

app.factory('Taxonomia', ['$resource', function($resource){
  return $resource('/Taxonomia/:id', null, {
    'update': { method:'PUT' }
  });
}]);

app.factory('Perfiles', ['$resource', function($resource){
  return $resource('/admin/Perfiles/:id', null, {
    'update': { method:'PUT' }
  });
}]);


app.factory('Acciones', ['$resource', function($resource){
  return $resource('/admin/acciones/:id', null, {
    'update': { method:'PUT' }
  });
}]);

app.factory('Polls', ['$resource', function($resource){
  return $resource('/polls/:id', null, {
    'update': { method:'PUT' }
  });
}]);

app.factory('PollList', ['$resource', function($resource){
  return $resource('/polllist/:id', null, {
    'update': { method:'PUT' }
  });
}]);

app.factory('PollListAdd', ['$resource', function($resource) {
  return $resource('/polllist/addPollToList/:idList', null,
      {
        'update': { method:'PUT' }
      });
}]);



app.factory('Pentaho', ['$resource', function($resource){
  return $resource('/pentaho/:id', null, {
    'update': { method:'PUT' }
  });
}]);

app.factory('UserPrecarga', ['$resource', function($resource){
  return $resource('/precargausuario/:id', null, {
    'update': { method:'PUT' }
  });
}]);





app.factory('SurveyVote', ['$resource', function($resource) {
  return $resource('/survey/vote/:surveyId', null,
      {
        'update': { method:'PUT' }
      });
}]);
app.factory('SurveyListAdd', ['$resource', function($resource) {
  return $resource('/survey/addQuestionToList/:surveyId', null,
      {
        'update': { method:'PUT' }
      });
}]);

