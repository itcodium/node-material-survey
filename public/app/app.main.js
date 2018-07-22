window.app = angular.module('Pims', ['ngCookies', 'ngResource',  'ngRoute',
    'ui.bootstrap', 'ngGrid','ui.keypress', 'bp4.menu',
    'ab.controllers', 'ab.services'
]);


window.angular.module('ab.controllers', ['ab.controllers.header',
                                'ab.controllers.index']);

window.angular.module('ab.services', ['ab.services.global']);