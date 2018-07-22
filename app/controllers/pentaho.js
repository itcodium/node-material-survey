var mongoose = require('mongoose')
    , async = require('async')
    , Pentaho= mongoose.model('Pentaho')
    , User = mongoose.model('User')


var path = require('path');
var http = require('http');


var PENTAHO_USERNAME="admin_admin";
var PENTAHO_PASSWORD="admin2015.";

exports.getImage= function(req, res){
    res.sendFile(path.join(__dirname, '..\\..\\')+'public\\img\\6393587679814302078.png');
}


var options =     {
    host:"192.168.70.22",
    port:"8080",
    path:"/pentaho/api/repos/%3Apublic%3ASecretar%C3%ADa%20Naciona%20de%20la%20Administraci%C3%B3n%20P%C3%BAblica%3APQSSF%20-%20Descripcion%20de%20las%20solicitudes%20x%20Geografia.prpt/report?ts=1441900143118&ts=1442420687181&Anio_param=2015&Mes_param=Junio&output-target=table%2Fhtml%3Bpage-mode%3Dstream&accepted-page=0&showParameters=true&renderMode=REPORT&htmlProportionalWidth=false",
    headers: {
        'Authorization': 'Basic ' + new Buffer(PENTAHO_USERNAME + ':' + PENTAHO_PASSWORD).toString('base64')
    }
};

var pentaho_folder="";
/*
 admin_admin
 admin2015.

* */


exports.root= function(req, res){
    options.path="/pentaho/api/repo/files/"+req.query.path+"/children";

    console.log("-*- options.path ", options);
    http.get(options, function(resPentaho) {
        var body = '';
        resPentaho.on('data', function(d) {
            body += d;
        });
        resPentaho.on('end', function() {
            console.log("REST" , body);
            res.set('Content-Type', 'text/xml');
            res.send(body);

        });
        if(resPentaho.statusCode==302){
        }
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });

}
// ":public:Secretaría Naciona de la Administración Pública:PQSSF - Descripcion de las solicitudes x Geografia.prpt"


exports.report= function(req, res){

    // console.log("*** encodeURIComponent",encodeURIComponent(":public:Secretaría Naciona de la Administración Pública:PQSSF - Descripcion de las solicitudes x Geografia.prpt"));
    //  console.log("*** encodeURI",encodeURI(":public:Secretaría Naciona de la Administración Pública:PQSSF - Descripcion de las solicitudes x Geografia.prpt"));
    console.log("*** en II***",req);
    User.findOne({user: req.user.username },function(err, item) {
        if (err) { return next(err); }
        // if (!item) {res.jsonp({error:"No user"});}
        //else{
            options.headers.Authorization= 'Basic ' + new Buffer(PENTAHO_USERNAME +':' +PENTAHO_PASSWORD).toString('base64')
            //var uri=encodeURIComponent(":public:Secretaría Naciona de la Administración Pública:PQSSF - Descripcion de las solicitudes x Geografia.prpt");
            // console.log("options.headers.Authorization", item.username,item.claveSnap,options.headers.Authorization);
            options.path= '/pentaho/api/repos/'+req.body.path+'/report?ts=1441900143118&ts=1442420687181&Anio_param=2015&Mes_param=Junio&output-target=table/html;page-mode=page&accepted-page=0&showParameters=true&renderMode=REPORT&htmlProportionalWidth=false',
            //   console.log("REPORT options.path", req.query.path);
            console.log("options", options);
            console.log("REPORT options.path", options.host+":" +options.port+options.path);


            http.get(options, function(resPentaho) {
                var body = '';
                resPentaho.on('data', function(d) {
                    body += d;
                });
                resPentaho.on('end', function() {
                    //  console.log("body",body);
                    res.send(body);
                });
                if(resPentaho.statusCode==302){
                }
            }).on('error', function(e) {
                console.log("Got error: " + e.message);
            });
        // }//fin else
    });

}


exports.reportDemo= function(req, res){

   // console.log("*** encodeURIComponent",encodeURIComponent(":public:Secretaría Naciona de la Administración Pública:PQSSF - Descripcion de las solicitudes x Geografia.prpt"));
  //  console.log("*** encodeURI",encodeURI(":public:Secretaría Naciona de la Administración Pública:PQSSF - Descripcion de las solicitudes x Geografia.prpt"));
    // console.log("*** en ***",req.user.username );
    console.log("PRINT 1",req.user.username );
    try {
         User.findOne({user: req.user.username },function(err, item) {
                if (err) {
                    return next(err);
                }

                //if (!item) {
                //    res.jsonp({error:"No user"});
                //}else{
                    //var uri=encodeURIComponent(":public:Secretaría Naciona de la Administración Pública:PQSSF - Descripcion de las solicitudes x Geografia.prpt");
                    // console.log("encodeURIComponent", req.body.path);
                    options.path= '/pentaho/api/repos/'+req.body.path+'/report?ts=1441900143118&ts=1442420687181&Anio_param=2015&Mes_param=Junio&output-target=table/html;page-mode=page&accepted-page=0&showParameters=true&renderMode=REPORT&htmlProportionalWidth=false',
                        //console.log("REPORT options.path", req.query.path);
                        //console.log("options", options);
                        //console.log("REPORT options.path", options.host+":" +options.port+options.path);

                    http.get(options, function(resPentaho) {
                        var body = '';
                        resPentaho.on('data', function(d) {
                            body += d;
                        });
                        resPentaho.on('end', function() {
                            res.send(body);
                        });
                        if(resPentaho.statusCode==302){
                        }
                    }).on('error', function(e) {
                        console.log("Got error: " + e.message);
                    });
                //}
            });
    } catch (e) {
        console.log("Report demo",e);
    }
}



/*

 exports.create = function (req, res) {
 var pentaho= new Pentaho(req.body)
 pentaho.save()
 res.jsonp(pentaho)
 }

 exports.show = function(req, res){
 res.jsonp(req.pentaho);
 }

 exports.all = function(req, res){
 Pentaho.find(function(err, items) {
 if (err) {
 res.render('error', {status: 500});
 } else {
 res.jsonp(items);
 }
 });
 }

 exports.pentaho = function(req, res, next, id){
 var query = Pentaho.findById(id);
 query.exec(function (err, item){
 if (err) { return next(err); }
 if (!item) { return next(new Error("can't find item")); }
 req.pentaho = item;   //posible error
 return next();
 });
 }

 exports.update = function(req, res){
 var pentaho = req.pentaho
 pentaho = _.extend(pentaho, req.body)
 pentaho.save(function(err) {
 res.jsonp(pentaho)
 })
 }

 exports.destroy = function(req, res){
 var pentaho = req.pentaho
 pentaho.remove(function(err){
 if (err) {
 res.render('error', {status: 500});
 } else {
 res.jsonp(1);
 }
 })
 }
 */
