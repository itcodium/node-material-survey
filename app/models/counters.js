var mongoose = require('mongoose')


var CounterSchema = new mongoose.Schema({
    _id: String,
    sequence_Name: String,
    sequence_value: Number
}, { _id: false });


CounterSchema.methods.test = function(param) {
    console.log("TEST for: ",param,this);
};
/*
CounterSchema.methods.getSequense = function(cb) {
    this.sequence_value += 1;
    this.save(cb);
};
*/


module.exports = mongoose.model('Counter', CounterSchema,'counters');



// http://www.tutorialspoint.com/mongodb/mongodb_autoincrement_sequence.htm