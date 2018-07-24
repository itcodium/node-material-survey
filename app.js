var express = require('express'),
	 fs = require('fs'),
   passport = require('passport');
var path = require('path');
var http = require('http');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var connect = require('connect');
var  crypto = require('crypto');
var _ = require('underscore');


// var ldap=require('./app/controllers/ldap/ldap.pim.js')
 

 

// -------------------------------------------------------------------

// Load configurations
// if test env, load example file
var env = process.env.NODE_ENV || 'development'  ,
 config = require('./config/config')[env]
  , auth = require('./config/middlewares/authorization')
  , mongoose = require('mongoose')

//  db connection
 var db = mongoose.connect(config.db)

require('./app/models/auditoria.js')
require('./app/models/institucion.js')
require('./app/models/taxonomia.js')
require('./app/models/user.js')
require('./app/models/admin/acciones.js')
require('./app/models/admin/Perfiles.js')
require('./app/models/pentaho.js')
require('./app/models/userPrecarga.js')
require('./app/models/survey/survey.js')
require('./config/passport')(passport, config)

// -------- End Codigo Origen Server.js ------------------------------
 


var app = express();

// var server = http.createServer(app);

/*
var io = require('socket.io').listen(server);
io.sockets.on("connection", function(socket) {
    socket.request.session // Now it's available from Socket.IO sockets too! Win!
    console.log("- Socket Conected -",path.join(__dirname, 'public'))
});
*/

/*
server.on('request', function(request, response) {
    console.log("- Request -",request.url);
});
*/

/*
var server2 = http.createServer(app);
var io2 = require('socket.io').listen(server2);
io2.sockets.on("connection", function(socket2) {
    socket2.request.session // Now it's available from Socket.IO sockets too! Win!
    console.log("- Socket Conected -",path.join(__dirname, 'public'))
});

*/

// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//console.log("encodeURIComponent",encodeURIComponent(":public:Secretaría Naciona de la Administración Pública:PQSSF - Descripcion de las solicitudes x Geografia.prpt"));
//console.log("encodeURI",encodeURI(":public:Secretaría Naciona de la Administración Pública:PQSSF - Descripcion de las solicitudes x Geografia.prpt"));



// -------------------------------------------------------------------
// -------- Codigo utilizado en server.js

// levanto las config de express y ruteos
require('./config/express')(app, config, passport)
require('./config/routes')(app, passport, auth)
require('./config/upload')(app, passport, auth)

// -------- End Codigo Origen Server.js ------------------------------

  app.set('views', config.root + '/app/views')
  app.set('view engine', 'jade');

 // app.use('/', routes);




// catch 404 and forward to error handler
app.use(function(req, res, next) {



  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
      //modif caob agregado 500.jade
    res.render('500.jade', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
//app.use(function(err, req, res, next) {
//  res.status(err.status || 500);
//  res.render('500.jade', {
//    message: err.message,
//    error: {}
//  });
//});


var port = process.env.PORT || 1616
//app.listen(port)



// var v2Polls= require('./app/controllers/polls')
// io.sockets.on('connection', v2Polls.vote);
/*
server.listen(port, function(){
    console.log('Express server listening on port ' + app.get('port'));
});
*/


//console.log('Application started on port '+ port)

//logger.init(app, passport, mongoose)

// module.exports = app;
exports = module.exports = app



