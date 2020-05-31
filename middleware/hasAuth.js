let createError = require('http-errors')

exports.isLoggedIn = function(req, res, next) {
    if (req.user)
        next();
    else
        next(createError(404, "You Must Login Or Sign Up."));
}

exports.hasAuth = function(req, res, next) {
    if (req.user && req.user.is_admin == true)
        next();
    else
        next(createError(404, "You don't have the authentication."));
}