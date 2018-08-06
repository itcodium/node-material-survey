
/*
angular.module('rrhh.services', [])
 .factory('MathService', function() {
            var factory = {};
            
            factory.multiply = function(a, b) {
               return a * b ;
            };
            return factory;
         })
         */
/*
.service('Login_Service_Caller', function($http,$window){
    this.login = function (url, parametros, message_error, message_ok) {
        var config = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        };
        $http.post(url,  parametros , config)
                .then(
                    function (response) {
                        console.log("success ", response.data);
                        if (response.data.status != 'ERROR') {
                            localStorage.setItem("uuid", response.data[0].uuid);
                            $window.location.href = 'index.html';
                        } else {
                            alertify.alert("++ "+response.data.message);
                        }
                    },
                    function (response) {
                        alertify.alert("-- "+message_error);
                    }
            );
    };
})
*/


angular.module('app.services', [])
.service('AppServiceCaller', function ($http, $window, $httpParamSerializerJQLike) {

        // var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
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
            console.log("END -> url,parametros",parametros)
            return $http.put(url, parametros, config).then(response, error);
        };
        this.delete = function(url) {
            return $http.delete(url, { params: {} }, {}).then(response, error);
        };
         
});

app.factory('AplicationText', function () {
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
})

 