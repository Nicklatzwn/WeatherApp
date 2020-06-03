const models = require('../models');
let request = require('request-promise');
const kelvin = 273.15;

exports.get_routing= function(req, res, next) {
    res.render('routing', { title: 'Express', user: req.user });
}

exports.submit_route = function(req, res, next) {
    return models.Routertrip.create({
        name: req.body.route_name.toString(),
        temperature: req.body.route_temperature.toString(),
        humidity: req.body.route_humidity.toString(),
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
    return models.Routertrip.findOne({
        where : {
            id : req.params.route_id
        }
    }).then( route => {
        models.Point.findAll({
            where: {
                RoutertripId: req.params.route_id
            }
        }).then(points => {
            res.render('point/points', {map_points : JSON.stringify(points), points: points, route: route, user: req.user });
            })
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
    return getWeather(res, req).then(result => {
        if(result) {
            return models.Point.create({
                coordinate_x: req.body.point_coordinate_x,
                coordinate_y: req.body.point_coordinate_y,
                clockAt: req.body.clock_time,
                reachedAt: req.body.date_point,
                temperature: result.temperature,
                humidity: result.humidity,
                icon: result.icon,
                status: result.status,
                RoutertripId: req.body.route_id

            }).then(point => {
                res.send({status: "OK", msg: "Success"});
            });
        }
    });
}


exports.delete_point_json = function(req, res, next) {
    return models.Point.destroy({
        where: {
            id: req.params.point_id
        }
    }).then(point_destroyed => {
        if(point_destroyed && req.body.pointStatus === 'DANGER') {
            decreaseRouteStatus(req.body.routeId);
        }
        res.send({msg: 'Success'});
    })
}

async function getWeather(res, req) {
    try {
        let api = '445255ae27db754f38ed8a5aca28b02e';
        let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${req.body.point_coordinate_x}&lon=${req.body.point_coordinate_y}&exclude={current,minutely,daily}&appid=${api}`
        // https://openweathermap.org/api/one-call-api
        let response_body = await request(url);
        let weather_json = JSON.parse(response_body);
        let unixTimestamp = Math.round(new Date(req.body.date_point + " " + req.body.clock_time + "00.000").getTime() / 1000);
        // https://stackoverflow.com/questions/46237707/node-js-converting-date-string-to-unix-timestamp

        let weather_desired_json = weather_json.hourly.filter(hourly => {
            if (hourly['dt'] === unixTimestamp) return hourly
        });
        if (weather_desired_json.length) {
            let status = 'SAFE';
            if (req.body.temperature < Math.round(weather_desired_json[0].temp - kelvin) || req.body.route_humidity < weather_desired_json[0].humidity) {
                status = 'DANGER';
                increaseRouteStatus(req.body.route_id);
            }
            return {
                temperature: Math.round(weather_desired_json[0].temp - kelvin),
                humidity: weather_desired_json[0].humidity,
                icon: weather_desired_json[0].weather[0].icon,
                status: status
            };
        } else {
            res.send({status: "error", msg: "No Data Found!"});
        }
    } catch (error) {
        console.log(error);
        res.send({status: "error", msg: "Invalid Data"});
    }
}
function increaseRouteStatus(route_id) {
    return models.Routertrip.findOne({
        where: {
            id: route_id
        }
    }).then(route => {
        return route.increment('num_dangers');
    });
}

function decreaseRouteStatus(route_id) {
    return models.Routertrip.findOne({
        where: {
            id: route_id
        }
    }).then(route => {
        return route.decrement('num_dangers');
    });
}
