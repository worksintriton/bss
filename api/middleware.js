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
  var dateFormat = require('dateformat');
  var XLSX = require('xlsx')
  var strtotime = require('strtotime');

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
                 

                console.log(site_details,payment_details,requirement_details)

                let site = [];
                site_details.forEach(function(belement){
                       let site_detail =[];
                       site_detail = belement;   
                       site.push(site_detail)

                       site_detail.payment = []
                       payment_details.forEach(function(pelement) {
                        if(belement.id == pelement.site_id){

                              site_detail.payment.push(pelement)
                        }
                        });

                         site_detail.requirement = []
                       requirement_details.forEach(function(relement) {
                        if(belement.id == relement.site_id){
                              site_detail.requirement.push(relement)
                        }
                        });

                        site_detail.documents = []
                       listclientattachs.forEach(function(delement) {
                        if(belement.id == delement.site_id){
                              site_detail.documents.push(delement)
                        }
                        });
                       
                });


                // let site = [];
                // site_details.forEach(function(belement) {
                //     let floorPlan_explore_prize_catag = {
                //         site_det:belement
                //         };
                //     site_details.payment = [];
                //     payment_details.forEach(function(pelement) {
                //         if(belement.id == pelement.site_id){
                //             site_details.payment.push(pelement);
                //         }
                //     });
                //     site.push(site_details);
                // });
                 waterfallCallback(null, client_detail,site);
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




function fetchclient(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.fetchclients(req.body, function (err, result) {
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


function employee_id1(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.employeeids11(req.body, function (err, result) {
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





function fetchemployee_id(req, res, next) {
          async.waterfall([
            function (waterfallCallback){
                services.user.employeeidss(req.body, function (err, employee_details) {
                if (err) {
                    console.log({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                waterfallCallback(null,employee_details);
                });
            },
            function (employee_details, waterfallCallback){
                services.user.mylistattachss(req.body, function (err, attachments) {
                if (err) {
                    console.log(err);
                }
                waterfallCallback(null,employee_details,attachments);
                });
            },
            
            function (employee_details, attachments,waterfallCallback){
                return res.json(_.merge({
                    employee_details: employee_details,
                    Photo:attachments[0].path,
                    message: "Done"
                }, utils.errors["200"]));
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
                    services.training.Trackings(req.body, function (err, result) {
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


function fetchtrackdate(req, res, next) {

       async.waterfall([
        function (waterfallCallback){
                    services.training.fetchtrackdates(req.body, function (err, result) {
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

function fetchtracksingledate(req, res, next) {

       async.waterfall([
        function (waterfallCallback){
                    services.training.fetchtracksingledates(req.body, function (err, result) {
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

function deleteTrackinglist(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.training.deleteTrackinglists(req.body, function (err, result) {
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


function fetchemployees(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.point_tracking.fetchemployeess(req.body, function (err, result) {
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

function fetchTrackinglist(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.point_tracking.fetchTrackinglists(req.body, function (err, result) {
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



function dailyreport(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.attendance.dailyreports(req.body, function (err, result) {
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


function Weeklyreort(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.attendance.Weeklyreports(req.body, function (err, result) {
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



function advcancebulk(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                  if (Object.keys(req.files).length == 0) {
                    return res.status(400).send('No files were uploaded.');
                  }
                  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
                  let sampleFile = req.files.filetoupload;
                  // Use the mv() method to place the file somewhere on your server
                  var time_details = moment().format('YYYYMMDDHHmmss');
                  var path = 'www/pics/'+time_details+"_"+sampleFile.name; 
                  sampleFile.mv(path, function(err) {
                    if (err)
                      return res.status(500).send(err);
                    var result = {
                        path: path,
                        uploadstatus: true
                    }
                    waterfallCallback(null,result);
                  });
            },
            function (mydata, waterfallCallback){
                var XLSX = require('xlsx');
                var workbook = XLSX.readFile(mydata.path);
                var sheet_name_list = workbook.SheetNames;
                var lists = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
                let site_info = [];
                lists.forEach(function(belement) {
                for(var i = 1; i <= belement.Installment; i++){
                var futureMonth = moment(belement.Date).add( i , 'months').calendar();
                var date = dateFormat(futureMonth, "yyyy-mm-dd");
                var amount = belement.Amount / belement.Installment;
                console.log(date,amount)
                services.user.advanceaddss(belement,date,amount, function (err, result) {
                if (err) {
                   console.log(err)
                }
                });
                }
                 });               
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


function fetchcompanysite(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.fetchcompanysites(req.body, function (err, result) {
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





function newclientcontract(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.newclientcontracts(req.body, function (err, result) {
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


function contractlist(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.contractlists(req.body, function (err, result) {
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



function updateclientcontract(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.updateclientcontracts(req.body, function (err, result) {
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


function deletclientcontract(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.deletclientcontracts(req.body, function (err, result) {
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

function contractestatus(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.contractestatuss(req.body, function (err, result) {
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



function fetchcontract(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.fetchcontracts(req.body, function (err, result) {
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



//////



function employee_paylist(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.employee_paylists(req.body, function (err, result) {
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


function employee_paydelete(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.employee_paydeletes(req.body, function (err, result) {
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


function employee_payupdate(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.employee_payupdates(req.body, function (err, result) {
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

function employee_payfetch(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.employee_payfetchs(req.body, function (err, result) {
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
                services.user.payadds(result, function (err, payadds) {
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




function addfinanace(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.addfinanaces(req.body, function (err, result) {
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


function finanacelist(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.finanacelists(req.body, function (err, result) {
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


function finanacedelete(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.finanacedeletes(req.body, function (err, result) {
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


function updatefinanace(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.updatefinanaces(req.body, function (err, result) {
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

function fetchfinanace(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.fetchfinanaces(req.body, function (err, result) {
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






function addquality(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.addqualitys(req.body, function (err, result) {
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


function listquality(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.listqualitys(req.body, function (err, result) {
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


function deletequality(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.deletequalitys(req.body, function (err, result) {
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


function updatequality(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.updatequalitys(req.body, function (err, result) {
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

function fetchquality(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.fetchqualitys(req.body, function (err, result) {
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


function addqualitytable(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.addqualitytables(req.body, function (err, result) {
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


function listqualitytable(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.listqualitytables(req.body, function (err, result) {
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


function deletequalitytable(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.deletequalitytables(req.body, function (err, result) {
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


function updatequalitytable(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.updatequalitytables(req.body, function (err, result) {
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

function fetchqualitytable(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.fetchqualitytables(req.body, function (err, result) {
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




function addtrainingreport(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.addtrainingreports(req.body, function (err, result) {
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


function listtrainingreport(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.listtrainingreports(req.body, function (err, result) {
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


function deletetrainingreport(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.deletetrainingreports(req.body, function (err, result) {
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


function updatetrainingreport(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.updatetrainingreports(req.body, function (err, result) {
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

function fetchtrainingreport(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.fetchtrainingreports(req.body, function (err, result) {
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




function addtrainingreporttable(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.addtrainingreporttables(req.body, function (err, result) {
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


function listtrainingreporttable(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.listtrainingreporttables(req.body, function (err, result) {
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


function deletetrainingreporttable(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.deletetrainingreporttables(req.body, function (err, result) {
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


function updatetrainingreporttable(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.updatetrainingreporttables(req.body, function (err, result) {
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

function fetchtrainingreporttable(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.fetchtrainingreporttables(req.body, function (err, result) {
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



function addnightreport(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.addnightreports(req.body, function (err, result) {
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


function listnightreport(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.listnightreports(req.body, function (err, result) {
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

function updateprofilephoto(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.updateprofilephotos(req.body, function (err, result) {
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


function fetchnightreport(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.fetchnightreports(req.body, function (err, result) {
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


function deletenightreport(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.deletenightreports(req.body, function (err, result) {
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

function updatenightreport(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.updatenightreports(req.body, function (err, result) {
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



function addnightreporttable(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.addnightreporttables(req.body, function (err, result) {
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


function listnightreporttable(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.listnightreporttables(req.body, function (err, result) {
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


function fetchnightreporttable(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.fetchnightreporttables(req.body, function (err, result) {
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


function deletenightreporttable(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.deletenightreporttables(req.body, function (err, result) {
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

function updatenightreporttable(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.updatenightreporttables(req.body, function (err, result) {
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


function addnotification(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.selectclient(req.body, function (err, client_detail) {
                if (err) {
                    console.log(err);
                }
                waterfallCallback(null,client_detail);
                });
            },
            function (client_detail, waterfallCallback){
              services.user.selectsite(req.body, function (err, site_detail) {
                if (err) {
              console.log(err);
                }
                waterfallCallback(null,client_detail,site_detail);
                });
            },
             function (client_detail,site_detail, waterfallCallback){

              // var date = dateFormat(new Date(), "yyyy-mm-dd");
                 var date = '2019-10-23';


              services.user.selectcontract(date, function (err, contract_detail) {
                if (err) {
                  console.log(err);
                }
                waterfallCallback(null,client_detail,site_detail,contract_detail);
                });
            },
             function (client_detail,site_detail,contract_detail, waterfallCallback){
              services.user.selectusers(req.body, function (err, user_details) {
                if (err) {
             console.log(err);
                }
                waterfallCallback(null,client_detail,site_detail,contract_detail,user_details);
                });
            },
            function (client_detail,site_detail,contract_detail,user_details, waterfallCallback){
                let site_info = [];
                console.log(contract_detail)
                contract_detail.forEach(function(belement) {
                    site_detail.forEach(function(pelement) {
                        if(belement.site_id == pelement.id){
                            let project = {
                                 'site_id': pelement.id,
                                 'site_name':pelement.title,
                                 'client_id':pelement.client_id,
                                 'contract_id':belement.id,
                                 'contract_start_date': belement.contract_start_date,
                                 'contract_end_date':belement.contract_end_date,
                                 'last_revision':belement.last_revision_date,
                                 'invoice_cycle':belement.invoice_cycle,
                                 'contract_type':belement.contract_type
                            };
                            
                            site_info.push(project);
                        }
                    });
                });
             waterfallCallback(null,client_detail,site_info,contract_detail,user_details);
             },  
             function (client_detail,site_info,contract_detail,user_details, waterfallCallback){

                console.log(site_info)

                let client_detailss = [];
                site_info.forEach(function(belement) {
                    client_detail.forEach(function(pelement) {
                        if(belement.client_id == pelement.id){
                            let project = {
                                 'client_id':pelement.id,
                                 'client_name':pelement.company_name,
                                 'site_id': belement.site_id,
                                 'site_name':belement.site_name,
                                 'contract_id':belement.contract_id,
                                 'contract_start_date': belement.contract_start_date,
                                 'contract_end_date':belement.contract_end_date,
                                 'last_revision':belement.last_revision_date,
                                 'invoice_cycle':belement.invoice_cycle,
                                 'contract_type':belement.contract_type
                            };
                            
                            client_detailss.push(project);
                        }
                    });
                });
             waterfallCallback(null,client_detailss,user_details);
             },
            function (client_detailss,user_details, waterfallCallback){
      
                let notification_details = [];
                client_detailss.forEach(function(belement) {
                    user_details.forEach(function(pelement) {
                    
                            let project = {
                                 'user_id':pelement.user_id,
                                 'status':'New',
                                 'client_id':belement.client_id,
                                 'client_name':belement.client_name,
                                 'site_id': belement.site_id,
                                 'site_name':belement.site_name,
                                 'contract_start_date': belement.contract_start_date,
                                 'contract_end_date':belement.contract_end_date,
                                 'last_revision':belement.last_revision_date,
                                 'invoice_cycle':belement.invoice_cycle,
                                 'contract_type':belement.contract_type,
                                 'contract_id':belement.contract_id
                            };
                            notification_details.push(project);
                    });
                });
             waterfallCallback(null,notification_details);
            },
            function (notification_details, waterfallCallback){

              var date = dateFormat(new Date(), "yyyy-mm-dd");

                for(var i = 0;i < notification_details.length;i++){
                     services.user.addnotificationss(notification_details[i],date, function (err, contract_detail) {
                if (err) {
                  console.log(err);
                }
                }); 
                }
                   return res.json(_.merge({
                    data: notification_details
                }, utils.errors["200"]));

            }

        ]);

}

function notificationcount(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.notificationcounts(req.body, function (err, result) {
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


function updatenotification(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.updatenotifications(req.body, function (err, result) {
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


function listofnotification(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.listofnotifications(req.body, function (err, result) {
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


function assignemployeeadd(req, res, next) {
       async.waterfall([
            function (waterfallCallback){

                services.user.assignemployeeadds(req.body, function (err, result) {
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






function Attendancecheck(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.fetchpaymentdetails(req.body, function (err, fetchpaymentdetails) {
                if (err) {
                    console.log(err)
                }
                waterfallCallback(null,fetchpaymentdetails);
                });
            },
            function (fetchpaymentdetails,waterfallCallback){
                fetchpaymentdetails.forEach(function(belement) {
                        if(belement.employee_type == req.body.employee_type){
                             waterfallCallback(null,belement);
                        }
                });
            },
            function (paymentstructure,waterfallCallback){
                var now = new Date();
                var days =  new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
                let payment = [];
                let p = {
                    "employee_id": req.body.employee_id,
                    "employee_name": req.body.employee_name,
                    "client_id": req.body.client_id,
                    "client_name": req.body.client_name,
                    "employee_type":req.body.employee_type,
                    "hrs":req.body.hrs,
                    "site_id": req.body.site_id,
                    "site_name": req.body.site_name,
                    "contract_id": req.body.contract_id,
                    "date": req.body.date,
                    "status": req.body.status,
                    "basic":paymentstructure.ebasic/days,
                    "da":paymentstructure.eda/days,
                    "addhours":paymentstructure.eadditional_hours/days,
                    "other":paymentstructure.eothers/days,
                    "leave":paymentstructure.eleave/days,
                    "bouns":paymentstructure.ebound/days,
                    "weekly":paymentstructure.eweekly_off/days,
                    "epf":paymentstructure.epf/days,
                    "esi":paymentstructure.eesi/days,
                    "rounded":paymentstructure.erounded/days,
                    "timein":req.body.time_in,
                    "timeout":req.body.time_out,
                    "duration": req.body.duration,
                }
                payment.push(p)
                waterfallCallback(null,paymentstructure,payment)
            },
              function (paymentstructure,employeepay,waterfallCallback){
                var now = new Date();
                var days =  new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
                let clientpayment = [];
                let p = {
                    "employee_id": req.body.employee_id,
                    "employee_name": req.body.employee_name,
                    "client_id": req.body.client_id,
                    "client_name": req.body.client_name,
                    "employee_type":req.body.employee_type,
                    "hrs":req.body.hrs,
                    "site_id": req.body.site_id,
                    "site_name": req.body.site_name,
                    "contract_id": req.body.contract_id,
                    "date": req.body.date,
                    "status": req.body.status,
                    "basic":paymentstructure.basic/days,
                    "da":paymentstructure.da/days,
                    "addhours":paymentstructure.additional_hours/days,
                    "other":paymentstructure.others/days,
                    "leave":paymentstructure.leave/days,
                    "bouns":paymentstructure.bound/days,
                    "weekly":paymentstructure.weekly_off/days,
                    "epf":paymentstructure.pf/days,
                    "esi":paymentstructure.esi/days,
                    "rounded":paymentstructure.rounded/days,
                    "timein":req.body.time_in,
                    "timeout":req.body.time_out,
                    "duration": req.body.duration,
                }
                clientpayment.push(p)
                waterfallCallback(null,clientpayment,employeepay)
            },
            function (clientpayment,payment,waterfallCallback){
                services.user.insertdata(payment, function (err, result) {
                if (err) {
                    req.log.error({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                waterfallCallback(null,clientpayment,payment);
                });
            },
             function (clientpayment,payment,waterfallCallback){
                services.user.clientinsertdata(clientpayment, function (err, result) {
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



function fetchdetails(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.fetchdetailss(req.body, function (err, result) {
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








function checkemployee(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.checkemployees(req.body, function (err, assignemployeelist) {
                if (err) {
                    req.log.error({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                waterfallCallback(null,assignemployeelist);
                });
            }, 
            function (assignemployeelist,waterfallCallback){
                services.user.selectemployee(req.body, function (err, employee_list) {
                if (err) {
                    console.log(err)
                }
                waterfallCallback(null,assignemployeelist,employee_list);
                });
            },
            function (assignemployeelist,employee_list, waterfallCallback){
                  if(assignemployeelist.length == 0){
                    waterfallCallback(null,employee_list);
                  }else{
                  let employee_lists = [];
                    employee_list.forEach(function(belement) {
                    console.log("in");
                    assignemployeelist.forEach(function(pelement) {
                        console.log("out")
                        if(!belement.employee_id == pelement.employee_id ){
                               let project = {
                                 'employee_id':pelement.user_id,
                                 'employee_name':'New',
                                 'employee_type':belement.client_id,
                                 'date_of_joining':belement.client_name,
                                 'mobile': belement.site_id,
                                 'email_id':belement.site_name
                            };
                            employee_lists.push(project);
                        }
                    });
                });
                waterfallCallback(null,employee_lists);
                  }



            },
            function (employee_lists, waterfallCallback){
                return res.json(_.merge({
                    data:  employee_lists  
                }, utils.errors["200"]));
            }
        ]);
}


function clientfetchlist(req, res, next) {
       async.waterfall([
            function (waterfallCallback){

                services.user.clientfetchlists(req.body, function (err, result) {
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




function employeetfetchlist(req, res, next) {
       async.waterfall([
            function (waterfallCallback){

                services.user.employeetfetchlists(req.body, function (err, result) {
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










function assignlists(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.assignlistss(req.body, function (err, result) {
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







function addcompany(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.addcompanys(req.body, function (err, result) {
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


function companylists(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.companylistss(req.body, function (err, result) {
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

function updatecompany(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.updatecompanys(req.body, function (err, result) {
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



function deletecompany(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.deletecompanys(req.body, function (err, result) {
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

function fetchcompany(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.fetchcompanys(req.body, function (err, result) {
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


function advanceadd(req, res, next) {
       async.waterfall([
            function (waterfallCallback){

                for(var i = 1; i <= req.body.pinstalment; i++){
                var futureMonth = moment(req.body.ddate).add( i , 'months').calendar();
                var date = dateFormat(futureMonth, "yyyy-mm-dd");
                var amount = req.body.pamount / req.body.pinstalment;
                console.log(date,amount)
                services.user.advanceadds(req.body,date,amount, function (err, result) {
                if (err) {
                   console.log(err)
                }
                });
                }
                waterfallCallback(null,"Inserted");
            },
            function (mydata, waterfallCallback){
                return res.json(_.merge({
                    data: mydata
                }, utils.errors["200"]));
            }
        ]);
}


function advancefetch(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.advancefetchs(req.body, function (err, result) {
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

function monthlyfetch(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.monthlyfetchs(req.body, function (err, result) {
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

function monthlyfetch1(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.monthlyfetchs1(req.body, function (err, result) {
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

function fetchloan_number(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.fetchloan_numbers(req.body, function (err, result) {
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


function fetchloan_number1(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.fetchloan_numbers1(req.body, function (err, result) {
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
function deleteinstalment(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.deleteinstalments(req.body, function (err, result) {
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



function fetchadvance(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.fetchadvances(req.body, function (err, result) {
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

function fetchadvance2(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.fetchadvances2(req.body, function (err, result) {
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



function deleteadvance(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.deleteadvances(req.body, function (err, result) {
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


function updateadvance(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.updateadvances(req.body, function (err, result) {
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



function updateoneinstalment(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.updateoneinstalments(req.body, function (err, result) {
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


function efetchsitedetails(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.efetchsitedetailss(req.body, function (err, result) {
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




function fetchsitedetails(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.fetchsitedetail(req.body, function (err, result) {
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
                console.log(mydata)

                let sitedetails = [];
                    mydata.forEach(function(pelement) {
                            let project = {
                                 'client_id':pelement.client_id,
                                 'site_id': pelement.id,
                                 'site_name':pelement.title,
                                 'isSelected':false,
                            };
                            sitedetails.push(project);
                    });
             waterfallCallback(null,sitedetails);
            },
             function (mydata, waterfallCallback){
                return res.json(_.merge({
                    data: mydata 
                }, utils.errors["200"]));
            }
        ]);

}



function fetchsitedpayment(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                   console.log(req.body)
                   console.log(req.body.startdate)
                   console.log(req.body.enddate)
                  let payment = [];
                req.body.data.forEach(function(pelement) {
                services.user.fetchsitedpayments(pelement.site_name,req.body.date, function (err, result) {
                if (err) {
                    req.log.error({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                 payment.push(result)
                 console.log(result)

                });
                    });
                waterfallCallback(null,payment);
            },
            function (mydata, waterfallCallback){
                  console.log(mydata)
                return res.json(_.merge({
                    data: mydata
                }, utils.errors["200"]));
            }
        ]);

}


function fetchsitepaymentss(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
               console.log(req.body)
               let payment = [];
               var a = req.body.data.length - 1 ;
               for (var i = 0; i < req.body.data.length; i++) {
                services.user.gettingreportsall1(req.body.data[i].site_name,req.body.date, function (err, result) {
                if (err) {
                    req.log.error({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                 payment.push(result) 
                 console.log(payment.length)
                 if(payment.length == req.body.data.length){
                    console.log(payment);
                    waterfallCallback(null,payment);
                 }
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


function fetchsitepaymentss2(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
               console.log(req.body)
               let payment = [];
               var a = req.body.data.length - 1 ;
               for (var i = 0; i < req.body.data.length; i++) {
                services.user.gettingreportsall12(req.body.data[i].site_name,req.body.date, function (err, result) {
                if (err) {
                    req.log.error({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                 payment.push(result[0]) 
                 console.log(payment.length)
                 if(payment.length == req.body.data.length){
                    console.log(payment);
                    waterfallCallback(null,payment);
                 }
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



function fetchsitepaymentss3(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
               console.log(req.body)
               let payment = [];
               var a = req.body.data.length - 1 ;
               for (var i = 0; i < req.body.data.length; i++) {
                services.user.gettingreportsall13(req.body.data[i].site_name,req.body.date,req.body.type, function (err, result) {
                if (err) {
                    req.log.error({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                 payment.push(result) 
                 console.log(payment.length)
                 if(payment.length == req.body.data.length){
                    console.log(payment);
                    waterfallCallback(null,payment);
                 }
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



function addsalaryprocess(req, res, next) {

       async.waterfall([
            function (waterfallCallback){
                services.user.addsalaryprocesss(req.body, function (err, result) {
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


function salaryprocesstatus(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.salaryprocesstatuss(req.body, function (err, result) {
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


function addclientbulk(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                  if (Object.keys(req.files).length == 0) {
                    return res.status(400).send('No files were uploaded.');
                  }
                  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
                  let sampleFile = req.files.filetoupload;
                  // Use the mv() method to place the file somewhere on your server
                  var time_details = moment().format('YYYYMMDDHHmmss');
                  var path = 'www/pics/'+time_details+"_"+sampleFile.name; 
                  sampleFile.mv(path, function(err) {
                    if (err)
                      return res.status(500).send(err);
                    var result = {
                        path: path,
                        uploadstatus: true
                    }
                    waterfallCallback(null,result);
                  });
            },
            function (mydata, waterfallCallback){
                var XLSX = require('xlsx');
                var workbook = XLSX.readFile(mydata.path);
                var sheet_name_list = workbook.SheetNames;
                var lists = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
                let site_info = [];
                lists.forEach(function(belement) {
                console.log(belement)
                services.user.addclientbulks(belement, function (err, result) {
                if (err) {
                   console.log(err)
                }
                });
                
                 });               
            }
        ]);
}



function addemployeebulk(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                  if (Object.keys(req.files).length == 0) {
                    return res.status(400).send('No files were uploaded.');
                  }
                  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
                  let sampleFile = req.files.filetoupload;
                  // Use the mv() method to place the file somewhere on your server
                  var time_details = moment().format('YYYYMMDDHHmmss');
                  var path = 'www/pics/'+time_details+"_"+sampleFile.name; 
                  sampleFile.mv(path, function(err) {
                    if (err)
                      return res.status(500).send(err);
                    var result = {
                        path: path,
                        uploadstatus: true
                    }
                    waterfallCallback(null,result);
                  });
            },
            function (mydata, waterfallCallback){
                var XLSX = require('xlsx');
                var workbook = XLSX.readFile(mydata.path);
                var sheet_name_list = workbook.SheetNames;
                var lists = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
                
                lists.forEach(function(belement) {
                     var exdate = +belement.DOB; // represents Jan 1, 1993
                      var exdate1 = +belement.DOJ; // represents Jan 1, 1993
                      var e0date = new Date(0); // epoch "zero" date
                      var offset = e0date.getTimezoneOffset(); // tz offset in min
                      var jsdate1 = new Date(0, 0, exdate-1, 0, -offset, 0)     
                      var jsdate2 = new Date(0, 0, exdate1-1, 0, -offset, 0)        
                  console.log(jsdate1,jsdate2);
                services.user.addemployeebulkuploads(belement,jsdate1,jsdate2, function (err, result) {
                if (err) {
                   console.log(err)
                }
                });
                 });               
            }
        ]);
}



function manualAttendancecheck(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.fetchpaymentdetails(req.body, function (err, fetchpaymentdetails) {
                if (err) {
                    console.log(err)
                }
                waterfallCallback(null,fetchpaymentdetails);
                });
            },
            function (fetchpaymentdetails,waterfallCallback){
                fetchpaymentdetails.forEach(function(belement) {
                        if(belement.employee_type == req.body.employee_type){
                             waterfallCallback(null,belement);
                        }
                });
            },
            function (paymentstructure,waterfallCallback){
                var now = new Date();
                var days =  new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
                let payment = [];
                let p = {
                    "employee_id": req.body.employee_id,
                    "employee_name": req.body.employee_name,
                    "client_id": req.body.client_id,
                    "client_name": req.body.client_name,
                    "employee_type":req.body.employee_type,
                    "hrs":req.body.hrs,
                    "site_id": req.body.site_id,
                    "site_name": req.body.site_name,
                    "contract_id": req.body.contract_id,
                    "date": req.body.date,
                    "status": req.body.status,
                    "basic":paymentstructure.ebasic/days,
                    "da":paymentstructure.eda/days,
                    "addhours":paymentstructure.eadditional_hours/days,
                    "other":paymentstructure.eothers/days,
                    "leave":paymentstructure.eleave/days,
                    "bouns":paymentstructure.ebound/days,
                    "weekly":paymentstructure.eweekly_off/days,
                    "epf":paymentstructure.epf/days,
                    "esi":paymentstructure.eesi/days,
                    "rounded":paymentstructure.erounded/days,
                    "timein":req.body.time_in,
                    "timeout":req.body.time_out,
                    "duration": req.body.duration,
                }
                payment.push(p)
                waterfallCallback(null,paymentstructure,payment)
            },
              function (paymentstructure,employeepay,waterfallCallback){
                var now = new Date();
                var days =  new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
                let clientpayment = [];
                let p = {
                    "employee_id": req.body.employee_id,
                    "employee_name": req.body.employee_name,
                    "client_id": req.body.client_id,
                    "client_name": req.body.client_name,
                    "employee_type":req.body.employee_type,
                    "hrs":req.body.hrs,
                    "site_id": req.body.site_id,
                    "site_name": req.body.site_name,
                    "contract_id": req.body.contract_id,
                    "date": req.body.date,
                    "status": req.body.status,
                    "basic":paymentstructure.basic/days,
                    "da":paymentstructure.da/days,
                    "addhours":paymentstructure.additional_hours/days,
                    "other":paymentstructure.others/days,
                    "leave":paymentstructure.leave/days,
                    "bouns":paymentstructure.bound/days,
                    "weekly":paymentstructure.weekly_off/days,
                    "epf":paymentstructure.pf/days,
                    "esi":paymentstructure.esi/days,
                    "rounded":paymentstructure.rounded/days,
                    "timein":req.body.time_in,
                    "timeout":req.body.time_out,
                    "duration": req.body.duration,
                }
                clientpayment.push(p)
                waterfallCallback(null,clientpayment,employeepay)
            },
            function (clientpayment,payment,waterfallCallback){
                services.user.insertdata(payment, function (err, result) {
                if (err) {
                    req.log.error({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                waterfallCallback(null,clientpayment,payment);
                });
            },
             function (clientpayment,payment,waterfallCallback){
                services.user.clientinsertdata(clientpayment, function (err, result) {
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




// maualentry_process


function manual_entry_unit_add(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.manual_entry_unit_adds(req.body, function (err, result) {
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


function manual_entry_unit_update(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.manual_entry_unit_updates(req.body, function (err, result) {
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


function manual_entry_unit_delete(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.manual_entry_unit_deletes(req.body, function (err, result) {
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


function manual_entry_unit_list(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.manual_entry_unit_lists(req.body, function (err, result) {
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


function manual_entry_unit_fetch(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.manual_entry_unit_fetchs(req.body, function (err, result) {
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


function manual_entry_rate_add(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.manual_entry_rate_adds(req.body, function (err, result) {
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


function manual_entry_rate_update(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.manual_entry_rate_updates(req.body, function (err, result) {
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


function manual_entry_rate_delete(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.manual_entry_rate_deletes(req.body, function (err, result) {
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


function manual_entry_rate_list(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.manual_entry_rate_lists(req.body, function (err, result) {
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


function manual_entry_rate_fetch(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.manual_entry_rate_fetchs(req.body, function (err, result) {
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

function manual_entry_emp_add(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.manual_entry_emp_adds(req.body, function (err, result) {
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

function manual_entry_emp_update(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.manual_entry_emp_updates(req.body, function (err, result) {
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

function manual_entry_emp_delete(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.manual_entry_emp_deletes(req.body, function (err, result) {
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

function manual_entry_emp_list(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.manual_entry_emp_lists(req.body, function (err, result) {
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


function manual_entry_emp_list1(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.manual_entry_emp_lists1(req.body, function (err, result) {
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

function manual_entry_emp_fetch(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.manual_entry_emp_fetchs(req.body, function (err, result) {
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
/////////////////////////////
function getreportssssss(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.getreportssssss1(req.body, function (err, result) {
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


function getreportssssssall(req, res, next) {
       async.waterfall([
            function (waterfallCallback){
                services.user.getreportssssssall1(req.body, function (err, result) {
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




function gettingreportsall(req, res, next) {
    console.log(req)
       async.waterfall([
            function (waterfallCallback){
               var datass = [];
              for(var i = 0 ; i < req.body.data ; i++){
               services.user.gettingreportsall1(req.body, function (err, result) {
                if (err) {
                    req.log.error({
                        error: err
                    }, "Error while getting available users by mobiles");
                    return res.json(utils.errors["500"]);
                }
                console.log(result);
                datass.push(result);
                });
                 if( i < req.body.data ){
                      waterfallCallback(null,result);
                 }
                }
            
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
exports.fetchclient = fetchclient;
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
exports.deleteTrackinglist = deleteTrackinglist;



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

/*Contract site*/
exports.newclientcontract = newclientcontract;
exports.contractlist = contractlist;
exports.updateclientcontract = updateclientcontract;
exports.deletclientcontract = deletclientcontract;
exports.contractestatus = contractestatus;
exports.fetchcontract = fetchcontract;

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




/*Employee payment process*/
exports.employee_paylist = employee_paylist;
exports.employee_paydelete = employee_paydelete;
exports.employee_payupdate = employee_payupdate;
exports.employee_payfetch = employee_payfetch;





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

/*employee report*/
exports.dailyreport = dailyreport;
exports.Weeklyreort = Weeklyreort;


/*Finance process*/
exports.addfinanace = addfinanace;
exports.finanacelist = finanacelist;
exports.updatefinanace = updatefinanace;
exports.finanacedelete = finanacedelete;
exports.fetchfinanace = fetchfinanace;


/*Quality check process*/
exports.addquality = addquality;
exports.listquality = listquality;
exports.fetchquality = fetchquality;
exports.deletequality = deletequality;
exports.updatequality = updatequality;


/*Training report process*/
exports.addtrainingreport = addtrainingreport;
exports.listtrainingreport = listtrainingreport;
exports.fetchtrainingreport = fetchtrainingreport;
exports.deletetrainingreport = deletetrainingreport;
exports.updatetrainingreport = updatetrainingreport;


/*Training table process*/
exports.addtrainingreporttable = addtrainingreporttable;
exports.listtrainingreporttable = listtrainingreporttable;
exports.fetchtrainingreporttable = fetchtrainingreporttable;
exports.deletetrainingreporttable = deletetrainingreporttable;
exports.updatetrainingreporttable = updatetrainingreporttable;



/*night Check report process*/
exports.addnightreport = addnightreport;
exports.listnightreport = listnightreport;
exports.fetchnightreport = fetchnightreport;
exports.deletenightreport = deletenightreport;
exports.updatenightreport = updatenightreport;


/*night check table process*/
exports.addnightreporttable = addnightreporttable;
exports.listnightreporttable = listnightreporttable;
exports.fetchnightreporttable = fetchnightreporttable;
exports.deletenightreporttable = deletenightreporttable;
exports.updatenightreporttable = updatenightreporttable;

exports.fetchemployees = fetchemployees;
exports.fetchTrackinglist = fetchTrackinglist;
exports.fetchtrackdate = fetchtrackdate;
exports.fetchtracksingledate = fetchtracksingledate;


/*Quality table check process*/
exports.addqualitytable = addqualitytable;
exports.listqualitytable = listqualitytable;
exports.fetchqualitytable = fetchqualitytable;
exports.deletequalitytable = deletequalitytable;
exports.updatequalitytable = updatequalitytable;

exports.fetchemployee_id = fetchemployee_id;
exports.updateprofilephoto = updateprofilephoto;
exports.addnotification = addnotification;
exports.updatenotification = updatenotification;
exports.notificationcount = notificationcount
exports.listofnotification = listofnotification;


exports.assignemployeeadd = assignemployeeadd;
exports.Attendancecheck = Attendancecheck;
exports.fetchdetails = fetchdetails;
exports.checkemployee = checkemployee;
exports.clientfetchlist = clientfetchlist;
exports.employeetfetchlist = employeetfetchlist;
exports.assignlists = assignlists;
exports.advanceadd = advanceadd;
exports.advancefetch = advancefetch;
exports.fetchloan_number = fetchloan_number;
exports.deleteinstalment = deleteinstalment;
exports.deleteadvance = deleteadvance;
exports.updateadvance = updateadvance;
exports.fetchadvance =fetchadvance;
exports.updateoneinstalment = updateoneinstalment;
exports.advcancebulk = advcancebulk;
exports.monthlyfetch = monthlyfetch;
exports.addsalaryprocess = addsalaryprocess;
exports.addclientbulk = addclientbulk;
exports.addemployeebulk = addemployeebulk;
exports.manualAttendancecheck = manualAttendancecheck;
exports.salaryprocesstatus = salaryprocesstatus;


/* Master Company */
exports.addcompany = addcompany;
exports.companylists = companylists;
exports.updatecompany = updatecompany;
exports.fetchcompany = fetchcompany;
exports. fetchcompanysite = fetchcompanysite;
exports.deletecompany = deletecompany;

/*payroll*/
exports.fetchsitedetails =fetchsitedetails;
exports.fetchsitedpayment = fetchsitedpayment;
exports.efetchsitedetails = efetchsitedetails;
exports.fetchsitepaymentss = fetchsitepaymentss;


/*manual Entry*/
exports.manual_entry_unit_add =manual_entry_unit_add;
exports.manual_entry_unit_update = manual_entry_unit_update;
exports.manual_entry_unit_delete = manual_entry_unit_delete;
exports.manual_entry_unit_list = manual_entry_unit_list
exports.manual_entry_unit_fetch = manual_entry_unit_fetch;

exports.manual_entry_rate_add = manual_entry_rate_add;
exports.manual_entry_rate_update = manual_entry_rate_update;
exports.manual_entry_rate_delete = manual_entry_rate_delete
exports.manual_entry_rate_list = manual_entry_rate_list;
exports.manual_entry_rate_fetch = manual_entry_rate_fetch;

exports.manual_entry_emp_add = manual_entry_emp_add;
exports.manual_entry_emp_update = manual_entry_emp_update
exports.manual_entry_emp_delete =manual_entry_emp_delete;
exports.manual_entry_emp_list = manual_entry_emp_list;
exports.manual_entry_emp_fetch = manual_entry_emp_fetch;


exports.fetchadvance2 = fetchadvance2;
exports.manual_entry_emp_list1 = manual_entry_emp_list1;
exports. fetchloan_number1 = fetchloan_number1;
exports.employee_id1 = employee_id1;
exports.monthlyfetch1 = monthlyfetch1;
exports.getreportssssss = getreportssssss;
exports. getreportssssssall= getreportssssssall;
exports.gettingreportsall = gettingreportsall;
exports.fetchsitepaymentss2 = fetchsitepaymentss2;
exports.fetchsitepaymentss3 = fetchsitepaymentss3;



/*file upload*/
exports.uploadingfile = uploadingfile;