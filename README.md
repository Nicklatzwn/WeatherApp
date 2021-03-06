# WeatherApplication

A web app for predicting possible spoilage for a ship's cargo according to a given route

## Node JS installation on Windows

Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` (You can find git [here](https://git-scm.com/)).
You can confirm the installation by typing node --version in the terminal.

## Connection PostgreSQL:
   Just go on [PostgreSQL](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) and download the installer.
   In PostgreSQL folder open SQL Shell (psql) and keep the default values.You should create a role:
   ```
   $ CREATE ROLE weather_master WITH LOGIN PASSWORD '123.456';
   ```
   After you should create the Database:
   ```
   $ CREATE DATABASE "weather_master";
   ```
## Installation
    $ git clone URL
    $ cd weatherapplication
    $ npm install
    $ npm install sequelize-cli -g
    $ sequelize db:migrate 
## Run Application
    $ cd weatherapplication
    $ set DEBUG=weatherapplication
    $ npm run start
## Browser  

Open [http://localhost:3000](http://localhost:3000) to view the Web Application in the browser.
## Testing
    $ cd weatherapplication
    $ npm run test
## Build/Run Docker Image
    $ cd weatherapplication
    $ docker build -t weatherapp .
    $ docker-compose up -d
    $ docker-compose down # (Shut Down)
Navigate to the [http://localhost:8000](http://localhost:8000) to view the Web Application in the browser.    

