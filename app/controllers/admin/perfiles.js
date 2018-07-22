/*
19-08-2015
* */

var mongoose = require('mongoose')
    , async = require('async')
    , Perfiles= mongoose.model('Perfiles')
    , Acciones= mongoose.model('Acciones')
    , _ = require('underscore')
var  UserAuthorization= require('../../../config/checkUserAuthorization');


exports.create = function (req, res) {
    console.log("create  req.body ",req.body);
    var perfil= new Perfiles(req.body)
    perfil.save(function(err) {
        if (err) {
            res.jsonp({result:"error",msg:err.message});
        }
        res.jsonp({result:"ok",data:perfil});
    })
}


exports.show = function(req, res){
    console.log("exports.show: ",req.perfil);
    res.jsonp(req.perfil);
}


exports.all= function(req, res){
    console.log("- PERFILE - export.all");

    if(!UserAuthorization.isAuthorized(req,"/perfiles","GET","PERFILES_ABM")){
        return res.status(401).jsonp({error:"No esta autorizado a realizar esta operacion."});
    }

    /* Si no se especifica el nivel de seguridad no se devuelven datos
       ya que no existe un nivel menor ni igual a cero. */

    if(typeof req.query.nivelSeguridad=='undefined'){
        req.query.nivelSeguridad={ $lte: 0};
    }else{
        req.query.nivelSeguridad={ $lte: req.query.nivelSeguridad};
    }

    Perfiles.find(req.query,function(err, items) {
        if (err) {
            res.status(500).jsonp();
        } else {
            console.log("*** items ***",items);
            res.jsonp(items);
        }
    }).sort( { nivelSeguridad: -1 } ).populate("acciones");
}



exports.acciones = function(req, res){
    console.log("- PERFIL exports.acciones -");
    if(!UserAuthorization.isAuthorized(req,"/perfiles/acciones","GET","PERFILES_ABM")){
        return res.status(401).jsonp({error:"No esta autorizado a realizar esta operacion."});
    }

    Acciones.find({},function(err, items) {
        if (err) {
            res.render('error', {status: 500});
        } else {
            res.jsonp(items);
        }
    });
}

exports.perfil = function(req, res, next, id){
    console.log("- PERFIL exports.perfil -");
    if(!UserAuthorization.isAuthorized(req,"/perfiles","GET","PERFILES_ABM")){
        return res.status(401).jsonp({error:"No esta autorizado a realizar esta operacion."});
    }
    Perfiles.findById(id)
            .populate('acciones') // only works if we pushed refs to children
            .exec(function (err, perfil) {
                if (!perfil) { return next(new Error("can't find item")); }
                    req.perfil = perfil;   //posible error
                    console.log(">-- perfil-->",perfil);
                return next();
            })
}

exports.update = function(req, res){
  //  console.log("() Perfil update  ()");
 //    res.jsonp({test:"perfil!!"});

    if(!UserAuthorization.isAuthorized(req,"/perfiles","GET","PERFILES_ABM")){
        return res.status(401).jsonp({error:"No esta autorizado a realizar esta operacion."});
    }

    var perfil= req.perfil
    perfil = _.extend(perfil, req.body)
     perfil.save(function(err,item) {
        if (err) {
            console.log("*** ERROR ***" ,"exports.update",err);
            res.jsonp({result:"error",msg:err.message});
           //  return err;
        }

         res.jsonp({result:"ok",data:item});
     })

}


exports.destroy = function(req, res){
    if(!UserAuthorization.isAuthorized(req,"/perfiles","GET","PERFILES_ABM")){
        return res.status(401).jsonp({error:"No esta autorizado a realizar esta operacion."});
    }
    var perfil = req.perfil
    perfil.remove(function(err){

        if (err) {
            res.jsonp({result:"error",msg:err.message});
        }
        res.jsonp({result:"ok"});
    })
}

exports.agregarAccion= function(req, res){
    /*
    var filterPerfil={ 'email': "test@test.com"};
    var filterAccion={ 'code': "TEST2"};
    // crear nueva accion
    var a=new Acciones({"accion" : "test 2",
        "descripcion" : "test2 test2 test2 ",
        "code" : "TEST2"});
    // a.save();
    */
  /*  var existe=0;

    Perfiles.find(filterUser,function(err, uitems) {
        if(uitems.length>0){
            var user=uitems[0];
            Acciones.find(filterAccion,function(err, items) {
                if(user.acciones.length==0){
                    user.acciones.push(items[0]._id);
                }else{
                    for (i = 0; i < user.acciones.length; i++) {
                        if(items[0]._id==user.acciones[i].toString()){
                            existe=1;
                        }
                    }

                    if (existe==0){
                        user.acciones.push(items[0]._id);
                    }
                }
                user.save();
                res.jsonp({user:user});
            });
        }
    });
    */
}



/*

exports.update = function(req, res){
    var accion = req.perfil
    perfil = _.extend(perfil, req.body)
    perfil.save(function(err) {
        if (err) { return err; }
        res.jsonp(perfil)
    })
}


*/



