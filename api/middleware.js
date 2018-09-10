"use strict";

var fs = require("fs"),
    _ = require("lodash"),
    async = require("async"),
    config = require("config"),
    uuidv4 = require("uuid/v4"),
    utils = require("../utils"),
    mustache = require("mustache"),
    passport = require("passport"),
    request = require("superagent"),
    services = require("../services");
var base64ToImage = require('base64-to-image');
var uniqid = require('uniqid');
//var FORGOT_PASSWORD_HTML = fs.readFileSync("www/resetpassword.html", "utf8");
/*
To Maintain Local Session
*/
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
passport.serializeUser(function (appartment_details, done) {
    done(null, appartment_details);
});

passport.deserializeUser(function (appartment_details, done) {
    done(null, appartment_details);
});
passport.serializeUser(function (flatuser, done) {
    done(null, flatuser);
});

passport.deserializeUser(function (flatuser, done) {
    done(null, flatuser);
});

function init() {
}



function signin(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.create(req.body.userId, function (err, result) {
                if (err) {
                    req.log.error({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                waterfallCallback(null,result);
                });
            },
            function (mydata, waterfallCallback){
                return res.json(_.merge({
                    data: mydata 
                }, utils.errors["200"]));
            }
        ]);

}
////////register///////

function registerpage(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.create(req.body, function (err, result) {
                if (err) {
                    req.log.error({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                waterfallCallback(null,result);
                });
            },
            function (mydata, waterfallCallback){
                return res.json(_.merge({
                    data: mydata 
                }, utils.errors["200"]));
            }
        ]);

}

function loginpages(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.check(req.body, function (err, result) {
                if (err) {
                    req.log.error({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                waterfallCallback(null,result);
                });
            },
            function (mydata, waterfallCallback){
                return res.json(_.merge({
                    data: mydata 
                }, utils.errors["200"]));
            }
        ]);

}





exports.init = init;
exports.passport = passport;
exports.signin = signin;
exports.registerpage = registerpage ;
exports.loginpages = loginpages;
