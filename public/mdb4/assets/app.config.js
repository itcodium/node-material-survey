 

// Configuración de las rutas
app.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'assets/pages/home.html',
            controller: 'homeController'
        })
         .when('', {
             templateUrl: 'assets/pages/home.html',
             controller: 'homeController'
         })
        .when('/user/insert', {
            templateUrl: 'assets/pages/user/insert.html',
            controller: 'controllerUserInsert'
        })
        .when('/user/list', {
            templateUrl: 'assets/pages/user/list.html',
            controller: 'controllerUserList'
        })
        .otherwise({
            redirectTo: '/'
        });
});

