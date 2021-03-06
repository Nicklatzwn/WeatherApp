let models = require("../models");
var bcrypt = require('bcryptjs');
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
let flash = require('connect-flash');
const { validateUser} = require('../validators/signup');
const {isEmpty} = require('lodash');

exports.show_login = function(req, res, next) {
    message_username = req.flash('message_username');
    message_password = req.flash('message_password');
    res.render('user/login', { formData : {}, error: {}, message: { message_username, message_password} });
}

exports.show_signup = function(req, res, next) {
    res.render('user/signup', { formData : {}, errors: {} });
}

exports.login = function(req, res, next) {
    passport.authenticate('local', {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    })(req, res, next);
}

const generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

const rerender_signup = function(errors, req, res, next) {
    res.render('user/signup', { formData : req.body, errors: errors });
}

exports.signup = function(req, res, next) {
    let errors = {};
    return validateUser(errors, req).then(errors => {
        if (!isEmpty(errors)) {
            rerender_signup(errors, req, res, next);
        } else {
            return models.User.findOne({
                where: {
                    is_admin: true
                }
            }).then(user => {
                let newUser;
                if (user !== null) {
                    newUser = models.User.build({
                        username: req.body.username,
                        password: generateHash(req.body.password),
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email
                    });
                } else {
                    newUser = models.User.build({
                        username: req.body.username,
                        password: generateHash(req.body.password),
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        is_admin: true
                    });
                }
                return newUser.save().then(result => {
                    passport.authenticate('local', {
                        successRedirect: "/",
                        failureRedirect: "/signup",
                        failureFlash: true
                    })(req, res, next);
                })
            })
        }
    })
}

exports.logout = function(req, res, next) {
    req.logout();
    req.session.destroy();
    res.redirect('/');
}
