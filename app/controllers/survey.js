var mongoose = require('mongoose');
var async = require('async')
    , Survey= mongoose.model('Survey')
    , Question= mongoose.model('Question')
    , SurveyType= mongoose.model('SurveyType')
    , _ = require('underscore')

 
// Survey.plugin(mongoosePaginate);

/*

Survey:
    name: Nombre
    questions: []

----------------------------------
CUSTOM: - Texto libre

----------------------------------
LISTA:  - Pregunta
        - Items (etiqueta,valor)
        - label begin
        - Label End

----------------------------------

MATRIZ: - Pregunta
        - Columns Headers
        - Label + Columns Values

        Ejemplo:

          Column 1 - Column 2 - Column 3
Label 1    Value       Value      Value
Label 2    Value       Value      Value
Label 3    Value       Value      Value




* */
exports.test= function(req, res){
    SurveyType.findOne(req.query,function(err, item) {
        console.log("req.query",item)
        if (!item) {
            var st=new SurveyType(req.query);
            st.save();
            res.jsonp({result:"Se creo el tipo."});
        } else {
            res.jsonp({result:"El tipo ya existe."});
        }
    });

}

exports.create = function (req, res) {
    console.log("Create -> ")
    Survey.create(req.body, function (err, item) {
      if (err) {
            console.log("err",err)
            res.status(500).jsonp({"message":err.message});
        }
      res.jsonp(item)
    });
}


exports.all = function(req, res){
 
    var order={};
    if(req.query.field){
        try {
            order=JSON.parse("{\""+req.query.field +"\":\""+ req.query.order+"\"}");
        }
        catch(err) {
            res.status(500).jsonp({"message":err.message});
        }
    }
    var perPage=parseInt(req.query.limit);
    var page=parseInt(req.query.page);
    var skip=(perPage * page) - perPage ;
 
    Survey.find({})
            .sort(order)
            .skip(skip)
            .limit(perPage)
            .populate("taxonomia").populate("institucion")
            .exec(function(err, data) {
               
                Survey.countDocuments().exec(function(err, count) {
                    if (err){
                   
                        res.status(500).jsonp({"message":err.message});
                    }
                
                    res.jsonp(
                        {   docs: data,
                            current: page,
                            count: count,
                            pages: Math.ceil(count / (perPage))
                        }
                    );
                })
            })
}

exports.survey = function(req, res, next, id){
    var query = Survey.findById(id);
    query.populate("taxonomia").populate("institucion").exec(function (err, item){
        if (err) { return next(err); }
        if (!item) { 
            res.status(500).jsonp({"message":"The "+id+" record was not found." });
            return;
        }
        req.survey = item;
        return next();
    });

}
exports.show = function(req, res){
    res.jsonp(req.survey);
}


exports.update = function(req, res){
    var survey = req.survey
    survey = _.extend(survey, req.body)
    survey.save(function(err) {
        res.jsonp(survey)
    })
}

exports.delete = function(req, res){
    req.survey.remove(function(err){
        if (err) {
            res.status(500).jsonp({"message":err.message});
        } else {
            res.status(200).jsonp({"message":"Se ha borrado un registro."});
        }
    })
}

exports.deleteQuestion= function(req, res){
    try {
        Survey.findById(req.params.surveyId,function (err, itemSurvey){
            if (err) {
                res.status(500).jsonp({status:"error","message":err.message});
            }
            var item = itemSurvey.questions.id(req.params.questionId);
            item.remove(function (err) {
                if (err) {
                    res.status(500).jsonp({"message":err.message});
                } else {
                    res.status(200).jsonp({"message":"Se ha borrado un registro."});
                }
            });
            itemSurvey.save();
        });
    }
    catch(err) {
        res.status(500).jsonp({"message":err.message});
    }
}


exports.getAllTypes= function(req, res){
    SurveyType.find(function(err, items) {
        res.jsonp(items);
    });
}

exports.vote= function(req, res) {
    console.log("> addQuestion req.body <", req.body);
    var index=-1;

    Survey.findById(req.params.surveyId,function(err, items) {
        console.log("> items <", items);
        for (var i = 0; i < items.answers.length; i++) {
            console.log("> answers <", items);
            if(items.answers[i].ciudadano==req.body.ciudadano){
                index=i;
            }
        }
        if (index==-1){
            // req.body.survey.ciudadano= req.body.ciudadano;
             // var answer=req.body;
            items.answers.push(req.body   );

            items.save(function(itemSave,err) {
                res.jsonp(itemSave)
            });

        }else{
            res.jsonp({res: "El ciudadano ya ha votado."})
        }


    });


}

exports.addQuestion= function(req, res){
    console.log("> addQuestion req.body <",req.body);
     //console.log("*** Question req.body._id  *** ->",req.body);
    Survey.findById(req.params.surveyId,function(err, item) {
        if (!item) { 
            res.status(500).jsonp({"message":"The record was not found." });
            return;
        }
        var subItem= item.questions.id(req.body._id);
        console.log("**** addQuestion req.body ****",req.body);
        if(!subItem){
            var question=new Question(req.body);
            item.questions.push(question);
            item.save(function(newItem,err) {
                console.log('SAVE Success!',newItem);
                res.jsonp({"status":"ok",message:"se inserto un registro", data: newItem})
            })

        }else{
            // subItem=req.body;
            subItem.question=req.body.question;
            subItem.type=req.body.type;
            subItem.list=req.body.list;
            subItem.columns=req.body.columns;
            subItem.labelRight=req.body.labelRight;
            subItem.labelLeft=req.body.labelLeft;

            item.save(function (err,newitem) {
                console.log('Update Success!',newitem);
                res.jsonp({"status":"ok",message:"se inserto un registro", data: newItem})
            });
        }
    });


}




exports.encuestaPorVotoCiudadano = function(req, res) {
    var query = Survey.findById(req.query.id);
    query.populate("taxonomia").populate("institucion").exec(function (err, item){
        if (!item) {
            res.status(400).send('No se encontro la encuesta.');
        }
        var pSuervey={}
        for (var i = 0; i < item.answers.length; i++) {
            if( item.answers[i].ciudadano==req.query.ciudadano){
                pSuervey.institucion=item.institucion;
                pSuervey.taxonomia=item.taxonomia;
                pSuervey.name=item.name;
                pSuervey.vigenciaDesde=item.vigenciaDesde;
                pSuervey.vigenciaHasta=item.vigenciaHasta;
                pSuervey.questions=item.answers[i].answers;
                break;
            }
        }
        res.json(pSuervey);
    });
}


exports.encuestaPorDefecto= function(req, res) {
     console.log("** Encuesta Por Defecto req.query **",req.query);
    var today=new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').substring(0,10)
    /*
    req.query.isDefault=true;
    req.query.isEnabled=true;
    req.query.vigenciaDesde={ $lt: today};
    req.query.vigenciaHasta={ $gte: today};
    */
    var query={
        isDefault:true,
        isEnabled:true,
        vigenciaDesde:{ $lt: today},
        vigenciaHasta:{ $gte: today}
    }

    Survey.find(query, function(error, surveys) {
        // surveys[0].answers[0].ciudadano
        // console.log("*) surveys - voted  ", uservoted(surveys,req.query.ciudadano) );
        // res.json(surveys);


        var voted=false;
        var surveyIndex=-1;
        var surveyIndexVoted=-1;
        if(typeof surveys!='undefined'){

            if(surveys.length>0){
                for (var h = 0; h < surveys.length; h++) {
                    voted=false;
                    for (var i = 0; i < surveys[h].answers.length; i++) {

                        for (var j = 0; j < surveys[h].answers.length; j++) {
                            console.log("+++ ciudadano-answers.ciudadano +++",req.query.ciudadano,surveys[h].answers[j].ciudadano);
                            if(req.query.ciudadano==surveys[h].answers[j].ciudadano){
                                voted=true;
                                surveyIndexVoted=h;
                                console.log("+++ VOTED +++",voted,surveyIndexVoted);
                                break;
                            }
                        }
                        if(voted==true){
                            surveyIndex=h;
                            break;
                        }
                    }

                    if(voted==false){
                        surveyIndex=h;
                        break;
                    }
                }
            }
        }
       console.log("+++ 2 VOTED 2 +++",voted,surveyIndexVoted);

        if(voted==false){
            if(surveyIndex!=-1){
                console.log("+++ 3 VOTED +++",voted,surveyIndexVoted);
                res.json({voted:voted,survey:surveys[surveyIndex]._id});
            }else{
                console.log("+++ 4 VOTED +++",voted,surveyIndexVoted);
                res.json({voted:voted,survey:-1});

            }
        }

        if(voted==true){
            console.log("+++ 5 VOTED +++",voted,surveys[surveyIndexVoted]._id);
            res.json({voted:voted,survey:surveys[surveyIndexVoted]._id});
        }

    });
};


function uservoted(surveys,ciudadano){
    var voted=false;
    var surveyIndex=-1;
    for (var h = 0; h < surveys.length; h++) {
        voted=false;
        for (var i = 0; i < surveys[h].answers.length; i++) {
            for (var j = 0; j < surveys[h].answers.length; j++) {
                if(ciudadano==surveys[h].answers[j].ciudadano){
                    voted=true;
                    break;
                }
            }
        }
        if(voted==false){
            surveyIndex=h;
            break;
        }
    }
    return voted;
}


exports.encuestaPorTramite = function(req, res) {
    var today=new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').substring(0,10)

    req.query.isEnabled=true;
    req.query.vigenciaDesde={ $lt: today};
    req.query.vigenciaHasta={ $gte: today};

    var query={isEnabled:true,
        vigenciaDesde: { $lt: today},
        vigenciaHasta:{ $gte: today},
        institucion : req.query.institucion,
        taxonomia:req.query.taxonomia
    }

   // console.log("** Encuesta Por Tramite req.query **",req.query);
    Survey.find(query, function(error, surveys) {
        var voted=false;
        var surveyIndex=-1;
        var surveyIndexVoted=-1;
        if(typeof surveys!='undefined'){
            if(surveys.length>0){
                for (var h = 0; h < surveys.length; h++) {
                    voted=false;
                    for (var i = 0; i < surveys[h].answers.length; i++) {
                        for (var j = 0; j < surveys[h].answers.length; j++) {
                            if(req.query.ciudadano==surveys[h].answers[j].ciudadano){
                                voted=true;
                                surveyIndexVoted=h;
                                break;
                            }
                        }
                    }
                    if(voted==false){
                        surveyIndex=h;
                        break;
                    }
                }
            }
        }

        if(voted==false){
            if(surveyIndex!=-1){
                res.json({voted:voted,survey:surveys[surveyIndex]._id});
            }else{
                res.json({voted:voted,survey:-1});
            }
        }

        if(voted==true){
            res.json({voted:voted,survey:surveys[surveyIndexVoted]._id});
        }

    });
};



