var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , crypto = require('crypto')
    , _ = require('underscore')

var RestablecerPassword= new Schema({
    email:String,
    clave:String,
    fechaCambioClave:{ type: Date},
    fecha_creacion:{ type: Date, default: Date.now }
});

mongoose.model('RestablecerPassword', UserSchema,'restablecerPassword')

