var mongoose = require('mongoose');

var TaxonomiaSchema = new mongoose.Schema({
    taxCaso : String,
    taxCodTaxonomia : Number,
    taxFechaActualizacion : Date,
    taxInstitucion : String,
    taxServicio : String,
    taxTramite:String
});
module.exports = mongoose.model('Taxonomia', TaxonomiaSchema,'taxonomia');

