
var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')
  , templatePath = path.normalize(__dirname + '/../app/mailer/templates')
  , notifier = {
      APN: false,
      email: false, // true
      actions: ['comment'],
      tplPath: templatePath,
      postmarkKey: 'POSTMARK_KEY',
      parseAppId: 'PARSE_APP_ID',
      parseApiKey: 'PARSE_MASTER_KEY'
    }

module.exports = {
  development: {
      db: 'mongodb://admin:mlab123!@ds133597.mlab.com:33597/survey0001',
    //db: 'mongodb://localhost/AB-dev',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Survey - Development Environment',

    },
    sqldb : {
      user: 'sa',
      password: 'pepe1515',
      server: 'localhost',
      port: '52200',
      database: 'Aerobium'
    }

},
  test: {
      db: 'mongodb://admin:mlab123!@ds133597.mlab.com:33597/survey0001',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Pims - Test Environment'
    },
    sqldb : {
      user: 'sa',
      password: 'pepe1515',
      server: 'localhost',
      database: 'abdoc'
    }
  },
  production: {
      db: 'mongodb://admin:mlab123!@ds133597.mlab.com:33597/survey0001',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Pims'
    },
    sqldb : {
      user: 'sa',
      password: 'pepe1515',
      server: 'localhost',
      database: 'abdoc'
    }
  }
}
