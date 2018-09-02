export var API_METHOD = {
    ADD: "ADD",
    EDIT: "EDIT",
    DELETE: "DELETE"
}

import {ApiRoutes} from './api.routes';

export var ApiCaller = function (api,AppServiceCaller) {
    var _this=this;
    var APP_API=new ApiRoutes();

    this.setCaller = function (param) {
        if (typeof this.caller == 'undefined') {
            this.caller = param;
        }
    }
    
    if(AppServiceCaller){
        _this.setCaller(AppServiceCaller)
    }

    this.error = function (res) {
        alert(res.data)
    }
    this.isError = function (res) {
        var result = false;
        if (res.statusText.toUpperCase() == "ERROR") {
            alert("Ocurrio un error al procesar el formulario: "+ res.data.message)
            result = true;
        }
        return result;
    }
    
    this.makeUrl=function(route,id){
        //console.log("api,route,id,url ",api,route,id,APP_API.getUrl(api,id,route))
        return APP_API.getUrl(api,id,route);
    }
    this.get = function (callback,params,route) {
        this.caller.get(this.makeUrl(route), params)
            .then(callback, this.error)
    }
    this.getById = function (callback, id,route) {
        this.caller.get(this.makeUrl(route,id), {})
            .then(callback, this.error)
    }
    
    this.post = function (data, callback,route) {
        this.caller.post(this.makeUrl(route), data)
            .then(callback, this.error)
    }
    this.put = function (id,data,callback,route) {
        // console.log("data-> ",this.makeUrl(route, data._id))
        this.caller.put(this.makeUrl(route, data._id) , data)
            .then(callback, this.error)
    }
    this.delete = function (id,callback,route) {
        this.caller.delete(this.makeUrl(route, id), {})
            .then(callback, this.error)
    }
};

