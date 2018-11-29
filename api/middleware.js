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


function employeereqiured(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.clientmanagement.employeereqiureds(req.body, function (err, result) {
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
/////loginpage//////
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


//////bsslogin/////////

function bsslogin(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.loginpage.bsslogincheck(req.body, function (err, result) {
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

//////Clientlogin/////////

function clientlogin(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.loginpage.clientlogincheck(req.body, function (err, result) {
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

//////securitytlogin/////////

function securitytlogin(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.loginpage.securitytlogins(req.body, function (err, result) {
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




/////addEmployee///////

function addemployee(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.createemployee(req.body, function (err, result) {
                if (err) {
                    req.log.error({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }else{
                    console.log(result.length);
                       if(result == "0")
                       {
                        return res.json(_.merge({
                    data: {
                    "message": "Email_id Already used",
                     "status": "Success"
                    }  
                }, utils.errors["200"]));
               }
                        else{
                        waterfallCallback(null,result);
                       }
                } 
                });
            },
            function (result, waterfallCallback){ 
            console.log(result);            
              services.user.createemployee2 ( result, function (err, updateresult) {
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
                    data: {
        "message": "Employee Details add Successfully",
        "status": "Success"
    }  ,
                id:mydata.empid
                }, utils.errors["200"]));
            }
        ]);

}


///Qrcode//////
function updateqr(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.createemployee3(req.body, function (err, result) {
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
                    data: {
        "message": "Employee Details add Successfully",
        "status": "Success"
    }  
                }, utils.errors["200"]));
            }
        ]);

}

///addemployee1////

function addemployee1(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.createemployee3(req.body, function (err, result) {
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
                    data: {
        "message": "Employee Details add Successfully",
        "status": "Success"
    }  
                }, utils.errors["200"]));
            }
        ]);

}


function addemployee2(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.createemployee4(req.body, function (err, result) {
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
                    data: {
        "message": "Employee Details add Successfully",
        "status": "Success"
    }  
                }, utils.errors["200"]));
            }
        ]);

}

function addemployee3(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.createemployee5(req.body, function (err, result) {
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
                    data: {
        "message": "Employee Details add Successfully",
        "status": "Success"
    }  
                }, utils.errors["200"]));
            }
        ]);

}

function addemployee4(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.createemployee6(req.body, function (err, result) {
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
                    data: {
        "message": "Employee Details add Successfully",
        "status": "Success"
    }  
                }, utils.errors["200"]));
            }
        ]);

}
///lEmployee///


function updateemplo(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.updateemployees(req.body, function (err, result) {
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

///addusers////
function addusers(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.createusers(req.body, function (err, result) {
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
                    data:  mydata  
                }, utils.errors["200"]));
            }
        ]);

}
///addclient//////

function addclients(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                
                services.user.createclient(req.body, function (err, result) {
                if (err) {
                    return res.json(_.merge({
                    error_is: err 
                }, utils.errors["500"]));

                }else{

                    if(result.length == 0)
                    {
                        return res.json(_.merge({
                       }, utils.errors["401"]));

                    }else{
                        waterfallCallback(null,result);
                    }
                }
                });
            },
             function (mydata, waterfallCallback){  
                services.user.createclient1(mydata.cliid , function (err, result) {
                if (err) {
                    return res.json(_.merge({
                    error_is: err 
                }, utils.errors["500"]));

                }else{

                        waterfallCallback(null,mydata);  
                }
                });
            },
            function (mydata, waterfallCallback){
                return res.json(_.merge({
                    data: {
                 "message": "Client Details add Successfully",
                 "status": "Success"
                },
                cliid:mydata.cliid
                }, utils.errors["200"]));
            }
        ]);

}

function addclients1(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.createclient2(req.body, function (err, result) {
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


///updateclient//////

function updateclients(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.updateclient(req.body, function (err, result) {
                
                waterfallCallback(null,result);
                });
            },
            function (mydata, waterfallCallback){
                return res.json(_.merge({
                   message:"Updated Success"       
             }, utils.errors["200"]));
            }
        ]);

}

///updateusers//////

function updateusers(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.updateuser(req.body, function (err, result) {
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

////list///////

function clientlist(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.clientlists(req.body, function (err, result) {
                      
                      if(result.length == 0)
                      {
                         return res.json(_.merge({
                         }, utils.errors["402"]));
                      }else{
                         waterfallCallback(null,result);
                      }
                });
            },
            function (mydata, waterfallCallback){
                return res.json(_.merge({
                    data: mydata
                }, utils.errors["200"]));
            }
        ]);

}

function employeelist(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.employeelists(req.body, function (err, result) {
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

function userlist(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.userlists(req.body, function (err, result) {
                if (err) {
                    req.log.error({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }else{
                   if(result.length == 0 ){
                     return res.json(_.merge({ 
                     }, utils.errors["200"]));
                   }else{
                    waterfallCallback(null,result);
                   }  
               }
                });
            },
            function (mydata, waterfallCallback){
                return res.json(_.merge({
                    data: mydata 
                }, utils.errors["200"]));
            }
        ]);

}

function employeeid(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.employeeids(req.body, function (err, result) {
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
            
                services.user.employeeids1(req.body, function (err, result1) {
                if (err) {
                    req.log.error({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
               
                waterfallCallback(null,mydata,result1);
                });
            },
            function (mydata,result1,waterfallCallback){
                return res.json(_.merge({
                    data: mydata[0],
                    data1: result1[0]
                }, utils.errors["200"]));
            }
        ]);

}

function clientid(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.clientids(req.body, function (err, result) {
               
                waterfallCallback(null,result);
                });
            },
            function (Client_details, waterfallCallback){

                 services.user.clientids1(req.body, function (err, result) {
                if (err) {
                    req.log.error({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                waterfallCallback(null,Client_details,result);
                });
            },
            function (Client_details,result, waterfallCallback){
                return res.json(_.merge({
                    Client_details:Client_details[0],
                    Client_payment:result[0]
                }, utils.errors["200"]));
            }
        ]);

}







function userid(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.userids(req.body, function (err, result) {
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
                    data: mydata[0]
                }, utils.errors["200"]));
            }
        ]);

}

function deleteclient(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.deleteclients(req.body, function (err, result) {
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

function deleteuser(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.deleteusers(req.body, function (err, result) {
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

function deleteemployee(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.deleteemployees(req.body, function (err, result) {
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

function uploads(req, res, next) {

     if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
 
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('/services/', function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.send('File uploaded!');
       });

       // async.waterfall([
       //      function (waterfallCallback){
       //          services.user.deleteemployees(req.body, function (err, result) {
       //          if (err) {
       //              req.log.error({
       //                  error: err
       //              }, "Error while getting available users by mobiles");
       //              return res.json(utils.errors["500"]);
       //          }
       //          waterfallCallback(null,result);
       //          });
       //      },
       //      function (mydata, waterfallCallback){
       //          return res.json(_.merge({
       //              data: mydata
       //          }, utils.errors["200"]));
       //      }
       //  ]);

}







exports.init = init;
exports.passport = passport;
exports.signin = signin;
exports.registerpage = registerpage ;
exports.loginpages = loginpages;
exports.addemployee = addemployee ;
exports.addusers = addusers;
exports.addclients = addclients ;
exports.updateclients = updateclients ; 
exports.updateemplo = updateemplo ;
exports.updateusers = updateusers ;
exports.clientlist = clientlist ;
exports.employeelist = employeelist ;
exports.userlist = userlist ;
exports.bsslogin = bsslogin ;
exports.clientlogin = clientlogin ;
exports.securitytlogin = securitytlogin ;
exports.userid = userid ;
exports.clientid = clientid ;
exports.employeeid = employeeid ;
exports.deleteclient = deleteclient ;
exports.deleteemployee = deleteemployee ;
exports.deleteuser = deleteuser ;
exports.uploads = uploads ;
exports.addemployee1 = addemployee1 ;
exports.addemployee2 = addemployee2 ;
exports.addemployee3 = addemployee3 ;
exports.addemployee4 =  addemployee4 ;

exports.employeereqiured = employeereqiured ;




exports.addclients1 = addclients1 ;




