var express = require('express');
var router = express.Router();

let routing = require('../controllers/routing');
let user = require('../controllers/user');
let {isLoggedIn, hasAuth} = require(("../middleware/hasAuth.js"));

/* GET home page. */
router.get('/login', user.show_login);
router.get('/signup', user.show_signup);
router.post('/login', user.login);
router.post('/signup', user.signup);
router.get('/logout', user.logout);
router.post('/logout', user.logout);

router.get('/', routing.get_routing);

router.post('/', isLoggedIn, routing.submit_route);

router.get('/routes', isLoggedIn, routing.show_routes);

router.get('/route/:route_id/:route_name?',isLoggedIn, routing.show_points_route);

router.post('/createRouteJSON',isLoggedIn, routing.submit_route_json);

router.post('/route/:route_id/delete-json',isLoggedIn, routing.delete_route_json);

router.post('/createPointJSON/',isLoggedIn, routing.submit_point_json);

router.post('/point/:point_id/delete-json',isLoggedIn, routing.delete_point_json);

module.exports = router;
