var async = require('async')
    , http = require('http')
    , fs = require('fs');
/*
2015-08-19
* */

//var util = require("util");
//var multer  = require('multer');
//var fs =require('fs-extra');
//
//var formidable = require('formidable'),
//    http = require('http'),
//    util = require('util');

module.exports = function (app, passport, auth) {

  //administration
  // agts
  /*
  var agts = require('../app/controllers/adm/agts')
  app.get('/agts', agts.lista)
  app.get('/agts/:agtId', agts.ficha)
  //app.use(multer({ dest: '/uploads_77/'}))
  app.param('agtId', agts.agt)
*/

  // user routes
  var users = require('../app/controllers/users')
  app.get('/usuarios/traer', users.getUser)
  app.get('/usuarios/eliminar/:usersIds', users.deleteUsers)
  app.post('/saveuser', users.createABM)
  app.get('/signin', users.signin)
  app.get('/signup', users.signup)
  app.get('/signout', users.signout)
  app.post('/users', users.create)
  app.post('/users/session', passport.authenticate('local', {failureRedirect: '/signin', failureFlash: 'Invalid email or password.'}), users.session)
  app.get('/users/me', users.me)
  app.get('/users/:userId', users.show)
  app.get('/usuarios', users.abm)
  app.get('/usuarios/:userId', users.abm)
  app.get('/restablecer',  users.getRestablecerContrasena)
  app.post('/restablecer',  users.postRestablecerContrasena)
  app.get('/modificarpassword',  users.getModificarPassword)
  app.post('/modificarpassword',  users.postModificarPassword)


  // http://localhost:1616/usuarios/modificarpassword?code=z&mUB%X7wE

  //app.param('userId', users.user)
  app.param('userId', function (req, res, next, id) {
    req.id = id;
    next();
  });
  app.param('usersIds', function (req, res, next, id) {
    req.ids = id.split(",");
    next();
  });
  /*
  // league routes
  var leagues = require('../app/controllers/leagues')  
  app.get('/leagues', leagues.all)
  app.post('/leagues', auth.requiresLogin, leagues.create)
  app.get('/leagues/:leagueId', leagues.show)
  app.put('/leagues/:leagueId', auth.requiresLogin, leagues.update)
  //delete -> modif caob, nuevo express
  app.delete('/leagues/:leagueId', auth.requiresLogin, leagues.destroy)

  app.param('leagueId', leagues.league)

  // fantasy team routes
  var fantasyteams = require('../app/controllers/fantasyteams')  
  app.get('/fantasyteams', fantasyteams.all)
  app.post('/fantasyteams', auth.requiresLogin, fantasyteams.create)
  app.get('/fantasyteams/:fantasyTeamId', fantasyteams.show)
  app.put('/fantasyteams/:fantasyTeamId', auth.requiresLogin, fantasyteams.update)
  app.delete('/fantasyteams/:fantasyTeamId', auth.requiresLogin, fantasyteams.destroy)

  app.param('fantasyTeamId', fantasyteams.fantasyteam)

  // player routes
  var players = require('../app/controllers/players')
  app.get('/players', players.all)
  app.get('/players/:playerId', players.show)
  app.param('playerId', players.player)
*/

  // home route
  var index = require('../app/controllers/index')
    app.get('/', index.render)
 
  // Taxonomia routes
  var vTaxonomia= require('../app/controllers/taxonomia')
  app.get('/taxonomia', vTaxonomia.all)
  app.get('/taxonomia/porInstitucion', vTaxonomia.porInstitucion)
  app.get('/taxonomia/:taxonomiaId', vTaxonomia.show)
  app.param('taxonomiaId', vTaxonomia.taxonomia)
  app.post('/taxonomia', auth.requiresLogin, vTaxonomia.create)
  app.put('/taxonomia/:taxonomiaId', auth.requiresLogin, vTaxonomia.update)
  app.delete('/taxonomia/:taxonomiaId', auth.requiresLogin, vTaxonomia.destroy)
 


  // Institucion routes
  var vInstitucion= require('../app/controllers/institucion')
  app.get('/institucion', vInstitucion.all)
  app.get('/institucion/:institucionId', vInstitucion.show)
  app.param('institucionId', vInstitucion.institucion)
  app.post('/institucion', auth.requiresLogin, vInstitucion.create)
  app.put('/institucion/:institucionId', auth.requiresLogin, vInstitucion.update)
  app.delete('/institucion/:institucionId', auth.requiresLogin, vInstitucion.destroy)
 

 

  var vSurvey= require('../app/controllers/survey/survey')
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



  var vAcciones= require('../app/controllers/admin/acciones')
  app.get('/admin/acciones', vAcciones.all)
  app.get('/admin/acciones/:accionId', vAcciones.show)
  app.param('accionId', vAcciones.accion)
  app.post('/admin/acciones',  auth.requiresLogin,vAcciones.create)
  app.put('/admin/acciones/:accionId', auth.requiresLogin, vAcciones.update)
  app.delete('/admin/acciones/:accionId', auth.requiresLogin, vAcciones.destroy)

// Perfiles
  var vPerfiles= require('../app/controllers/admin/perfiles')
  app.get('/admin/perfiles', vPerfiles.all)
  app.get('/admin/perfiles/acciones', vPerfiles.acciones)
  app.get('/admin/perfiles/:perfilId', vPerfiles.show)

  app.param('perfilId', vPerfiles.perfil)
  app.post('/admin/perfiles', auth.requiresLogin,vPerfiles.create)
  app.put('/admin/perfiles/:perfilId', auth.requiresLogin,  vPerfiles.update)
  app.delete('/admin/perfiles/:perfilId', auth.requiresLogin, vPerfiles.destroy)

// Usuario Precarga

  var vUsuarioPrecarga= require('../app/controllers/userPrecarga')
  app.get('/admin/usuarioprecarga', vUsuarioPrecarga.all)
  app.get('/admin/usuarioprecarga/:usuarioprecargaId', vUsuarioPrecarga.show)
  app.param('usuarioprecargaId', vUsuarioPrecarga.usuarioprecarga)
  app.post('/precargausuario', auth.requiresLogin,vUsuarioPrecarga.create)

  app.put('/admin/usuarioprecarga/:usuarioprecargaId', auth.requiresLogin,  vUsuarioPrecarga.update)
  app.delete('/admin/usuarioprecarga/:usuarioprecargaId', auth.requiresLogin, vUsuarioPrecarga.destroy)
  app.get('/precargausuario', auth.requiresLogin, vUsuarioPrecarga.initFormPrecarga)


  // sign in precarga

  app.post('/precargasignin', vUsuarioPrecarga.FormPrecargaSignIn)
  app.get('/precargasignin', vUsuarioPrecarga.initPrecargaSignIn)








  // MongoDB API Routs
  // pollList

  /*
  var vPollList= require('../app/controllers/polls_list')
  
   ---------------------
   Routes
   ---------------------
   .get    -> .all
   .get    -> .show
   .param  -> .itemName
   .post   -> .create
   .put    -> .update
   .delete -> .destroy
   ---------------------
   */

/*
  app.get('/polllist', vPollList.all)
  app.get('/polllist/pollListResults', vPollList.pollListResults)
  app.get('/polllist/encuestaPorTramite', vPollList.encuestaPorTramite);
  app.get('/polllist/encuestaPorDefecto', vPollList.encuestaPorDefecto);
  app.get('/polllist/pollListUserVote', vPollList.pollListUserVote);
  app.get('/polllist/:id', vPollList.show);
  app.param('id', vPollList.polllist);
  app.param('idList', vPollList.polllist);

  app.post('/polllist', auth.requiresLogin,vPollList.create);
  app.put('/polllist/addPollToList/:idList', vPollList.addPollToList);
  app.put('/polllist/:pollListId', auth.requiresLogin,  vPollList.update);
  app.delete('/polllist/:pollListId', auth.requiresLogin, vPollList.destroy)
  
  */
  /*
  var vPolls= require('../app/controllers/polls')
 //app.get('/polls', vPolls.list);
  app.get('/polls', vPolls.all);
  app.get('/polls/pollResults', vPolls.pollResults);
  app.get('/polls/encuestaPorTramite', vPolls.encuestaPorTramite);
  app.get('/polls/:pollId', vPolls.show)
  app.param('pollId', vPolls.poll)
  app.post('/polls', vPolls.create);
  app.post('/vote', vPolls.vote);
  app.put('/polls/:pollId', auth.requiresLogin, vPolls.update);
  app.delete('/polls/:pollId', auth.requiresLogin, vPolls.destroy);

*/
 


}

