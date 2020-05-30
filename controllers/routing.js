const models = require('../models');

exports.get_routing= function(req, res, next) {
    res.render('routing', { title: 'Express', user: req.user });
}

exports.submit_route = function(req, res, next) {
    console.log("route name:", req.body.route_name);
    console.log("route temperature:", req.body.route_temperature);
    console.log("route humidity:", req.body.route_humidity);
    return models.Route.create({
        name: req.body.route_name,
        temperature: req.body.route_temperature,
        humidity: req.body.route_humidity
    }).then(route => {
        res.redirect("/routes");
    })
}

exports.show_routes = function(req, res, next) {
    return models.Route.findAll().then(routes => {
        res.render('route/routes', { title: 'Express', routes: routes });
    })
}

exports.show_points_route = function(req, res, next) {
    return models.Point.findAll({
        where: {
            routerId: req.params.route_id
        }
    }).then(route => {
        res.render('point/points', {route : route});
    })
}

exports.show_route = function(req, res, next) {
    return models.Route.findOne({
        where: {
            id: req.params.route_id
        }
    }).then(route => {
        res.render('route/route', {route : route});
    })
}

exports.submit_route_json = function(req, res, next) {
    console.log(req.body);
    return models.Route.create({
        name: req.body.name,
        temperature: req.body.temperature,
        humidity: req.body.humidity
    }).then(route => {
        res.send({ route : route});
    })
}