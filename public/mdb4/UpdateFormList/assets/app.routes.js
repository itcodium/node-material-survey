 
var APP_API= {
    APP_URL: "http://profile-pmatch.193b.starter-ca-central-1.openshiftapps.com/api/",
    APP_TOKEN: "uuid=4b6084ec-2b6e-11e6-a94e-c04a00011902",
    USUARIOS: "usuario",
    PERFIL: "perfil",
    getUrl: function (api, param) {
        console.log("++++++++++ api, param",api, param)
        
        if (typeof param!='undefined'){
            return this.APP_URL + this[api.toUpperCase()] + "/" + param + "?" + this.APP_TOKEN;
        } else {
            return this.APP_URL + this[api.toUpperCase()] + "?" + this.APP_TOKEN
        }
    }
};

