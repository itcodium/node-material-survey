var async = require('async')
    , http = require('http')
    , fs = require('fs')

var util = require('util');

var multer  = require('multer')
// var upload = multer({ dest: 'uploads/'})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        console.log("file.fieldname ",file.fieldname )
        cb(null, Date.now()+"_"+file.originalname)
    }
})

var upload = multer({ storage: storage })

var unirest = require('unirest');

var csv = require('csv');
var done=false;
var setHeaders=false;
var validationError="";
var  UserAuthorization= require('./checkUserAuthorization');


module.exports = function (app, passport, auth) {
    app.post('/upload',  upload.single('fileInput'), function(req, res,next){

        if(!UserAuthorization.isAuthorized(req,"/UPLOAD","POST","TRAMITE_CARGA_MASIVA")){
            return res.json({status:"ERR", msg:"No esta autorizado a realizar esta operacion."});
        }

        validationError="";
        setHeaders=false;
            var csv = require("fast-csv");
            try {
                    csv.fromPath(req.file.path, {headers: false, delimiter:'^'}) //^
                        .on("data", function(data,err){
                            if(data.length!=23 && validationError==""){
                                validationError="La cantidad de columnas del archivo no es valida."
                            }
                        })
                         .on('error',function(err) {
                            if(setHeaders==false){
                                setHeaders=true;
                                res.json({status:"ERR", msg:" Los datos del archivo no son validos."+err});
                            }
                        })
                        .on("end", function(){
                            if(validationError!=""){
                               res.json({status:"ERR", msg:validationError });
                            }else{
                                res.json({status:"OK", msg:"La planilla se cargo correctamente" });
                            }
                        });

            } catch (err) {
                res.json({status:"ERR", msg:"Error(catch) al validar el archivo. "+ " * "+ err});
                return;
            }

    }
    );
}


