var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , crypto = require('crypto')
    , _ = require('underscore');

var AccionesSchema = new mongoose.Schema({
    code:  String,
    accion: String,
    descripcion: String,
    orden: Number
});

module.exports = mongoose.model('Acciones', AccionesSchema ,'acciones');