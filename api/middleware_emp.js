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

function init() {
}



function signin(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.employee.EmployeeAuth(req.body, function (err,code, message, result) {
                if (err) {
                    console.log({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                waterfallCallback(null,code, message, result);
                });
            },
            function (code, message, result, waterfallCallback){
                return res.json(_.merge({
                    user: result,
                    message: message 
                }, utils.errors[""+code]));
            }
        ]);

}

function validateEmployee(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.employee.setUserId(req.body, function (err,isavailable, user_id) {
                if (err) {
                    console.log({
                        error: err
                    });
                    return res.json(utils.errors["500"]);
                }
                waterfallCallback(null,isavailable, user_id);
                });
            },
            function (isavailable, user_id, waterfallCallback){
                if(isavailable == true){
                    req.body.user_id = user_id;
                        next();
                }
                else{
                    if(req.body.complaint_from == "employee")
                         return res.json(_.merge({                    
                            message: "Un Authorized" 
                        }, utils.errors["401a"]));
                    else{
                      //  next();
                    }
                }
            }
        ]);

}

exports.init = init;
exports.signin = signin;
exports.validateEmployee = validateEmployee;
