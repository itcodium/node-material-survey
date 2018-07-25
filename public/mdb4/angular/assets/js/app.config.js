 

// Configuración de las rutas
app.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'assets/pages/home.html',
            controller: 'mainController'
        })
         .when('', {
             templateUrl: 'assets/pages/home.html',
             controller: 'mainController'
         })
        .when('/admin/user', {
            templateUrl: 'assets/pages/admin/users/user.html',
            controller: 'userController'
        })
         .when('/admin/edituser', {
             templateUrl: 'assets/pages/admin/users/edituser.html',
            controller: 'edituserController'
        })
         .when('/admin/perfil', {
             templateUrl: 'assets/pages/admin/perfiles/perfil.html',
            controller: 'perfilController'
        })
         .when('/admin/editperfil', {
             templateUrl: 'assets/pages/admin/perfiles/editperfil.html',
            controller: 'editperfilController'
        })
        .when('/admin/modulo', {
            templateUrl: 'assets/pages/admin/modulos/modulo.html',
            controller: 'moduloController'
        })
         .when('/admin/editmodulo', {
             templateUrl: 'assets/pages/admin/modulos/editmodulo.html',
            controller: 'editmoduloController'
        })
         .when('/admin/perfilmodulo', {
             templateUrl: 'assets/pages/admin/perfilesmodulos/perfilmodulo.html',
            controller: 'perfilmoduloController'
        })
         .when('/admin/editperfilmodulo', {
             templateUrl: 'assets/pages/admin/perfilesmodulos/editperfilmodulo.html',
            controller: 'editperfilmoduloController'
         })
        .when('/admin/menu', {
            templateUrl: 'assets/pages/admin/menu.html',
            controller: 'menuController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

