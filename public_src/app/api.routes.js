
export var ApiRoutes=function() {
    var API_URL_PROTOCOLO= "";
    var API_URL=  "";
   
    this.getUrl= function (api, param) {
        this.USUARIOS= "usuario";
        this.HOTELES="hoteles";
        this.SURVEY="survey";
        
        if (process.env.NODE_ENV == 'production') {
            API_URL_PROTOCOLO = "http:";
            //API_URL = API_URL_PROTOCOLO + "//domunal-pmatch.193b.starter-ca-central-1.openshiftapps.com/api/";
            API_URL = API_URL_PROTOCOLO + "//localhost:8080/api/";
        }
                
        if (process.env.NODE_ENV == 'development') {
            API_URL_PROTOCOLO = "http:";
            API_URL = API_URL_PROTOCOLO + "//localhost:7777/api/";
        }

        if(!param){
            return API_URL + this[api.toUpperCase()] ; 
        }else{
            return API_URL + this[api.toUpperCase()] + "/" + param ;   
        }
        
    }
};
