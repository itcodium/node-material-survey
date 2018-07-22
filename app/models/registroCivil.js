var mongoose = require('mongoose');

var RegistroCivilSchema = new mongoose.Schema({
    calleDomicilio: String,
    condicionCedulado: String,
    conyuge: String,
    domicilio: String,
    estadoCivil: String,
    fechaCedulacion: Date,
    fechanacimiento: Date,
    firmaelectronica: String,
    genero: String,
    individualdactilar: String,
    instruccion: String,
    lugarnacimiento: String,
    nacionalidad: String,
    nombremadre: String,
    nombrepadre: String,
    nombre: String,
    numerodomicilio: String,
    profesion: String,
    fechadato: Date,
    fechacarga: Date
});

module.exports = mongoose.model('RegistroCivil', RegistroCivilSchema,'RegistroCivil_Pim');

