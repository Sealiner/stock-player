"use strict";
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); //for express-session since v1.5.0, cookie-parser is no longer needed
var bodyParser = require('body-parser');
var partials = require('express-partials');
var session    = require('express-session');
var MongoStore = require('connect-mongo')(session); 
var config = require('./utils/config'); 
var flash = require('connect-flash');
var cluster = require('cluster');
var routes = require('./routes/index');
var api = require('./routes/api');

if(!cluster.isMaster) {
    var app = express();
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    app.use(partials());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    //set sessions
    app.use(session({
        secret: config.db_mongo.cookie_secret,
        cookie: {
            httpOnly: true,
            //secure: true,
            maxAge: null
        },
        store: new MongoStore({
            url: config.db_mongo.url
        }),
        resave: false,
        saveUninitialized: false
    }));
    app.use(flash());
    //
    app.listen(config.port);
    console.log("start at :"+config.port+" @env="+config.env+"&vd_admin="+process.env.VD_ADMIN);
    //set some basic information to res.locals, to be used on the pages
    app.use(function(req, res, next){
        res.locals.config = {
            version: "20150802",
            env: config.env
        };
        next();
    });
    //router
    app.use(api);
    app.use(routes);

} else {
    require('os').cpus().forEach(function () {
        cluster.fork();
    });
    cluster.on('exit', function (worker, code, signal) {
        //console.log('worker ' + worker.process.pid + ' died');
    });
    cluster.on('listening', function (worker, address) {
        //console.log("A worker with #"+worker.id+" is now connected to " + address.address +":" + address.port);
    });
}

module.exports = app;