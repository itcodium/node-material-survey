var mongoose = require('mongoose');

var PentahoSchema = new mongoose.Schema({
    user: String,
    data: String
});

module.exports = mongoose.model('Pentaho', PentahoSchema,'pentaho');


