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

router.post('/', routing.submit_route);

router.get('/routes', routing.show_routes);

router.get('/route/:route_id', routing.show_points_route);

router.post('/createRouteJSON', routing.submit_route_json);

router.post('/createPointJSON', routing.submit_point_json);

module.exports = router;
