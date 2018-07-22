var mongoose = require('mongoose');

var AuditoriaSchema = new mongoose.Schema({
    aud_cod_auditoria : String,
    aud_fecha_carga : Date,
    aud_registros_origen : Number,
    aud_registros_destino : Number,
    aud_cant_reg_error : Number,
    aud_cant_reg_warning : Number,
    aud_duracion_proceso : Number,
    aud_estado_carga : String,
    aud_log : String,
    aud_cant_cargas : Number,
    historia:[]
});

module.exports = mongoose.model('Auditoria', AuditoriaSchema,'auditoria');
