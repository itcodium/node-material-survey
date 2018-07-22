var mongoose = require('mongoose')
    , async = require('async')
    , Acciones= mongoose.model('Acciones')
    , Perfiles= mongoose.model('Perfiles')
    , _ = require('underscore')

var  UserAuthorization= require('../../../config/checkUserAuthorization');


exports.create = function (req, res) {
    console.log("create  req.body ",req.body);
    if(!UserAuthorization.isAuthorized(req,"/acciones","GET","ACCIONES_ABM")){
        return res.status(401).jsonp({error:"No esta autorizado a realizar esta operacion."});
    }
    var accion= new Acciones(req.body)
    accion.save()
    res.jsonp(accion)
}

exports.show = function(req, res){
    console.log("exports.show: ",req.accion);
    res.jsonp(req.accion);
}

exports.all = function(req, res){
    if(!UserAuthorization.isAuthorized(req,"/acciones","GET","ACCIONES_ABM") ){
        return res.status(401).jsonp({error:"No esta autorizado a realizar esta operacion."});
    }

    Acciones.find(function(err, items) {
        if (err) {
            res.render('error', {status: 500});
        } else {
            res.jsonp(items);
        }
    });
}

exports.accion = function(req, res, next, id){
    if(!UserAuthorization.isAuthorized(req,"/acciones","GET","ACCIONES_ABM")){
        return res.status(401).jsonp({error:"No esta autorizado a realizar esta operacion."});
    }

   var query = Acciones.findById(id);
    query.exec(function (err, item){
        if (err) { return next(err); }
        if (!item) { return next(new Error("can't find item")); }
            req.accion = item;   //posible error
            return next();
        });

}

exports.update = function(req, res){
    if(!UserAuthorization.isAuthorized(req,"/acciones","GET","ACCIONES_ABM")){
        return res.status(401).jsonp({error:"No esta autorizado a realizar esta operacion."});
    }

    var accion = req.accion
    accion  = _.extend(accion , req.body)
    accion.save(function(err,item) {
        if (err) {
            res.jsonp({result:"error",message:err.message});
        }
        res.jsonp({result:"ok",data:item});
    })

}

exports.destroy = function(req, res){
    if(!UserAuthorization.isAuthorized(req,"/acciones","GET","ACCIONES_ABM")){
        return res.status(401).jsonp({error:"No esta autorizado a realizar esta operacion."});
    }

    var accion = req.accion;
    Perfiles.find(function(err, items) {
        if (err) {
            res.jsonp({status: 500});
        } else {
            existe=0;

            for (i = 0; i < items.length; i++) {
                for (j = 0; j < items[i].acciones.length; j++) {
                    if(accion._id.toString()==items[i].acciones[j].toString()){
                        existe=1;
                        console.log("items[i].",items[i]._id);
                    }
                }
            }
            if (existe==0){
                accion.remove(function(err){
                    if (err) {
                        res.jsonp({result:"error",message:err.message});
                    } else {
                        res.jsonp({result:"ok",message:"Se ha eliminado la accion"});
                    }
                })
            }else{
                res.jsonp({result:"error",message:"No se puede eliminar la accion porque esta asignada a otros perfiles."});
            }
        }
    });



}
