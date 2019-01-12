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



/*BSS Web Portal*/
addRoute("/authentication/bsslogin", "POST", [middleware.bsslogin]);


/*Add Employee*/
addRoute("/authentication/addemployee", "POST", [middleware.addemployee]);
addRoute("/authentication/employeelist", "POST", [middleware.employeelist]);
addRoute("/authentication/deleteemployee", "POST", [middleware.deleteemployee]);
addRoute("/authentication/employee_id", "POST", [middleware.employee_id]);
addRoute("/authentication/updateemployee", "POST", [middleware.updateemployee]);
addRoute("/authentication/Changepassword", "POST", [middleware.Changepassword]);
addRoute("/authentication/Updateemployee_id", "POST", [middleware.Updateemployee_id]);

addRoute("/authentication/updateqr", "POST", [middleware.updateqr]);
addRoute("/authentication/updateemployee1", "POST", [middleware.updateemployee1]);


/*Add User*/
addRoute("/authentication/addusers", "POST", [middleware.addusers]);
addRoute("/authentication/userid", "POST", [middleware.userid]);
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
addRoute("/issue/issuecount", "POST", [middleware.issuecount]);



/*Feedback Tracking*/
addRoute("/feebdack/createfeedback", "POST", [middleware.createfeedback]);
addRoute("/feebdack/feedbacklist", "POST", [middleware.feedbacklist]);
addRoute("/feebdack/listmyfeedback", "POST", [middleware.listmyfeedback]);
addRoute("/feebdack/fetchfeedback", "POST", [middleware.fetchfeedback]);


/*Attachment Tracking*/
addRoute("/attachment/createattach", "POST", [middleware.createattach]);
addRoute("/attachment/listattach", "POST", [middleware.listattach]);
addRoute("/attachment/mylistattach", "POST", [middleware.mylistattach]);
addRoute("/attachment/fetchattach", "POST", [middleware.fetchattach]);



/*issues Attachment*/
addRoute("/issue/createAttachment", "POST", [middleware.create_issue_attachment]);
addRoute("/issue/listallissues", "POST", [middleware.list_issue]);
addRoute("/issue/listmyissues", "POST", [middleware_emp.validateEmployee, middleware.list_my_issue]);
addRoute("/issue/listissues", "POST", [middleware.listissues]);

/*PointTracking for Mobile*/

    /*fetch*/
addRoute("/PointTracking/employee_fetchpoints", "POST", [middleware.employee_fetchpoints])


/*PointTrackMap*/
addRoute("/mapTracking/updatePointTrackMap", "POST", [middleware.updatePointTrackMap]);
addRoute("/mapTracking/DeletePointTrackMap", "POST", [middleware.DeletePointTrackMap]);
addRoute("/mapTracking/PointTrackMaplist", "POST", [middleware.PointTrackMaplist]);


/*PointTrackMapSpots*/
addRoute("/mapTracking/PointTrackMapSpot", "POST", [middleware.PointTrackMapSpot]);
addRoute("/mapTracking/updatePointTrackMapSpot", "POST", [middleware.updatePointTrackMapSpot]);
addRoute("/mapTracking/DeletePointTrackMapSpot", "POST", [middleware.DeletePointTrackMapSpot]);
addRoute("/mapTracking/PointTrackMapSpotlist", "POST", [middleware.PointTrackMapSpotlist]);
addRoute("/mapTracking/FetchMapSpot", "POST", [middleware.FetchMapSpot]);


/*PointTracRecords*/
addRoute("/mapTracking/PointTrackMapRecords", "POST", [middleware.PointTrackMapRecords]);
addRoute("/mapTracking/updatePointTrackMapRecords", "POST", [middleware.updatePointTrackMapRecords]);
addRoute("/mapTracking/DeletePointTrackMapRecords", "POST", [middleware.DeletePointTrackMapRecords]);
addRoute("/mapTracking/PointTrackMapRecordslist", "POST", [middleware.PointTrackMapRecordslist]);


/*PointTracRecordsSpots*/
addRoute("/mapTracking/PointTrackRecordsSpot", "POST", [middleware.PointTrackRecordsSpot]);
addRoute("/mapTracking/updatePointTrackRecordsSpot", "POST", [middleware.updatePointTrackRecordsSpot]);
addRoute("/mapTracking/DeletePointTrackRecordsSpot", "POST", [middleware.DeletePointTrackRecordsSpot]);
addRoute("/mapTracking/PointTrackRecordsSpotlist", "POST", [middleware.PointTrackRecordsSpotlist]);
addRoute("/mapTracking/FetchMapSpotrecord", "POST", [middleware.FetchMapSpotrecord]);

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


/* Mapuser */
addRoute("/mapTracking/addmapuser", "POST", [middleware.addmapuser])
addRoute("/mapTracking/addmapuserlist", "POST", [middleware.addmapuserlist])
addRoute("/mapTracking/mapuserdelete", "POST", [middleware.mapuserdelete])
addRoute("/mapTracking/fetchmapuserpoints", "POST", [middleware.fetchmapuserpoints])


/*QR Code */
addRoute("/authentication/addqr", "POST", [middleware.addqr])
addRoute("/authentication/qrlist", "POST", [middleware.qrlist])
addRoute("/authentication/deleteqr", "POST", [middleware.deleteqr])
addRoute("/authentication/deleteallqr", "POST", [middleware.deleteallqr])


/*Attendance mark */
addRoute("/Attendance/MarkAttendance", "POST", [middleware.MarkAttendance])
addRoute("/Attendance/dailystatus", "POST", [middleware.dailystatus])
addRoute("/Attendance/Weeklystatus", "POST", [middleware.Weeklystatus])
addRoute("/Attendance/Allstatus", "POST", [middleware.Allstatus])


/*Forgotpassword */
addRoute("/authentication/Forgotpasswordweb", "POST", [middleware.Forgotpasswordweb])
addRoute("/authentication/checkuser", "POST", [middleware.checkuser])



/*assigningemployee*/
addRoute("/authentication/addassign", "POST", [middleware.addassign])
addRoute("/authentication/listassign", "POST", [middleware.listassign])
addRoute("/authentication/deleteassign", "POST", [middleware.deleteassign])


/*assigningemployee*/
addRoute("/authentication/addsms", "POST", [middleware.addsms])
addRoute("/authentication/listsms", "POST", [middleware.listsms])
addRoute("/authentication/deletesms", "POST", [middleware.deletesms])



/*resigned*/
addRoute("/authentication/resigned", "POST", [middleware.resigned])
// addRoute("/authentication/resignedlist", "POST", [middleware.resignedlist])



/*Client WEB Portal*/
addRoute("/authentication/Clientlogin", "POST", [middleware.Clientlogin]);




/*Create complaints */
addRoute("/complaints/newcomplaints", "POST", [middleware.newcomplaints]);
addRoute("/complaints/complaintlist", "POST", [middleware.complaintlist]);
addRoute("/complaints/updateStatus", "POST", [middleware.updateStatus]);
addRoute("/issue/clearissue", "POST", [middleware.clearissue]);

/*File Upload*/
addRoute("/upload/file", "POST", [middleware.uploadingfile]);









app.use(router);

exports.init = middleware.init;
exports.router = app;