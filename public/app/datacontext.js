

window.app.factory('datacontext', ['logger', '$timeout', '$filter',
    function(logger, $timeout, $filter) {

        var datacontext = {
            clone: clone,
            extraer: extraer,
            alertar: alertar,
            setModule: setModule
        };

        return datacontext;




        function clone(obj) {
            if (obj === null || typeof obj !== 'object') {
                return obj;
            }

            var temp = obj.constructor();
            for (var key in obj) {
                temp[key] = clone(obj[key]);
            }

            return temp;
        }

        function extraer(qfrom, qwhere) {
            return clone($filter('filter')(qfrom, qwhere)[0]);
        }


        function alertar(obj, mensaje, type, timoff, strong, linkText, linkFunc) {
            
            var len = obj.length;
            if (len > 5) {
                obj.splice(0, 1);
                len -= 1;
            }

            var xid = (function () {
                if (len > 0) {
                    len -= 1;
                    return obj[len].id + 1;
                } else {
                    return 0;
                }
            })();

            obj.push({ type: type, msg: mensaje, id: xid, strong: strong, ltext: linkText, lfunc: linkFunc });

            //Tiempo de permanencia default si timoff es cero o undefined
            if (!timoff && type !== 'danger') {
                switch (type) {
                    case 'default':
                    case 'success':
                        timoff = 8000;
                        break;
                    case 'info':
                        timoff = 6000;
                        break;
                    case 'warning':
                        timoff = 14000;
                        break;
                    default:
                        timoff = 18000;
                }
            }

            if (timoff) {
                (function (x) {
                    $timeout(function () {
                        //length esta apropósito dentro del bucle  ( )
                        for (var i = 0, l = obj.length; i < l; i++) {
                            if (obj[i].id === x) { obj.splice(i, 1); break; };
                        }
                    }, timoff);
                })(xid);  //funcion atrapada dentro de otra apropósito ( )
            }
        };

        function setModule(module) {

        }

        //endregion
    }]);