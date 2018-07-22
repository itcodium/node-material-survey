/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
    , async = require('async')
    , Institucion = mongoose.model('Institucion')
    , _ = require('underscore')

exports.create = function (req, res) {
    var institucion = new Institucion(req.body)
    institucion.save()
    res.jsonp(institucion)
}

exports.show = function(req, res){
    console.log("exports.show: ",req.institucion);
    res.jsonp(req.institucion);
}

exports.all = function(req, res){
    Institucion.find(function(err, items) {
        if (err) {
            res.render('error', {status: 500});
        } else {
            res.jsonp(items);
        }
    });
}

exports.institucion = function(req, res, next, id){
    var query = Institucion.findById(id);
    query.exec(function (err, item){
        if (err) { return next(err); }
        if (!item) { return next(new Error("can't find item")); }
        req.institucion = item;   // posible error
        return next();
    });
}

exports.update = function(req, res){
    var institucion = req.institucion
    institucion = _.extend(institucion, req.body)
    institucion.save(function(err) {
        res.jsonp(institucion)
    })
}

exports.destroy = function(req, res){
    var institucion = req.institucion
    institucion.remove(function(err){
        if (err) {
            res.render('error', {status: 500});
        } else {
            res.jsonp(1);
        }
    })
}
