var app = angular.module("rrhh", ['ngRoute','rrhh.services']);


app.factory('AppControlText', function () {
    return {
        ES: {
            submit: "Enviar",
            cancel: "Cancelar",
            seleccionar: "Seleccionar...",
            buscar: "Buscar...",
            aceptar: "Aceptar",
        },
        EN: {
            submit: "EN_Send",
            cancel: "EN_Cancelar",
            seleccionar: "EN_Seleccionar...",
            buscar: "EN_Buscar...",
            aceptar: "EN_Aceptar",
        },
        PT: {
            submit: "PT_Enviar",
            cancel: "PT_Cancelar",
            seleccionar: "PT_Seleccionar...",
            buscar: "PT_Buscar...",
            aceptar: "PT_Aceptar",
        },
        getText: function () {
            return this[APP_PAGE_LANGUAGE.getLanguage()];
        }
    };;
});






function getTokenParam(){
    return 'uuid=' + localStorage.getItem("uuid");
}


app.controller('mainController', function ($scope) {
    $scope.message = 'Hola, Mundo!';
});

app.controller("appController", function($scope,$http,$location) {



    $scope.appName = "RRHH";
    $scope.appName = "RRHH";
    $scope.message = 'Ver. 0.0.1';
    $scope.titulo="";
    $scope.footer = "Version 0.0.1"; // &copy;
    $scope.screen = null;
    $scope.navigation={title:"Navigation",
						close:"Close",
						items:["Profile","Settings"]}

    console.log("$location.path() ", "-"+$location.path()+"-");
    if ($scope.titulo == "" || $location.path() == "") {
        if ($location.path() != "/" && $location.path()!="") {
            $scope.titulo = localStorage.getItem("titulo")
        } else {
            $scope.titulo = "";
        }
    }
 
    $scope.categories = [{
        title: 'Admin',
        class: "menu-icon icon-folder",
        categories: [
            {
                title: 'User', categories: [
                              { title: 'Alta', description: "Alta de usuario", link: "#admin/user" },
                              { title: 'Update', description: "Edicion de usuario", link: "#admin/edituser" }]

            },
            {
                title: 'Menu', categories: [
                                { title: 'Editar', description: "Editar menu", link: "#admin/menu" }]

            },
            { title: 'Perfiles', categories:[ 
            				{ title: 'Alta', description: "Alta de perfiles", link: "#admin/perfil" },
			   				{ title: 'Update', description: "Modificacion de perfiles.", link: "#admin/editperfil" }]
            	
            },
             { title: 'Modulos', categories:[ 
            				{ title: 'Alta', description: "Alta de modulos", link: "#admin/modulo" },
			   				{ title: 'Update', description: "Modificacion de modulos.", link: "#admin/editmodulo" }]
            	
            },
            { title: 'Perfiles-Modulos', categories:[ 
			   		{ title: 'Editar', description: "Editar modulos relacionados con perfiles.", link: "#admin/editperfilmodulo" }]
            	
            }
        ]
    }, {
        title: "Login",
        class: "menu-icon icon-user",
        categories: [{ title: "Login Form", link: "login.html" },
                    { title: "Register Form", link: "register.html" },
                    { title: "Forgot password", link: "forgot.html" }
                    ]
    }];




	$scope.settings = { reset:"Reset Options",
						header:[{ title:"Fixed Header ",
						 		 divClass:"ios-switch pull-right switch-md",
    					 		 checkClass:"js-switch pull-right fixed-header-check",
    					 		 checked:"true" }
							  ],
					   content:[
					   			{ title:"Fixed Sidebar",
						 		  divClass:"ios-switch pull-right switch-md",
    					 		  checkClass:"js-switch pull-right fixed-sidebar-check",
    					 		  checked:"false" },
    					 		{ title:"Toggle Sidebar",
						 		  divClass:"ios-switch pull-right switch-md",
    					 		  checkClass:"js-switch pull-right toggle-sidebar-check",
    					 		  checked:"false" },
    					 		{ title:"Compact Menu",
						 		  divClass:"ios-switch pull-right switch-md",
    					 		  checkClass:"js-switch pull-right compact-menu-check",
    					 		  checked:"true" }	
					   			]
					  };
	$scope.user={name:"David",
				 imageProfile:"assets/images/avatar1.png",
				 userItems:[ {title:"Profile",ref:"profile.html",class:"fa fa-user",divider:""},
							 {title:"",ref:"",divider:"divider"},
							 {title:"Lock screen",ref:"lock-screen.html",class:"fa fa-lock",divider:""},
							 {title:"Log out",ref:"login.html",class:"fa fa-sign-out m-r-xs",divider:""}
				 		 ]
				}
 

	$scope.menuPath = [];
	$scope.openLink = function (index) {
	    
        
	    if (typeof index.link != 'undefined') {
	        $scope.titulo = index.description;
	        localStorage.setItem("titulo", index.description);

	        if (index.link != '#') {
	            console.log("test", index.link);
	            window.location.href = index.link;
	        } else {
	            console.log("#Link ", index.link);
	            window.location.href = index.link;
	        }
	    } else {
	        localStorage.setItem("titulo", "");
	        $scope.titulo = "";
	    }
        
    }
});
 

 