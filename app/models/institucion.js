var mongoose = require('mongoose');



var InstitucionSchema = new mongoose.Schema({
    insInstitucion: String,
    insSigla: String,
    insCodInstitucion: String
});
module.exports = mongoose.model('Institucion', InstitucionSchema,'institucion');

