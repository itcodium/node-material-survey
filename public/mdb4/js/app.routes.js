var API_URL_PROTOCOLO = "";
var API_URL = "";


//var ENTORNO = '//python-viupho';
var ENTORNO = '//127.0.0.1:5000';
 
if (ENTORNO == '//python-viupho') {
    API_URL_PROTOCOLO = "";
    API_URL = API_URL_PROTOCOLO + "http://profile-pmatch.193b.starter-ca-central-1.openshiftapps.com/api/";

}

if (ENTORNO == '//127.0.0.1:5000') {
    API_URL_PROTOCOLO = "http:";
    API_URL = API_URL_PROTOCOLO + "//localhost:5556/api/";
}


//  URL SERVICES

var APP_LOGIN =         API_URL + "login";
var APP_PERFIL =        API_URL + "perfil";
var APP_MODULO =        API_URL + "modulo";
var APP_USUARIO=        API_URL + "usuario";
var APP_PERFIL_MODULO = API_URL + "perfilModulo";
var APP_MENU =          API_URL + "menu";           // pendiente de hacer
var APP_UPLOAD=         API_URL + "upload";         // pendiente de hacer
var APP_SURVEY =        API_URL + "survey";

var APP_API= {
    APP_TOKEN: "uuid=4b6084ec-2b6e-11e6-a94e-c04a00011902",
    USUARIOS: "usuario",
    PERFIL: "perfil",
    SURVEY:"survey",
    getUrl: function (api, param) {
        
        /*
        if (typeof param!='undefined'){
            console.log("++++++++++ ", API_URL + this[api.toUpperCase()] + "/" + param + "?" + this.APP_TOKEN)
            return API_URL + this[api.toUpperCase()] + "/" + param + "?" + this.APP_TOKEN;
        } else {
            console.log("++++++++++ ",this.API_URL + this[api.toUpperCase()] + "?" + this.APP_TOKEN)
            return API_URL + this[api.toUpperCase()] + "?" + this.APP_TOKEN
        }
        */
        if (typeof param!='undefined'){
            console.log("++++++++++ ", API_URL + this[api.toUpperCase()] + "/" + param + "?" )
            return API_URL + this[api.toUpperCase()] + "/" + param ;
        } else {
            console.log("++++++++++ ",API_URL + this[api.toUpperCase()]  )
            return API_URL + this[api.toUpperCase()] 
        }
    }
};
