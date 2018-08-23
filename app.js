var express = require('express');
var passport = require('passport');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var methodOverride = require('method-override');
// var http = require('http');
// var logger = require('morgan');
// var fs = require('fs'),


// ver este link
// http://angular-tips.com/blog/2015/06/using-angular-1-dot-x-with-es6-and-webpack/
// npm install --save-dev angular-route@1.5.7
// npm install --save-dev angular-animate@1.5.7
// npm install --save-dev webpack@latest 


var env = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env], 
    mongoose = require('mongoose')


var db = mongoose.connect(config.db,{useNewUrlParser: true })
    require('./config/passport')(passport, config)


require('./app/models/institucion.js')
require('./app/models/taxonomia.js')
require('./app/models/survey.js')
require('./config/passport')(passport, config)
    

var app = express();


// INIT Configuracion de webpack 
// npm install --save-dev webpack-hot-middleware

if (env=='development'){
  const webpack = require('webpack');

  const webpack_config = require('./webpack.dev.js');
  const webpack_options = {
    contentBase: './dist',
    hot: true,
    host: 'localhost'
  };

  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require("webpack-hot-middleware");
  const webpack_compiler = webpack(webpack_config);
  app.use(webpackDevMiddleware(webpack_compiler, {
    publicPath: webpack_config.output.publicPath
  })); 
  const wphmw = webpackHotMiddleware(webpack_compiler);
  app.use(wphmw);
}
// FIN Configuracion de webpack 


//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

  

require('./config/express')(app, config, passport)
require('./config/routes')(app, passport)

app.set('views', config.root + '/app/views')
app.set('view engine', 'jade');


app.use(function(req, res, next) {
  var err = new Error('Not Found '+ req.originalUrl);
  err.status = 404;
  next(err);
});

// development error handler
 // if (app.get('env') === 'development') {}

 app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    if (err.status==500){
      res.render('500.jade', {
        message: err.message,
        error: err
      });
    }
    

    if (err.status==404){

        res.render('404.jade', {
          message: err.message,
          error: err
        });
    }
  });



 

exports = module.exports = app


 