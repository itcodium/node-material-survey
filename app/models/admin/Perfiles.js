/* commit 2 */

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , crypto = require('crypto')
    , _ = require('underscore');

var PerfilesSchema = new mongoose.Schema({
    code:  String,
    perfil: String,
    descripcion: String,
    nivelSeguridad:Number,
    acciones:[{ type: Schema.Types.ObjectId, ref: 'Acciones' }]
});

module.exports = mongoose.model('Perfiles', PerfilesSchema ,'perfiles');
