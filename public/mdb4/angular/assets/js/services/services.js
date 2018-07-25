

angular.module('rrhh.services', [])
 .factory('MathService', function() {
            var factory = {};
            
            factory.multiply = function(a, b) {
               return a * b ;
            };
            return factory;
         })
         

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

.service('Service_Caller', function($http,$window){
        this.get = function(url,parametros,show_message) {
           parametros['uuid'] = localStorage.getItem("uuid") ;
             var promise = $http.get(url,{ params: parametros }, {})
                   .then(
                       function (response) {
                           if (response.data.status != 'ERROR') {
                               return response.data ;
                           } else {
                               if (show_message) { 
                                   alertify.alert(response.data.message);
                               }
                               return response;
                               
                           }
                       },
                       function (response) {
                           console.log("Error",response);
                           alertify.alert(message_error);
                       }
                    );
             return promise ;
        };
        this.set = function (url, parametros, show_message) {
                var tokenParam = 'uuid=' + localStorage.getItem("uuid")
                var url = url + '?' + tokenParam;
                var config = {
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                } ;
                var promise = $http.post(url, parametros, config)
                       .then(
                           function (response) {
                               console.log("response", response);
                               if (response.data.status != 'ERROR') {
                                   if (!show_message) {
                                       alertify.notify(response.data.message);
                                   } else {
                                       alertify.alert(response.data.message);
                                   }
                                       return response.data ;
                              } else {
                                  
                                          alertify.alert(response.data.message);
                                      
                                       return response;
                                   }
                           },
                           function (response) {
                               //alertify.alert(message_error);
                               return response;
                           }
                        );
                return promise ;
        };
        
        this.put = function (url, object_id, parametros, message_error, message_ok) {
            
            var tokenParam = 'uuid=' + localStorage.getItem("uuid")  ;
            var url = url + '/' + object_id + '?' + tokenParam;
            var config = {
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                } ;
            var promise =  $http.put(url, parametros, config)
                           .then(
                               function (response) {
                                   if (response.data.status != 'ERROR') {
                                       alertify.warning(response.data.message);
                                       return response.data ;
                                   } else {
                                       alertify.alert(response.data.message);
                                       return response;
                                   }
                               },
                               function (response) {
                                   alertify.alert(message_error);
                                   return response;
                               }
                            );
            
            return promise;
         };
         
         this.delete = function(url,object_id,message_error,message_ok,message_mode) {
             var tokenParam = 'uuid=' + localStorage.getItem("uuid")  ;
             var url = url + '/' + object_id + '?' + tokenParam;
             message_mode = message_mode || "alert" ;
             var promise = $http.delete(url, { params: {} }, {})
                   .then(
                       function (response) {
                           if (response.data.status != 'ERROR') {
                                       alerta(response.data.message,message_mode);
                                       return response.data ;
                           } else{
                                       alerta(response.data.message,"error");
                                       return response;
                           }
                       },
                       function (response) {
                           alerta(message_error,"error");
                           return response;
                       }
                    );
              return promise ;
         };
         function alerta(message,message_mode){
              switch (message_mode) {
                          case "alert":
                            alertify.alert(message);
                            break;
                          case "success":
                            alertify.success(message);
                            break;
                          case "error":
                            alertify.error(message);
                            break;
                          case "warning":
                           alertify.warning(message);
                            break;
                          case "notify":
                            alertify.notify(message);
                            break;
                          default:
                           alertify.message(message);
                        }
         };
});



