/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , RestablecerPassword = mongoose.model('RestablecerPassword')
  , Perfiles = mongoose.model('Perfiles')
  , Institucion = mongoose.model('Institucion');
var  crypto = require('crypto');
var ldap=require('../../app/controllers/ldap/ldap.pim.js')
var pimEmail=require('../../app/controllers/email/email.js')
var APP_CONFIG=require('../../app/config.js')

//exports.signin = function (req, res) {}

/**
 * Auth callback
 */

exports.authCallback = function (req, res, next) {
  res.redirect('/')
}

/**
 * Show login form
 */

exports.signin = function (req, res) {
    console.log("password password password",res);

    res.render('users/signin', {
    title: 'Signin',
    message: req.flash('error')
  })
}

/**
 * Show sign up form
 */

exports.signup = function (req, res) {
  res.render('users/signup', {
    title: 'Sign up',
    user: new User()
  })
}

/**
 * Logout
 */

exports.signout = function (req, res) {
  req.logout()
  req.session.destroy(function (err) {
        res.redirect('/'); //Inside a callback… bulletproof!
  });
}

/**
 * Session
 */

exports.session = function (req, res) {
  res.redirect('/')
}

/**
 * Create user
 */

function makePassword(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 20; i++ ){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

var create_callback=function (req,res,sendedData,data,error){
    var message= {"data":'El usuario ya existe.', "class":"show",type:"danger"};
     if (error){
        if(error.message=="Entry Already Exists"){
            var message= {"data":"La usuario LDAP "+sendedData.name+" ya existe.", "class":"show",type:"danger"};
            return res.render('users/signup', { message: message , user: sendedData })
        }
    }else{
         sendedData.save(function (err) {
             if (err) {
                 var message= {"data": err.errors, "class":"show",type:"danger"};
                 return res.render('users/signup', { message: message, user: sendedData })
             }

             req.logIn(sendedData, function(err) {
                 if (err) {
                     console.log("**** req.logIn **** ");
                 }
                 console.log("CREATE PASSWORD",sendedData);
                 var passwordLDAP="{SHA}"+crypto.createHash('sha1', "").update(sendedData.claveSnap).digest('base64')
                 ldap.userUpdate('replace', {"userPassword":passwordLDAP}, sendedData.username);

                 return res.redirect('/')

             })
         })
    }

}

exports.create = function (req, res) {


  var user = new User(req.body)

    user.provider = 'local'
    user.claveSnap=makePassword();

    var userLDAP= {
        "cn":user.name,
        "homeDirectory":'/home/'+user.name,
        "uid":user.name,
        "sn":user.name
    };
    console.log("user",user);
    console.log("--------------------------------------");
    console.log("user req.body",req.body);

    if(req.body.password!=req.body.password2){
        var message= {"data":"Las contraseñas no coinciden.", "class":"show",type:"danger"};
        return res.render('users/signup', { message: message , user: user })
    }

    User
        .findOne({ username : user.username })
        .exec(function (err, userItem) {
            if (userItem) {
                var message= {"data":"El usuario ya existe.", "class":"show",type:"danger"};
                return res.render('users/signup', { message: message , user: user })
            }else{
                ldap.userAdd(userLDAP,create_callback,req,res,user);
            }
        })


  // ldap.userSearch(user.name,create_callback,req,res,user);


/*
  user.provider = 'local'

  user.save(function (err) {
    if (err) {
      return res.render('users/signup', { errors: err.errors, user: user })
    }
    req.logIn(user, function(err) {
      if (err) return next(err)
      return res.redirect('/')
    })
  })
    */

}

/**
 *  Show profile
 */

exports.show = function (req, res) {
  console.log("exports.show",req.profile);
  var user = req.profile
  res.render('users/show', {
    title: user.name,
    user: user
  })
}

exports.me = function (req, res) {
  console.log("req.user exports.me",req.user);
  res.jsonp(req.user || null);
}

/**
 * Find user by id
 */

exports.user = function (req, res, next, id) {
  console.log("exports.user", id);

  User
    .findOne({ _id : id })
    .exec(function (err, user) {
      if (err) return next(err)
      if (!user) return next(new Error('Failed to load User ' + id))
      req.profile = user

      next()
    })
}

/**
 * ABM Usuarios
 */

exports.abm = function (req, res, next) {
    req.institucion = [];
    req.perfiles = [];

    Institucion.find({},function(err, items) {
        if (!err) {
            req.institucion = items;
            generarPantalla();
        }
    });
    Perfiles.find({},function(err, items) {
        if (!err) {
            req.perfiles = items;
            generarPantalla();
        }
    });

    function generarPantalla(){
        if(req.institucion.length > 0 && req.perfiles.length > 0){
            if(req.id){
                User
                .findOne({ _id : req.id })
                .exec(function (err, user) {
                    if (err) return next(err);
                    if (!user) return next(new Error('Failed to load User ' + id));
                    var objUser = user;
                    res.render('users/abm', {
                        title: 'ABM Usuarios',
                        action: 'editar',
                        user: req.user ? JSON.stringify(req.user) : null,
                        institucion: req.institucion,
                        perfiles: req.perfiles,
                        objUser: objUser
                    });
                })
            }else{
                res.render('users/abm', {
                    title: 'ABM Usuarios',
                    action: 'alta',
                    user: req.user ? JSON.stringify(req.user) : null,
                    institucion: req.institucion,
                    perfiles: req.perfiles,
                    objUser: new User()
                });
            }
        }
    }
}

exports.deleteUsers = function(req, res, next){
    var x = 0;
    function dUser(){
        if(x < req.ids.length){
            if(req.ids[x] != ""){
                User.findByIdAndRemove(req.ids[x],
                                        function(err){
                                            if (err) return next(err);
                                            dUser();
                                        });
                x++;
            }else{
                x++;
                dUser();
            }
        }else{
            return res.redirect('/#!/usuarios')
        }
    }
    dUser();
}

exports.createABM = function (req, res) {
    if(req.body.action == "editar"){
        var objUser = new User();

        var ObjUpdate = new Object();
        ObjUpdate.name = req.body.name;
        ObjUpdate.email = req.body.email;
        ObjUpdate.instituciones = [];
        ObjUpdate.instituciones.push(req.body.instituciones);
        ObjUpdate.perfiles = [];
        ObjUpdate.perfiles.push(req.body.perfiles);
        ObjUpdate.username = req.body.username;

        if(req.body.password != ""){
            ObjUpdate.salt = objUser.makeSalt();
            objUser.salt = ObjUpdate.salt;
            ObjUpdate.hashed_password = objUser.encryptPassword(req.body.password);
        }

        User
            .findByIdAndUpdate(req.body._id, ObjUpdate, function (err) {
                if (err) {
                    //next(err);
                    return res.redirect('/usuarios/'+objUser._id);
                }
                return res.redirect('/#!/usuarios')
            });
    }else{
        var objUser = new User(req.body)
        objUser.provider = 'local'
        objUser.save(function (err) {
            if (err) {
                return res.redirect('/usuarios/'+objUser._id);
            }
            return res.redirect('/#!/usuarios')
        })
    }
}

exports.getUser = function(req, res){
    var filter= null;//{ 'fechaProceso': undefined};
    User.find(filter,function(err, items) {
        if (err) {
            res.render('error', {status: 500});
        } else {
            res.jsonp(items);
        }
    });
}

var PATH_RESTABLECER='users/restablecer';

exports.getRestablecerContrasena= function(req, res){
    return res.render(PATH_RESTABLECER);
}
exports.postRestablecerContrasena= function(req, res){
    var filter= { 'email': req.body.email};
    User.findOne(filter,function(err, item) {
        if (err) {
            mostrarMensaje(res,res,PATH_RESTABLECER,err.message,"danger");
        } else {
            if(!item){
                mostrarMensaje(req,res,PATH_RESTABLECER,"No se encontro usuario con la direccion de email ingresada.","danger");
            }else{
                restablecerContraseña(req,res);
            }
        }
    });
}

var restablecer_password_mail=function(email, clave){
    console.log("20 userPrecarga 20",email,clave);
    var to=email;
    var subject='Pims restablecer contraseña';
    message="Link para restablecer contraseña:  "+ APP_CONFIG.URL_MODIFICAR_PASSWORD+"?clave="+clave;

    pimEmail.Email.send(to,subject,message);

}

restablecerContraseña=function(req,res){

    var clave=makePassword();
    var filter= { 'email': req.body.email, 'fechaCambioClave':undefined};
    RestablecerPassword.findOne(filter,function(err, item) {
        if(!item){
            var restablecerPassword = new RestablecerPassword();
            restablecerPassword.clave=clave;
            restablecerPassword.email=req.body.email;
            restablecerPassword.save(function (err, item) {
                if (err){
                    mostrarMensaje(res,res,PATH_RESTABLECER,err.message,"danger");
                }else{
                    try {
                        restablecer_password_mail(req.body.email,clave);
                    } catch (e) {
                        return res.jsonp({result:"ERROR",message:e.message,user: req.user })
                    }
                    mostrarMensaje(req,res,PATH_RESTABLECER,"Se ha enviado un email con las instrucciones para restablecer la contraseña. ","success");
                }
            });
        }else{
            try {
                restablecer_password_mail(req.body.email,item.clave);
            } catch (e) {
                return res.jsonp({result:"ERROR",message:e.message,user: req.user })
            }
            mostrarMensaje(req,res,PATH_RESTABLECER,"Se ha enviado un email con las instrucciones para restablecer la contraseña. ","success");
        }
    });
/*

 */

}


mostrarMensaje=function(req,res,path,pMessage,type){
    var msgClass="show"
    if(pMessage==""){
        msgClass="hide";
    }
    var message= {"data": pMessage, "class":msgClass,type:type};
    return res.render(path, { message: message, 'email': req.body.email});
}

var PATH_MODIFICAR='users/modificarpassword';
exports.getModificarPassword= function(req ,res){
    RestablecerPassword.findOne({"clave":req.query.clave},function(err, itemRestablecer) {
        if(!itemRestablecer){
            return res.render("error", { error: new Error('Solicitud no valida')});
        }else{
            var message= {"data": "", "class":"hide"};
            return res.render(PATH_MODIFICAR, { message: message, 'clave': req.query.clave});
        }
    });
}

exports.postModificarPassword= function(req,res){
    if(req.body.uPassword1!= req.body.uPassword2){
        var message= {"data": "Las contraseñas no coinciden.", "class":"show",type:"danger"};
        return res.render(PATH_MODIFICAR, {message: message, clave:req.body.clave});
    }else{
            RestablecerPassword.findOne({"clave":req.body.clave,'fechaCambioClave':undefined},function(err, itemRestablecer) {
                if(!itemRestablecer){
                    return res.render("error", { error: new Error('PostModificarPassword: Solicitud no valida')});
                }else{
                    buscarUsuario(req,res,itemRestablecer);
                }
            });
        }
}



var buscarUsuario= function(req,res,itemRestablecer){
    var filter= { 'email': itemRestablecer.email};
    User.findOne(filter,function(err, userOne) {
        if (err) {
            mostrarMensaje(req,res,PATH_MODIFICAR,err.message,"danger");
        } else {
            if(!userOne){
                mostrarMensaje(req,res,PATH_MODIFICAR,"No se encontraron datos.","danger");
            }else{
                itemRestablecer.fechaCambioClave=new Date();
                itemRestablecer.save(function (err, savedItemRestablecer) {
                    if (err){
                        mostrarMensaje(req,res,PATH_MODIFICAR,err.message,"danger");
                    }else{
                        usuarioActualizarContraseña(req,res,userOne);
                    }
                });
            }
        }
    });
}

var usuarioActualizarContraseña= function(req,res,user){
    user.hashed_password=user.encryptPassword(req.body.uPassword1);
    user.save(function (err, savedUserPWD) {
        if (err){
            mostrarMensaje(req,res,PATH_MODIFICAR,err.message,"danger");
        }else{
            mostrarMensaje(req,res,PATH_MODIFICAR,"La contraseña se ha actualizado correctamente.","success");
        }
    });
}
