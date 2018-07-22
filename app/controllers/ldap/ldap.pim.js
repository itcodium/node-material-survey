
var ldap = require('ldapjs');
//2015-11-04

var PimLDAP = function () {
    /*
    var ROOT="dc=ergorenova,dc=com,dc=ar";
    var LDAP_USER='cn=Manager,'+ROOT;
    var LDAP_PASSWORD="cloudera";
    var ldapUrl='ldap://192.10.20.120:389';
    */

    var ROOT="dc=snap,dc=ec";
    var LDAP_USER='cn=Manager,'+ROOT;
    var LDAP_PASSWORD="snap2015.";
    var ldapUrl='ldap://192.168.70.19:389';


    var USUARIOS='ou=Users';

    var client = ldap.createClient({
        url: ldapUrl
    });

    client.bind(LDAP_USER, LDAP_PASSWORD, function(err) {
        console.log("- bind -",err);
    });

    this.userSearch=function(name,callback,req,res,user){
        var super_callback=callback;
        var request=req;
        var response=res;
        var usuario=user;
        var error;


        client.search("uid="+name+","+USUARIOS+','+ROOT, {}, function(err, res) {
            res.on('searchEntry', function(entry) {
                super_callback(request,response,usuario,entry.object,undefined);
                console.log('Groups: ' , JSON.stringify(entry.object)) //, JSON.stringify(entry.object.memberUid));
            });
            res.on('searchReference', function(referral) {
                console.log('referral: ' + referral.uris.join());
            });
            res.on('error', function(err) {
                super_callback(request,response,usuario,undefined,err);
                console.error('error: ' + err.message);
            });
            res.on('end', function(result) {
                console.log('status: ' + result.status);
            });
        });
    }
    this.userAdd=function(userLdap,callback,req,res,inputUser){
        var super_callback=callback;
        var request=req;
        var response=res;
        var usuario=userLdap;
        var iUSer=inputUser;
        var error;

        var entry = {
            "cn":userLdap.cn,
            "gidNumber":0,
            "homeDirectory":userLdap.homeDirectory ,
            "uidNumber":new Date().getUTCMilliseconds(),
            "sn":userLdap.sn,
            "objectClass":["posixAccount","top","inetOrgPerson","person","organizationalPerson"]
        };

        client.add('uid='+userLdap.uid+','+USUARIOS+','+ROOT, entry, function(err) {
            super_callback(request,response,iUSer,undefined,err);
            console.log("User add ** ",err);
        });
    }

    this.userDelete=function(user){

        client.del('uid='+user+','+USUARIOS+','+ROOT, function(err) {
            console.log("User Delete ** ",err);
        });

    }


    this.userUpdate=function(operation,modification, uid){
        var change = new ldap.Change({
            operation: operation,
            modification: modification
        });
        client.modify('uid='+uid+','+USUARIOS+','+ROOT, change, function(err) {
            console.log("User Update** ",err);
        });

    }

};




var p=new PimLDAP();

exports.userSearch= function (name,callback,req,res,user) {
    p.userSearch(name,callback,req,res,user);
};


exports.userAdd= function (userLdap,callback,req,res,userInput) {
    p.userAdd(userLdap,callback,req,res,userInput);
};

exports.userUpdate= function (operation,modification, uid) {
    p.userUpdate(operation,modification, uid);
};

exports.userDelete= function (name) {
    p.userDelete(name);
};

/*

 var ROOT="dc=snap,dc=ec";
 var LDAP_USER='cn=Manager,'+ROOT;
 var LDAP_PASSWORD="snap2015.";
 var ldapUrl='ldap://192.168.70.19:389';

*/