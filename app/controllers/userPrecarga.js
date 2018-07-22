/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , UserPrecarga = mongoose.model('UserPrecarga')
  , Perfiles = mongoose.model('Perfiles')
  , User = mongoose.model('User')
  , Institucion = mongoose.model('Institucion');
var  crypto = require('crypto'),
    _ = require('underscore')
var ldap=require('../../app/controllers/ldap/ldap.pim.js')
var  UserAuthorization= require('../../config/checkUserAuthorization');
var pimEmail=require('../../app/controllers/email/email.js')
var APP_CONFIG=require('../../app/config.js')

/*
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




exports.initFormPrecarga= function(req, res) {

    if(!UserAuthorization.isAuthorized(req,"","GET","PRECARGA_USUARIO")){
        console.log("NO AUTORIZATION");
        return res.render('401', {error:"No esta autorizado a realizar esta operacion."})
    }

    return res.render('users/precargausuario', {user:req.user ? JSON.stringify(req.user) : null})

     console.log("REQ USER", req.user);
    /*
    Institucion.find(function(err, items) {
        if (err) {
            res.render('error', {status: 500});
        } else {
            Perfiles.find({nivelSeguridad:{$lte: req.user.perfiles[0].nivelSeguridad}},function(err, perfiles) {
                if (err) {
                    res.render('error', {status: 500});
                } else {
                    return res.render('users/precargausuario', {user:req.user ? JSON.stringify(req.user) : null,instituciones: items,perfiles: perfiles,precarga:{}})
                }

            }).sort( { nivelSeguridad: -1 } ).populate("acciones");
        }
    });*/

};


exports.initPrecargaSignIn= function(req, res) {
    var message= {"data":"El usuario ya existe.", "class":"show",type:"danger"};
    return res.render('users/precargasignin', {result:message})
};



var SaveUserData=function(req,res,user){
    user.save(function (err) {
        if (err) {
            var message= {"data": err.message, "class":"show",type:"danger"};
            return res.render('users/precargasignin', { message: message, cedula: user.cedula })
        }

        req.logIn(user, function(err) {
            if (err) {
                console.log("Error CREATE PASSWORD", user);
                var message= {"data": err.message, "class":"show",type:"danger"};
                return res.render('users/precargasignin', { message: message, cedula: user.cedula})
            }

            var passwordLDAP="{SHA}"+crypto.createHash('sha1', "").update(user.username).digest('base64')
            ldap.userUpdate('replace', {"userPassword":passwordLDAP}, user.username);
            return res.redirect('/');
        })
    })
}


var create_callback=function (req,res,sendedData,data,error){
    var message= {"data":'El usuario ya existe.', "class":"show",type:"danger"};
    if (error){
        if(error.message=="Entry Already Exists"){
            var message= {"data":"El usuario "+sendedData.username+" LDAP ya existe.", "class":"show",type:"danger"};
            return res.render('users/precargasignin', {cedula:req.body.cedula,message:message})
        }
    }else{
        SaveUserData(req,res,sendedData)
    }
}


var SaveUserLDAP=function(req,res,user){
    console.log("useruseruseruser",user);
    var userLDAP= {
        "cn":user.username,
        "homeDirectory":'/home/'+user.cedula,
        "uid":user.cedula,
        "sn":user.username
    };

    var newUser = new User();
    newUser.provider = 'local'
    newUser.cedula=user.cedula;
    newUser.email=user.email;
    newUser.name=user.name;
    newUser.username=user.username;
    //newUser.nombreyapellido=user.nombreyapellido;
    for(var i=0;i<user.instituciones.length;i++){
        newUser.instituciones.push(user.instituciones[i]);
    }
    for(var j=0;j<user.perfiles.length;j++){
        newUser.perfiles.push(user.perfiles[j]);
    }
    newUser.password=req.body.uPassword1;

    ldap.userAdd(userLDAP,create_callback,req,res,newUser);
}


exports.FormPrecargaSignIn= function(req, res) {
    UserPrecarga //
        .findOne({cedula:req.body.cedula,
               claveSnap:req.body.claveSnap,
               fechaAltaUsuario: undefined
        },'',function(err, item) {
            if (err) {
                res.jsonp({status: 500});
            } else {
                console.log("item item item",item);
                if(!item){
                    var message= {"data":"Ha ingresado usuario o clave recibida por e-mail no válidos.", "class":"show",type:"danger"};
                    return res.render('users/precargasignin', {cedula:req.body.cedula,message:message})
                }else{
                  //   item.fechaAltaUsuario=Date.now()
                    if(req.body.uPassword1!=req.body.uPassword2){
                        var message= {"data":"Las contraseñas del usuario no coinciden.", "class":"show",type:"danger"};
                        return res.render('users/precargasignin', {cedula:req.body.cedula,message:message})
                    }

                    item.save(function(err) {
                        if (err){
                            console.log("err err err".err);
                            var message= {"data":err.mesage, "class":"show",type:"danger"};
                            return res.render('users/precargasignin', {cedula:req.body.cedula,message:message})
                        }else{

                            SaveUserLDAP(req, res,item);

                        }
                    });
                }
            }
        });


};




function makePassword()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$%&#0123456789";

    for( var i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

var clave_enviar_mail=function(email, clave){
    console.log("20 userPrecarga 20",email,clave);
    var to=email;
    var subject='Pims Clave ';
    message="Su clave para el alta en el portal es: "+ clave+"\n"+ APP_CONFIG.URL_PRECARGA_SIGNIN;

    pimEmail.Email.send(to,subject,message);

}

exports.create = function(req, res) {
    var userPrecarga= new UserPrecarga(req.body)

    userPrecarga.claveSnap= makePassword();
console.log("20 userPrecarga 20",req.body.email,userPrecarga.claveSnap);
    User.findOne({ 'cedula': userPrecarga.cedula},function(err, itemUser) {
        if (err) {
            return res.jsonp({result:"ERROR",message:"User Precarga Save - "+err.message,user: req.user })
        } else {
                if(itemUser){
                    return res.jsonp({result:"ERROR",message:"Ya existe un usuario con la cédula "+ userPrecarga.cedula,user: req.user })
                }else{
                    console.log("/////////////////////// items /////////////////////",itemUser);
                    UserPrecarga
                        .findOne({cedula:req.body.cedula},'',function(err, itemOne) {
                            if(!itemOne){
                                UserPrecarga
                                    .findOne({cedula:req.body.cedula},'',function(err, itemOne) {
                                        if(!itemOne){
                                            console.log("userPrecarga itemOne",itemOne);
                                            console.log("userPrecarga itemOne",userPrecarga);
                                            userPrecarga.save(function(err) {
                                                if (err) {
                                                    return res.jsonp({result:"ERROR",message:"User Precarga Save - "+err.message,user: req.user })
                                                } else {
                                                    try {
                                                        clave_enviar_mail(req.body.email,userPrecarga.claveSnap);
                                                    } catch (e) {
                                                        return res.jsonp({result:"ERROR",message:e.message,user: req.user })
                                                    }
                                                    return res.jsonp({ result: "OK",user: req.user })
                                                }
                                            });
                                        }else{
                                            return res.jsonp({result:"ERROR",message:"Ya existe un usuario para la cédula ingresada.", user: req.user })
                                        }
                                    });


                            }else{
                                return res.jsonp({result:"ERROR",message:"Ya existe un usuario para la direccion de email ingresada.", user: req.user })
                            }
                        });

                }
        }
    });




};



exports.show = function(req, res){
    console.log("-> Poll.show",req.usuarioprecarga );
    if (!req.usuarioprecarga ) {
        res.jsonp({result:"error",msg:"No se encontraron registros para la busqueda."});
    }else{
        res.jsonp({result:"ok",data:req.usuarioprecarga });
    }
}



exports.all= function(req, res){
    console.log("**** Exports.all PRE CARGA",req.query);
    UserPrecarga //
        .find(function(err, items) {
            if (err) {
                res.jsonp({status: 500});
            } else {
                res.jsonp(items);
            }
        }).populate("institucion");
}



exports.usuarioprecarga = function(req, res, next, id){
    UserPrecarga.findById(id).populate("institucion")
        .exec(function (err, item) {
            if (item) {
                req.usuarioprecarga = item;
            }
            return next();
        });
}


exports.update = function(req, res){
    var p= req.usuarioprecarga
    p = _.extend(p, req.body)
    p.save(function(err,item) {
        if (err) {
            res.jsonp({result:"error",msg:err.message});
        }
        res.jsonp({result:"ok",data:item});
    })
}


exports.destroy = function(req, res){
    var p = req.usuarioprecarga
    p.remove(function(err){
        if (err) {
            res.jsonp({result:"error",msg:err.message});
        }
        res.jsonp({result:"ok",data:"se elimino el registro."});
    })
}




