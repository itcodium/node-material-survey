
/*
 *  Generic require login routing middleware
 */

//console.log("- originalMethod -",req.originalMethod.toUpperCase());
// console.log("- path-",req.route.path.toUpperCase());

/*
    var  UserAuthorization= require('../checkUserAuthorization');

    En la carpeta  config/routes.js de la aplicacion se encuentra la configuracion de la ruta
    para la carga del tramite

    Ruta:
          app.post('/TramitePortal', auth.requiresLogin, vTramitePortal.create)

    Para poder hacer un POST y cargar un tramite el usuario tienen que tener asignada
    la accion que en este ejemplo es TRAMITE_CARGA_MANUAL

    En el caso de que el usuario no tenga permisos se envia un mensaje.
*/

exports.requiresLogin = function (req, res, next) {

    if (!req.isAuthenticated()) {
        return res.redirect('/signin')
    }
    next()
};


/*
 *  User authorizations routing middleware
 */


exports.user = {
    hasAuthorization : function (req, res, next) {
      if (req.profile.id != req.user.id) {
        return res.redirect('/users/'+req.profile.id)
      }
      next()
    }
}


/*
 *  Article authorizations routing middleware
 */

// exports.article = {
//     hasAuthorization : function (req, res, next) {
//       if (req.article.user.id != req.user.id) {
//         return res.redirect('/articles/'+req.article.id)
//       }
//       next()
//     }
// }
