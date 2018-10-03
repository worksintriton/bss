"use strict";

var express = require("express"),
    utils = require("../utils"),
    jsonschema = require("./jsonschema"),
    middleware = require("./middleware"),
    cors = require("cors");
    const fileUpload = require('express-fileupload');

var app = express(),
router = express.Router();

app.use(express.static(__dirname));
app.set('view engine', 'ejs');
app.use(fileUpload());



function addRoute(path, method, middlewares) {
    var handlers = [].concat(middlewares);
    handlers.unshift(utils.validator.validate(path, jsonschema));
    router[method.toLowerCase()](path, handlers);
}

function addRoute1(path, method, middlewares) {

}


app.use("*", [cors(),middleware.passport.initialize(), middleware.passport.session()]);
app.options('*', cors());



addRoute("/authentication/signin", "POST", [middleware.signin]);
addRoute("/authentication/registerpage", "POST", [middleware.registerpage]);
addRoute("/authentication/loginpages", "POST", [middleware.loginpages]);



addRoute("/authentication/bsslogin", "POST", [middleware.bsslogin]);

addRoute("/authentication/clientlogin", "POST", [middleware.clientlogin]);

addRoute("/authentication/securitytlogin", "POST", [middleware.securitytlogin]);

addRoute("/authentication/employeeid", "POST", [middleware.employeeid]);

addRoute("/authentication/userid", "POST", [middleware.userid]);
addRoute("/authentication/updateclients", "POST", [middleware.updateclients]);










addRoute("/authentication/employeereqiured", "POST", [middleware.employeereqiured]);

















addRoute("/authentication/updateemplo", "POST", [middleware.updateemplo]);
addRoute("/authentication/addemployee", "POST", [middleware.addemployee]);
addRoute("/authentication/addemployee1", "POST", [middleware.addemployee1]);
addRoute("/authentication/addemployee2", "POST", [middleware.addemployee2]);
addRoute("/authentication/addemployee3", "POST", [middleware.addemployee3]);
addRoute("/authentication/addemployee4", "POST", [middleware.addemployee4]);
addRoute("/authentication/employeelist", "POST", [middleware.employeelist]);
addRoute("/authentication/addusers", "POST", [middleware.addusers]);
addRoute("/authentication/updateusers", "POST", [middleware.updateusers]);
addRoute("/authentication/userlist", "POST", [middleware.userlist]);
addRoute("/authentication/deleteclient", "POST", [middleware.deleteclient]);
addRoute("/authentication/deleteuser", "POST", [middleware.deleteuser]);
addRoute("/authentication/deleteemployee", "POST", [middleware.deleteemployee]);
addRoute1("/authentication/upload", "POST", [middleware.uploads]);
addRoute1("/authentication/upload", "POST", [middleware.uploads]);











addRoute("/authentication/addclients", "POST", [middleware.addclients]);
addRoute("/authentication/addclients1", "POST", [middleware.addclients1]);
addRoute("/authentication/clientid", "POST", [middleware.clientid]);
addRoute("/authentication/clientlist", "POST", [middleware.clientlist]);
addRoute("/authentication/updateclients", "POST", [middleware.updateclients]);
addRoute("/authentication/deleteclient", "POST", [middleware.deleteclient]);





























app.use(router);

exports.init = middleware.init;
exports.router = app;