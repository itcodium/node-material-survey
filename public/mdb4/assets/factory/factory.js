
app.factory('AplicationText', function () {
    return {
            submit: "Enviar",
            cancel: "Cancelar",
            select: "Seleccionar...",
            search: "Buscar...",
            acept: "Aceptar",
            edit: "Editar",
            required: "El campo es requerido.",
            novalid:"El valor ingresado no es valido.",
            delete: "Borrar",
    };
})
.factory('MathService', function() {
    var factory = {};
            
    factory.multiply = function(a, b) {
        return a * b ;
    };
    return factory;
});
