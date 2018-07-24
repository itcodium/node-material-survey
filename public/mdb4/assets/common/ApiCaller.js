var API_METHOD = {
    ADD: "ADD",
    EDIT: "EDIT",
    DELETE: "DELETE"
}


var ApiCaller = function (api) {
    this.setCaller = function (param) {
        if (typeof this.caller == 'undefined') {
            this.caller = param;
        }
    }
    this.error = function (res) {
        alert("Error")
        console.log("error", res)
    }
    this.isError = function (res) {
        var result = false;
        if (res.data.status.toUpperCase() == "ERROR") {
            alert("Ocurrio un error al procesar el formulario: "+ res.data.message)
            result = true;
        }
        return result;
    }
    
    this.get = function (callback) {
       this.caller.get(APP_API.getUrl(api), {})
            .then(callback, this.error)
    }
    this.getById = function (callback, id) {
        this.caller.get(APP_API.getUrl(api, id), {})
            .then(callback, this.error)
    }
    
    
    this.post = function (data, callback) {
        this.caller.post(APP_API.getUrl(api), data)
            .then(callback, this.error)
    }
    this.put = function (id,data,callback) {
        this.caller.put(APP_API.getUrl(api, id), data)
            .then(callback, this.error)
    }
    this.delete = function (id, callback) {
        this.caller.delete(APP_API.getUrl(api, id), {})
            .then(callback, this.error)
    }
};

