var API_URL_PROTOCOLO = "";
var API_URL = "";


var ENTORNO = '//python-viupho';
//var ENTORNO = '//127.0.0.1:5000';

if (ENTORNO == '//python-viupho') {
    API_URL_PROTOCOLO = "";
    API_URL = API_URL_PROTOCOLO + "http://profile-pmatch.193b.starter-ca-central-1.openshiftapps.com/api/";

}

if (ENTORNO == '//127.0.0.1:5000') {
    API_URL_PROTOCOLO = "http:";
    API_URL = API_URL_PROTOCOLO + "//127.0.0.1:5000/api/";
}

//  URL SERVICES

var APP_LOGIN =         API_URL + "login";
var APP_PERFIL =        API_URL + "perfil";
var APP_MODULO =        API_URL + "modulo";
var APP_USUARIO=        API_URL + "usuario";
var APP_PERFIL_MODULO = API_URL + "perfilModulo";
var APP_MENU =          API_URL + "menu";           // pendiente de hacer
var APP_UPLOAD=         API_URL + "upload";         // pendiente de hacer