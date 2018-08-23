var async = require('async')
    , http = require('http')
    , fs = require('fs');


module.exports = function (app, passport) {

  var index = require('../app/controllers/index')
  app.post('/users/session', 
           passport.authenticate('local', 
                                  { failureRedirect: '/signin', 
                                    failureFlash:    'Invalid email or password.'
                                  }), 
           index.session)

  app.param('userId', function (req, res, next, id) {
    req.id = id;
    next();
  });

  app.param('usersIds', function (req, res, next, id) {
    req.ids = id.split(",");
    next();
  });

  app.get('/', index.render)
  app.get('/signin', index.signin)
  

  var hoteles = require('../app/controllers/hoteles')
  app.get('/api/hoteles',hoteles.getAll)

  
  // Taxonomia routes
  var vTaxonomia= require('../app/controllers/taxonomia')
  app.get('/api/taxonomia', vTaxonomia.all)
  app.get('/api/taxonomia/porInstitucion', vTaxonomia.porInstitucion)
  app.get('/api/taxonomia/:taxonomiaId', vTaxonomia.show)
  app.param('taxonomiaId', vTaxonomia.taxonomia)
  app.post('/api/taxonomia',  vTaxonomia.create)
  app.put('/api/taxonomia/:taxonomiaId',  vTaxonomia.update)
  app.delete('/api/taxonomia/:taxonomiaId', vTaxonomia.destroy)
 


  // Institucion routes
  var vInstitucion= require('../app/controllers/institucion')
  app.get('/api/institucion', vInstitucion.all)
  app.get('/api/institucion/:institucionId', vInstitucion.show)
  app.param('institucionId', vInstitucion.institucion)
  app.post('/api/institucion',  vInstitucion.create)
  app.put('/api/institucion/:institucionId',  vInstitucion.update)
  app.delete('/api/institucion/:institucionId',  vInstitucion.destroy)
 

 
 // Survey routes
  var vSurvey= require('../app/controllers/survey')
  app.get('/api/survey.GetTypes', vSurvey.getAllTypes);

  app.get('/api/survey', vSurvey.all);
  app.get('/api/survey/encuestaPorTramite', vSurvey.encuestaPorTramite);
  app.get('/api/survey/encuestaPorDefecto', vSurvey.encuestaPorDefecto);
  app.get('/api/survey/encuestaPorVotoCiudadano', vSurvey.encuestaPorVotoCiudadano);

  app.get('/api/survey/:surveyId', vSurvey.show);
  app.param('surveyId', vSurvey.survey);
  app.post('/api/survey',  vSurvey.create);

  app.put('/api/survey/addQuestionToList/:surveyId', vSurvey.addQuestion);
  app.put('/api/survey/vote/:surveyId',  vSurvey.vote);
  app.put('/api/survey/:surveyId',  vSurvey.update);
  app.delete('/api/survey/:surveyId',  vSurvey.delete);



}

