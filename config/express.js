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
  app.use(compress({
    filter: function (req, res) {
      return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
    },
    level: 9
  }))

  // app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(express.static(config.root + '/public'))
    app.set('views', config.root + '/app/views')
    app.set('view engine', 'jade')
    app.enable("jsonp callback")

    app.use(helpers(config.app.name))
    app.use(methodOverride())
    app.use(session({
      secret: 'hortensia',
      store: new mongoStore({ url: config.db,
                              db: 'sessions',
                              autoRemove: 'interval',
                              autoRemoveInterval: 10
                            }),
      resave: false,
      saveUninitialized: false
    }));
    app.use(flash())
    app.use(passport.initialize())
    app.use(passport.session())
}
