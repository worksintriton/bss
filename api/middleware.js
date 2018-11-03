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
var path = require('path')
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

/////addemployee///////


function addemployee(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.AddemployeeC(req.body, function (err, result) {
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

///Configurenumber//////

function confignumber(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.confignumbers(req.body, function (err, result) {
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

function getconfignumber(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.getsconfignumbers(req.body, function (err, result) {
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


function addquestions(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.addquestion(req.body, function (err, result) {
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

function updatequestions(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.updatequestion(req.body, function (err, result) {
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


function deletequestions(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.deletequestion(req.body, function (err, result) {
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


function Question_id(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.Question_ids(req.body, function (err, result) {
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

function Questionlist(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.Questionlists(req.body, function (err, result) {
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


/*
Issue Management
*/
function create_issue(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.issues.createIssue(req.body, function (err,is_inserted, result) {
                if (err) {
                    console.log({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                waterfallCallback(null,is_inserted, result);
                });
            },

            function (is_inserted, result, waterfallCallback){
                if(is_inserted == true){

            services.issues.createIssuehistory(result,function (err,result) {
                if (err) {
                    console.log({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }else{
                     return res.json(_.merge({
                    issue: result,
                    message: "Created Succcessfully" 
                }, utils.errors["200"]));
                }
               
                });
                }
            }
        ]);

}


/*
Update issues
*/
function updateissues(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.issues.updateissue(req.body, function (err,is_inserted, result) {
                if (err) {
                    console.log({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                waterfallCallback(null,is_inserted, result);
                });
            },

            function (is_inserted, result, waterfallCallback){
                if(is_inserted == true){

            services.issues.createIssuehistory(result,function (err,result) {
                if (err) {
                    console.log({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }else{
                     return res.json(_.merge({
                    issue: result,
                    message: "Sending Succcessfully" 
                }, utils.errors["200"]));
                }
               
                });
                }
            }
        ]);

}


/*
taken_by issues
*/
function taken_by(req, res, next) {
console.log("one");
       async.waterfall([
            function (waterfallCallback){
                services.issues.taken_bys(req.body, function (err,is_inserted,result) {
                if (err) {
                    console.log({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                waterfallCallback(null,is_inserted, result);
                });
            },

            function (is_inserted, result, waterfallCallback){
                if(is_inserted == true){

            services.issues.createIssuehistory(result,function (err,result) {
                if (err) {
                    console.log({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }else{
                     return res.json(_.merge({
                    issue: result,
                    message: "Sending Succcessfully" 
                }, utils.errors["200"]));
                }
               
                });
                }
            }
        ]);

}

// issues report

function report(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.issues.reports(req.body, function (err,is_inserted, result) {
                if (err) {
                    console.log({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                console.log(result);
                waterfallCallback(null,is_inserted, result);
                });
            },
            function (is_inserted, result, waterfallCallback){
                if(is_inserted == true){
            services.issues.reportupdate(result,function (err,result) {
                if (err) {
                    console.log({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }else{
                     return res.json(_.merge({
                    issue: result,
                    message: "Sending Succcessfully" 
                }, utils.errors["200"]));
                }
               
                });
                }
            }
        ]);

}




function create_issue_attachment(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                 if (!req.files)
                    return res.status(404).json(utils.errors["404"]);
               
                      let sampleFile = req.files.pic;
                      let basepath = "www/pics/issues/";
                      var timestamp = uniqid();
                      var ext = path.extname(sampleFile.name)
                      let filename = timestamp+ext;
                        console.log(filename)
                      sampleFile.mv(basepath+filename, function(err) {
                        if (err)
                        return res.json(_.merge({
                            issue: err,
                            message: "file uploaded" 
                        }, utils.errors["400"]));
                     
                       waterfallCallback(null, basepath, filename, req.query['issue_id']);
                      });

            },

            function (basepath, filename, issue_id, waterfallCallback){

                 services.issues.createIssueAttachment(basepath, filename, issue_id, function (err,is_inserted, result) {
                if (err) {
                    console.log({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }

                return res.json(_.merge({
                    issue: result,
                    message: "file uploaded" 
                }, utils.errors["200"]));

                
                });

            }

        ]);

}


function list_issue(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.issues.listIssues(req.body, function (err, result) {
                if (err) {
                    console.log({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                waterfallCallback(null, result);
                });
            },
            function (listIssues, waterfallCallback){
                services.issues.listIssueAttachment(req.body, function (err, listIssueAttachment) {
                if (err) {
                    console.log({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                waterfallCallback(null, listIssues, listIssueAttachment);
                });
            },
            
            function ( listIssues, listIssueAttachment, waterfallCallback){
              
                return res.json(_.merge({
                    issue: listIssues,
                    attachments: listIssueAttachment,
                    message: "Done" 
                }, utils.errors["200"]));
                
            }

        ]);

}


function list_my_issue(req, res, next) {


async.waterfall([
            function (waterfallCallback){
                services.issues.listMyIssues(req.body, function (err, result) {
                if (err) {
                    console.log({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                waterfallCallback(null, result);
                });
            },
            function (listIssues, waterfallCallback){
                services.issues.listmyIssueAttachment(req.body, function (err, listIssueAttachment) {
                if (err) {
                    console.log({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                waterfallCallback(null, listIssues, listIssueAttachment);
                });
            },
            
            function ( listIssues, listIssueAttachment, waterfallCallback){
              
                return res.json(_.merge({
                    issue: listIssues,
                    attachments: listIssueAttachment,
                    message: "Done" 
                }, utils.errors["200"]));
                
            }

        ]);
}


function listissues(req, res, next) {

async.waterfall([
            function (waterfallCallback){
                services.issues.listissuess(req.body, function (err, result) {
                if (err) {
                    console.log({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                waterfallCallback(null, result);
                console.log(result);
                });
            },
            function (listIssues, waterfallCallback){
                services.issues.listmyIssueAttachments(req.body, function (err, listIssueAttachment) {
                if (err) {
                    console.log({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                waterfallCallback(null, listIssues, listIssueAttachment);
                });
            },
            
            function ( listIssues, listIssueAttachment, waterfallCallback){
              
                return res.json(_.merge({
                    issue: listIssues,
                    attachments: listIssueAttachment,
                    message: "Done" 
                }, utils.errors["200"]));
                
            }

        ]);
}

function issuedetails(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.issues.issuedetail(req.body, function (err, result) {
                if (err) {
                    console.log({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                waterfallCallback(null, result);
                });
            },
            function ( listIssues, listIssueAttachment, waterfallCallback){
                return res.json(_.merge({
                    issue: listIssues[0],
                    attachments: listIssueAttachment,
                    message: "Done" 
                }, utils.errors["200"])); 
            }

        ]);

}

function issuetrack(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.issues.issuetracks(req.body, function (err, result) {
                if (err) {
                    console.log({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                waterfallCallback(null, result);
                });
            },
            function ( listIssues, listIssueAttachment, waterfallCallback){
              
                return res.json(_.merge({
                    issue: listIssues,
                    attachments: listIssueAttachment,
                    message: "Done" 
                }, utils.errors["200"]));
                
            }

        ]);
}

function employee_id(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.employeeids(req.body, function (err, result) {
                if (err) {
                    console.log({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                else{
                      return res.json(_.merge({
                    data: result[0] 
                }, utils.errors["200"]));
                }
                });
            }
        ]);
}


/////training blockss///////

///// set of training///////


function training(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.training.setoftraining(req.body, function (err, result) {
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

function traininglessons(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.training.traininglessons(req.body, function (err, result) {
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

function trainingvideos(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.training.trainingvideos(req.body, function (err, result) {
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


function traininglist(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.training.traininglists(req.body, function (err, traininglist) {
                if (err) {
                    req.log.error({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }else{
                 waterfallCallback(null,traininglist);
                }
                });
            },
             function (traininglist,waterfallCallback){
                services.training.traininglessonlist(req.body, function (err, traininglessons) {
                if (err) {
                    req.log.error({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }else{
                 waterfallCallback(null,traininglist,traininglessons);
                }
                });
            },
              function (traininglist,traininglessons,waterfallCallback){
                services.training.trainingvideoslist(req.body, function (err, trainingvideos) {
                if (err) {
                    req.log.error({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }else{
                    return res.json(_.merge({
                    traininglist:traininglist,
                    traininglessons:traininglessons,
                    trainingvideos:trainingvideos
                }, utils.errors["200"]));
                }
                });
            }
        ]);
}


/* Point tracking 
*/

function Tracking(req, res, next) {

       async.waterfall([
        function (waterfallCallback){
                services.training.Trackingpersons(req.body, function (err, result) {
                if (err) {
                    req.log.error({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                waterfallCallback(null,result);
                });
            },
            function (result, waterfallCallback){
                if(result.length >0){
                    services.training.Trackingsupdate(req.body, function (err, result) {
                if (err) {
                    req.log.error({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                waterfallCallback(null,result);
                });
                }
                else{
                    services.training.Trackings(req.body, function (err, result) {
                if (err) {
                    req.log.error({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                waterfallCallback(null,result);
                });
                }
                
            },
            function (mydata, waterfallCallback){
                return res.json(_.merge({
                    data:  mydata  
                }, utils.errors["200"]));
            }
        ]);

}

function Trackingperson(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.training.Trackingpersons(req.body, function (err, result) {
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



function Trackinglist(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.training.Trackinglists(req.body, function (err, result) {
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

function PointTrackMap(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.point_tracking.PointTrackMaps(req.body, function (err, result) {
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

function PointTrackMapSpot(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.point_tracking.PointTrackMapSpots(req.body, function (err, result) {
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


function Addpoints(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.point_tracking.Addpointsweb(req.body, function (err, result) {
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


function pointsupdate(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.point_tracking.pointsupdateweb(req.body, function (err, result) {
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

function pointslist(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.point_tracking.pointslistweb(req.body, function (err, result) {
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

function deletepoints(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.point_tracking.deletepointsweb(req.body, function (err, result) {
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
                    data:  "Deleted Succcessfully" 
                }, utils.errors["200"]));
            }
        ]);

}


function fetchpoints(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.point_tracking.fetchpointsweb(req.body, function (err, result) {
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



function employee_fetchpoints(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.point_tracking.employee_fetchpointsmobile(req.body, function (err, result) {
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


function updatePointTrackMap(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.point_tracking.updatePointTrackMapmobile(req.body, function (err, result) {
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


function DeletePointTrackMap(req, res, next) {

       async.waterfall([
            function (waterfallCallback){

                services.point_tracking.DeletePointTrackMapmobile(req.body, function (err, result) {
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


function PointTrackMaplist(req, res, next) {

       async.waterfall([
            function (waterfallCallback){

                services.point_tracking.PointTrackMaplistmobile(req.body, function (err, result) {
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


function updatePointTrackMapSpot(req, res, next) {

       async.waterfall([
            function (waterfallCallback){

                services.point_tracking.updatePointTrackMapSpotmobile(req.body, function (err, result) {
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



function DeletePointTrackMapSpot(req, res, next) {

       async.waterfall([
            function (waterfallCallback){

                services.point_tracking.DeletePointTrackMapSpotmobile(req.body, function (err, result) {
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



function PointTrackMapSpotlist(req, res, next) {

       async.waterfall([
            function (waterfallCallback){

                services.point_tracking.PointTrackMapSpotlistmobile(req.body, function (err, result) {
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



/*Record */

function PointTrackMapRecords(req, res, next) {

       async.waterfall([
            function (waterfallCallback){

                services.point_tracking.PointTrackMapRecordsmobile(req.body, function (err, result) {
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


function updatePointTrackMapRecords(req, res, next) {

       async.waterfall([
            function (waterfallCallback){

                services.point_tracking.updatePointTrackMapRecordsmobile(req.body, function (err, result) {
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



function DeletePointTrackMapRecords(req, res, next) {

       async.waterfall([
            function (waterfallCallback){

                services.point_tracking.DeletePointTrackMapRecordsmobile(req.body, function (err, result) {
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



function PointTrackMapRecordslist(req, res, next) {

       async.waterfall([
            function (waterfallCallback){

                services.point_tracking.PointTrackMapRecordslistmobile(req.body, function (err, result) {
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







function PointTrackRecordsSpot(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.point_tracking.PointTrackRecordsSpotmobile(req.body, function (err, result) {
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


function updatePointTrackRecordsSpot(req, res, next) {

       async.waterfall([
            function (waterfallCallback){

                services.point_tracking.updatePointTrackRecordsSpotmobile(req.body, function (err, result) {
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



function DeletePointTrackRecordsSpot(req, res, next) {

       async.waterfall([
            function (waterfallCallback){

                services.point_tracking.DeletePointTrackRecordsSpotmobile(req.body, function (err, result) {
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



function PointTrackRecordsSpotlist(req, res, next) {

       async.waterfall([
            function (waterfallCallback){

                services.point_tracking.PointTrackRecordsSpotlistmobile(req.body, function (err, result) {
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






exports.init = init;
exports.passport = passport;




/*BSS Web Portal*/

exports.clientlogin = clientlogin ;



/*BSS Web Portal*/
exports.bsslogin = bsslogin;



/*Add Employee*/

exports.addemployee = addemployee ;
exports.employeelist = employeelist ;
exports.deleteemployee = deleteemployee ;
exports.employee_id = employee_id;




/*Add User*/

exports.addusers = addusers;
exports.updateusers = updateusers ;
exports.userlist = userlist ;
exports.deleteuser = deleteuser ;




/*Add Client*/
exports.addclients = addclients ;
exports.deleteclient = deleteclient ;
exports.addclients1 = addclients1;
exports.clientid = clientid ;
exports.clientlist = clientlist ;
exports.updateclients = updateclients ; 




/*Add Configure*/

exports.confignumber = confignumber;
exports.getconfignumber = getconfignumber;


/*Add training*/

exports.training = training;
exports.traininglessons = traininglessons;
exports.trainingvideos = trainingvideos;
exports.traininglist = traininglist;


/*Add tracking*/

exports.Tracking = Tracking;
exports.Trackinglist = Trackinglist;
exports.Trackingperson = Trackingperson;



/*Issue Tracking*/
exports.create_issue = create_issue;
exports.updateissues = updateissues;
exports.taken_by = taken_by;
exports.report = report;
exports.issuedetails = issuedetails;
exports.issuetrack =  issuetrack;
exports.listissues = listissues;

/*issues Attachment*/
exports.list_issue = list_issue;
exports.list_my_issue =list_my_issue;
exports.create_issue_attachment = create_issue_attachment;

/*PointTracking*/
exports.PointTrackMap = PointTrackMap;
exports.updatePointTrackMap = updatePointTrackMap;
exports.DeletePointTrackMap = DeletePointTrackMap;
exports.PointTrackMaplist = PointTrackMaplist ;



exports.PointTrackMapSpot = PointTrackMapSpot;
exports.updatePointTrackMapSpot = updatePointTrackMapSpot;
exports.DeletePointTrackMapSpot = DeletePointTrackMapSpot;
exports.PointTrackMapSpotlist = PointTrackMapSpotlist;



exports.PointTrackMapRecords = PointTrackMapRecords;
exports.updatePointTrackMapRecords = updatePointTrackMapRecords;
exports.DeletePointTrackMapRecords = DeletePointTrackMapRecords;
exports.PointTrackMapRecordslist = PointTrackMapRecordslist;



exports.PointTrackRecordsSpot = PointTrackRecordsSpot ;
exports.updatePointTrackRecordsSpot = updatePointTrackRecordsSpot;
exports.DeletePointTrackRecordsSpot = DeletePointTrackRecordsSpot;
exports. PointTrackRecordsSpotlist = PointTrackRecordsSpotlist;





/*FAQ*/

exports.addquestions = addquestions;
exports. updatequestions = updatequestions; 
exports.deletequestions = deletequestions;
exports.Question_id = Question_id;
exports.Questionlist = Questionlist;

/*PointTracking For Web*/

exports.Addpoints = Addpoints;
exports.pointsupdate = pointsupdate;
exports.pointslist = pointslist;
exports.deletepoints = deletepoints;
exports.fetchpoints = fetchpoints;
exports.employee_fetchpoints = employee_fetchpoints;

