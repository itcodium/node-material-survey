var mongoose = require('mongoose')
, Schema = mongoose.Schema;

var mongoosePaginate = require('mongoose-paginate');

var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

var SurveyTypeSchema = new mongoose.Schema({
    type: String,
    controller: String,
    created:{ type: Date, default: Date.now }
});

var SurveyQuestionSchema = new mongoose.Schema({
    type:{ type: Schema.Types.Mixed },
    question: String,
    list:[],
    columns:[],
    labelLeft:String,
    labelRight:String,
    created:{ type: Date, default: Date.now }
});

var SurveySchema = new mongoose.Schema({
    name: String,
    questions:[SurveyQuestionSchema],
    answers:[],
    institucion: { type: Schema.Types.ObjectId, ref: 'Institucion'},
    taxonomia: { type: Schema.Types.ObjectId, ref: 'Taxonomia' },
    vigenciaDesde:Date,
    vigenciaHasta:Date,
    isEnabled: Boolean,
    isDefault: Boolean,
    created:{ type: Date, default: Date.now },
    createdBy:String

});


 
SurveySchema.plugin(mongoosePaginate);


module.exports = mongoose.model('SurveyType', SurveyTypeSchema,'surveyType');
module.exports = mongoose.model('Question', SurveyQuestionSchema,'SurveyQuestion');
module.exports = mongoose.model('Survey', SurveySchema,'survey');
