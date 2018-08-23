
export var  AppServiceCaller=function ($http,$httpParamSerializerJQLike) {
    var config = { headers: { 'Content-Type': 'application/json' } };

    var response = function (response) {
        return response;
    }
    var error = function (error) {
        return error;
    }
    this.get = function(url,parametros) {
         return $http.get(url, { params: parametros }, {});
    };
    this.post = function (url, parametros) {
        config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
        return $http.post(url, $httpParamSerializerJQLike(parametros), config).then(response, error);
    };
    this.put = function (url,parametros) {
        return $http.put(url, parametros, config).then(response, error);
    };
    this.delete = function(url) {
        return $http.delete(url, { params: {} }, {}).then(response, error);
    };
     
}

AppServiceCaller.$inject = ['$http','$httpParamSerializerJQLike'];


export var AplicationText=function () {
    return {
            submit: "Enviar",
            cancel: "Cancelar",
            select: "Seleccionar",
            search: "Buscar",
            acept: "Aceptar",
            edit: "Editar",
            required: "El campo es requerido.",
            novalid:"El valor ingresado no es valido.",
            delete: "Borrar",
    };
}
