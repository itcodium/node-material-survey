/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
    , async = require('async')
    , Taxonomia = mongoose.model('Taxonomia')
    , _ = require('underscore')



exports.porInstitucion= function(req, res) {
    Taxonomia.find(req.query,function(err, items) {
        if (err) {
            res.render('error', {status: 500});
        } else {
            res.jsonp(items);
        }
    });
};

exports.create = function (req, res) {
    var taxonomia = new Taxonomia(req.body)
    taxonomia.save()
    res.jsonp(taxonomia)
}

exports.show = function(req, res){
    console.log("exports.show: ",req.taxonomia);
    res.jsonp(req.taxonomia);
}

exports.all = function(req, res){
    Taxonomia.find(function(err, items) {
        if (err) {
            res.render('error', {status: 500});
        } else {
            res.jsonp(items);
        }
    });
}

exports.taxonomia = function(req, res, next, id){
    var query = Taxonomia.findById(id);
    query.exec(function (err, item){
        if (err) { return next(err); }
        if (!item) { return next(new Error("can't find item")); }
        req.taxonomia = item;   // posible error
        return next();
    });
}

exports.update = function(req, res){
    var taxonomia = req.taxonomia
    taxonomia = _.extend(taxonomia, req.body)
    taxonomia.save(function(err) {
        res.jsonp(taxonomia)
    })
}

exports.destroy = function(req, res){
    var taxonomia = req.taxonomia
    taxonomia.remove(function(err){
        if (err) {
            res.render('error', {status: 500});
        } else {
            res.jsonp(1);
        }
    })
}

/*
 curl --data 'name=ingresar dato&completed=true' http://localhost:1616/taxonomia
 curl --data 'archivoOrigen=test&tramiteId=2&cedulaCiudadanoRUC=test&codigoSistemaFuente=test&numeroDeRegistro=test&cedulaFuncionario=test'  http://localhost:1616/taxonomia
 curl -H "Content-Type: application/json" -X POST -d '{"archivoOrigen":"file.xxx","tramiteId":123123}' http://localhost:1616/taxonomia
 curl http://localhost:1616/taxonomia
 curl http://localhost:1616/taxonomia/xx_xx
 curl -X PUT http://localhost:1616/taxonomia/xx_xx
 curl -X DELETE http://localhost:1616/taxonomia/xx_xx
 */

