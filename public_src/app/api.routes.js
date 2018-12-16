
export var ApiRoutes=function() {
    var API_URL_PROTOCOLO= "";
    var API_URL=  "";
   
    this.getUrl= function (api, id,route) {
        this.USUARIOS= "usuario";
        this.HOTELES="hoteles";
        this.SURVEY="survey";
       
      
        if (process.env.NODE_ENV == 'production') {
            API_URL_PROTOCOLO = "http:";
            API_URL = API_URL_PROTOCOLO + "//atodojs-pmatch.193b.starter-ca-central-1.openshiftapps.com/api/";
            //API_URL = API_URL_PROTOCOLO + "//localhost:8080/api/";
        }
                
        if (process.env.NODE_ENV == 'development') {
            API_URL_PROTOCOLO = "http:";
            // API_URL = API_URL_PROTOCOLO + "//localhost:7777/api/";
            API_URL = API_URL_PROTOCOLO + "//atodojs-pmatch.193b.starter-ca-central-1.openshiftapps.com/api/";
        }
       

       
        //if(!id){
        
        if(route){
            console.log("* Route *", api,id,route )
            return API_URL + this[api.toUpperCase()]+"/"+route ; 
        }else{
            console.log("* Id  *", api,id,route )
            if(id){
                return API_URL + this[api.toUpperCase()] + "/" +id ;   
            }else{
                return API_URL + this[api.toUpperCase()] ;   
            }    
        }
        
        
    }
};
