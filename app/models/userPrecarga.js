
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , crypto = require('crypto')
  , _ = require('underscore')


var UserPrecargaSchema = new Schema({
  cedula: String,
  email: String,
  username: String,
  name: String,
  instituciones:[{ type: Schema.Types.ObjectId, ref: 'Institucion' }],
  perfiles:[{ type: Schema.Types.ObjectId, ref: 'Perfiles' }],
  claveSnap: String,
  isEnabled: Boolean,
  fecha_creacion:{ type: Date, default: Date.now },
  fechaAltaUsuario:{ type: Date, default: undefined },
  creadoPor:String
})

// the below 4 validations only apply if you are signing up traditionally

UserPrecargaSchema.path('cedula').validate(function (name) {
  return name.length
}, 'El campo cedula no deberia estar vacio.')

UserPrecargaSchema.path('email').validate(function (email) {
  return email.length
}, 'El campo de email no deberia estar vacio.')

UserPrecargaSchema.path('username').validate(function (username) {
  return username.length
}, 'El nombre de usuario no deberia estar vacio.')

mongoose.model('UserPrecarga', UserPrecargaSchema,'usuarioPrecarga')