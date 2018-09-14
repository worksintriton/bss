"use strict";

var express = require("express"),
    utils = require("../utils"),
    jsonschema = require("./jsonschema"),
    middleware = require("./middleware"),
    cors = require("cors");

var app = express(),
router = express.Router();

function addRoute(path, method, middlewares) {
    var handlers = [].concat(middlewares);
    handlers.unshift(utils.validator.validate(path, jsonschema));
    router[method.toLowerCase()](path, handlers);
}

app.use("*", [cors(),middleware.passport.initialize(), middleware.passport.session()]);
app.options('*', cors());



addRoute("/authentication/signin", "POST", [middleware.signin]);
addRoute("/authentication/registerpage", "POST", [middleware.registerpage]);
addRoute("/authentication/loginpages", "POST", [middleware.loginpages]);







addRoute("/authentication/updateclients", "POST", [middleware.updateclients]);
addRoute("/authentication/addclients", "POST", [middleware.addclients]);
addRoute("/authentication/clientlist", "POST", [middleware.clientlist]);



addRoute("/authentication/updateemplo", "POST", [middleware.updateemplo]);
addRoute("/authentication/addemployee", "POST", [middleware.addemployee]);
addRoute("/authentication/employeelist", "POST", [middleware.employeelist]);


addRoute("/authentication/addusers", "POST", [middleware.addusers]);
addRoute("/authentication/updateusers", "POST", [middleware.updateusers]);
addRoute("/authentication/userlist", "POST", [middleware.userlist]);
















app.use(router);

exports.init = middleware.init;
exports.router = app;