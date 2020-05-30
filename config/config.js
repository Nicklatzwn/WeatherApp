module.exports = {
  "development": {
    "username": "weather_master",
    "password": '123.456',
    "database": "weather_master",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": 1,
    "port" : 5432
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": 1
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": 1
  }
}
