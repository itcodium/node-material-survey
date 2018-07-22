var express = require('express'),
    fs = require('fs'),
    passport = require('passport');
var path = require('path');
var http = require('http');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var connect = require('connect');
var  crypto = require('crypto')
var _ = require('underscore');

var ldap = require('ldapjs');

var Person = function () {
    console.log("Person ",'instance created', "Person ");
};


var TESTLDAP= new mongoose.Schema({
    aud_cod_auditoria : String,
    aud_fecha_carga : String,
    aud_registros_origen : Number,
    aud_registros_destino : Number,
    aud_cant_reg_error : Number,
    aud_cant_reg_warning : Number,
    aud_duracion_proceso : Number,
    aud_estado_carga : String,
    aud_log : String,
    aud_cant_cargas : Number,
    historia:[]
});

module.exports = mongoose.model('Auditoria', AuditoriaSchema,'auditoria');


var client = ldap.createClient({
    url: 'ldap://10.10.20.120:389'
});
var root="dc=ergorenova,dc=com,dc=ar";
var usuario='cn=Manager,'+root;
var password="cloudera";

client.bind(usuario, password, function(err) {
    console.log("Bind LDAP",err);
});




var opts = {filter: '(uid=gramirez)',scope: 'sub'};



var testLDAP= new User({
    name: 'Chris',
    username: 'sevilayha',
    password: 'password'
});

client.search('ou=Users,dc=ergorenova,dc=com,dc=ar', opts, function(err, res) {
    res.on('searchEntry', function(entry) {
        console.log('Groups: ' , JSON.stringify(entry.object)) //, JSON.stringify(entry.object.memberUid));
    });
    res.on('searchReference', function(referral) {
        console.log('referral: ' + referral.uris.join());
    });
    res.on('error', function(err) {
        console.error('error: ' + err.message);
    });
    res.on('end', function(result) {
        console.log('status: ' + result.status);
    });
});



