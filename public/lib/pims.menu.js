


//created 2015.01.01 by BP4.CAOB
angular.module('bp4.menu', [])


    .directive('menu', function () {
        return {
            restrict: 'A',
            scope: {
                menu: '=menu',
                cls: '=ngClass'
            },
            replace: true,
            template: '<ul><li ng-repeat="item in menu" menuitem="item"></li></ul>',
            link: function (scope, element, attrs) {
                element.addClass(attrs.class);
                element.addClass(scope.cls);
            }
        }
    })


    .directive('menuitem', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                item: '=menuitem'
            },
            template: '<li active-link > <a ng-click="frontDoor(item.id)">{{item.name}}</a> </li>',
            link: function (scope, element, attrs) {
                if (scope.item.header) {
                    element.addClass('nav-header');
                    element.text(scope.item.header);
                }
                if (scope.item.divider) {
                    element.addClass('divider');
                    element.empty();
                }
                if (scope.item.submenu) {
                    element.addClass('dropdown');

                    var text = element.children('a').text();
                    element.empty();
                    var $a = $('<a class="dropdown-toggle">' + text + '</a>');
                    element.append($a);

                    var $submenu = $('<ul menu="item.submenu" class="dropdown-menu"></ul>');
                    element.append($submenu);
                }
                if (scope.item.click) {
                    element.find('a').attr('ng-click', 'item.click()');
                }
                $compile(element.contents())(scope);
            }
        };
    }]);


