const models = require('../models');

exports.get_routing= function(req, res, next) {
    res.render('routing', { title: 'Express', user: req.user });
}

exports.submit_route = function(req, res, next) {
    return models.Routertrip.create({
        name: req.body.route_name,
        temperature: req.body.route_temperature,
        humidity: req.body.route_humidity,
        UserId: req.user.id
    }).then(route => {
        res.redirect("/routes");
    })
}

exports.show_routes = function(req, res, next) {
    return models.Routertrip.findAll({
        where: {
            UserId: req.user.id
        }
    }).then(routes => {
        res.render('route/routes', { routes: routes, user: req.user });
    })
}

exports.show_points_route = function(req, res, next) {
    return models.Point.findAll({
        where: {
            RoutertripId: req.params.route_id
        }
    }).then(points => {
        res.render('point/points', {points : points, route_id:req.params.route_id, name_route:req.params.route_name, user: req.user });
    })
}

exports.submit_route_json = function(req, res, next) {
    return models.Routertrip.create({
        name: req.body.name,
        temperature: req.body.temperature,
        humidity: req.body.humidity,
        UserId: req.user.id
    }).then(route => {
        res.send({route: route});
    })
}
exports.delete_route_json = function(req, res, next) {
    return models.Routertrip.destroy({
        where: {
            id: req.params.route_id
        }
    }).then(result => {
        res.send({ msg: "Success" });
    })
}

exports.submit_point_json = function(req, res, next) {
    console.log(req.body);
    console.log(req.params.route_name);
    return models.Point.create({
        coordinate_x: req.body.point_coordinate_x,
        coordinate_y: req.body.point_coordinate_y,
        clockAt: req.body.clock_time,
        reachedAt: req.body.date_point,
        RoutertripId: req.body.route_id
    }).then(point => {
        res.send({ point : point});
    })
}

exports.delete_point_json = function(req, res, next) {
    return models.Point.destroy({
        where: {
            id: req.params.point_id
        }
    }).then(result => {
        res.send({ msg: "Success" });
    })
}