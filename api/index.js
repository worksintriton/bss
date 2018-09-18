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

app.use("*", [cors(),middleware.passport.initialize(), middleware.passport.session()]);
app.options('*', cors());



addRoute("/authentication/signin", "POST", [middleware.signin]);
addRoute("/authentication/registerpage", "POST", [middleware.registerpage]);
addRoute("/authentication/loginpages", "POST", [middleware.loginpages]);



addRoute("/authentication/bsslogin", "POST", [middleware.bsslogin]);

addRoute("/authentication/clientlogin", "POST", [middleware.clientlogin]);

addRoute("/authentication/securitytlogin", "POST", [middleware.securitytlogin]);

addRoute("/authentication/employeeid", "POST", [middleware.employeeid]);
addRoute("/authentication/clientid", "POST", [middleware.clientid]);
addRoute("/authentication/userid", "POST", [middleware.userid]);


addRoute("/authentication/updateclients", "POST", [middleware.updateclients]);
addRoute("/authentication/addclients", "POST", [middleware.addclients]);
addRoute("/authentication/clientlist", "POST", [middleware.clientlist]);



addRoute("/authentication/updateemplo", "POST", [middleware.updateemplo]);
addRoute("/authentication/addemployee", "POST", [middleware.addemployee]);
addRoute("/authentication/employeelist", "POST", [middleware.employeelist]);


addRoute("/authentication/addusers", "POST", [middleware.addusers]);
addRoute("/authentication/updateusers", "POST", [middleware.updateusers]);
addRoute("/authentication/userlist", "POST", [middleware.userlist]);


addRoute("/authentication/deleteclient", "POST", [middleware.deleteclient]);
addRoute("/authentication/deleteuser", "POST", [middleware.deleteuser]);


addRoute("/authentication/deleteemployee", "POST", [middleware.deleteemployee]);


// default options
app.use(fileUpload());
 



app.post('/upload', function(req, res) {
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
   var startup_image = req.files;
   var fileName = req.body.fileName;
   // Use the mv() method to place the file somewhere on your server
   startup_image.mv(__dirname + '/services/images/' + fileName + '.jpg' , function(err) {
     if(err){
       console.log(err);
     }else{
    console.log("uploaded");
}
   });
 });
















app.use(router);

exports.init = middleware.init;
exports.router = app;