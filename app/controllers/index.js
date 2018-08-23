var mongoose = require('mongoose')
    , async = require('async')
    , _ = require('underscore')

exports.authCallback = function (req, res, next) {
  res.redirect('/')
}
exports.render = function(req, res){
	req.user=
    res.render('index', {
        user: req.user ? JSON.stringify(req.user) : "null"
    })
}

exports.signin = function (req, res) {
    res.render('users/signin', {
    title: 'Signin',
    message: req.flash('error')
  })
}

exports.session = function (req, res) {
  res.redirect('/')
}