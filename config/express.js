/**
 * Module dependencies.
 */

 var express = require('express')
  , flash = require('connect-flash')
  , helpers = require('view-helpers')
var favicon = require('serve-favicon');

var session = require('express-session')

var methodOverride = require('method-override')
var mongoStore = require('connect-mongo')(session);
var compress = require('compression')

module.exports = function (app, config, passport) {

  app.set('showStackError', true)
  // should be placed before express.static
  app.use(compress({
    filter: function (req, res) {
      return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
    },
    level: 9
  }))


//  app.use(favicon(__dirname + '/public/favicon.ico'));
  app.use(express.static(config.root + '/public'))



//  set views path, template engine and default layout
    app.set('views', config.root + '/app/views')
    app.set('view engine', 'jade')
  
//  enable jsonp
    app.enable("jsonp callback")

// ---- Nuevo codigo ----
    app.use(helpers(config.app.name))
    app.use(methodOverride())
    app.use(session({
      secret: 'hortensia',
      store: new mongoStore({url: config.db,'db': 'sessions'}),

        //new by caob, el nuevo express
        resave: false,
        saveUninitialized: false

    }));
    app.use(flash())
    app.use(passport.initialize())
    app.use(passport.session())



}
