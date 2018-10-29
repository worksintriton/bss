"use strict";

var express = require("express"),
    utils = require("../utils"),
    jsonschema = require("./jsonschema"),
    middleware = require("./middleware"),
    middleware_emp = require("./middleware_emp"),
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


addRoute("/authentication/clientlogin", "POST", [middleware.clientlogin]);
addRoute("/authentication/securitytlogin", "POST", [middleware.securitytlogin]);
addRoute("/authentication/employeeid", "POST", [middleware.employeeid]);
addRoute("/authentication/userid","POST", [middleware.userid]);
addRoute("/authentication/updateclients", "POST", [middleware.updateclients]);

addRoute("/authentication/employeereqiured", "POST", [middleware.employeereqiured]);





addRoute("/authentication/addemployee", "POST", [middleware.addemployee]);
addRoute("/authentication/addusers", "POST", [middleware.addusers]);
addRoute("/authentication/updateusers", "POST", [middleware.updateusers]);



addRoute("/authentication/bsslogin", "POST", [middleware.bsslogin]);


addRoute("/authentication/confignumber", "POST", [middleware.confignumber]);

addRoute("/authentication/getconfignumber", "POST", [middleware.getconfignumber]);





addRoute("/authentication/training", "POST", [middleware.training]);
addRoute("/authentication/traininglessons", "POST", [middleware.traininglessons]);
addRoute("/authentication/trainingvideos", "POST", [middleware.trainingvideos]);




addRoute("/authentication/traininglist", "POST", [middleware.traininglist]);




addRoute("/authentication/Tracking", "POST", [middleware.Tracking]);

addRoute("/authentication/Trackinglist", "POST", [middleware.Trackinglist]);

addRoute("/authentication/Trackingperson", "POST", [middleware.Trackingperson]);












addRoute("/authentication/employeelist", "POST", [middleware.employeelist]);



addRoute("/authentication/userlist", "POST", [middleware.userlist]);
addRoute("/authentication/deleteclient", "POST", [middleware.deleteclient]);
addRoute("/authentication/deleteuser", "POST", [middleware.deleteuser]);
addRoute("/authentication/deleteemployee", "POST", [middleware.deleteemployee]);
//addRoute("/authentication/upload", "POST", [middleware.uploads]);





addRoute("/authentication/addclients", "POST", [middleware.addclients]);
addRoute("/authentication/addclients1", "POST", [middleware.addclients1]);
addRoute("/authentication/clientid", "POST", [middleware.clientid]);
addRoute("/authentication/clientlist", "POST", [middleware.clientlist]);
addRoute("/authentication/updateclients", "POST", [middleware.updateclients]);
addRoute("/authentication/deleteclient", "POST", [middleware.deleteclient]);
// addRoute("/authentication/test", "POST", [middleware.test]);









/*
Employee Api's
*/

addRoute("/authentication/employeeLogin", "POST", [middleware_emp.signin]);
addRoute("/authentication/updateEmpProfile", "POST", [middleware_emp.signin]);
/*
Issue Tracking
*/
addRoute("/issue/create", "POST", [middleware_emp.validateEmployee, middleware.create_issue]);
addRoute("/issue/updateissues", "POST", [middleware.updateissues]);
addRoute("/issue/taken_by", "POST", [middleware.taken_by]);
addRoute("/issue/report", "POST", [middleware.report]);
addRoute("/issue/issuedetails", "POST", [middleware.issuedetails]);
addRoute("/issue/issuetrack", "POST", [middleware.issuetrack]);


/*
PointTracking
*/









addRoute("/issue/createAttachment", "POST", [middleware.create_issue_attachment]);

addRoute("/issue/listallissues", "POST", [middleware.list_issue]);

addRoute("/issue/listmyissues", "POST", [middleware_emp.validateEmployee, middleware.list_my_issue]);

app.use(router);

exports.init = middleware.init;
exports.router = app;