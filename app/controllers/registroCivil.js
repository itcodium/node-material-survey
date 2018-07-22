/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
    , async = require('async')
    , RegistroCivil = mongoose.model('RegistroCivil')
    , _ = require('underscore')

exports.create = function (req, res) {
    var registrocivil = new RegistroCivil(req.body)
    registrocivil.save()
    res.jsonp(registrocivil)
}

exports.show = function(req, res){
    console.log("exports.show: ",req.registrocivil);
    res.jsonp(req.registrocivil);
}

exports.all = function(req, res){
    RegistroCivil.find(function(err, items) {
        if (err) {
            res.render('error', {status: 500});
        } else {
            res.jsonp(items);
        }
    });
}

exports.registrocivil = function(req, res, next, id){
    var query = RegistroCivil.findById(id);
    query.exec(function (err, item){
        if (err) { return next(err); }
        if (!item) { return next(new Error("can't find item")); }
        req.registrocivil = item;   // posible error
        return next();
    });
}

exports.update = function(req, res){
    var registrocivil = req.registrocivil
    registrocivil = _.extend(registrocivil, req.body)
    registrocivil.save(function(err) {
        res.jsonp(registrocivil)
    })
}

exports.destroy = function(req, res){
    var registrocivil = req.registrocivil
    registrocivil.remove(function(err){
        if (err) {
            res.render('error', {status: 500});
        } else {
            res.jsonp(1);
        }
    })
}

/*
 curl --data 'name=ingresar dato&completed=true' http://localhost:1616/registrocivil
 curl --data 'archivoOrigen=test&tramiteId=2&cedulaCiudadanoRUC=test&codigoSistemaFuente=test&numeroDeRegistro=test&cedulaFuncionario=test'  http://localhost:1616/registrocivil
 curl -H "Content-Type: application/json" -X POST -d '{"archivoOrigen":"file.xxx","tramiteId":123123}' http://localhost:1616/registrocivil
 curl http://localhost:1616/registrocivil
 curl http://localhost:1616/registrocivil/xx_xx
 curl -X PUT http://localhost:1616/registrocivil/xx_xx
 curl -X DELETE http://localhost:1616/registrocivil/xx_xx
 */

