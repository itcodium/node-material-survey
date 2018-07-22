
var mongoose = require('mongoose')
  , LocalStrategy = require('passport-local').Strategy
  , User = mongoose.model('User')
    , Acciones= mongoose.model('Acciones')
    , Perfiles= mongoose.model('Perfiles')
    , Pentaho= mongoose.model('Pentaho')


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
  // require('./initializer')

  // serialize sessions
  passport.serializeUser(function(user, done) {
    console.log("************** serialize User ********",user);
    done(null, ObjUser.id)
  })

  passport.deserializeUser(function(id, done) {
	  return done(null, ObjUser)
	  /*
      var query = User.findOne({ _id: id }).populate("instituciones").populate("perfiles").populate("entidades");
      query.exec(function(err, user)
      {
        //console.log("** Accion ** ",user, user);
       //  console.log("** Accion ** ",user.perfiles.length, user.perfiles[0].acciones);
        if(user!=null){
          Perfiles.populate(user.perfiles[0], { path: 'acciones', model: 'Acciones' }, function (err, perfil) {
            //console.log("perfil bind??",perfil) // whip
            //console.log("perfil bind??",user) // whip
            return done(err, user)
          })
        }else{
          return done(err, user)
        }

      });
	  */
  })

  // use local strategy
  passport.use(new LocalStrategy({
      usernameField: 'cedula',
      passwordField: 'password'
    },
    function(cedula, password, done) {
      console.log("** passwordpassword **", 'password');
	return done(null, ObjUser)
/*
      Pentaho.findOne({user: cedula},function(err, item) {
        console.log("FIND *************************************");
        if (err) { return next(err); }
        console.log(item," item *************************************");
        if (!item) {
          console.log(" save *************************************");
          var pentaho= new Pentaho({ user:cedula,data:password })
           pentaho.save();
            signInUser(cedula,password,done);

        }else{
            signInUser(cedula,password,done);
        }
		
      });
*/


    }
  ))
}
/*

function signInUser(cedula,password, done) {
    var query = User.findOne({ cedula: cedula }).populate("perfiles");
    query.exec(function(err, user)
    {
        if (err) { return done(err) }
        if (!user) {
            return done(null, false, { message: 'Unknown user' })
        }

        if (!user.authenticate(password)) {
            return done(null, false, { message: 'Invalid password' })
        }
        return done(null, user)
    });
}
*/

/*
 Funcion original: 2015-08-13

 function(email, password, done) {
   User.findOne({ email: email }, function (err, user) {
     if (err) { return done(err) }
     if (!user) {
        return done(null, false, { message: 'Unknown user' })
     }
     if (!user.authenticate(password)) {
        return done(null, false, { message: 'Invalid password' })
     }
     return done(null, user)
     })
 }


*/