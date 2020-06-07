let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../app");
let controllers = require("../controllers/routing");
let db = require("../models/index");
let models = require("../models");


//Assertion Style
const expect = require('chai').expect;

chai.use(chaiHttp);

const UserLatzonis = {
    username: 'nickolakis',
    firstname: 'Nikolaos',
    lastname: 'latzonis',
    password: 'nicklatzon121995',
    email: 'mr.sometest@gmail.com',
    //password: faker.internet.password(),
};

const RouteLatzonis = {
    name: 'nickolakis',
    temperature: '10',
    humidity: '10',
    num_dangers: 1
    //password: faker.internet.password(),
};

const PointLatzonis = {
    coordinate_x: '10',
    coordinate_y: '10',
    clockAt: '13:00:00',
    reachedAt: '2020-06-07',
    temperature: '35',
    humidity: '35',
    icon: '03d',
    status : 'DANGER'
    //password: faker.internet.password(),
};


describe('Controllers API', () => {

    var myUser;
    var myRoute;
    var myPoint;

    before(async () => {
        await db.sequelize.drop().then(function () {
            console.log('\n Test database dropped');
        });
        await db.sequelize
            .sync() // create the database table for our model(s)
            .then(async function () {
                // do some work
                const result = await chai
                    .request(app)
                    .post('/signup')
                    .send(UserLatzonis);
                expect(result.status).to.equal(200);
            })
        myUser = await models.User.findOne({
            where: {
                username: UserLatzonis.username
            }
        });
        myRoute = await models.Routertrip.create({
            name: RouteLatzonis.name,
            temperature: RouteLatzonis.temperature,
            humidity: RouteLatzonis.humidity,
            num_dangers: RouteLatzonis.num_dangers,
            UserId: myUser.id
        });
        myPoint = await models.Point.create({
            coordinate_x: PointLatzonis.coordinate_x,
            coordinate_y: PointLatzonis.coordinate_y,
            clockAt: PointLatzonis.clockAt,
            reachedAt: PointLatzonis.reachedAt,
            icon: PointLatzonis.icon,
            temperature: PointLatzonis.temperature,
            humidity: PointLatzonis.humidity,
            status: PointLatzonis.status,
            RoutertripId: myRoute.id
        });

        // myUser   ------>   myRoute     -------->   myPoint

    });

    after('Closing db', async () => {
        await db.sequelize.close().then(function () {
            console.log('\n Connection closed');
        })
    });

//======================================================================================

    describe("GET /", () => {
        it("It should GET routing.pug with title Express", (done) => {
            var request = {};
            var response = {
                viewName: ""
                , data: {}
                , render: function (view, viewData) {
                    this.viewName = view;
                    this.data = viewData;
                }
            };

            controllers.get_routing(request, response);
            expect(response.viewName).to.be.equal('routing');
            expect(response.data).to.have.property('title').equals('Express');
            done();
        });

        it("It should GET /", (done) => {
            chai.request(app)
                .get("/")
                .end((err, response) => {
                    expect(response).to.have.status(200);
                    done();
                });
        });

    });

//============================================================

    describe("GET POST /routes", () => {

        it("It should Get all Routes", (done) => {
            var request = {user: myUser};
            var response = {
                viewName: ""
                , data: {}
                , render: function (view, viewData) {
                    this.viewName = view;
                    this.data = viewData;
                }
            };

            controllers.show_routes(request, response).then(function () {
                expect(response.viewName).to.be.equal('route/routes');
                expect(response.data).to.be.an('object').that.has.all.keys('routes', 'user');
                expect(response.data).to.have.property('user', myUser);
            });
            done();
        });

        describe("Post /", () => {

            it("It should Rost a new Route", (done) => {
                var response = {
                    viewName: ""
                    , redirect: function (view, viewData) {
                        this.viewName = view;
                    }
                };

                var request = {
                    body: {
                        route_name: 'Nickos',
                        route_temperature: '10',
                        route_humidity: '10',
                    },
                    user: myUser
                };
                controllers.submit_route(request, response).then(function () {
                    expect(response.viewName).to.be.equal('/routes');
                    done();
                });
            });

        });


    });
//==========================================


    describe("Post /createRouteJSON", () => {

        it("It should Rost a new Route", (done) => {
            var response = {
                data: {}
                , send: function (viewData) {
                    this.data = viewData
                }
            };

            var request = {
                body: {
                    name: myRoute.name,
                    temperature: myRoute.temperature,
                    humidity: myRoute.humidity,
                    UserId: myUser.id
                },
                user: myUser
            };
            controllers.submit_route_json(request, response).then(function () {
                expect(response.data).to.have.deep.property('route').that.have.deep.property('dataValues').that.have.property('UserId', myUser.id);
                done();
            });
        });
    });

    //==================================

    describe("GET /createPointJSON/", () => {
        it("It should GET create a Point Json", (done) => {
            var request = {
                body: {
                    point_coordinate_x: PointLatzonis.coordinate_x,
                    point_coordinate_y: PointLatzonis.coordinate_y,
                    clock_time: PointLatzonis.clockAt,
                    date_point: PointLatzonis.reachedAt,
                    route_id: myPoint.RoutertripId,
                    temperature: PointLatzonis.temperature,
                    route_humidity: PointLatzonis.humidity
                }
            };

            var response = {
                data: {}
                , send: function (viewData) {
                    this.data = viewData
                }
            };

            controllers.submit_point_json(request, response).then( function () {
                expect(response.data).to.have.property('status', 'OK');
                expect(response.data).to.have.property('msg', 'Success');
                done();
            });
        });

    });

    // //========================================

    describe("Get /route/:route_id/:route_name?", () => {

        it("It should Get all Points from one Route", (done) => {
            var response = {
                viewName: "",
                data: {},
                render: function (view, viewData) {
                    this.viewName = view;
                    this.data = viewData
                }
            };

            var request = {
                params: {
                    route_id: myPoint.RoutertripId
                },
                user: myUser
            };
            controllers.show_points_route(request, response).then( function () {
                    console.log(response.data);
                    let filteredDataPoint = response.data.points.filter(Point => Point.id === myPoint.id);
                    expect(response.viewName).to.be.equal('point/points');
                    expect(filteredDataPoint[0]).to.have.property('dataValues').to.have.property('id', myPoint.id);
                    expect(response.data).to.have.property('route').that.have.deep.property('dataValues').that.have.deep.property('id', myPoint.RoutertripId);
                    done();
            }).catch(done);
        });

    });

    // ==========================================

    describe("Post /point/:point_id/delete-json", () => {

        it("It should Delete a Point", (done) => {
            var response = {
                data: {}
                , send: function (viewData) {
                    this.data = viewData
                }
            };

            var request = {
                params: {
                    point_id: myPoint.id
                },
                body: {
                    pointStatus: myPoint.status,
                    routeId: myPoint.RoutertripId
                }
            };
            controllers.delete_point_json(request, response).then(function () {
                expect(response.data).to.have.property('msg', 'Success');
                done();
            });
        });
    });

    //==========================================

    describe("Post /route/:route_id/delete-json", () => {

        it("It should Delete a Route", (done) => {
            var response = {
                data: {}
                , send: function (viewData) {
                    this.data = viewData
                }
            };

            var request = {
                params: {
                    route_id: myRoute.id
                }
            };
            controllers.delete_route_json(request, response).then(function () {
                console.log(response.data);
                expect(response.data).to.have.property('msg', 'Success');
                done();
            });
        });
    });
})
