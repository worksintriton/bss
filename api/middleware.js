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
var fileUpload = require('express-fileupload');
  var moment = require('moment');
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

function Clientlogin(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.loginpage.clientlogincheck(req.body, function (err, result, status) {
                if (err) {
                    console.log(err)
                    return res.json(utils.errors["500"]);
                }
                waterfallCallback(null,result,status);
                });
            },
            function (mydata,status, waterfallCallback){
                console.log(mydata);
                 console.log(status);

                if(status == true){
                         return res.json(_.merge({
                    data: mydata 
                }, utils.errors["200"]));

                }else{

                 return res.json(_.merge({
                    data: mydata 
                }, utils.errors["401a"]));

                }
           
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
            if(mydata.status === "falied"){
               return res.json(_.merge({
                    data: mydata 
                }, utils.errors["200"]));
            }else{
              services.user.updateempid(mydata,req.body.idtype, function (err, result) {
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
                    data: mydata 
                }, utils.errors["200"]));
            }
        ]);
}





function updateemployee1(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.updateemployee1s(req.body, function (err, result) {
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




function updateqr(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.updateqrs(req.body, function (err, result) {
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


function userid(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.userids(req.body, function (err, result) {
                
                waterfallCallback(null,result);
                });
            },
            function (mydata, waterfallCallback){
                return res.json(_.merge({
                   data:mydata       
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


function updateemployee(req, res, next) {

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


function Changepassword(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.Changepasswords(req.body, function (err, result) {
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
                    data: "Password Updated" 
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


function resigned(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.updateresign(req.body, function (err, result) {
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
                services.user.clientids(req.body, function (err, client_detail) {
                if (err) {
                    req.log.error({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                waterfallCallback(null,client_detail);
                });
            },
            function (client_detail, waterfallCallback){
                 services.user.site_details(req.body, function (err, site_details) {
                if (err) {
                    req.log.error({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                waterfallCallback(null,client_detail,site_details);
                });
            },
             function (client_detail,site_details, waterfallCallback){
                 services.user.payment_details(site_details, function (err, payment_details) {
                if (err) {
                    req.log.error({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                waterfallCallback(null,client_detail,site_details,payment_details);
                });
            },
            function (client_detail,site_details,payment_details, waterfallCallback){
                 services.user.requirement_details(req.body, function (err, requirement_details) {
                if (err) {
                    req.log.error({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                waterfallCallback(null,client_detail,site_details,payment_details,requirement_details);
                });
            },
            function (client_detail,site_details,payment_details,requirement_details, waterfallCallback){
                 services.user.listclientattachs(req.body, function (err, listclientattachs) {
                if (err) {
                    console.log(err)
                    req.log.error({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                waterfallCallback(null,client_detail,site_details,payment_details,requirement_details,listclientattachs);
                });
            },
            function (client_detail,site_details,payment_details,requirement_details,listclientattachs, waterfallCallback){
                console.log(site_details)
               let site_detail = [];
                site_details.forEach(function(belement) {
                     let site_details = {
                        site_details:belement
                        };
                site_detail.push(site_details);
             
                   let payment_detail = [];
                payment_details.forEach(function(pelement) {
                    if(belement.id == pelement.site_id){
                    site_detail.payment_detail.push(pelement);
                }
               });
                  let requirement_detail = [];
                requirement_details.forEach(function(relement) {
                    if(belement.id == relement.site_id){
                    site_detail.requirement_detail.push(relement);
                }
               });
                  let listclientattach = [];
                listclientattachs.forEach(function(delement) {
                    if(belement.id == delement.site_id){
                    site_detail.listclientattach.push(delement);
                }
               });
            });
                

                 waterfallCallback(null,client_detail,site_detail, waterfallCallback);
},
              function (client_detail,site_detail, waterfallCallback){
                return res.json(_.merge({
                    client_detail: client_detail,
                    site_detail: site_detail,
                }, utils.errors["200"]));
            }

        ]);





}


   // let floorPlan_explore_prize = [];
   //              floorPlan_explore_prize_catag.forEach(function(belement) {
   //                  let floorPlan_explore_prize_catag = {
   //                      type:belement.image
   //                      };
   //                  floorPlan_explore_prize_catag.plans = [];
   //                  floorPlan_explore_prize_image.forEach(function(pelement) {
   //                      if(belement.price_id == pelement.price_id){

   //                          let project = {};
   //                          project.imagepath = pelement.image;
   //                          floorPlan_explore_prize_catag.plans.push(project);
   //                      }
   //                  });
   //                  floorPlan_explore_prize.push(floorPlan_explore_prize_catag);
   //              });
   //               waterfallCallback(null, builderHeaderLogo,builderLogo,elevation,factSheet,specification,videoUrl,amenities,background,booking,broucher,completes,faq,bankers,price,statu,googleMapIcons,approval,floorPlan_explore,floorPlan_explore_prize,companyprofilecatag,companyprofileimage,walkthroughUrl);
   //          },







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

function deleteassign(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.deleteassigns(req.body, function (err, result) {
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
      console.log("data in");
       async.waterfall([
            function (waterfallCallback){
                 console.log("test1");
                 if (!req.files)
                    return res.status(404).json(utils.errors["404"]);
                  console.log("test2"); 
               
                      let sampleFile = req.files.pic;
                      let basepath = "www/pics/issues/";
                      var timestamp = uniqid();
                      var ext = path.extname(sampleFile.name)
                      let filename = timestamp+ext;
                        console.log(filename)
                      sampleFile.mv(basepath+filename, function(err) {
                         console.log("test3");
                        if (err)
                        return res.json(_.merge({
                            issue: err,
                            message: "file uploaded" 
                        }, utils.errors["400"]));
                     
                       waterfallCallback(null, basepath, filename, req.query['issue_id']);
                        console.log("test4");
                      });

            },

            function (basepath, filename, issue_id, waterfallCallback){
             console.log("test5");
                 services.issues.createIssueAttachment(basepath, filename, issue_id, function (err,is_inserted, result) {
                if (err) {
                    console.log({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                   console.log("test6");
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


function issuecount(req, res, next) {

       async.waterfall([
            function (waterfallCallback){

                services.issues.issuecounts(req.body, function (err, result) {
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


function FetchMapSpot(req, res, next) {

       async.waterfall([
            function (waterfallCallback){

                services.point_tracking.FetchMapSpotmobile(req.body, function (err, result) {
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


function FetchMapSpotrecord(req, res, next) {

       async.waterfall([
            function (waterfallCallback){

                services.point_tracking.FetchMapSpotrecordmobile(req.body, function (err, result) {
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




function addmapuser(req, res, next) {

       async.waterfall([
            function (waterfallCallback){

                services.point_tracking.addmapuseweb(req.body, function (err, result) {
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


function addmapuserlist(req, res, next) {

       async.waterfall([
            function (waterfallCallback){

                services.point_tracking.addmapuserlistweb(req.body, function (err, result) {
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




function mapuserdelete(req, res, next) {

       async.waterfall([
            function (waterfallCallback){

                services.point_tracking.mapuserdeleteweb(req.body, function (err, result) {
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


function fetchmapuserpoints(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.point_tracking.fetchmapuserpointsweb1(req.body, function (err, PointTrackMap) {
                if (err) {
                    req.log.error({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                waterfallCallback(null,PointTrackMap);
                });
            },
            function (PointTrackMap, waterfallCallback){
                 services.point_tracking.fetchmapuserpointsweb2(req.body, function (err, Mapusers) {
                if (err) {
                    req.log.error({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                  return res.json(_.merge({
                    PointTrackMap:  PointTrackMap,
                    Mapusers:Mapusers
                }, utils.errors["200"]))
                });
            }
        ]);
}


function addqr(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.addqrweb(req.body, function (err, result) {
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


function qrlist(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.qrlistweb(req.body, function (err, result) {
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

function deleteqr(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.deleteqrweb(req.body, function (err, result) {
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

function deleteallqr(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.deleteallqrweb(req.body, function (err, result) {
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


function MarkAttendance(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.attendance.MarkAttendancemob(req.body, function (err, result) {
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


function dailystatus(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.attendance.dailystatusweb(req.body, function (err, result) {
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


function Weeklystatus(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.attendance.Weeklystatusweb(req.body, function (err, result) {
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


function Allstatus(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.attendance.Allstatusweb(req.body, function (err, result) {
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

function Forgotpasswordweb(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.Forgotpasswordwebs(req.body, function (err, result) {
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



function checkuser(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.checkusers(req.body, function (err, result) {
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
                if (mydata.length == 0) {
                    return res.json(_.merge({
                    data:  mydata  
                }, utils.errors["403"]));
                }else
                {
                    return res.json(_.merge({
                    data:  mydata[0]  
                }, utils.errors["200"]));
                }
            }
        ]);

}


function assigningemployee(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.attendance.assigningemployees(req.body, function (err, result) {
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


function Updateemployee_id(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.Updateemployee_ids(req.body, function (err, result) {
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


function addassign(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.addassigns(req.body, function (err, result) {
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

function listassign(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.listassigns(req.body, function (err, result) {
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


///sms/////


function addsms(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.addsmss(req.body, function (err, result) {
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

function listsms(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.listsmss(req.body, function (err, result) {
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

function deletesms(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.deletesmss(req.body, function (err, result) {
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


function newcomplaints(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.issues.createIssue1(req.body, function (err,is_inserted, result) {
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

function complaintlist(req, res, next) {
async.waterfall([
            function (waterfallCallback){
                services.issues.listissuess1(req.body, function (err, result) {
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
            function ( listIssues,  waterfallCallback){
              
                return res.json(_.merge({
                    issue: listIssues,
                    message: "Done" 
                }, utils.errors["200"]));
                
            }

        ]);
}


function updateStatus(req, res, next) {

async.waterfall([
            function (waterfallCallback){
                services.issues.updateissuecomplaint(req.body, function (err, result) {
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
            function ( listIssues,  waterfallCallback){
              
                return res.json(_.merge({
                    issue: listIssues,
                    message: "Done" 
                }, utils.errors["200"]));
                
            }

        ]);
}



function clearissue(req, res, next) {

async.waterfall([
            function (waterfallCallback){
                services.issues.clearissues(req.body, function (err, result) {
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
            function ( listIssues,  waterfallCallback){
              
                return res.json(_.merge({
                    issue: listIssues,
                    message: "Done" 
                }, utils.errors["200"]));
                
            }

        ]);
}


function createfeedback(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.createfeedbacks(req.body, function (err, result) {
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


function feedbacklist(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.feedbacklists(req.body, function (err, result) {
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


function listmyfeedback(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.listmyfeedbacks(req.body, function (err, result) {
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



function fetchfeedback(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.fetchfeedbacks(req.body, function (err, result) {
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


function createattach(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.createattachs(req.body, function (err, result) {
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


function listattach(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.listattachs(req.body, function (err, result) {
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


function mylistattach(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.mylistattachs(req.body, function (err, result) {
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



function fetchattach(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.fetchattachs(req.body, function (err, result) {
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




///



function addclientattach(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.addclientattachs(req.body, function (err, result) {
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


function listclientattach(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.listclientattachs(req.body, function (err, result) {
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


function mylistclientattach(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.mylistclientattachs(req.body, function (err, result) {
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



function fetchclientattach(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.fetchclientattachs(req.body, function (err, result) {
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

function deleteclientattach(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.deletclientattachs(req.body, function (err, result) {
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


function uploadingfile(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                  if (Object.keys(req.files).length == 0) {
                    return res.status(400).send('No files were uploaded.');
                  }

                  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
                  let sampleFile = req.files.filetoupload;

                  console.log(sampleFile);
                  // Use the mv() method to place the file somewhere on your server
                  var time_details = moment().format('YYYYMMDDHHmmss');
                  var path = 'www/pics/'+time_details+"_"+sampleFile.name; 
                  var lpath = '/pics/'+time_details+"_"+sampleFile.name; 
                  sampleFile.mv(path, function(err) {
                    if (err)
                      return res.status(500).send(err);
                    var result = {
                        path: lpath,
                        uploadstatus: true
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


function newclientsite(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.newclientsites(req.body, function (err, result) {
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


function sitelist(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.sitelists(req.body, function (err, result) {
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



function updateclientsite(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.updateclientsites(req.body, function (err, result) {
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


function deletclientsite(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.deletclientsites(req.body, function (err, result) {
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

function sitestatus(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.sitestatuss(req.body, function (err, result) {
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



function fetchsite(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.fetchsites(req.body, function (err, result) {
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



//////


// function payadd(req, res, next) {

//        async.waterfall([
//             function (waterfallCallback){
//                 services.user.payadds(req.body, function (err, result) {
//                 if (err) {
//                     req.log.error({
//                         error: err
//                     }, "Error while getting available users by mobiles");
//                     return res.json(utils.errors["500"]);
//                 }
//                 waterfallCallback(null,result);
//                 });
//             },
//             function (mydata, waterfallCallback){
//                 return res.json(_.merge({
//                     data: mydata
//                 }, utils.errors["200"]));
//             }
//         ]);

// }


function paylist(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.paylists(req.body, function (err, result) {
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


function paydelete(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.paydeletes(req.body, function (err, result) {
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


function payupdate(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.payupdates(req.body, function (err, result) {
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

function payfetch(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.payfetchs(req.body, function (err, result) {
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



function reqadd(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.reqadds(req.body, function (err, result) {
                if (err) {
                    req.log.error({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                waterfallCallback(null,result);
                });
            }, 
            function (result , waterfallCallback){
                services.user.payadds(result, function (err, result) {
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




function reqlist(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.reqlists(req.body, function (err, result) {
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


function reqdelete(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.reqdeletes(req.body, function (err, result) {
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



function reqfetch(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.reqfetchs(req.body, function (err, result) {
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



function requpdate(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.requpdates(req.body, function (err, result) {
                if (err) {
                    req.log.error({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                waterfallCallback(null,result);
                });
            },
            function (result , waterfallCallback){
                services.user.payementupdate(result, function (err, payresult) {
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







function uniformadd(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.uniformadds(req.body, function (err, result) {
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


function uniformlist(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.uniformlists(req.body, function (err, result) {
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


function uniformdelete(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.uniformdeletes(req.body, function (err, result) {
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


function uniformupdate(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.uniformupdates(req.body, function (err, result) {
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

function uniformfetch(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.uniformfetchs(req.body, function (err, result) {
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



function deliverd(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.deliverds(req.body, function (err, result) {
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




function undeliverd(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.undeliverds(req.body, function (err, result) {
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





function deleteattach(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.deleteattachs(req.body, function (err, result) {
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



function additems(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.additem(req.body, function (err, result) {
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


function itemslists(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.itemslist(req.body, function (err, result) {
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


function itemsdeletes(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.itemsdelete(req.body, function (err, result) {
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


function updateitems(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.updateitem(req.body, function (err, result) {
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

function fetchitems(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.fetchitem(req.body, function (err, result) {
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



function addemptype(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.addemptypes(req.body, function (err, result) {
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


function emptypelist(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.emptypelists(req.body, function (err, result) {
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


function emptypedelete(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.emptypedeletes(req.body, function (err, result) {
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


function updateemptype(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.updateemptypes(req.body, function (err, result) {
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

function fetchemptype(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.fetchemptypes(req.body, function (err, result) {
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




// function updateamount(req, res, next) {

//        async.waterfall([
//             function (waterfallCallback){
//                 services.user.updateamounts(req.body, function (err, result) {
//                 if (err) {
//                     req.log.error({
//                         error: err
//                     }, "Error while getting available users by mobiles");
//                     return res.json(utils.errors["500"]);
//                 }
//                 waterfallCallback(null,result);
//                 });
//             },function (result,waterfallCallback){
//                 services.user.updateamountss(req.body, function (err, result) {
//                 if (err) {
//                     req.log.error({
//                         error: err
//                     }, "Error while getting available users by mobiles");
//                     return res.json(utils.errors["500"]);
//                 }
//                 waterfallCallback(null,result);
//                 });
//             },
//             function (mydata, waterfallCallback){
//                 return res.json(_.merge({
//                     data: mydata
//                 }, utils.errors["200"]));
//             }
//         ]);

// }




























exports.init = init;
exports.passport = passport;




/*BSS Web Portal*/

exports.Clientlogin = Clientlogin ;



/*BSS Web Portal*/
exports.bsslogin = bsslogin;



/*Add Employee*/
exports.updateemployee = updateemployee;
exports.addemployee = addemployee ;
exports.employeelist = employeelist ;
exports.deleteemployee = deleteemployee ;
exports.employee_id = employee_id;
exports.Changepassword = Changepassword;
exports.Updateemployee_id = Updateemployee_id;
exports.updateqr = updateqr;
exports.updateemployee1 = updateemployee1;




/*Add User*/
exports.userid = userid;
exports.addusers = addusers;
exports.updateusers = updateusers ;
exports.userlist = userlist ;
exports.deleteuser = deleteuser ;




/*Add Client*/
exports.addclients = addclients ;
exports.deleteclient = deleteclient ;
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
exports.issuecount = issuecount;

/*issues Attachment*/
exports.list_issue = list_issue;
exports.list_my_issue =list_my_issue;
exports.create_issue_attachment = create_issue_attachment;

/*PointTracking*/

    /*PointTrackMap*/
exports.PointTrackMap = PointTrackMap;
exports.updatePointTrackMap = updatePointTrackMap;
exports.DeletePointTrackMap = DeletePointTrackMap;
exports.PointTrackMaplist = PointTrackMaplist ;



    /*PointTrackMapSpots*/
exports.PointTrackMapSpot = PointTrackMapSpot;
exports.updatePointTrackMapSpot = updatePointTrackMapSpot;
exports.DeletePointTrackMapSpot = DeletePointTrackMapSpot;
exports.PointTrackMapSpotlist = PointTrackMapSpotlist;
exports.FetchMapSpot = FetchMapSpot;


    /*PointTracRecords*/
exports.PointTrackMapRecords = PointTrackMapRecords;
exports.updatePointTrackMapRecords = updatePointTrackMapRecords;
exports.DeletePointTrackMapRecords = DeletePointTrackMapRecords;
exports.PointTrackMapRecordslist = PointTrackMapRecordslist;



    /*PointTracRecordsSpots*/
exports.PointTrackRecordsSpot = PointTrackRecordsSpot ;
exports.updatePointTrackRecordsSpot = updatePointTrackRecordsSpot;
exports.DeletePointTrackRecordsSpot = DeletePointTrackRecordsSpot;
exports. PointTrackRecordsSpotlist = PointTrackRecordsSpotlist;
exports.FetchMapSpotrecord = FetchMapSpotrecord;


/* Mapuser */

exports.addmapuser = addmapuser;
exports.addmapuserlist = addmapuserlist;
exports.mapuserdelete = mapuserdelete;
exports.fetchmapuserpoints = fetchmapuserpoints;


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


/*QR Code*/
exports.qrlist = qrlist;
exports.addqr = addqr;
exports.deleteqr = deleteqr;
exports.deleteallqr = deleteallqr;


/*Attendance*/
exports.MarkAttendance = MarkAttendance;
exports.Weeklystatus = Weeklystatus;
exports.Allstatus = Allstatus;
exports.dailystatus = dailystatus;

/*forgot*/
exports.Forgotpasswordweb = Forgotpasswordweb;
exports.checkuser = checkuser;

/*assignedemployee*/
exports.assigningemployee = assigningemployee;
exports.addassign = addassign;
exports.listassign = listassign;
exports.deleteassign = deleteassign;


/*sms*/
exports.addsms = addsms;
exports.listsms = listsms;
exports.deletesms = deletesms;

/*resied*/
exports.resigned = resigned;


/*feedback*/
exports.createfeedback = createfeedback;
exports.feedbacklist = feedbacklist;
exports.listmyfeedback = listmyfeedback;
exports.fetchfeedback = fetchfeedback;

/*attachment*/
exports.createattach = createattach;
exports.listattach = listattach;
exports.mylistattach = mylistattach;
exports.fetchattach = fetchattach;
exports.deleteattach = deleteattach;


/*Client attachment*/
exports.addclientattach = addclientattach;
exports.listclientattach = listclientattach;
exports.mylistclientattach = mylistclientattach;
exports.fetchclientattach = fetchclientattach;
exports.deleteclientattach = deleteclientattach;

/*Client site*/
exports.newclientsite = newclientsite;
exports.sitelist = sitelist;
exports.updateclientsite = updateclientsite;
exports.deletclientsite = deletclientsite;
exports.sitestatus = sitestatus;
exports.fetchsite = fetchsite;

/*Client module*/
exports.newcomplaints = newcomplaints;
exports.complaintlist = complaintlist;
exports.updateStatus = updateStatus;
exports.clearissue = clearissue;


/*payment process*/
// exports.payadd = payadd;
exports.paylist = paylist;
exports.paydelete = paydelete;
exports.payupdate = payupdate;
exports.payfetch = payfetch;


/*Uniform process*/
exports.uniformadd = uniformadd;
exports.uniformlist = uniformlist;
exports.uniformdelete = uniformdelete;
exports.uniformupdate = uniformupdate;
exports.uniformfetch = uniformfetch;
exports.deliverd = deliverd;
exports.undeliverd =undeliverd;


/*items process*/
exports.additems = additems;
exports.itemslists = itemslists;
exports.itemsdeletes = itemsdeletes;
exports.updateitems = updateitems;
exports.fetchitems = fetchitems;


/*employee types*/
exports.addemptype = addemptype;
exports.emptypelist = emptypelist;
exports.emptypedelete = emptypedelete;
exports.updateemptype = updateemptype;
exports.fetchemptype = fetchemptype;




/*requirement process*/
exports.reqadd = reqadd;
exports.reqlist = reqlist;
exports.reqdelete = reqdelete;
exports.reqfetch = reqfetch;
exports.requpdate = requpdate;




/*file upload*/
exports.uploadingfile = uploadingfile;