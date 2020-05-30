let validator = require('validator');
let models = require('../models');

const validateCreateUserFields = function(errors, req) {
    if(!validator.matches(req.body.username, "^[a-zA-Z0-9_\.\-]*$")) {
        errors["username"] = "Please use a valid username";
    }
    if(!validator.isAscii(req.body.password)) {
        errors["password"] = "Innvalid characters in password, please try again";
    }
    if(!validator.isLength(req.body.password, {min: 8, max: 25})) {
        errors["password"] = "Password must have a minimum of 8 characters";
    }
}

exports.validateUser = function(errors, req) {
    return new Promise(function(resolve, reject) {
        validateCreateUserFields(errors, req);
        return models.User.findOne({
            where: {
                username: req.body.username
            }
        }).then(u => {
            if (u !== null) {
                errors["username"] = "Username is already in use. Please login or reset your password";
            }
            resolve(errors);
        })
    })
}