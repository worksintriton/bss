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
var base64ToImage = require("base64-to-image");
var uniqid = require("uniqid");
var path = require("path");
var fileUpload = require("express-fileupload");
var moment = require("moment");
var dateFormat = require("dateformat");
var XLSX = require("xlsx");
var strtotime = require("strtotime");
const model = require("../model/index");
const { Schema } = require("mongoose");
const objectId = Schema.Types.ObjectId;

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

function init() {}

//////bsslogin/////////

function bsslogin(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.loginpage.bsslogincheck(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

//////Clientlogin/////////

function Clientlogin(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.loginpage.clientlogincheck(
        req.body,
        function (err, result, status) {
          if (err) {
            console.log(err);
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, result, status);
        }
      );
    },
    function (mydata, status, waterfallCallback) {
      console.log(mydata);
      console.log(status);

      if (status == true) {
        return res.json(
          _.merge(
            {
              data: mydata,
            },
            utils.errors["200"]
          )
        );
      } else {
        return res.json(
          _.merge(
            {
              data: mydata,
            },
            utils.errors["401a"]
          )
        );
      }
    },
  ]);
}

/////addemployee///////

function addemployee(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.AddemployeeC(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      if (mydata.status === "falied") {
        return res.json(
          _.merge(
            {
              data: mydata,
            },
            utils.errors["200"]
          )
        );
      } else {
        services.user.updateempid(
          mydata,
          req.body.idtype,
          function (err, result) {
            if (err) {
              req.log.error(
                {
                  error: err,
                },
                "Error while getting available users by mobiles"
              );
              return res.json(utils.errors["500"]);
            }
            waterfallCallback(null, result);
          }
        );
      }
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function updateemployee1(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.updateemployee1s(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function updateqr(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.updateqrs(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

///addusers////
function addusers(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.createusers(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}
///addclient//////

function addclients(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.createclient(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

///updateclient//////

function updateclients(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.updateclient(req.body, function (err, result) {
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            message: "Updated Success",
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function userid(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.userids(req.body, function (err, result) {
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

///updateusers//////

function updateusers(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.updateuser(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function updateemployee(req, res, next) {
  console.log(req.body);
  async.waterfall([
    function (waterfallCallback) {
      services.user.updateemployees(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        console.log(result);
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function Changepassword(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.Changepasswords(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: "Password Updated",
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

///Configurenumber//////

function createConfignumber(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.createConfignumbers(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function confignumber(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.confignumbers(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function getconfignumber(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.getsconfignumbers(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

////list///////

function clientlist(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.clientlists(req.body, function (err, result) {
        if (result.length == 0) {
          return res.json(_.merge({}, utils.errors["402"]));
        } else {
          waterfallCallback(null, result);
        }
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function employeelist(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.employeelists(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function resigned(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.updateresign(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function userlist(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.userlists(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        } else {
          if (result.length == 0) {
            return res.json(_.merge({}, utils.errors["200"]));
          } else {
            waterfallCallback(null, result);
          }
        }
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function clientid(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.clientids(req.body, function (err, client_detail) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, client_detail);
      });
    },
    function (client_detail, waterfallCallback) {
      services.user.site_details(req.body, function (err, site_details) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, client_detail, site_details);
      });
    },
    function (client_detail, site_details, waterfallCallback) {
      services.user.payment_details(
        site_details,
        function (err, payment_details) {
          if (err) {
            req.log.error(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, client_detail, site_details, payment_details);
        }
      );
    },
    function (client_detail, site_details, payment_details, waterfallCallback) {
      services.user.requirement_details(
        req.body,
        function (err, requirement_details) {
          if (err) {
            req.log.error(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(
            null,
            client_detail,
            site_details,
            payment_details,
            requirement_details
          );
        }
      );
    },
    function (
      client_detail,
      site_details,
      payment_details,
      requirement_details,
      waterfallCallback
    ) {
      services.user.listclientattachs(
        req.body,
        function (err, listclientattachs) {
          if (err) {
            console.log(err);
            req.log.error(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(
            null,
            client_detail,
            site_details,
            payment_details,
            requirement_details,
            listclientattachs
          );
        }
      );
    },
    function (
      client_detail,
      site_details,
      payment_details,
      requirement_details,
      listclientattachs,
      waterfallCallback
    ) {
      console.log(site_details, payment_details, requirement_details);

      let site = [];
      site_details.forEach(function (belement) {
        let site_detail = [];
        site_detail = belement;
        site.push(site_detail);

        site_detail.payment = [];
        payment_details.forEach(function (pelement) {
          if (belement.id == pelement.site_id) {
            site_detail.payment.push(pelement);
          }
        });

        site_detail.requirement = [];
        requirement_details.forEach(function (relement) {
          if (belement.id == relement.site_id) {
            site_detail.requirement.push(relement);
          }
        });

        site_detail.documents = [];
        listclientattachs.forEach(function (delement) {
          if (belement.id == delement.site_id) {
            site_detail.documents.push(delement);
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
      waterfallCallback(null, client_detail, site);
    },
    function (client_detail, site_detail, waterfallCallback) {
      return res.json(
        _.merge(
          {
            client_detail: client_detail,
            site_detail: site_detail,
          },
          utils.errors["200"]
        )
      );
    },
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
    function (waterfallCallback) {
      services.user.fetchclients(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function deleteclient(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.deleteclients(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function deleteassign(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.deleteassigns(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function deleteuser(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.deleteusers(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function deleteemployee(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.deleteemployees(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function addquestions(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.addquestion(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function updatequestions(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.updatequestion(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function deletequestions(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.deletequestion(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function Question_id(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.Question_ids(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata[0],
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function Questionlist(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.Questionlists(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

/*
Issue Management
*/
function create_issue(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.issues.createIssue(
        req.body,
        function (err, is_inserted, result) {
          if (err) {
            console.log(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, is_inserted, result);
        }
      );
    },

    function (is_inserted, result, waterfallCallback) {
      if (is_inserted == true) {
        services.issues.createIssuehistory(result, function (err, result) {
          if (err) {
            console.log(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          } else {
            return res.json(
              _.merge(
                {
                  issue: result,
                  message: "Created Succcessfully",
                },
                utils.errors["200"]
              )
            );
          }
        });
      }
    },
  ]);
}

/*
Update issues
*/
function updateissues(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.issues.updateissue(
        req.body,
        function (err, is_inserted, result) {
          if (err) {
            console.log(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, is_inserted, result);
        }
      );
    },

    function (is_inserted, result, waterfallCallback) {
      if (is_inserted == true) {
        services.issues.createIssuehistory(result, function (err, result) {
          if (err) {
            console.log(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          } else {
            return res.json(
              _.merge(
                {
                  issue: result,
                  message: "Sending Succcessfully",
                },
                utils.errors["200"]
              )
            );
          }
        });
      }
    },
  ]);
}

/*
taken_by issues
*/
function taken_by(req, res, next) {
  console.log("one");
  async.waterfall([
    function (waterfallCallback) {
      services.issues.taken_bys(req.body, function (err, is_inserted, result) {
        if (err) {
          console.log(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, is_inserted, result);
      });
    },

    function (is_inserted, result, waterfallCallback) {
      if (is_inserted == true) {
        services.issues.createIssuehistory(result, function (err, result) {
          if (err) {
            console.log(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          } else {
            return res.json(
              _.merge(
                {
                  issue: result,
                  message: "Sending Succcessfully",
                },
                utils.errors["200"]
              )
            );
          }
        });
      }
    },
  ]);
}

// issues report

function report(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.issues.reports(req.body, function (err, is_inserted, result) {
        if (err) {
          console.log(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        console.log(result);
        waterfallCallback(null, is_inserted, result);
      });
    },
    function (is_inserted, result, waterfallCallback) {
      if (is_inserted == true) {
        services.issues.reportupdate(result, function (err, result) {
          if (err) {
            console.log(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          } else {
            return res.json(
              _.merge(
                {
                  issue: result,
                  message: "Sending Succcessfully",
                },
                utils.errors["200"]
              )
            );
          }
        });
      }
    },
  ]);
}

function create_issue_attachment(req, res, next) {
  console.log("data in");
  async.waterfall([
    function (waterfallCallback) {
      console.log("test1");
      if (!req.files) return res.status(404).json(utils.errors["404"]);
      console.log("test2");

      let sampleFile = req.files.pic;
      let basepath = "www/pics/issues/";
      var timestamp = uniqid();
      var ext = path.extname(sampleFile.name);
      let filename = timestamp + ext;
      console.log(filename);
      sampleFile.mv(basepath + filename, function (err) {
        console.log("test3");
        if (err)
          return res.json(
            _.merge(
              {
                issue: err,
                message: "file uploaded",
              },
              utils.errors["400"]
            )
          );

        waterfallCallback(null, basepath, filename, req.query["issue_id"]);
        console.log("test4");
      });
    },

    function (basepath, filename, issue_id, waterfallCallback) {
      console.log("test5");
      services.issues.createIssueAttachment(
        basepath,
        filename,
        issue_id,
        function (err, is_inserted, result) {
          if (err) {
            console.log(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          console.log("test6");
          return res.json(
            _.merge(
              {
                issue: result,
                message: "file uploaded",
              },
              utils.errors["200"]
            )
          );
        }
      );
    },
  ]);
}

function list_issue(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.issues.listIssues(req.body, function (err, result) {
        if (err) {
          console.log(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (listIssues, waterfallCallback) {
      services.issues.listIssueAttachment(
        req.body,
        function (err, listIssueAttachment) {
          if (err) {
            console.log(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, listIssues, listIssueAttachment);
        }
      );
    },

    function (listIssues, listIssueAttachment, waterfallCallback) {
      return res.json(
        _.merge(
          {
            issue: listIssues,
            attachments: listIssueAttachment,
            message: "Done",
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function list_my_issue(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.issues.listMyIssues(req.body, function (err, result) {
        if (err) {
          console.log(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (listIssues, waterfallCallback) {
      services.issues.listmyIssueAttachment(
        req.body,
        function (err, listIssueAttachment) {
          if (err) {
            console.log(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, listIssues, listIssueAttachment);
        }
      );
    },

    function (listIssues, listIssueAttachment, waterfallCallback) {
      return res.json(
        _.merge(
          {
            issue: listIssues,
            attachments: listIssueAttachment,
            message: "Done",
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function listissues(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.issues.listissuess(req.body, function (err, result) {
        if (err) {
          console.log(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
        console.log(result);
      });
    },
    function (listIssues, waterfallCallback) {
      services.issues.listmyIssueAttachments(
        req.body,
        function (err, listIssueAttachment) {
          if (err) {
            console.log(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, listIssues, listIssueAttachment);
        }
      );
    },

    function (listIssues, listIssueAttachment, waterfallCallback) {
      return res.json(
        _.merge(
          {
            issue: listIssues,
            attachments: listIssueAttachment,
            message: "Done",
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function issuecount(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.issues.issuecounts(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function issuedetails(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.issues.issuedetail(req.body, function (err, result) {
        if (err) {
          console.log(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (listIssues, listIssueAttachment, waterfallCallback) {
      return res.json(
        _.merge(
          {
            issue: listIssues[0],
            attachments: listIssueAttachment,
            message: "Done",
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function issuetrack(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.issues.issuetracks(req.body, function (err, result) {
        if (err) {
          console.log(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (listIssues, listIssueAttachment, waterfallCallback) {
      return res.json(
        _.merge(
          {
            issue: listIssues,
            attachments: listIssueAttachment,
            message: "Done",
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function employee_id(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.employeeids(req.body, function (err, result) {
        if (err) {
          console.log(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        } else {
          return res.json(
            _.merge(
              {
                data: result[0],
              },
              utils.errors["200"]
            )
          );
        }
      });
    },
  ]);
}

function employee_id1(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.employeeids11(req.body, function (err, result) {
        if (err) {
          console.log(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        } else {
          return res.json(
            _.merge(
              {
                data: result[0],
              },
              utils.errors["200"]
            )
          );
        }
      });
    },
  ]);
}

function fetchemployee_id(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.employeeidss(req.body, function (err, employee_details) {
        if (err) {
          console.log(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, employee_details);
      });
    },
    function (employee_details, waterfallCallback) {
      services.user.mylistattachss(req.body, function (err, attachments) {
        if (err) {
          console.log(err);
        }
        waterfallCallback(null, employee_details, attachments);
      });
    },

    function (employee_details, attachments, waterfallCallback) {
      return res.json(
        _.merge(
          {
            employee_details: employee_details,
            Photo: attachments[0].path,
            message: "Done",
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

/////training blockss///////

///// set of training///////

function training(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.training.setoftraining(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function traininglessons(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.training.traininglessons(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function trainingvideos(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.training.trainingvideos(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function traininglist(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.training.traininglists(req.body, function (err, traininglist) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        } else {
          waterfallCallback(null, traininglist);
        }
      });
    },
    function (traininglist, waterfallCallback) {
      services.training.traininglessonlist(
        req.body,
        function (err, traininglessons) {
          if (err) {
            req.log.error(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          } else {
            waterfallCallback(null, traininglist, traininglessons);
          }
        }
      );
    },
    function (traininglist, traininglessons, waterfallCallback) {
      services.training.trainingvideoslist(
        req.body,
        function (err, trainingvideos) {
          if (err) {
            req.log.error(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          } else {
            return res.json(
              _.merge(
                {
                  traininglist: traininglist,
                  traininglessons: traininglessons,
                  trainingvideos: trainingvideos,
                },
                utils.errors["200"]
              )
            );
          }
        }
      );
    },
  ]);
}

/* Point tracking
 */

function Tracking(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.training.Trackings(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function fetchtrackdate(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.training.fetchtrackdates(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function fetchtracksingledate(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.training.fetchtracksingledates(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function Trackingperson(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.training.Trackingpersons(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function deleteTrackinglist(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.training.deleteTrackinglists(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function Trackinglist(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.training.Trackinglists(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function fetchemployees(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.point_tracking.fetchemployeess(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function deleteEmployeeTracking(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.point_tracking.deleteEmployeeTrackings(
        req.body,
        function (err, result) {
          if (err) {
            req.log.error(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, result);
        }
      );
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function fetchTrackinglist(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.point_tracking.fetchTrackinglists(
        req.body,
        function (err, result) {
          if (err) {
            req.log.error(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, result);
        }
      );
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function PointTrackMap(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.point_tracking.PointTrackMaps(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function PointTrackMapSpot(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.point_tracking.PointTrackMapSpots(
        req.body,
        function (err, result) {
          if (err) {
            req.log.error(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, result);
        }
      );
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function Addpoints(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.point_tracking.Addpointsweb(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function pointsupdate(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.point_tracking.pointsupdateweb(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function pointslist(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.point_tracking.pointslistweb(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function deletepoints(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.point_tracking.deletepointsweb(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: "Deleted Succcessfully",
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function fetchpoints(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.point_tracking.fetchpointsweb(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function employee_fetchpoints(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.point_tracking.employee_fetchpointsmobile(
        req.body,
        function (err, result) {
          if (err) {
            req.log.error(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, result);
        }
      );
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function updatePointTrackMap(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.point_tracking.updatePointTrackMapmobile(
        req.body,
        function (err, result) {
          if (err) {
            req.log.error(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, result);
        }
      );
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function DeletePointTrackMap(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.point_tracking.DeletePointTrackMapmobile(
        req.body,
        function (err, result) {
          if (err) {
            req.log.error(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, result);
        }
      );
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function PointTrackMaplist(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.point_tracking.PointTrackMaplistmobile(
        req.body,
        function (err, result) {
          if (err) {
            req.log.error(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, result);
        }
      );
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function updatePointTrackMapSpot(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.point_tracking.updatePointTrackMapSpotmobile(
        req.body,
        function (err, result) {
          if (err) {
            req.log.error(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, result);
        }
      );
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function DeletePointTrackMapSpot(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.point_tracking.DeletePointTrackMapSpotmobile(
        req.body,
        function (err, result) {
          if (err) {
            req.log.error(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, result);
        }
      );
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function PointTrackMapSpotlist(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.point_tracking.PointTrackMapSpotlistmobile(
        req.body,
        function (err, result) {
          if (err) {
            req.log.error(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, result);
        }
      );
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function FetchMapSpot(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.point_tracking.FetchMapSpotmobile(
        req.body,
        function (err, result) {
          if (err) {
            req.log.error(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, result);
        }
      );
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

/*Record */

function PointTrackMapRecords(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.point_tracking.PointTrackMapRecordsmobile(
        req.body,
        function (err, result) {
          if (err) {
            req.log.error(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, result);
        }
      );
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function updatePointTrackMapRecords(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.point_tracking.updatePointTrackMapRecordsmobile(
        req.body,
        function (err, result) {
          if (err) {
            req.log.error(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, result);
        }
      );
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function DeletePointTrackMapRecords(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.point_tracking.DeletePointTrackMapRecordsmobile(
        req.body,
        function (err, result) {
          if (err) {
            req.log.error(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, result);
        }
      );
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function PointTrackMapRecordslist(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.point_tracking.PointTrackMapRecordslistmobile(
        req.body,
        function (err, result) {
          if (err) {
            req.log.error(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, result);
        }
      );
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function PointTrackRecordsSpot(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.point_tracking.PointTrackRecordsSpotmobile(
        req.body,
        function (err, result) {
          if (err) {
            req.log.error(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, result);
        }
      );
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function updatePointTrackRecordsSpot(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.point_tracking.updatePointTrackRecordsSpotmobile(
        req.body,
        function (err, result) {
          if (err) {
            req.log.error(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, result);
        }
      );
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function DeletePointTrackRecordsSpot(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.point_tracking.DeletePointTrackRecordsSpotmobile(
        req.body,
        function (err, result) {
          if (err) {
            req.log.error(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, result);
        }
      );
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function PointTrackRecordsSpotlist(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.point_tracking.PointTrackRecordsSpotlistmobile(
        req.body,
        function (err, result) {
          if (err) {
            req.log.error(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, result);
        }
      );
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function FetchMapSpotrecord(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.point_tracking.FetchMapSpotrecordmobile(
        req.body,
        function (err, result) {
          if (err) {
            req.log.error(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, result);
        }
      );
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function addmapuser(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.point_tracking.addmapuseweb(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function addmapuserlist(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.point_tracking.addmapuserlistweb(
        req.body,
        req.query,
        function (err, result) {
          if (err) {
            req.log.error(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, result);
        }
      );
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function mapuserdelete(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.point_tracking.mapuserdeleteweb(
        req.body,
        function (err, result) {
          if (err) {
            req.log.error(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, result);
        }
      );
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function fetchmapuserpoints(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.point_tracking.fetchmapuserpointsweb1(
        req.body,
        function (err, PointTrackMap) {
          if (err) {
            req.log.error(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, PointTrackMap);
        }
      );
    },
    function (PointTrackMap, waterfallCallback) {
      services.point_tracking.fetchmapuserpointsweb2(
        req.body,
        function (err, Mapusers) {
          if (err) {
            req.log.error(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          return res.json(
            _.merge(
              {
                PointTrackMap: PointTrackMap,
                Mapusers: Mapusers,
              },
              utils.errors["200"]
            )
          );
        }
      );
    },
  ]);
}

function addqr(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.addqrweb(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function qrlist(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.qrlistweb(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function deleteqr(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.deleteqrweb(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function deleteallqr(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.deleteallqrweb(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function MarkAttendance(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.attendance.MarkAttendancemob(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function dailystatus(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.attendance.dailystatusweb(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function Weeklystatus(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.attendance.Weeklystatusweb(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function dailyreport(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.attendance.dailyreports(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function Weeklyreort(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.attendance.Weeklyreports(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function Allstatus(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.attendance.Allstatusweb(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function AllHistory(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.attendance.History(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function Forgotpasswordweb(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.Forgotpasswordwebs(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function checkuser(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.checkusers(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      if (mydata.length == 0) {
        return res.json(
          _.merge(
            {
              data: mydata,
            },
            utils.errors["403"]
          )
        );
      } else {
        return res.json(
          _.merge(
            {
              data: mydata[0],
            },
            utils.errors["200"]
          )
        );
      }
    },
  ]);
}

function assigningemployee(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.attendance.assigningemployees(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function Updateemployee_id(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.Updateemployee_ids(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function addassign(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.addassigns(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function listassign(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.listassigns(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

///sms/////

function addsms(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.addsmss(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function listsms(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.listsmss(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function deletesms(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.deletesmss(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function newcomplaints(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.issues.createIssue1(
        req.body,
        function (err, is_inserted, result) {
          if (err) {
            console.log(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, is_inserted, result);
        }
      );
    },

    function (is_inserted, result, waterfallCallback) {
      if (is_inserted == true) {
        services.issues.createIssuehistory(result, function (err, result) {
          if (err) {
            console.log(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          } else {
            return res.json(
              _.merge(
                {
                  issue: result,
                  message: "Created Succcessfully",
                },
                utils.errors["200"]
              )
            );
          }
        });
      }
    },
  ]);
}

function complaintlist(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.issues.listissuess1(req.body, function (err, result) {
        if (err) {
          console.log(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
        console.log(result);
      });
    },
    function (listIssues, waterfallCallback) {
      return res.json(
        _.merge(
          {
            issue: listIssues,
            message: "Done",
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function updateStatus(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.issues.updateissuecomplaint(req.body, function (err, result) {
        if (err) {
          console.log(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
        console.log(result);
      });
    },
    function (listIssues, waterfallCallback) {
      return res.json(
        _.merge(
          {
            issue: listIssues,
            message: "Done",
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function clearissue(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.issues.clearissues(req.body, function (err, result) {
        if (err) {
          console.log(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
        console.log(result);
      });
    },
    function (listIssues, waterfallCallback) {
      return res.json(
        _.merge(
          {
            issue: listIssues,
            message: "Done",
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function createfeedback(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.createfeedbacks(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function feedbacklist(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.feedbacklists(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function listmyfeedback(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.listmyfeedbacks(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function fetchfeedback(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.fetchfeedbacks(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function createattach(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.createattachs(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function listattach(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.listattachs(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function mylistattach(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.mylistattachs(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function fetchattach(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.fetchattachs(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

///

function addclientattach(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.addclientattachs(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function listclientattach(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.listclientattachs(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function mylistclientattach(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.mylistclientattachs(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function fetchclientattach(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.fetchclientattachs(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function deleteclientattach(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.deletclientattachs(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function uploadingfile(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      if (Object.keys(req.files).length == 0) {
        return res.status(400).send("No files were uploaded.");
      }

      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      let sampleFile = req.files.filetoupload;

      // Use the mv() method to place the file somewhere on your server
      var time_details = moment().format("YYYYMMDDHHmmss");
      var path = "www/pics/" + time_details + "_" + sampleFile.name;
      var lpath = "/pics/" + time_details + "_" + sampleFile.name;
      sampleFile.mv(path, async function (err) {
        if (err) return res.status(500).send(err);
        var result = {
          path: lpath,
          uploadstatus: true,
        };
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function listUploadedFile(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.listUploadedFile(
        req.body,
        req.query,
        function (err, result) {
          if (result.length == 0) {
            return res.json(_.merge({}, utils.errors["402"]));
          } else {
            waterfallCallback(null, result);
          }
        }
      );
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function advcancebulk(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      if (Object.keys(req.files).length == 0) {
        return res.status(400).send("No files were uploaded.");
      }
      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      let sampleFile = req.files.filetoupload;
      // Use the mv() method to place the file somewhere on your server
      var time_details = moment().format("YYYYMMDDHHmmss");
      var path = "www/pics/" + time_details + "_" + sampleFile.name;
      sampleFile.mv(path, function (err) {
        if (err) return res.status(500).send(err);
        var result = {
          path: path,
          uploadstatus: true,
        };
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      var XLSX = require("xlsx");
      var workbook = XLSX.readFile(mydata.path);
      var sheet_name_list = workbook.SheetNames;
      var lists = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
      let site_info = [];
      lists.forEach(function (belement) {
        var j = 0;
        var month = 0;
        for (var i = 1; i <= belement.Installment; i++) {
          var exdate = +belement.Date; // represents Jan 1, 1993
          var e0date = new Date(0); // epoch "zero" date
          var offset = e0date.getTimezoneOffset(); // tz offset in min
          var jsdate1 = new Date(0, 0, exdate - 1, 0, -offset, 0);
          console.log(jsdate1);
          var date1 = dateFormat(jsdate1, "yyyy");
          var date2 = dateFormat(jsdate1, "mm");
          var date3 = dateFormat(jsdate1, "dd");
          var datess = +date2 + j;
          console.log(datess);
          if (datess > 12) {
            console.log("in");
            var year = +date1 + 1;
            var month = month + 1;
            var date = date3;
            var date1 = year;
            var date2 = month;
            var date3 = date;
            var datesss = date1 + "-" + date2 + "-" + date3;
            j++;
            console.log(datesss);
            var amount = belement.Amount / belement.Installment;
            console.log(datesss, amount);
            services.user.advanceaddss(
              belement,
              datesss,
              amount,
              function (err, result) {
                if (err) {
                  console.log(err);
                }
              }
            );
          } else {
            var datesss = date1 + "-" + datess + "-" + date3;
            j++;
            console.log(datesss);
            var amount = belement.Amount / belement.Installment;
            console.log(datesss, amount);
            services.user.advanceaddss(
              belement,
              datesss,
              amount,
              function (err, result) {
                if (err) {
                  console.log(err);
                }
              }
            );
          }
        }
      });
    },
  ]);
}

function newclientsite(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.newclientsites(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function sitelist(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.sitelists(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function updateclientsite(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.updateclientsites(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function deletclientsite(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.deletclientsites(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function sitestatus(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.sitestatuss(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function fetchsite(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.fetchsites(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function fetchcompanysite(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.fetchcompanysites(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}
function fetchcompanysites(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.fetchcompanysitess(req.body, function (err, siteList) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, siteList);
      });
    },
    function (siteList, waterfallCallback) {
      let data = [];
      siteList.forEach(function (detail) {
        let a = {
          id: detail.id,
          title: detail.title,
        };
        data.push(a);
      });
      return res.json(
        _.merge(
          {
            data: data,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function fetchemployeeid(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.fetchemployeeids(req.body, function (err, result) {
        if (err) {
          console.log(err);
          //  req.log.error({
          //     //  error: err
          //  }, "Error while getting available users by mobiles");
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function newclientcontract(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.newclientcontracts(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function contractlist(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.contractlists(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function updateclientcontract(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.updateclientcontracts(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function deletclientcontract(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.deletclientcontracts(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function contractestatus(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.contractestatuss(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function fetchcontract(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.fetchcontracts(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
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
    function (waterfallCallback) {
      services.user.paylists(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function paydelete(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.paydeletes(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function payupdate(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.payupdates(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function payfetch(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.payfetchs(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

//////

function employee_paylist(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.employee_paylists(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function employee_paydelete(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.employee_paydeletes(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function employee_payupdate(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.employee_payupdates(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function employee_payfetch(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.employee_payfetchs(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function reqadd(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.reqadds(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (result, waterfallCallback) {
      services.user.payadds(result, function (err, payadds) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function reqlist(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.reqlists(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function reqdelete(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.reqdeletes(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function reqfetch(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.reqfetchs(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function requpdate(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.requpdates(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (result, waterfallCallback) {
      services.user.payementupdate(result, function (err, payresult) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function uniformadd(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.uniformadds(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function uniformlist(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.uniformlists(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function uniformdelete(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.uniformdeletes(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function uniformupdate(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.uniformupdates(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function uniformfetch(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.uniformfetchs(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function deliverd(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.deliverds(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function undeliverd(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.undeliverds(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function deleteattach(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.deleteattachs(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function additems(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.additem(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function itemslists(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.itemslist(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function itemsdeletes(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.itemsdelete(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function updateitems(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.updateitem(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function fetchitems(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.fetchitem(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function addemptype(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.addemptypes(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function emptypelist(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.emptypelists(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function emptypedelete(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.emptypedeletes(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function updateemptype(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.updateemptypes(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function fetchemptype(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.fetchemptypes(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function addfinanace(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.addfinanaces(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function finanacelist(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.finanacelists(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function finanacedelete(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.finanacedeletes(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function updatefinanace(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.updatefinanaces(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function fetchfinanace(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.fetchfinanaces(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function addquality(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.addqualitys(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function listquality(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.listqualitys(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function deletequality(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.deletequalitys(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function updatequality(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.updatequalitys(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function fetchquality(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.fetchqualitys(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function addqualitytable(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.addqualitytables(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function listqualitytable(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.listqualitytables(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function deletequalitytable(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.deletequalitytables(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function updatequalitytable(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.updatequalitytables(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function fetchqualitytable(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.fetchqualitytables(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function addtrainingreport(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.addtrainingreports(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function listtrainingreport(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.listtrainingreports(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function deletetrainingreport(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.deletetrainingreports(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function updatetrainingreport(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.updatetrainingreports(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function fetchtrainingreport(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.fetchtrainingreports(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function addtrainingreporttable(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.addtrainingreporttables(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function listtrainingreporttable(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.listtrainingreporttables(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function deletetrainingreporttable(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.deletetrainingreporttables(
        req.body,
        function (err, result) {
          if (err) {
            req.log.error(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, result);
        }
      );
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function updatetrainingreporttable(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.updatetrainingreporttables(
        req.body,
        function (err, result) {
          if (err) {
            req.log.error(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, result);
        }
      );
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function fetchtrainingreporttable(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.fetchtrainingreporttables(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function addnightreport(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.addnightreports(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function listnightreport(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.listnightreports(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function updateprofilephoto(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.updateprofilephotos(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function fetchnightreport(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.fetchnightreports(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function deletenightreport(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.deletenightreports(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function updatenightreport(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.updatenightreports(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function addnightreporttable(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.addnightreporttables(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function listnightreporttable(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.listnightreporttables(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function fetchnightreporttable(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.fetchnightreporttables(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function deletenightreporttable(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.deletenightreporttables(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function updatenightreporttable(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.updatenightreporttables(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function addnotification(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.selectclient(req.body, function (err, client_detail) {
        if (err) {
          console.log(err);
        }
        waterfallCallback(null, client_detail);
      });
    },
    function (client_detail, waterfallCallback) {
      services.user.selectsite(req.body, function (err, site_detail) {
        if (err) {
          console.log(err);
        }
        waterfallCallback(null, client_detail, site_detail);
      });
    },
    function (client_detail, site_detail, waterfallCallback) {
      // var date = dateFormat(new Date(), "yyyy-mm-dd");
      var date = "2019-10-23";

      services.user.selectcontract(date, function (err, contract_detail) {
        if (err) {
          console.log(err);
        }
        waterfallCallback(null, client_detail, site_detail, contract_detail);
      });
    },
    function (client_detail, site_detail, contract_detail, waterfallCallback) {
      services.user.selectusers(req.body, function (err, user_details) {
        if (err) {
          console.log(err);
        }
        waterfallCallback(
          null,
          client_detail,
          site_detail,
          contract_detail,
          user_details
        );
      });
    },
    function (
      client_detail,
      site_detail,
      contract_detail,
      user_details,
      waterfallCallback
    ) {
      let site_info = [];
      console.log(contract_detail);
      contract_detail.forEach(function (belement) {
        site_detail.forEach(function (pelement) {
          if (belement.site_id == pelement.id) {
            let project = {
              site_id: pelement.id,
              site_name: pelement.title,
              client_id: pelement.client_id,
              contract_id: belement.id,
              contract_start_date: belement.contract_start_date,
              contract_end_date: belement.contract_end_date,
              last_revision: belement.last_revision_date,
              invoice_cycle: belement.invoice_cycle,
              contract_type: belement.contract_type,
            };

            site_info.push(project);
          }
        });
      });
      waterfallCallback(
        null,
        client_detail,
        site_info,
        contract_detail,
        user_details
      );
    },
    function (
      client_detail,
      site_info,
      contract_detail,
      user_details,
      waterfallCallback
    ) {
      console.log(site_info);

      let client_detailss = [];
      site_info.forEach(function (belement) {
        client_detail.forEach(function (pelement) {
          if (belement.client_id == pelement.id) {
            let project = {
              client_id: pelement.id,
              client_name: pelement.company_name,
              site_id: belement.site_id,
              site_name: belement.site_name,
              contract_id: belement.contract_id,
              contract_start_date: belement.contract_start_date,
              contract_end_date: belement.contract_end_date,
              last_revision: belement.last_revision_date,
              invoice_cycle: belement.invoice_cycle,
              contract_type: belement.contract_type,
            };

            client_detailss.push(project);
          }
        });
      });
      waterfallCallback(null, client_detailss, user_details);
    },
    function (client_detailss, user_details, waterfallCallback) {
      let notification_details = [];
      client_detailss.forEach(function (belement) {
        user_details.forEach(function (pelement) {
          let project = {
            user_id: pelement.user_id,
            status: "New",
            client_id: belement.client_id,
            client_name: belement.client_name,
            site_id: belement.site_id,
            site_name: belement.site_name,
            contract_start_date: belement.contract_start_date,
            contract_end_date: belement.contract_end_date,
            last_revision: belement.last_revision_date,
            invoice_cycle: belement.invoice_cycle,
            contract_type: belement.contract_type,
            contract_id: belement.contract_id,
          };
          notification_details.push(project);
        });
      });
      waterfallCallback(null, notification_details);
    },
    function (notification_details, waterfallCallback) {
      var date = dateFormat(new Date(), "yyyy-mm-dd");

      for (var i = 0; i < notification_details.length; i++) {
        services.user.addnotificationss(
          notification_details[i],
          date,
          function (err, contract_detail) {
            if (err) {
              console.log(err);
            }
          }
        );
      }
      return res.json(
        _.merge(
          {
            data: notification_details,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function notificationcount(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.notificationcounts(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function updatenotification(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.updatenotifications(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function listofnotification(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.listofnotifications(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function assignemployeeadd(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.assignemployeeadds(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function Attendancecheck(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.fetchpaymentdetails(
        req.body,
        function (err, fetchpaymentdetails) {
          if (err) {
            console.log(err);
          }
          waterfallCallback(null, fetchpaymentdetails);
        }
      );
    },
    function (fetchpaymentdetails, waterfallCallback) {
      fetchpaymentdetails.forEach(function (belement) {
        if (belement.employee_type == req.body.employee_type) {
          waterfallCallback(null, belement);
        }
      });
    },
    function (paymentstructure, waterfallCallback) {
      var now = new Date();
      var days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      let payment = [];
      let p = {
        employee_id: req.body.employee_id,
        employee_name: req.body.employee_name,
        client_id: req.body.client_id,
        client_name: req.body.client_name,
        employee_type: req.body.employee_type,
        hrs: req.body.hrs,
        site_id: req.body.site_id,
        site_name: req.body.site_name,
        contract_id: req.body.contract_id,
        date: req.body.date,
        status: req.body.status,
        basic: paymentstructure.ebasic / days,
        da: paymentstructure.eda / days,
        addhours: paymentstructure.eadditional_hours / days,
        other: paymentstructure.eothers / days,
        leave: paymentstructure.eleave / days,
        bouns: paymentstructure.ebound / days,
        weekly: paymentstructure.eweekly_off / days,
        epf: paymentstructure.epf / days,
        esi: paymentstructure.eesi / days,
        rounded: paymentstructure.erounded / days,
        timein: req.body.time_in,
        timeout: req.body.time_out,
        duration: req.body.duration,
      };
      payment.push(p);
      waterfallCallback(null, paymentstructure, payment);
    },
    function (paymentstructure, employeepay, waterfallCallback) {
      var now = new Date();
      var days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      let clientpayment = [];
      let p = {
        employee_id: req.body.employee_id,
        employee_name: req.body.employee_name,
        client_id: req.body.client_id,
        client_name: req.body.client_name,
        employee_type: req.body.employee_type,
        hrs: req.body.hrs,
        site_id: req.body.site_id,
        site_name: req.body.site_name,
        contract_id: req.body.contract_id,
        date: req.body.date,
        status: req.body.status,
        basic: paymentstructure.basic / days,
        da: paymentstructure.da / days,
        addhours: paymentstructure.additional_hours / days,
        other: paymentstructure.others / days,
        leave: paymentstructure.leave / days,
        bouns: paymentstructure.bound / days,
        weekly: paymentstructure.weekly_off / days,
        epf: paymentstructure.pf / days,
        esi: paymentstructure.esi / days,
        rounded: paymentstructure.rounded / days,
        timein: req.body.time_in,
        timeout: req.body.time_out,
        duration: req.body.duration,
      };
      clientpayment.push(p);
      waterfallCallback(null, clientpayment, employeepay);
    },
    function (clientpayment, payment, waterfallCallback) {
      services.user.insertdata(payment, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, clientpayment, payment);
      });
    },
    function (clientpayment, payment, waterfallCallback) {
      services.user.clientinsertdata(clientpayment, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function fetchdetails(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.fetchdetailss(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function checkemployee(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.checkemployees(
        req.body,
        function (err, assignemployeelist) {
          if (err) {
            req.log.error(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, assignemployeelist);
        }
      );
    },
    function (assignemployeelist, waterfallCallback) {
      services.user.selectemployee(req.body, function (err, employee_list) {
        if (err) {
          console.log(err);
        }
        waterfallCallback(null, assignemployeelist, employee_list);
      });
    },
    function (assignemployeelist, employee_list, waterfallCallback) {
      if (assignemployeelist.length == 0) {
        waterfallCallback(null, employee_list);
      } else {
        let employee_lists = [];
        employee_list.forEach(function (belement) {
          console.log("in");
          assignemployeelist.forEach(function (pelement) {
            console.log("out");
            if (!belement.employee_id == pelement.employee_id) {
              let project = {
                employee_id: pelement.user_id,
                employee_name: "New",
                employee_type: belement.client_id,
                date_of_joining: belement.client_name,
                mobile: belement.site_id,
                email_id: belement.site_name,
              };
              employee_lists.push(project);
            }
          });
        });
        waterfallCallback(null, employee_lists);
      }
    },
    function (employee_lists, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: employee_lists,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function clientfetchlist(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.clientfetchlists(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function employeetfetchlist(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.employeetfetchlists(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function assignlists(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.assignlistss(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function addcompany(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.addcompanys(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function companylists(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.companylistss(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function updatecompany(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.updatecompanys(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function deletecompany(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.deletecompanys(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function fetchcompany(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.fetchcompanys(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function advanceadds(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      let k = req.body.pinstalment + 1;
      for (var i = 1; i <= req.body.pinstalment; i++) {
        console.log(req.body.ddate);
        var futureMonth = moment(req.body.ddate).add(i, "months");
        console.log("new" + futureMonth);
        var date = dateFormat(futureMonth, "yyyy-mm-dd");
        var amount = req.body.pamount / req.body.pinstalment;
        console.log(date);
        let a = date.split("-");
        let yy = a[0];
        let mm = a[1];
        var date1 = yy + "-" + mm;
        services.user.advanceaddsss(
          req.body,
          date,
          amount,
          date1,
          function (err, result) {
            if (err) {
              req.log.error(
                {
                  error: err,
                },
                "Error while getting available users by mobiles"
              );
              return res.json(utils.errors["500"]);
            }
            waterfallCallback(null, result);
          }
        );
      }
    },
    function (mydata, waterfallCallback) {
      console.log(mydata);
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function advancefetch(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.advancefetchs(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        console.log(result);
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function monthlyfetch(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.monthlyfetchs(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function monthlyfetch1(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.monthlyfetchs1(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function fetchloan_number(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.fetchloan_numbers(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function fetchloan_number1(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.fetchloan_numbers1(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}
function deleteinstalment(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.deleteinstalments(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function fetchadvance(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.fetchadvances(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function fetchadvance2(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.fetchadvances2(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function deleteadvance(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.deleteadvances(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function updateadvance(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.updateadvances(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function updateoneinstalment(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.updateoneinstalments(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function efetchsitedetails(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.efetchsitedetailss(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function fetchsitedetails(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.fetchsitedetail(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      console.log(mydata);

      let sitedetails = [];
      mydata.forEach(function (pelement) {
        let project = {
          client_id: pelement.client_id,
          site_id: pelement.id,
          site_name: pelement.title,
          isSelected: false,
        };
        sitedetails.push(project);
      });
      waterfallCallback(null, sitedetails);
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function fetchsitedpayment(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      console.log(req.body);
      console.log(req.body.startdate);
      console.log(req.body.enddate);
      let payment = [];
      req.body.data.forEach(function (pelement) {
        services.user.fetchsitedpayments(
          pelement.site_name,
          req.body.date,
          function (err, result) {
            if (err) {
              req.log.error(
                {
                  error: err,
                },
                "Error while getting available users by mobiles"
              );
              return res.json(utils.errors["500"]);
            }
            payment.push(result);
            console.log(result);
          }
        );
      });
      waterfallCallback(null, payment);
    },
    function (mydata, waterfallCallback) {
      console.log(mydata);
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function fetchsitepaymentss(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      console.log(req.body);
      let payment = [];
      var a = req.body.data.length - 1;
      for (var i = 0; i < req.body.data.length; i++) {
        services.user.gettingreportsall1(
          req.body.data[i].site_name,
          req.body.date,
          function (err, result) {
            if (err) {
              req.log.error(
                {
                  error: err,
                },
                "Error while getting available users by mobiles"
              );
              return res.json(utils.errors["500"]);
            }
            payment.push(result);
            console.log(payment.length);
            if (payment.length == req.body.data.length) {
              console.log(payment);
              waterfallCallback(null, payment);
            }
          }
        );
      }
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function fetchsitepaymentss2(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      console.log(req.body);
      let payment = [];
      var a = req.body.data.length - 1;
      for (var i = 0; i < req.body.data.length; i++) {
        services.user.gettingreportsall12(
          req.body.data[i].site_name,
          req.body.date,
          function (err, result) {
            if (err) {
              req.log.error(
                {
                  error: err,
                },
                "Error while getting available users by mobiles"
              );
              return res.json(utils.errors["500"]);
            }
            payment.push(result[0]);
            console.log(payment.length);
            if (payment.length == req.body.data.length) {
              console.log(payment);
              waterfallCallback(null, payment);
            }
          }
        );
      }
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function fetchsitepaymentss3(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      console.log(req.body);
      let payment = [];
      var a = req.body.data.length - 1;
      for (var i = 0; i < req.body.data.length; i++) {
        services.user.gettingreportsall13(
          req.body.data[i].site_name,
          req.body.date,
          req.body.type,
          function (err, result) {
            if (err) {
              req.log.error(
                {
                  error: err,
                },
                "Error while getting available users by mobiles"
              );
              return res.json(utils.errors["500"]);
            }
            payment.push(result);
            console.log(payment.length);
            if (payment.length == req.body.data.length) {
              console.log(payment);
              waterfallCallback(null, payment);
            }
          }
        );
      }
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function addsalaryprocess(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.addsalaryprocesss(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function salaryprocesstatus(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.salaryprocesstatuss(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function addclientbulk(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      if (Object.keys(req.files).length == 0) {
        return res.status(400).send("No files were uploaded.");
      }
      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      let sampleFile = req.files.filetoupload;
      // Use the mv() method to place the file somewhere on your server
      var time_details = moment().format("YYYYMMDDHHmmss");
      var path = "www/pics/" + time_details + "_" + sampleFile.name;
      sampleFile.mv(path, function (err) {
        if (err) return res.status(500).send(err);
        var result = {
          path: path,
          uploadstatus: true,
        };
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      var XLSX = require("xlsx");
      var workbook = XLSX.readFile(mydata.path);
      var sheet_name_list = workbook.SheetNames;
      var lists = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
      let site_info = [];
      lists.forEach(function (belement) {
        console.log(belement);
        services.user.addclientbulks(belement, function (err, result) {
          if (err) {
            console.log(err);
          }
        });
      });
    },
  ]);
}

function addemployeebulk(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      if (Object.keys(req.files).length == 0) {
        return res.status(400).send("No files were uploaded.");
      }
      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      let sampleFile = req.files.filetoupload;
      // Use the mv() method to place the file somewhere on your server
      var time_details = moment().format("YYYYMMDDHHmmss");
      var path = "www/pics/" + time_details + "_" + sampleFile.name;
      sampleFile.mv(path, function (err) {
        if (err) return res.status(500).send(err);
        var result = {
          path: path,
          uploadstatus: true,
        };
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      var XLSX = require("xlsx");
      var workbook = XLSX.readFile(mydata.path);
      var sheet_name_list = workbook.SheetNames;
      var lists = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
      lists.forEach(function (belement) {
        var exdate = +belement.DOB; // represents Jan 1, 1993
        var exdate1 = +belement.DOJ; // represents Jan 1, 1993
        var e0date = new Date(0); // epoch "zero" date
        var offset = e0date.getTimezoneOffset(); // tz offset in min
        var jsdate1 = new Date(0, 0, exdate - 1, 0, -offset, 0);
        var jsdate2 = new Date(0, 0, exdate1 - 1, 0, -offset, 0);
        console.log(jsdate1, jsdate2);
        services.user.addemployeebulkuploads(
          belement,
          jsdate1,
          jsdate2,
          function (err, result) {
            if (err) {
              console.log(err);
            }
          }
        );
      });
    },
  ]);
}

function manualAttendancecheck(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.fetchpaymentdetails(
        req.body,
        function (err, fetchpaymentdetails) {
          if (err) {
            console.log(err);
          }
          waterfallCallback(null, fetchpaymentdetails);
        }
      );
    },
    function (fetchpaymentdetails, waterfallCallback) {
      fetchpaymentdetails.forEach(function (belement) {
        if (belement.employee_type == req.body.employee_type) {
          waterfallCallback(null, belement);
        }
      });
    },
    function (paymentstructure, waterfallCallback) {
      var now = new Date();
      var days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      let payment = [];
      let p = {
        employee_id: req.body.employee_id,
        employee_name: req.body.employee_name,
        client_id: req.body.client_id,
        client_name: req.body.client_name,
        employee_type: req.body.employee_type,
        hrs: req.body.hrs,
        site_id: req.body.site_id,
        site_name: req.body.site_name,
        contract_id: req.body.contract_id,
        date: req.body.date,
        status: req.body.status,
        basic: paymentstructure.ebasic / days,
        da: paymentstructure.eda / days,
        addhours: paymentstructure.eadditional_hours / days,
        other: paymentstructure.eothers / days,
        leave: paymentstructure.eleave / days,
        bouns: paymentstructure.ebound / days,
        weekly: paymentstructure.eweekly_off / days,
        epf: paymentstructure.epf / days,
        esi: paymentstructure.eesi / days,
        rounded: paymentstructure.erounded / days,
        timein: req.body.time_in,
        timeout: req.body.time_out,
        duration: req.body.duration,
      };
      payment.push(p);
      waterfallCallback(null, paymentstructure, payment);
    },
    function (paymentstructure, employeepay, waterfallCallback) {
      var now = new Date();
      var days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      let clientpayment = [];
      let p = {
        employee_id: req.body.employee_id,
        employee_name: req.body.employee_name,
        client_id: req.body.client_id,
        client_name: req.body.client_name,
        employee_type: req.body.employee_type,
        hrs: req.body.hrs,
        site_id: req.body.site_id,
        site_name: req.body.site_name,
        contract_id: req.body.contract_id,
        date: req.body.date,
        status: req.body.status,
        basic: paymentstructure.basic / days,
        da: paymentstructure.da / days,
        addhours: paymentstructure.additional_hours / days,
        other: paymentstructure.others / days,
        leave: paymentstructure.leave / days,
        bouns: paymentstructure.bound / days,
        weekly: paymentstructure.weekly_off / days,
        epf: paymentstructure.pf / days,
        esi: paymentstructure.esi / days,
        rounded: paymentstructure.rounded / days,
        timein: req.body.time_in,
        timeout: req.body.time_out,
        duration: req.body.duration,
      };
      clientpayment.push(p);
      waterfallCallback(null, clientpayment, employeepay);
    },
    function (clientpayment, payment, waterfallCallback) {
      services.user.insertdata(payment, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, clientpayment, payment);
      });
    },
    function (clientpayment, payment, waterfallCallback) {
      services.user.clientinsertdata(clientpayment, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

// maualentry_process

function manual_entry_unit_add(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.manual_entry_unit_adds(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        console.log(result);
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function manual_entry_unit_update(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.manual_entry_unit_updates(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function manual_entry_unit_delete(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.manual_entry_unit_deletes(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function manual_entry_unit_list(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.manual_entry_unit_lists(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function manual_entry_unit_fetch(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.manual_entry_unit_fetchs(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function manual_entry_rate_add(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.manual_entry_rate_adds(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function manual_entry_rate_update(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.manual_entry_rate_updatess(
        req.body,
        function (err, result) {
          if (err) {
            req.log.error(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, result);
        }
      );
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function manual_entry_rate_delete(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.manual_entry_rate_deletes(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function manual_entry_rate_list(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.manual_entry_rate_lists(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function manual_entry_rate_fetch(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.manual_entry_rate_fetchs(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function manual_entry_emp_add(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.manual_entry_emp_adds(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function manual_entry_emp_update(req, res, next) {
  console.log(req.body);
  async.waterfall([
    function (waterfallCallback) {
      services.user.manual_entry_emp_updates(req.body, function (err, result) {
        if (err) {
          console.log(err);
          // req.log.error({
          //     error: err
          // }, "Error while getting available users by mobiles");
          // return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function manual_entry_emp_delete(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.manual_entry_emp_deletes(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function manual_entry_emp_list(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.manual_entry_emp_lists(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function manual_entry_emp_list1(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.manual_entry_emp_lists1(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function manual_entry_emp_fetch(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.manual_entry_emp_fetchs(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function manual_entry_emp_fetch_id(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.manual_entry_emp_fetch_ids(
        req.body,
        function (err, result) {
          if (err) {
            req.log.error(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, result);
        }
      );
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata[0],
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}
/////////////////////////////
function getreportssssss(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.getreportssssss1(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function getreportssssssall(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.getreportssssssall1(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function getemployeedetails(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.getemployeedetails1(req.body, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          waterfallCallback(null, result);
        }
      });
    },
    function (mydata, waterfallCallback) {
      console.log(mydata);
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}
function getunitmaster(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.getunitmasterss(req.body, function (err, result) {
        if (err) {
          console.log(err);
          //  req.log.error({
          //      error: err
          //  }, "Error while getting available users by mobiles");
          //  return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (unit_entry, waterfallCallback) {
      console.log(unit_entry.length);
      var unit_rate = [];
      for (var i = 0; i < unit_entry.length; i++) {
        services.user.getunitmaster2(unit_entry[i].id, function (err, result) {
          if (err) {
            console.log(err);
            // req.log.error({
            //     error: err
            // }, "Error while getting available users by mobiles");
            // return res.json(utils.errors["500"]);
          }
          unit_rate.push(result);
          if (unit_entry.length == unit_rate.length) {
            waterfallCallback(null, unit_entry, unit_rate);
          }
        });
      }
    },
    function (unit_entry, unit_rate, waterfallCallback) {
      let mydata = [];
      unit_entry.forEach(function (data1) {
        unit_rate.forEach(function (data) {
          if (data1.id == data.unit_id) {
            let a = {
              id: data.id,
              ucode: data1.unit_code,
              company_name: data1.company,
              unit_name: data1.unit_name,
              rank: data.rank,
              basic: data.basic,
              da: data.da,
              hra: data.hra,
              trv_exp: data.trv_exp,
              others: data.others,
              medical: data.medical,
              others1: data.others1,
              others2: data.others2,
              others3: data.others3,
              others4: data.others4,
              total_pay: data.total_pay,
              pf: data.pf,
              esi: data.esi,
              dec: data.dec,
              total: data.total,
              unit_id: data.unit_id,
              ccode: "-",
              dcode: "-",
            };
            mydata.push(a);
          }
        });
      });
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}
function getwagesheet(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.getwagesheet1(req.body, function (err, payroll) {
        if (err) {
          console.log(err);
          //  req.log.error({
          //      error: err
          //  }, "Error while getting available users by mobiles");
          //  return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, payroll);
      });
    },
    function (payroll, waterfallCallback) {
      var edata = [];
      payroll.forEach((element) => {
        services.user.getwagesheet12(element.ecode, function (err, result) {
          if (err) {
            console.log(err);
            //  req.log.error({
            //      error: err
            //  }, "Error while getting available users by mobiles");
            //  return res.json(utils.errors["500"]);
          }
          edata.push(result);
          if (payroll.length == edata.length) {
            waterfallCallback(null, payroll, edata);
          }
        });
      });
    },
    function (payroll, edata, waterfallCallback) {
      var mydata = [];
      payroll.forEach((pay) => {
        edata.forEach((empdata) => {
          if (pay.ecode == empdata.ecode) {
            var a = {
              company_name: pay.company_name,
              unit_name: pay.unit_name,
              esino: empdata.esic_no,
              ecode: pay.ecode,
              total_duties: pay.total_duties,
              gross: pay.gross,
              designation: pay.designation,
              esi: pay.esi,
            };
            mydata.push(a);
          }
        });
      });
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function cashandbank(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.cashandbanks(req.body, function (err, payRoll) {
        if (err) {
          console.log(err);
          //  req.log.error({
          //      error: err
          //  }, "Error while getting available users by mobiles");
          //  return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, payRoll);
      });
    },
    function (payRoll, waterfallCallback) {
      console.log(payRoll.length);
      var netPaySum = [];
      payRoll.forEach((element) => {
        services.user.cashandbankss(
          element.ecode,
          element.unit_name,
          element.date,
          function (err, netPayDetail) {
            if (err) {
              console.log(err);
              //  req.log.error({
              //      error: err
              //  }, "Error while getting available users by mobiles");
              //  return res.json(utils.errors["500"]);
            }
            // console.log(result)
            netPaySum.push(netPayDetail);
            console.log(netPaySum.length);
            if (payRoll.length == netPaySum.length) {
              waterfallCallback(null, payRoll, netPaySum);
            }
          }
        );
      });
    },
    function (payRoll, netPaySum, waterfallCallback) {
      console.log(netPaySum.length);
      var employeeData = [];
      netPaySum.forEach((element) => {
        services.user.cashandbanksss(
          element.ecode,
          function (err, employeeDetail) {
            if (err) {
              console.log(err);
              //  req.log.error({
              //      error: err
              //  }, "Error while getting available users by mobiles");
              //  return res.json(utils.errors["500"]);
            }
            // console.log(result)
            employeeData.push(employeeDetail);
            console.log(employeeData.length);
            if (netPaySum.length == employeeData.length) {
              waterfallCallback(null, payRoll, netPaySum, employeeData);
            }
          }
        );
      });
    },
    function (payRoll, netPaySum, employeeData, waterfallCallback) {
      var mydata = [];
      for (let i = 0; i < payRoll.length; i++) {
        for (let j = 0; j < netPaySum.length; j++) {
          for (let k = 0; k < employeeData.length; k++) {
            if (
              payRoll[i].ecode == netPaySum[j].ecode &&
              payRoll[i].ecode == employeeData[k].ecode
            ) {
              if (payRoll[i].eac == null || payRoll[i].eac == "") {
                payRoll[i].eac = "Cash";
              }
              var a = {
                company_name: payRoll[i].company_name,
                unit_name: payRoll[i].unit_name,
                ecode: payRoll[i].ecode,
                ename: payRoll[i].ename,
                eac: payRoll[i].eac,
                eifsc: employeeData[k].ifsc,
                ebankname: payRoll[i].ebankname,
                ebankbranch: "-",
                date: payRoll[i].date,
                paymode: payRoll[i].paymode,
                net_pay: Math.round(netPaySum[j].net_pay),
              };
              let check = 1;
              for (let b = 0; b < mydata.length; b++) {
                if (mydata[b].ecode == payRoll[i].ecode) {
                  check = 0;
                } else {
                  check = 1;
                }
              }
              if (check == 1) {
                mydata.push(a);
              }
            }
          }
        }
      }
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}
function getemployeevoucher(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.getemployeevoucher1(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}
function getemployeevoucherss(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      var detailss = [];
      req.body.title.forEach(function (element) {
        services.user.getemployeevoucher11(
          element.title,
          function (err, advanceDetails) {
            if (err) {
              console.log(err);
              //  req.log.error({
              //      error: err
              //  }, "Error while getting available users by mobiles");
              //  return res.json(utils.errors["500"]);
            } else {
              detailss.push(advanceDetails);
              if (req.body.title.length == detailss.length) {
                console.log(detailss);
                //  waterfallCallback(null,detailss);
              }
            }
          }
        );
      });
    },
    function (advanceDetails, waterfallCallback) {
      for (var i = 0; i < advanceDetails.length; i++) {
        services.user.getemployeevoucher2(
          advanceDetails[i].employee_id,
          function (err, employeeDetail) {
            if (err) {
              console.log(err);
              // req.log.error({
              //     error: err
              // }, "Error while getting available users by mobiles");
              // return res.json(utils.errors["500"]);
            }
            if (advanceDetails.length == employeeDetail.length) {
              waterfallCallback(null, advanceDetails, employeeDetail);
            }
          }
        );
      }
    },
    function (advanceDetails, employeeDetail, waterfallCallback) {
      let mydata = [];
      for (var j = 0; j < advanceDetails.length; j++) {
        for (var k = 0; k < employeeDetail.length; k++) {
          if (advanceDetails[j].employee_id == employeeDetail[k].ecode) {
            let a = {
              ecode: advanceDetails[j].employee_id,
              ename: advanceDetails[j].employee_name,
              Deductiontype: advanceDetails[j].advance_type,
              vtype: advanceDetails[j].dpaytype,
              vno: "V" + advanceDetails[j].id,
              date: advanceDetails[j].ddate,
              Totalamount: advanceDetails[j].pamount,
              inst: advanceDetails[j].pinstalment,
              acno: employeeDetail[k].a_c,
              ifsc: employeeDetail[k].ifsc,
            };
            mydata.push(a);
          }
        }
      }
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}
function getproftaxform(req, res, next) {
  console.log(req.body);
  async.waterfall([
    function (waterfallCallback) {
      services.user.getproftaxform1(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}
function getwageslip(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.getwageslip1(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}
function getpfecr(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.getsiteDetails(req.body, function (err, payrollDetails) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, payrollDetails);
      });
    },
    function (payRollDetail, waterfallCallback) {
      console.log(payRollDetail.length);
      var employeeDetail = [];
      payRollDetail.forEach(function (payRollDetails) {
        services.user.getEmployeeDetail(
          payRollDetails.ecode,
          function (err, Details) {
            if (err) {
              console.log(err);
              // req.log.error({
              //     error: err
              // }, "Error while getting available users by mobiles");
              // return res.json(utils.errors["500"]);
            }
            employeeDetail.push(Details);
            console.log(employeeDetail.length);
            if (payRollDetail.length == employeeDetail.length) {
              waterfallCallback(null, payRollDetail, employeeDetail);
            }
          }
        );
      });
    },
    function (payRollDetail, employeeDetail, waterfallCallback) {
      //  console.log(payRollDetail);
      //  console.log(employeeDetail);
      var myData = [];
      // for(let i = 0; i < payRollDetail.length; i++) {
      //     for(let j = 0; j < employeeDetail.length; j++) {
      //         if(payRollDetail[i].ecode == employeeDetail[j].ecode) {
      //             var a = {
      //                 ecode: employeeDetail[j].ecode,
      //                 dob: employeeDetail[j].Date_of_birth,
      //                 doj: employeeDetail[j].date_joining,
      //                 dor: employeeDetail[j].dor,
      //                 gender: employeeDetail[j].gender,
      //                 f_m_name: employeeDetail[j].father_name,
      //                 relationship: '-',
      //                 mobile_no: employeeDetail[j].Mobile_No,
      //                 email_id: employeeDetail[j].Email_ID,
      //                 nationality: employeeDetail[j].nationality,
      //                 qualification: employeeDetail[j].Edq,
      //                 marital_status: employeeDetail[j].material_status,
      //                 ifsc: employeeDetail[j].ifsc,
      //                 panNo: employeeDetail[j].pan,
      //                 aadhaarNo: employeeDetail[j].aadhar_card,
      //                 uan: employeeDetail[j].uan,
      //                 pfNo: employeeDetail[j].pf1,
      //                 company_name: employeeDetail[j].company_name,
      //                 site_name: employeeDetail[j].site_name,
      //                 ccode: employeeDetail[j].ccode,
      //                 ucode: employeeDetail[j].ucode,
      //                 ename: payRollDetail[i].ename,
      //                 etype: payRollDetail[i].etype,
      //                 date: payRollDetail[i].date,
      //                 present: payRollDetail[i].present,
      //                 dutyoff: payRollDetail[i].dutyoff,
      //                 add_duties: payRollDetail[i].add_duties,
      //                 total_duties: payRollDetail[i].total_duties,
      //                 basic: payRollDetail[i].basic,
      //                 da: payRollDetail[i].da,
      //                 hra: payRollDetail[i].hra,
      //                 tr_exp: payRollDetail[i].trv_ex,
      //                 others: payRollDetail[i].others,
      //                 medical: payRollDetail[i].medical,
      //                 others1: payRollDetail[i].others1,
      //                 others2: payRollDetail[i].others2,
      //                 others3: payRollDetail[i].others3,
      //                 others4: payRollDetail[i].others4,
      //                 waesi: payRollDetail[i].waesi,
      //                 ewdays: payRollDetail[i].ewdays,
      //                 ewamount: payRollDetail[i].ewamount,
      //                 gross: payRollDetail[i].gross,
      //                 advance: payRollDetail[i].advance,
      //                 loan: payRollDetail[i].loan,
      //                 uniform: payRollDetail[i].uniform,
      //                 mess: payRollDetail[i].mess,
      //                 rent: payRollDetail[i].rent,
      //                 atm: payRollDetail[i].atm,
      //                 phone: payRollDetail[i].phone,
      //                 pf: payRollDetail[i].pf,
      //                 esi: payRollDetail[i].esi,
      //                 pr_tax: payRollDetail[i].pr_tax,
      //                 staff_wellfare: payRollDetail[i].staff_wellfare,
      //                 total_dec: payRollDetail[i].total_dec,
      //                 net_pay: payRollDetail[i].net_pay,
      //                 add_amount: payRollDetail[i].add_amount,
      //                 isInternationalWorker: '-',
      //                 countryOfOrigin: '-',
      //                 passportNo: '-',
      //                 passportValidFrom: '-',
      //                 passportValidTo: '-',
      //                 isPhysicalHandicap: '-',
      //                 locomotive: '-',
      //                 hearing: '-',
      //                 visual: '-',
      //                 nameAsPerBank: '-',
      //                 nameAsPerPan: '-',
      //                 nameAsPerAadhaar: '-',
      //                 refund: '-',
      //                 contribution: '-',
      //                 dcode: '-'
      //             }
      //             myData.push(a);
      //          }
      //     }
      // }
      payRollDetail.forEach(function (data1) {
        employeeDetail.forEach(function (data) {
          if (data1.ecode == data.ecode) {
            var a = {
              ecode: data.ecode,
              dob: data.Date_of_birth,
              doj: data.date_joining,
              dor: data.dor,
              gender: data.gender,
              f_m_name: data.father_name,
              relationship: "-",
              mobile_no: data.Mobile_No,
              email_id: data.Email_ID,
              nationality: data.nationality,
              qualification: data.Edq,
              marital_status: data.material_status,
              ifsc: data.ifsc,
              panNo: data.pan,
              aadhaarNo: data.aadhar_card,
              uan: data.uan,
              pfNo: data.pf1,
              company_name: data.company_name,
              site_name: data.site_name,
              ccode: data.ccode,
              ucode: data.ucode,
              ename: data1.ename,
              etype: data1.etype,
              date: data1.date,
              present: data1.present,
              dutyoff: data1.dutyoff,
              add_duties: data1.add_duties,
              total_duties: data1.total_duties,
              basic: data1.basic,
              da: data1.da,
              hra: data1.hra,
              tr_exp: data1.trv_ex,
              others: data1.others,
              medical: data1.medical,
              others1: data1.others1,
              others2: data1.others2,
              others3: data1.others3,
              others4: data1.others4,
              waesi: data1.waesi,
              ewdays: data1.ewdays,
              ewamount: data1.ewamount,
              grosswages: Math.round(data1.gross + data1.total_dec),
              EESHAREREMITTED: Math.round(data1.gross * 0.12),
              EPSCONTRIBUTIONREMITTED: Math.round(data1.gross * 0.0833),
              ERSHAREREMITTEDs: Math.round(data1.gross * 0.0367),
              gross: data1.gross,
              advance: data1.advance,
              loan: data1.loan,
              uniform: data1.uniform,
              mess: data1.mess,
              rent: data1.rent,
              atm: data1.atm,
              phone: data1.phone,
              pf: data1.pf,
              esi: data1.esi,
              pr_tax: data1.pr_tax,
              staff_wellfare: data1.staff_wellfare,
              total_dec: data1.total_dec,
              net_pay: data1.net_pay,
              add_amount: data1.add_amount,
              isInternationalWorker: "-",
              countryOfOrigin: "-",
              passportNo: "-",
              passportValidFrom: "-",
              passportValidTo: "-",
              isPhysicalHandicap: "-",
              locomotive: "-",
              hearing: "-",
              visual: "-",
              nameAsPerBank: "-",
              nameAsPerPan: "-",
              nameAsPerAadhaar: "-",
              refund: "-",
              contribution: "-",
              dcode: "-",
            };
            myData.push(a);
          }
        });
      });
      return res.json(
        _.merge(
          {
            data: myData,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}
function getDesignation(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.getDesignationss(
        "data",
        function (err, manualEntryDetails) {
          if (err) {
            console.log(err);
            // req.log.error({
            //     error: err
            // }, "Error while getting available users by mobiles");
            // return res.json(utils.errors["500"]);
          } else {
            waterfallCallback(null, manualEntryDetails);
          }
        }
      );
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}
function getloanandoutstanding(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.getloanandoutstandings(
        "data",
        function (err, totalPayDetails) {
          if (err) {
            req.log.error(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, totalPayDetails);
        }
      );
    },
    function (totalPayDetails, waterfallCallback) {
      console.log(totalPayDetails.length);
      var d = [];
      totalPayDetails.forEach(function (element) {
        services.user.getloanandoutstandingss(
          element.unit_name,
          function (err, siteDetails) {
            if (err) {
              console.log(err);
              // req.log.error({
              //     error: err
              // }, "Error while getting available users by mobiles");
              // return res.json(utils.errors["500"]);
            }
            d.push(siteDetails);
            console.log(d.length);
            if (totalPayDetails.length == d.length) {
              waterfallCallback(null, totalPayDetails, d);
            }
          }
        );
      });
    },
    function (totalPayDetails, siteDetails, waterfallCallback) {
      var mydata = [];
      totalPayDetails.forEach(function (pay) {
        siteDetails.forEach(function (site) {
          if (pay.unit_name == site.title) {
            let a = {
              ucode: site.sitelogin,
              company_name: pay.company_name,
              unit_name: pay.unit_name,
              date: pay.date,
              ecode: pay.ecode,
              ename: pay.ename,
              etype: pay.etype,
              eac: pay.eac,
              ebankname: pay.ebankname,
              eifsc: pay.eifsc,
              designation: pay.designation,
              present: pay.present,
              dutyoff: pay.dutyoff,
              add_duties: pay.add_duties,
              payment_type: pay.payment_type,
              paymode: pay.paymode,
              total_duties: pay.total_duties,
              basic: pay.basic,
              da: pay.da,
              hra: pay.hra,
              trv_ex: pay.trv_ex,
              others: pay.others,
              medical: pay.medical,
              others1: pay.others1,
              others2: pay.others2,
              others3: pay.others3,
              others4: pay.others4,
              waesi: pay.waesi,
              ewdays: pay.ewdays,
              ewamount: pay.ewamount,
              gross: pay.gross,
              advance: pay.advance,
              loan: pay.loan,
              uniform: pay.uniform,
              mess: pay.mess,
              rent: pay.rent,
              atm: pay.atm,
              phone: pay.phone,
              pf: pay.pf,
              esi: pay.esi,
              pr_tax: pay.pr_tax,
              staff_wellfare: pay.staff_wellfare,
              total_dec: pay.total_dec,
              net_pay: pay.net_pay,
              add_amount: pay.add_amount,
              Insur: "-",
              IT_Mess: "-",
            };
            mydata.push(a);
          }
        });
      });
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}
function getform36b(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.getgetform36bpayrollmanualentrys(
        req.body,
        function (err, payrollManualEntryDetails) {
          if (err) {
            req.log.error(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, payrollManualEntryDetails);
        }
      );
    },
    function (payrollManualEntryDetails, waterfallCallback) {
      console.log(payrollManualEntryDetails.length);
      var employeeDetailss = [];
      payrollManualEntryDetails.forEach(function (element) {
        services.user.getgetform36bemployeedetails(
          element.ecode,
          function (err, Detailss) {
            if (err) {
              console.log(err);
              // req.log.error({
              //     error: err
              // }, "Error while getting available users by mobiles");
              // return res.json(utils.errors["500"]);
            }
            employeeDetailss.push(Detailss);
            console.log(employeeDetailss.length);
            if (payrollManualEntryDetails.length == employeeDetailss.length) {
              waterfallCallback(
                null,
                payrollManualEntryDetails,
                employeeDetailss
              );
            }
          }
        );
      });
    },
    function (payrollManualEntryDetails, employeeDetailss, waterfallCallback) {
      var mydata = [];
      payrollManualEntryDetails.forEach(function (payroll) {
        employeeDetailss.forEach(function (employee) {
          if (payroll.ecode == employee.ecode) {
            let a = {
              EName: employee.Name,
              FName: employee.father_name,
              DOJ: employee.date_joining,
              PFNO: employee.pf1,
              Total_duties: payroll.total_duties,
              Gross: payroll.gross,
              PF_Wages: payroll.basic + payroll.da,
              Contribution: Math.round(payroll.total_dec * 0.12),
            };
            mydata.push(a);
          }
        });
      });
      console.log(mydata);
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}
function gettotalpay(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.gettotalpays(req.body, function (err, totalPayDetails) {
        if (err) {
          console.log(err);
          //   req.log.error(
          //     {
          //       error: err
          //     },
          //     "Error while getting available users by mobiles"
          //   );
          //   return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, totalPayDetails);
      });
    },
    function (totalPayDetails, waterfallCallback) {
      console.log(totalPayDetails.length);
      var d = [];
      totalPayDetails.forEach(function (element) {
        services.user.gettotalpayss(
          element.unit_name,
          function (err, siteDetails) {
            if (err) {
              console.log(err);
              // req.log.error({
              //     error: err
              // }, "Error while getting available users by mobiles");
              // return res.json(utils.errors["500"]);
            }
            d.push(siteDetails);
            console.log(d.length);
            if (totalPayDetails.length == d.length) {
              waterfallCallback(null, totalPayDetails, d);
            }
          }
        );
      });
    },
    function (totalPayDetails, siteDetails, waterfallCallback) {
      var data = [];
      totalPayDetails.forEach(function (pay) {
        siteDetails.forEach(function (site) {
          if (pay.unit_name == site.title) {
            let a = {
              ucode: site.sitelogin,
              company_name: pay.company_name,
              unit_name: pay.unit_name,
              date: pay.date,
              ecode: pay.ecode,
              ename: pay.ename,
              etype: pay.etype,
              eac: pay.eac,
              ebankname: pay.ebankname,
              eifsc: pay.eifsc,
              designation: pay.designation,
              present: pay.present,
              dutyoff: pay.dutyoff,
              add_duties: pay.add_duties,
              payment_type: pay.payment_type,
              paymode: pay.paymode,
              total_duties: pay.total_duties,
              basic: Math.round(pay.basic),
              da: Math.round(pay.da),
              hra: Math.round(pay.hra),
              trv_ex: Math.round(pay.trv_ex),
              others: Math.round(pay.others),
              medical: Math.round(pay.medical),
              others1: Math.round(pay.others1),
              others2: Math.round(pay.others2),
              others3: Math.round(pay.others3),
              others4: Math.round(pay.others4),
              waesi: Math.round(pay.waesi),
              ewdays: Math.round(pay.ewdays),
              ewamount: Math.round(pay.ewamount),
              gross: Math.round(pay.gross),
              advance: Math.round(pay.advance),
              loan: Math.round(pay.loan),
              uniform: Math.round(pay.uniform),
              mess: Math.round(pay.mess),
              rent: Math.round(pay.rent),
              atm: Math.round(pay.atm),
              phone: Math.round(pay.phone),
              pf: Math.round(pay.pf),
              esi: Math.round(pay.esi),
              pr_tax: Math.round(pay.pr_tax),
              staff_wellfare: Math.round(pay.staff_wellfare),
              total_dec: Math.round(pay.total_dec),
              net_pay: Math.round(pay.net_pay),
              add_amount: Math.round(pay.add_amount),
              Insur: "-",
              IT_Mess: "-",
            };
            data.push(a);
            if (totalPayDetails.length == data.length) {
              waterfallCallback(null, data);
            }
          }
        });
      });
    },
    function (mydata, waterfallCallback) {
      console.log(mydata);
      let total = mydata
        .map((t) => t.net_pay)
        .reduce((acc, value) => acc + value, 0);
      console.log(total);
      return res.json(
        _.merge(
          {
            data: mydata,
            total: total,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function proftax(req, res, next) {
  console.log(req.body);
  async.waterfall([
    function (waterfallCallback) {
      if (req.body.cycle == "first") {
        var start = req.body.startyear + "-" + "04";
        var end = req.body.startyear + "-" + "09";
        services.user.proftaxs(
          req.body.companyName,
          start,
          end,
          function (err, result) {
            if (err) {
              req.log.error(
                {
                  error: err,
                },
                "Error while getting available users by mobiles"
              );
              return res.json(utils.errors["500"]);
            }
            waterfallCallback(null, result);
          }
        );
      } else if (req.body.cycle == "second") {
        var start = req.body.startyear + "-" + "10";
        var end = req.body.endyear + "-" + "03";
        services.user.proftaxs(
          req.body.companyName,
          start,
          end,
          function (err, result) {
            if (err) {
              req.log.error(
                {
                  error: err,
                },
                "Error while getting available users by mobiles"
              );
              return res.json(utils.errors["500"]);
            }
            waterfallCallback(null, result);
          }
        );
      } else if (req.body.cycle == "full") {
        var start = req.body.startyear + "-" + "04";
        var end = req.body.endyear + "-" + "03";
        services.user.proftaxs(
          req.body.companyName,
          start,
          end,
          function (err, result) {
            if (err) {
              req.log.error(
                {
                  error: err,
                },
                "Error while getting available users by mobiles"
              );
              return res.json(utils.errors["500"]);
            }
            waterfallCallback(null, result);
          }
        );
      }
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}
function payslip(req, res, next) {
  console.log(req.body);
  async.waterfall([
    function (waterfallCallback) {
      services.user.getpayslip(req.body, function (err, payroll) {
        if (err) {
          console.log(err);
          // req.log.error(
          //   {
          //     error: err
          //   },
          //   "Error while getting available users by mobiles"
          // );
          // return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, payroll);
      });
    },
    function (payroll, waterfallCallback) {
      var employee = [];
      payroll.forEach((element) => {
        services.user.getpayslips(element.ecode, function (err, detail) {
          if (err) {
            console.log(err);
            // req.log.error(
            //   {
            //     error: err
            //   },
            //   "Error while getting available users by mobiles"
            // );
            // return res.json(utils.errors["500"]);
          }
          if (payroll.length == employee.length) {
            waterfallCallback(null, payroll, employee);
          }
        });
      });
    },
    function (payroll, employee, waterfallCallback) {
      var mydata = [];
      payroll.forEach((pay) => {
        employee.forEach((emp) => {
          if (payroll.ecode == employee.ecode) {
            let a = {
              ecode: payroll.ecode,
              ename: payroll.ename,
              etype: payroll.etype,
              unit_name: payroll.unit_name,
              present: payroll.present,
              ebankname: payroll.ebankname,
              eifsc: employee.a_c,
              company_name: payroll.company_name,
              basic: payroll.basic,
              da: payroll.da,
              hra: payroll.hra,
              trv_ex: payroll.trv_ex,
              others: payroll.others,
              pf: payroll.pf,
              esi: payroll.esi,
              pr_tax: payroll.pr_tax,
              advance: payroll.advance,
              loan: payroll.loan,
              uniform: payroll.uniform,
              mess: payroll.mess,
              rent: payroll.rent,
              atm: payroll.atm,
              phone: payroll.phone,
              gross: payroll.gross,
              total_dec: payroll.total_dec,
              net_pay: payroll.net_pay,
              pfno: employee.pf2,
              uanno: employee.uan,
              esino: employee.esi,
            };
            mydata.push(a);
          }
        });
      });
      if (payroll.length == mydata.length) {
        waterfallCallback(null, mydata);
      }
    },
    function (mydata, waterfallCallback) {
      console.log(mydata);
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}
function recovery(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.getrecovery(req.body, function (err, payroll) {
        if (err) {
          console.log(err);
          // req.log.error(
          //   {
          //     error: err
          //   },
          //   "Error while getting available users by mobiles"
          // );
          // return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, payroll);
      });
    },
    function (payroll, waterfallCallback) {
      var empcode = [];
      payroll.forEach((element) => {
        services.user.getrecoverys(element.ecode, function (err, result) {
          if (err) {
            console.log(err);
            // req.log.error(
            //   {
            //     error: err
            //   },
            //   "Error while getting available users by mobiles"
            // );
            // return res.json(utils.errors["500"]);
          }
          empcode.push(result);
          if (payroll.length == empcode.length) {
            waterfallCallback(null, payroll, empcode);
          }
        });
      });
    },
    function (payroll, empcode, waterfallCallback) {
      var mydata = [];
      payroll.forEach((pay) => {
        empcode.forEach((code) => {
          if (pay.ecode == code.ecode) {
            var advance = 0;
            var loan = 0;
            var uniform = 0;
            var mess = 0;
            var rent = 0;
            var atm = 0;
            var phone = 0;
            var others = 0;
            if (pay.advance_type == "Advance") {
              advance = advance + +pay.amount;
            } else if (pay.advance_type == "Loan") {
              loan = loan + +pay.amount;
            } else if (pay.advance_type == "Uniform") {
              uniform = uniform + +pay.amount;
            } else if (pay.advance_type == "Mess") {
              mess = mess + +pay.amount;
            } else if (pay.advance_type == "Rent") {
              rent = rent + +pay.amount;
            } else if (pay.advance_type == "ATM Card") {
              atm = atm + +pay.amount;
            } else if (pay.advance_type == "Phone") {
              phone = phone + +pay.amount;
            } else if (pay.advance_type == "Others") {
              others = others + +pay.amount;
            }
            var a = {
              ecode: pay.ecode,
              ename: code.Name,
              advance: advance,
              loan: loan,
              uniform: uniform,
              mess: mess,
              rent: rent,
              atm: atm,
              phone: phone,
              others: others,
              total:
                advance + loan + uniform + mess + rent + atm + phone + others,
            };
            let check = 1;
            for (let b = 0; b < mydata.length; b++) {
              if (mydata[b].ecode == pay.ecode) {
                check = 0;
              } else {
                check = 1;
              }
            }
            if (check == 1) {
              mydata.push(a);
            }
          }
        });
      });
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}
function bulkuploadformat(req, res, next) {
  console.log(req.body);
  async.waterfall([
    function (waterfallCallback) {
      if (Object.keys(req.files).length == 0) {
        return res.status(400).send("No files were uploaded.");
      }
      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      let sampleFile = req.files.filetoupload;
      // Use the mv() method to place the file somewhere on your server
      var time_details = moment().format("YYYYMMDDHHmmss");
      var path = "www/pics/" + time_details + "_" + sampleFile.name;
      console.log(path);
      sampleFile.mv(path, function (err) {
        if (err) return res.status(500).send(err);
        var result = {
          path: path,
          uploadstatus: true,
        };
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      var XLSX = require("xlsx");
      var workbook = XLSX.readFile(mydata.path);
      var sheet_name_list = workbook.SheetNames;
      var lists = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
      console.log(lists);
      lists.forEach(function (belement) {
        var exdate = +belement.DOB; // represents Jan 1, 1993
        var exdate1 = +belement.DOJ; // represents Jan 1, 1993
        var exdate2 = +belement.DOR; // represents Jan 1, 1993
        var e0date = new Date(0); // epoch "zero" date
        var offset = e0date.getTimezoneOffset(); // tz offset in min
        var jsdate1 = new Date(0, 0, exdate - 1, 0, -offset, 0);
        var jsdate2 = new Date(0, 0, exdate1 - 1, 0, -offset, 0);
        var jsdate3 = new Date(0, 0, exdate2 - 1, 0, -offset, 0);
        console.log(jsdate1, jsdate2, jsdate3);
        services.user.bulkuploadformats(
          belement,
          jsdate1,
          jsdate2,
          jsdate3,
          function (err, result) {
            if (err) {
              console.log(err);
            }
          }
        );
      });
    },
  ]);
}
function manual_unit_rate(req, res, next) {
  console.log(req.body);
  async.waterfall([
    function (waterfallCallback) {
      if (Object.keys(req.files).length == 0) {
        return res.status(400).send("No files were uploaded.");
      }
      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      let sampleFile = req.files.filetoupload;
      // Use the mv() method to place the file somewhere on your server
      var time_details = moment().format("YYYYMMDDHHmmss");
      var path = "www/pics/" + time_details + "_" + sampleFile.name;
      console.log(path);
      sampleFile.mv(path, function (err) {
        if (err) return res.status(500).send(err);
        var result = {
          path: path,
          uploadstatus: true,
        };
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      var XLSX = require("xlsx");
      var workbook = XLSX.readFile(mydata.path);
      var sheet_name_list = workbook.SheetNames;
      var lists = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
      console.log(lists);
      lists.forEach(function (belement) {
        services.user.manual_unit_rates(belement, function (err, result) {
          if (err) {
            console.log(err);
          }
        });
      });
    },
  ]);
}
function unit_master_salary_details(req, res, next) {
  console.log(req.body);
  async.waterfall([
    function (waterfallCallback) {
      if (Object.keys(req.files).length == 0) {
        return res.status(400).send("No files were uploaded.");
      }
      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      let sampleFile = req.files.filetoupload;
      // Use the mv() method to place the file somewhere on your server
      var time_details = moment().format("YYYYMMDDHHmmss");
      var path = "www/pics/" + time_details + "_" + sampleFile.name;
      console.log(path);
      sampleFile.mv(path, function (err) {
        if (err) return res.status(500).send(err);
        var result = {
          path: path,
          uploadstatus: true,
        };
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      var XLSX = require("xlsx");
      var workbook = XLSX.readFile(mydata.path);
      var sheet_name_list = workbook.SheetNames;
      var lists = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
      console.log(lists);
      lists.forEach(function (belement) {
        services.user.unit_master_salary_detailss(
          belement,
          function (err, result) {
            if (err) {
              console.log(err);
            }
          }
        );
      });
    },
  ]);
}

function gettingreportsall(req, res, next) {
  console.log(req);
  async.waterfall([
    function (waterfallCallback) {
      var datass = [];
      for (var i = 0; i < req.body.data; i++) {
        services.user.gettingreportsall1(req.body, function (err, result) {
          if (err) {
            req.log.error(
              {
                error: err,
              },
              "Error while getting available users by mobiles"
            );
            return res.json(utils.errors["500"]);
          }
          console.log(result);
          datass.push(result);
        });
        if (i < req.body.data) {
          waterfallCallback(null, result);
        }
      }
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function manual_entry_unit_list_id(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.manual_entry_unit_list_id(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        console.log(result);
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}
function fetch_payment_entry(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.fetch_clientsss(req.body, function (err, siteDetails) {
        if (err) {
          console.log(err);
          //  req.log.error({
          //      error: err
          //  }, "Error while getting available users by mobiles");
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, req, siteDetails);
      });
    },
    function (req, siteDetails, waterfallCallback) {
      console.log(siteDetails);
      services.user.fetch_payment_entryss(
        req.body,
        siteDetails[0].title,
        function (err, payment_entry) {
          if (err) {
            console.log(err);
            // req.log.error({
            //     error: err
            // }, "Error while getting available users by mobiles");
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, siteDetails, payment_entry);
        }
      );
    },

    function (siteDetails, payment_entry, waterfallCallback) {
      payment_entry.forEach(function (element) {
        siteDetails.forEach(function (element1) {
          if (element.site_billing_name == element1.unit_name) {
            waterfallCallback(null, payment_entry);
          }
        });
      });
    },
    function (payment_entry, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: payment_entry,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function fetchunit_number1(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.user.fetchunit_numbers1(req.body, function (err, result) {
        if (err) {
          req.log.error(
            {
              error: err,
            },
            "Error while getting available users by mobiles"
          );
          return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, result);
      });
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function carryForward(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      var completedate = new Date();
      var y = completedate.getFullYear();
      var months = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ];
      var m = months[completedate.getMonth()];
      var ym = y + "-" + m;
      services.user.carryForwards(ym, function (err, CurrentMonthdata) {
        if (err) {
          console.log(err);
          //  req.log.error({
          //      error: err
          //  }, "Error while getting available users by mobiles");
          //  return res.json(utils.errors["500"]);
        }
        waterfallCallback(null, CurrentMonthdata);
      });
    },
    function (CurrentMonthdata, waterfallCallback) {
      var completedate = new Date();
      var y = completedate.getFullYear();
      var months = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ];
      var cm = months[completedate.getMonth() + 1];
      var ycm = y + "-" + cm;
      console.log(ycm);
      var NextMonthData = [];
      for (let i = 0; i < CurrentMonthdata.length; i++) {
        services.user.carryForwardss(
          CurrentMonthdata[i].employee_id,
          CurrentMonthdata[i].advance_type,
          ycm,
          function (err, Data) {
            if (err) {
              console.log(err);
              // req.log.error({
              //     error: err
              // }, "Error while getting available users by mobiles");
              // return res.json(utils.errors["500"]);
            }
            NextMonthData.push(Data);
            if (CurrentMonthdata.length == NextMonthData.length) {
              waterfallCallback(null, CurrentMonthdata, NextMonthData);
            }
          }
        );
      }
    },
    function (CurrentMonthdata, NextMonthData, waterfallCallback) {
      var completedate = new Date();
      var y = completedate.getFullYear();
      var d = completedate.getDate();
      var months = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ];
      var cm = months[completedate.getMonth() + 1];
      var ycm = y + "-" + cm;
      var ycmd = y + "-" + cm + "-" + d;
      console.log(ycm, ycmd);
      for (let i = 0; i < CurrentMonthdata.length; i++) {
        for (let j = 0; j < NextMonthData.length; j++) {
          if (
            CurrentMonthdata[i].employee_id == NextMonthData[j].employee_id &&
            CurrentMonthdata[i].advance_type == NextMonthData[j].advance_type
          ) {
            console.log("update");
            console.log(CurrentMonthdata[i]);
            services.user.carryForwardUpdate(
              CurrentMonthdata[i].employee_id,
              CurrentMonthdata[i].advance_type,
              CurrentMonthdata[i].cdate,
              function (err, Data) {
                if (err) {
                  console.log(err);
                  // req.log.error({
                  //     error: err
                  // }, "Error while getting available users by mobiles");
                  // return res.json(utils.errors["500"]);
                }
                // waterfallCallback(null,CurrentMonthdata,NextMonthData);
              }
            );
          } else if (
            CurrentMonthdata[i].employee_id !== NextMonthData[j].employee_id &&
            CurrentMonthdata[i].advance_type !== NextMonthData[j].advance_type
          ) {
            console.log("insert");
            console.log(CurrentMonthdata[i]);
            services.user.carryForwardInsert(
              CurrentMonthdata[i],
              ycmd,
              ycm,
              function (err, Data) {
                if (err) {
                  console.log(err);
                  // req.log.error({
                  //     error: err
                  // }, "Error while getting available users by mobiles");
                  // return res.json(utils.errors["500"]);
                }
                waterfallCallback(null, CurrentMonthdata, NextMonthData);
              }
            );
          }
        }
      }
    },
    function (mydata, waterfallCallback) {
      return res.json(
        _.merge(
          {
            data: mydata,
          },
          utils.errors["200"]
        )
      );
    },
  ]);
}

function shiftmeeting(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.shiftMeeting.checkUniform(
        req.body,
        function (err, result, status) {
          if (err) {
            console.log(err);
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, result, status);
        }
      );
    },
    function (mydata, status, waterfallCallback) {
      console.log(mydata);
      console.log(status);

      if (status == true) {
        return res.json(
          _.merge(
            {
              data: mydata,
            },
            utils.errors["200"]
          )
        );
      } else {
        return res.json(
          _.merge(
            {
              data: mydata,
            },
            utils.errors["401a"]
          )
        );
      }
    },
  ]);
}

function listShiftmeeting(req, res, next) {
  async.waterfall([
    function (waterfallCallback) {
      services.shiftMeeting.listUser(
        req.body,
        req.query,
        function (err, result, status) {
          if (err) {
            console.log(err);
            return res.json(utils.errors["500"]);
          }
          waterfallCallback(null, result, status);
        }
      );
    },
    function (mydata, status, waterfallCallback) {
      console.log(mydata);
      console.log(status);

      if (status == true) {
        return res.json(
          _.merge(
            {
              data: mydata,
            },
            utils.errors["200"]
          )
        );
      } else {
        return res.json(
          _.merge(
            {
              data: mydata,
            },
            utils.errors["401a"]
          )
        );
      }
    },
  ]);
}

exports.init = init;
exports.passport = passport;

/** shift Meeting */

exports.shiftmeeting = shiftmeeting;
exports.listShiftmeeting = listShiftmeeting;

/*BSS Web Portal*/

exports.Clientlogin = Clientlogin;

/*BSS Web Portal*/
exports.bsslogin = bsslogin;

/*Add Employee*/
exports.updateemployee = updateemployee;
exports.addemployee = addemployee;
exports.employeelist = employeelist;
exports.deleteemployee = deleteemployee;
exports.employee_id = employee_id;
exports.Changepassword = Changepassword;
exports.Updateemployee_id = Updateemployee_id;
exports.updateqr = updateqr;
exports.updateemployee1 = updateemployee1;

/*Add User*/
exports.userid = userid;
exports.addusers = addusers;
exports.updateusers = updateusers;
exports.userlist = userlist;
exports.deleteuser = deleteuser;

/*Add Client*/
exports.addclients = addclients;
exports.deleteclient = deleteclient;
exports.clientid = clientid;
exports.clientlist = clientlist;
exports.fetchclient = fetchclient;
exports.updateclients = updateclients;

/*Add Configure*/
exports.createConfignumber = createConfignumber;
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
exports.issuetrack = issuetrack;
exports.listissues = listissues;
exports.issuecount = issuecount;

/*issues Attachment*/
exports.list_issue = list_issue;
exports.list_my_issue = list_my_issue;
exports.create_issue_attachment = create_issue_attachment;

/*PointTracking*/

/*PointTrackMap*/
exports.PointTrackMap = PointTrackMap;
exports.updatePointTrackMap = updatePointTrackMap;
exports.DeletePointTrackMap = DeletePointTrackMap;
exports.PointTrackMaplist = PointTrackMaplist;

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
exports.PointTrackRecordsSpot = PointTrackRecordsSpot;
exports.updatePointTrackRecordsSpot = updatePointTrackRecordsSpot;
exports.DeletePointTrackRecordsSpot = DeletePointTrackRecordsSpot;
exports.PointTrackRecordsSpotlist = PointTrackRecordsSpotlist;
exports.FetchMapSpotrecord = FetchMapSpotrecord;

/* Mapuser */

exports.addmapuser = addmapuser;
exports.addmapuserlist = addmapuserlist;
exports.mapuserdelete = mapuserdelete;
exports.fetchmapuserpoints = fetchmapuserpoints;

/*FAQ*/

exports.addquestions = addquestions;
exports.updatequestions = updatequestions;
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
exports.AllHistory = AllHistory;

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
exports.undeliverd = undeliverd;

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
exports.deleteEmployeeTracking = deleteEmployeeTracking;

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
exports.notificationcount = notificationcount;
exports.listofnotification = listofnotification;

exports.assignemployeeadd = assignemployeeadd;
exports.Attendancecheck = Attendancecheck;
exports.fetchdetails = fetchdetails;
exports.checkemployee = checkemployee;
exports.clientfetchlist = clientfetchlist;
exports.employeetfetchlist = employeetfetchlist;
exports.assignlists = assignlists;
exports.advanceadds = advanceadds;
exports.advancefetch = advancefetch;
exports.fetchloan_number = fetchloan_number;
exports.deleteinstalment = deleteinstalment;
exports.deleteadvance = deleteadvance;
exports.updateadvance = updateadvance;
exports.fetchadvance = fetchadvance;
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
exports.fetchcompanysite = fetchcompanysite;
exports.fetchcompanysites = fetchcompanysites;
exports.fetchemployeeid = fetchemployeeid;
exports.deletecompany = deletecompany;

/*payroll*/
exports.fetchsitedetails = fetchsitedetails;
exports.fetchsitedpayment = fetchsitedpayment;
exports.efetchsitedetails = efetchsitedetails;
exports.fetchsitepaymentss = fetchsitepaymentss;

/*manual Entry*/
exports.manual_entry_unit_add = manual_entry_unit_add;
exports.manual_entry_unit_update = manual_entry_unit_update;
exports.manual_entry_unit_delete = manual_entry_unit_delete;
exports.manual_entry_unit_list = manual_entry_unit_list;
exports.manual_entry_unit_fetch = manual_entry_unit_fetch;

exports.manual_entry_rate_add = manual_entry_rate_add;
exports.manual_entry_rate_update = manual_entry_rate_update;
exports.manual_entry_rate_delete = manual_entry_rate_delete;
exports.manual_entry_rate_list = manual_entry_rate_list;
exports.manual_entry_rate_fetch = manual_entry_rate_fetch;

exports.manual_entry_emp_add = manual_entry_emp_add;
exports.manual_entry_emp_update = manual_entry_emp_update;
exports.manual_entry_emp_delete = manual_entry_emp_delete;
exports.manual_entry_emp_list = manual_entry_emp_list;
exports.manual_entry_emp_fetch = manual_entry_emp_fetch;

exports.fetchadvance2 = fetchadvance2;
exports.manual_entry_emp_list1 = manual_entry_emp_list1;
exports.fetchloan_number1 = fetchloan_number1;
exports.employee_id1 = employee_id1;
exports.monthlyfetch1 = monthlyfetch1;
exports.getreportssssss = getreportssssss;
exports.getreportssssssall = getreportssssssall;
exports.gettingreportsall = gettingreportsall;
exports.fetchsitepaymentss2 = fetchsitepaymentss2;
exports.fetchsitepaymentss3 = fetchsitepaymentss3;
exports.manual_entry_emp_fetch_id = manual_entry_emp_fetch_id;

exports.manual_entry_unit_list_id = manual_entry_unit_list_id;
exports.fetch_payment_entry = fetch_payment_entry;

/*file upload*/
exports.uploadingfile = uploadingfile;

exports.listUploadedFile = listUploadedFile;

exports.fetchunit_number1 = fetchunit_number1;

exports.getemployeedetails = getemployeedetails;
exports.getunitmaster = getunitmaster;
exports.getwagesheet = getwagesheet;
exports.cashandbank = cashandbank;
exports.getemployeevoucher = getemployeevoucher;
exports.getproftaxform = getproftaxform;
exports.getwageslip = getwageslip;
exports.getpfecr = getpfecr;
exports.getDesignation = getDesignation;
exports.getloanandoutstanding = getloanandoutstanding;
exports.getform36b = getform36b;
exports.gettotalpay = gettotalpay;
exports.proftax = proftax;
exports.payslip = payslip;
exports.recovery = recovery;

exports.bulkuploadformat = bulkuploadformat;
exports.manual_unit_rate = manual_unit_rate;
exports.unit_master_salary_details = unit_master_salary_details;

exports.carryForward = carryForward;
