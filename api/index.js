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



/*Client WEB Portal*/
addRoute("/authentication/clientlogin", "POST", [middleware.clientlogin]);

















/*BSS Web Portal*/
addRoute("/authentication/bsslogin", "POST", [middleware.bsslogin]);


/*Add Employee*/
addRoute("/authentication/addemployee", "POST", [middleware.addemployee]);
addRoute("/authentication/employeelist", "POST", [middleware.employeelist]);
addRoute("/authentication/deleteemployee", "POST", [middleware.deleteemployee]);
addRoute("/authentication/employee_id", "POST", [middleware.employee_id]);



/*Add User*/
addRoute("/authentication/addusers", "POST", [middleware.addusers]);
addRoute("/authentication/updateusers", "POST", [middleware.updateusers]);
addRoute("/authentication/userlist", "POST", [middleware.userlist]);
addRoute("/authentication/deleteuser", "POST", [middleware.deleteuser]);

/*Add Client*/

addRoute("/authentication/addclients", "POST", [middleware.addclients]);
addRoute("/authentication/deleteclient", "POST", [middleware.deleteclient]);
addRoute("/authentication/addclients1", "POST", [middleware.addclients1]);
addRoute("/authentication/clientid", "POST", [middleware.clientid]);
addRoute("/authentication/clientlist", "POST", [middleware.clientlist]);
addRoute("/authentication/updateclients", "POST", [middleware.updateclients]);




/*Add Configure*/
addRoute("/authentication/confignumber", "POST", [middleware.confignumber]);
addRoute("/authentication/getconfignumber", "POST", [middleware.getconfignumber]);


/*Add training*/
addRoute("/authentication/training", "POST", [middleware.training]);
addRoute("/authentication/traininglessons", "POST", [middleware.traininglessons]);
addRoute("/authentication/trainingvideos", "POST", [middleware.trainingvideos]);
addRoute("/authentication/traininglist", "POST", [middleware.traininglist]);


/*Add tracking*/
addRoute("/authentication/Tracking", "POST", [middleware.Tracking]);
addRoute("/authentication/Trackinglist", "POST", [middleware.Trackinglist]);
addRoute("/authentication/Trackingperson", "POST", [middleware.Trackingperson]);

/*Employee Api's*/

addRoute("/authentication/employeeLogin", "POST", [middleware_emp.signin]);
addRoute("/authentication/updateEmpProfile", "POST", [middleware_emp.signin]);

/*Issue Tracking*/


addRoute("/issue/create", "POST", [middleware_emp.validateEmployee, middleware.create_issue]);
addRoute("/issue/updateissues", "POST", [middleware.updateissues]);
addRoute("/issue/taken_by", "POST", [middleware.taken_by]);
addRoute("/issue/report", "POST", [middleware.report]);
addRoute("/issue/issuedetails", "POST", [middleware.issuedetails]);
addRoute("/issue/issuetrack", "POST", [middleware.issuetrack]);

/*issues Attachment*/
addRoute("/issue/createAttachment", "POST", [middleware.create_issue_attachment]);
addRoute("/issue/listallissues", "POST", [middleware.list_issue]);
addRoute("/issue/listmyissues", "POST", [middleware_emp.validateEmployee, middleware.list_my_issue]);
addRoute("/issue/listissues", "POST", [middleware.listissues]);

/*PointTracking for Mobile*/
addRoute("/mapTracking/PointTrackMap", "POST", [middleware.PointTrackMap]);
addRoute("/mapTracking/updatePointTrackMap", "POST", [middleware.updatePointTrackMap]);
addRoute("/mapTracking/DeletePointTrackMap", "POST", [middleware.DeletePointTrackMap]);
addRoute("/mapTracking/PointTrackMaplist", "POST", [middleware.PointTrackMaplist]);

addRoute("/mapTracking/PointTrackMapSpot", "POST", [middleware.PointTrackMapSpot]);
addRoute("/mapTracking/updatePointTrackMapSpot", "POST", [middleware.updatePointTrackMapSpot]);
addRoute("/mapTracking/DeletePointTrackMapSpot", "POST", [middleware.DeletePointTrackMapSpot]);
addRoute("/mapTracking/PointTrackMapSpotlist", "POST", [middleware.PointTrackMapSpotlist]);


addRoute("/mapTracking/PointTrackMapRecords", "POST", [middleware.PointTrackMapRecords]);
addRoute("/mapTracking/updatePointTrackMapRecords", "POST", [middleware.updatePointTrackMapRecords]);
addRoute("/mapTracking/DeletePointTrackMapRecords", "POST", [middleware.DeletePointTrackMapRecords]);


addRoute("/mapTracking/PointTrackMapRecordslist", "POST", [middleware.PointTrackMapRecordslist]);





/*Add FAQ*/

addRoute("/authentication/addquestions", "POST", [middleware.addquestions])
addRoute("/authentication/updatequestions", "POST", [middleware.updatequestions])
addRoute("/authentication/deletequestions", "POST", [middleware.deletequestions])
addRoute("/authentication/Question_id", "POST", [middleware.Question_id])
addRoute("/authentication/Questionlist", "POST", [middleware.Questionlist])






/*PointTracking For Web*/
addRoute("/PointTracking/Addpoints", "POST", [middleware.Addpoints])
addRoute("/PointTracking/pointsupdate", "POST", [middleware.pointsupdate])
addRoute("/PointTracking/pointslist", "POST", [middleware.pointslist])
addRoute("/PointTracking/deletepoints", "POST", [middleware.deletepoints])
addRoute("/PointTracking/fetchpoints", "POST", [middleware.fetchpoints])
addRoute("/PointTracking/employee_fetchpoints", "POST", [middleware.employee_fetchpoints])


















app.use(router);

exports.init = middleware.init;
exports.router = app;