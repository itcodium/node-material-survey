

app.controller('ctrlPrecargaUsuario', ['$scope','Institucion','Perfiles','UserPrecarga','$location',
	function ($scope,Institucion,Perfiles,UserPrecarga,$location) {
     $scope.precarga={};
        $scope.precarga.cedula='0931811087';
        $scope.precarga.email='admin@sistema.net.ec';
        //$scope.precarga.username='admin_sistema';
        //$scope.precarga.name='admin sistema';
     $scope.precarga.perfiles=[];

     Perfiles.query({nivelSeguridad:user.perfiles[0].nivelSeguridad},function(res) {
         console.log("Perfiles");
			$scope.perfiles=res;
     }, function(err) {
         if(err.status==401){
             console.log("-err-",err);
             alert(err.data.error);
         }
     });

     Institucion.query(function(res) {
            $scope.instituciones=res;
     }, function(error) {});

     $scope.SaveUser=function () {
       console.log("- Validar email -",$scope.precarga.email, emailEsValido($scope.precarga.email));

         if(!emailEsValido($scope.precarga.email)){
             return;
         }

         if(!CedulaEsValida($scope.precarga.cedula)){
             return;
         }


      $scope.precarga.instituciones= _.filter($scope.instituciones, function(v){ return v.checked== true; });
         console.log("Pre Carga",$scope.precarga);
         // pedir confirmacion y avisar que se va a enviar mail
         if (confirm('Confirma la creación de este usuario? Se le enviará un e-mail con el link y clave de acceso para generar el usuario')) {
             var preCarga= new UserPrecarga($scope.precarga);
             preCarga.$save(function(p){
                 console.log("p.result",p,p.result.toUpperCase());
                 if(p.result.toUpperCase()=="ERROR"){
                     alert(p.message);
                 }else{
                     alert("La precarga se realizo correctamente.");
                 }
             });
         }


     }
}]);

function CedulaEsValida(cedula){
    var result=false;
    if(cedula.length == 10){

        //Obtenemos el digito de la region que sonlos dos primeros digitos
        var digito_region = cedula.substring(0,2);

        //Pregunto si la region existe ecuador se divide en 24 regiones
        if( digito_region >= 1 && digito_region <=24 ){

            // Extraigo el ultimo digito
            var ultimo_digito   = cedula.substring(9,10);

            //Agrupo todos los pares y los sumo
            var pares = parseInt(cedula.substring(1,2)) + parseInt(cedula.substring(3,4)) + parseInt(cedula.substring(5,6)) + parseInt(cedula.substring(7,8));

            //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
            var numero1 = cedula.substring(0,1);
            var numero1 = (numero1 * 2);
            if( numero1 > 9 ){ var numero1 = (numero1 - 9); }

            var numero3 = cedula.substring(2,3);
            var numero3 = (numero3 * 2);
            if( numero3 > 9 ){ var numero3 = (numero3 - 9); }

            var numero5 = cedula.substring(4,5);
            var numero5 = (numero5 * 2);
            if( numero5 > 9 ){ var numero5 = (numero5 - 9); }

            var numero7 = cedula.substring(6,7);
            var numero7 = (numero7 * 2);
            if( numero7 > 9 ){ var numero7 = (numero7 - 9); }

            var numero9 = cedula.substring(8,9);
            var numero9 = (numero9 * 2);
            if( numero9 > 9 ){ var numero9 = (numero9 - 9); }

            var impares = numero1 + numero3 + numero5 + numero7 + numero9;

            //Suma total
            var suma_total = (pares + impares);

            //extraemos el primero digito
            var primer_digito_suma = String(suma_total).substring(0,1);

            //Obtenemos la decena inmediata
            var decena = (parseInt(primer_digito_suma) + 1)  * 10;

            //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
            var digito_validador = decena - suma_total;

            //Si el digito validador es = a 10 toma el valor de 0
            if(digito_validador == 10)
                var digito_validador = 0;

            //Validamos que el digito validador sea igual al de la cedula
            if(digito_validador == ultimo_digito){
                console.log('la cedula:' + cedula + ' es correcta');
                result=true;
            }else{
                alert('La cedula:' + cedula + ' es incorrecta');
            }

        }else{
            // imprimimos en consola si la region no pertenece
            alert('Esta cedula no pertenece a ninguna region');
        }
    }else{
        //imprimimos en consola si la cedula tiene mas o menos de 10 digitos
        alert('Esta cedula tiene menos de 10 Digitos');
    }
    return result;
}
function emailEsValido(email)
{
    var domain=email.split('@')
    var domain_extention=domain[1].split('.')

    var dominios_permitidos_2= "gob;com;info;net;fin;edu;dir;org".split(';');
    var dominios_permitidos_3="gob.ec;com.ec;net.ec;edu.ec;fin.ec;dir.ec".split(';');

    var index=-1
    var result=false;
    if (domain_extention.length==2){
        index=dominios_permitidos_2.indexOf(domain_extention[1])
    }
    if (domain_extention.length==3){
        index=dominios_permitidos_3.indexOf(domain_extention[1]+"."+domain_extention[2]);
    }

    if(index!=-1){
        result=true;
    }
    return result;
}

/*

app.controller('perfilDelete.ctrl', ['$scope','$routeParams','$resource','$location','datacontext','Perfiles','Acciones',
	function ($scope,$routeParams,$resource,$location,datacontext,  Perfiles,  Acciones) {
		$scope.perfil = {};
		$scope.acciones= {};


	}]);

*/

