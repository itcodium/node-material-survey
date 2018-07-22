var async = require('async');

var requestHandler      = {},
    url                 = require( "url" ),
    qs                  = require( "querystring" ),
    fs                  = require( "fs" ),
    formidable          = require( "formidable" )
    ;




module.exports = function (app, passport, auth) {
 app.post('/uploadImage', function(req, res){

  console.log("Upload");

  var form = new formidable.IncomingForm();
  console.log("Upload 2",form);
  form.parse(req, function(err, fields, files) {
   console.log("Upload 3",fields,files,err);

   /*time = new Date();

   name = files.upload.name.split(".");
   extension = name[name.length-1];
   image_url = time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()+"_"+time.getHours()+"-"+time.getMinutes()+"-"+time.getSeconds()+"."+extension;
   fs.renameSync(files.upload.path, "/image_888/"+image_url);
   console.log("Upload 4");
   res.writeHead(200, {"Content-Type": "text/plain"});
   res.end("http://localhost:3030/"+image_url);
   */
  });
 });

}


