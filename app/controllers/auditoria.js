
var mongoose = require('mongoose')
    , async = require('async')
    , Auditoria = mongoose.model('Auditoria')
    , _ = require('underscore')
var  UserAuthorization= require('../../config/checkUserAuthorization');


exports.show = function(req, res){
    res.jsonp(req.auditoria);
}

exports.all = function(req, res){
    if(!UserAuthorization.isAuthorized(req,"","GET","AUDITORIA")){
        return res.status(401).jsonp({error:"No esta autorizado a realizar esta operacion."});
    }

    Auditoria.find(function(err, items) {
        if (err) {
            res.render('error', {status: 500});
        } else {
            res.jsonp(items);
        }
    });
}

exports.auditoria = function(req, res, next, id){
    var query = Auditoria.findById(id);
    query.exec(function (err, item){
        if (err) { return next(err); }
        if (!item) { return next(new Error("can't find item auditoria")); }
        req.auditoria = item;
        return next();
    });
}

exports.auditoriaFiltro = function(req, res){
    if(!UserAuthorization.isAuthorized(req,"","GET","AUDITORIA")){
        return res.status(401).jsonp({error:"No esta autorizado a realizar esta operacion."});
    }

    var filter= {"aud_fecha_carga": {"$gte": req.desde, "$lte": req.hasta}};
    filter.aud_institucion = {'$regex': String(req.institucion).replace(/%/g, "")};
    if(req.estado && req.estado != undefined && req.estado != ""){
        filter.aud_estado_carga = req.estado;
    }
    Auditoria.find(filter,function(err, items) {
        if (err) {
            res.render('error', {status: 500});
        } else {
            res.jsonp(items);
        }
    });
}