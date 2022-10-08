
var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')
  
module.exports = {
  development: {
      db: 'mongodb+srv://testuser:SurPass123!@survey0001.dwoc5.mongodb.net/survey0001?retryWrites=true&w=majority',
      root: rootPath,
      app: {
        name: 'Clover - Development Environment',
        port:7777

      }
},
  test: {
      db: 'mongodb://admin:mlab123!@ds133597.mlab.com:33597/survey0001',
      root: rootPath,
      app: {
        name: 'Clover - Test Environment',
        port:8888
      }
  },
  production: {
      db: 'mongodb+srv://testuser:SurPass123!@survey0001.dwoc5.mongodb.net/survey0001?retryWrites=true&w=majority',
      root: rootPath,
      app:{
        name: 'Clover',
        port:8080
      }
  },
   
}
