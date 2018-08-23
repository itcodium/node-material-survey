
var mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy
   var ObjUser = new Object();
    ObjUser.id="123";
    ObjUser.name = "test";
    ObjUser.email = "test@test.com";
    ObjUser.instituciones = [];
    ObjUser.instituciones.push({});
    ObjUser.perfiles = [];
    ObjUser.perfiles.push({});
    ObjUser.username = "test";

module.exports = function (passport, config) {
  passport.serializeUser(function(user, done) {
    done(null, ObjUser.id)
  })

  passport.deserializeUser(function(id, done) {
	  // Validar datos del usuario aqui
    return done(null, ObjUser)
	   
  })

  passport.use(new LocalStrategy({
      usernameField: 'cedula',
      passwordField: 'password'
    },
    function(cedula, password, done) {
      // Procesar credenciales aqui
        console.log("- Passport -")
	     return done(null, ObjUser)
     }
  ))
}

