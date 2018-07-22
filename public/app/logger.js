/* logger: logs messages of events during 
 * current user session in an in-memory log 
 */
app.factory('logger', function () {
    
    var logEntries = [];
    var cachdb = [];
    var counter = 1;

    var logger = {
        log: log,
        cach: cach,
        logEntries: logEntries,
        cacher: cachdb
    };

    return logger;
    
    function log(message, type) {

        var logEntry = {
            id: counter++,
            message: message,
            type: type || "info"         
        };
        logEntries.push(logEntry);
    }
    
    function cach(oper, obj, tabla) {


        switch (oper) {
            case '':
            case 'add':
                cachdb.push(obj);
                break;
            case 'traer':
                var a = cachdb[tabla];
                return a;
                break;
            case 'buscar':
                timoff = 8000;
                break;
            default:
                timoff = 18000;
        }


       

        
    }
});