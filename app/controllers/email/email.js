
var mongoose = require('mongoose')
    , async = require('async')
    , _ = require('underscore')

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var PimEnviarEmail = function () {
    this.mailOptions = {
        from: 'Administracion Publica <soporte.pims@administracionpublica.gob.ec>',
        to: '',
        subject: '',
        html: '',
        text: "" // plaintext body
    };

    this.transporter = nodemailer.createTransport(smtpTransport({
        //host: 'mail.administracionpublica.gob.ec',
		host: '127.0.0.1', // modificar
        port: 587,
        ignoreTLS:false,
        auth: {
            user: 'soporte.pims@administracionpublica.gob.ec',
            pass: 'Innovac1on.'
        }
    }));

    this.send=function(to,subject,data){
        this.mailOptions.to=to;
        this.mailOptions.subject=subject;
        this.mailOptions.text=data;
        this.transporter.sendMail(this.mailOptions, function(error, info){
            if(error){
                return console.log("ERROR SEND MAIL",error);
            }
            console.log('Message sent: ' + info.response);
        });
    }
};

exports.Email=new PimEnviarEmail();
