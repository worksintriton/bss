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
addRoute("/authentication/employee_id1", "POST", [middleware.employee_id1]);
addRoute("/authentication/updateemployee", "POST", [middleware.updateemployee]);
addRoute("/authentication/Changepassword", "POST", [middleware.Changepassword]);
addRoute("/authentication/Updateemployee_id", "POST", [middleware.Updateemployee_id]);
addRoute("/authentication/updateqr", "POST", [middleware.updateqr]);
addRoute("/authentication/updateemployee1", "POST", [middleware.updateemployee1]);
addRoute("/authentication/efetchsitedetails", "GET", [middleware.efetchsitedetails]);






addRoute("/authentication/fetchemployee_id", "POST", [middleware.fetchemployee_id]);
addRoute("/authentication/updateprofilephoto", "POST", [middleware.updateprofilephoto]);




/*Add User*/
addRoute("/authentication/addusers", "POST", [middleware.addusers]);
addRoute("/authentication/userid", "POST", [middleware.userid]);
addRoute("/authentication/updateusers", "POST", [middleware.updateusers]);
addRoute("/authentication/userlist", "POST", [middleware.userlist]);
addRoute("/authentication/deleteuser", "POST", [middleware.deleteuser]);

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
addRoute("/authentication/deleteTrackinglist", "POST", [middleware.deleteTrackinglist]);
addRoute("/authentication/Trackingperson", "POST", [middleware.Trackingperson]);


/*tracking*/
addRoute("/authentication/Tracking", "POST", [middleware.Tracking]);

/*AssignEmployee*/
addRoute("/assigningemployee/assignemployeeadd", "POST", [middleware.assignemployeeadd]);
addRoute("/assigningemployee/assignlists", "POST", [middleware.assignlists]);
addRoute("/assigningemployee/clientfetchlist", "POST", [middleware.clientfetchlist]);
addRoute("/assigningemployee/employeetfetchlist", "POST", [middleware.employeetfetchlist]);

/*Attendance Mark*/
addRoute("/Attendance/Attendancecheck", "POST", [middleware.Attendancecheck]);
addRoute("/Attendance/fetchdetails", "POST", [middleware.fetchdetails]);
addRoute("/employeecheck/checkemployee", "POST", [middleware.checkemployee]);
addRoute("/Attendance/manualAttendancecheck", "POST", [middleware.manualAttendancecheck]);






/*EMI Voucher*/
addRoute("/advance/advanceadd", "POST", [middleware.advanceadd]);
addRoute("/advance/advancefetch", "POST", [middleware.advancefetch]);
addRoute("/advance/fetchloan_number", "POST", [middleware.fetchloan_number]);
addRoute("/advance/fetchloan_number1", "POST", [middleware.fetchloan_number1]);
addRoute("/advance/deleteinstalment", "POST", [middleware.deleteinstalment]);
addRoute("/advance/deleteadvance", "POST", [middleware.deleteadvance]);
addRoute("/advance/fetchadvance", "POST", [middleware.fetchadvance]);
addRoute("/advance/updateadvance", "POST", [middleware.updateadvance]);
addRoute("/advance/updateoneinstalment", "POST", [middleware.updateoneinstalment]);

addRoute("/advance/fetchadvance2", "POST", [middleware.fetchadvance2]);


addRoute("/advance/monthlyfetch", "POST", [middleware.monthlyfetch]);


addRoute("/advance/monthlyfetch1", "POST", [middleware.monthlyfetch1]);




/*Payroll Reports*/
addRoute("/payroll/fetchsitedetails", "POST", [middleware.fetchsitedetails]);




addRoute("/payroll/fetchsitedpayment", "POST", [middleware.fetchsitedpayment]);


///working////

addRoute("/payroll/fetchsitepaymentss", "POST", [middleware.fetchsitepaymentss]);




addRoute("/payroll/addsalaryprocess", "POST", [middleware.addsalaryprocess]);
addRoute("/payroll/salaryprocesstatus", "POST", [middleware.salaryprocesstatus]);









/*Manualentry*/

addRoute("/manual_entry/manual_entry_unit_add", "POST", [middleware.manual_entry_unit_add]);
addRoute("/manual_entry/manual_entry_unit_update", "POST", [middleware.manual_entry_unit_update]);
addRoute("/manual_entry/manual_entry_unit_delete", "POST", [middleware.manual_entry_unit_delete]);
addRoute("/manual_entry/manual_entry_unit_list", "POST", [middleware.manual_entry_unit_list]);
addRoute("/manual_entry/manual_entry_unit_fetch", "POST", [middleware.manual_entry_unit_fetch]);

addRoute("/manual_entry/manual_entry_rate_add", "POST", [middleware.manual_entry_rate_add]);
addRoute("/manual_entry/manual_entry_rate_update", "POST", [middleware.manual_entry_rate_update]);
addRoute("/manual_entry/manual_entry_rate_delete", "POST", [middleware.manual_entry_rate_delete]);
addRoute("/manual_entry/manual_entry_rate_list", "POST", [middleware.manual_entry_rate_list]);
addRoute("/manual_entry/manual_entry_rate_fetch", "POST", [middleware.manual_entry_rate_fetch]);

addRoute("/manual_entry/manual_entry_emp_add", "POST", [middleware.manual_entry_emp_add]);
addRoute("/manual_entry/manual_entry_emp_update", "POST", [middleware.manual_entry_emp_update]);
addRoute("/manual_entry/manual_entry_emp_delete", "POST", [middleware.manual_entry_emp_delete]);
addRoute("/manual_entry/manual_entry_emp_list", "POST", [middleware.manual_entry_emp_list]);
addRoute("/manual_entry/manual_entry_emp_list1", "POST", [middleware.manual_entry_emp_list1]);
addRoute("/manual_entry/manual_entry_emp_fetch", "POST", [middleware.manual_entry_emp_fetch]);



// addRoute("/manual_entry/manual_entry_emp_single_add", "POST", [middleware.manual_entry_emp_single_add]);
// addRoute("/manual_entry/manual_entry_emp_single_update", "POST", [middleware.manual_entry_emp_single_update]);
// addRoute("/manual_entry/manual_entry_emp_single_delete", "POST", [middleware.manual_entry_emp_single_delete]);
// addRoute("/manual_entry/manual_entry_emp_single_list", "POST", [middleware.manual_entry_emp_single_list]);
// addRoute("/manual_entry/manual_entry_emp_single_fetch", "POST", [middleware.manual_entry_emp_single_fetch]);




















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
addRoute("/attachment/deleteattach", "POST", [middleware.deleteattach]);


// addRoute("/attachment/fetchattach", "POST", [middleware.fetchattach]);




/*issues Attachment*/
addRoute("/issue/createAttachment", "POST", [middleware.create_issue_attachment]);
addRoute("/issue/listallissues", "POST", [middleware.list_issue]);
addRoute("/issue/listmyissues", "POST", [middleware_emp.validateEmployee, middleware.list_my_issue]);
addRoute("/issue/listissues", "POST", [middleware.listissues]);

/*PointTracking for Mobile*/

    /*fetch*/
addRoute("/PointTracking/ss", "POST", [middleware.employee_fetchpoints])

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


/*Employee Type report */

addRoute("/employee/dailyreport", "POST", [middleware.dailyreport])
addRoute("/employee/Weeklyreort", "POST", [middleware.Weeklyreort])


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


/*Create Client site */
addRoute("/client/newclientsite", "POST", [middleware.newclientsite]);
addRoute("/client/sitelist", "POST", [middleware.sitelist]);
addRoute("/client/updateclientsite", "POST", [middleware.updateclientsite]);
addRoute("/client/deletclientsite", "POST", [middleware.deletclientsite]);
addRoute("/client/sitestatus", "POST", [middleware.sitestatus]);
addRoute("/client/fetchsite", "POST", [middleware.fetchsite]);




/*bss,bsspl*/
addRoute("/company/fetchcompanysite", "POST", [middleware.fetchcompanysite]);







/*Create site Contract */
addRoute("/client/newclientcontract", "POST", [middleware.newclientcontract]);
addRoute("/client/contractlist", "POST", [middleware.contractlist]);
addRoute("/client/updateclientcontract", "POST", [middleware.updateclientcontract]);
addRoute("/client/deletclientcontract", "POST", [middleware.deletclientcontract]);
addRoute("/client/contractestatus", "POST", [middleware.contractestatus]);
addRoute("/client/fetchcontract", "POST", [middleware.fetchcontract]);

/*Create complaints */
addRoute("/complaints/newcomplaints", "POST", [middleware.newcomplaints]);
addRoute("/complaints/complaintlist", "POST", [middleware.complaintlist]);
addRoute("/complaints/updateStatus", "POST", [middleware.updateStatus]);
addRoute("/issue/clearissue", "POST", [middleware.clearissue]);

/*File Upload*/
addRoute("/upload/file", "POST", [middleware.uploadingfile]);


addRoute("/employee_tracking/fetchemployees", "GET", [middleware.fetchemployees]);
addRoute("/employee_tracking/fetchTrackinglist", "POST", [middleware.fetchTrackinglist]);
addRoute("/employee_tracking/fetchtrackdate", "POST", [middleware.fetchtrackdate]);
addRoute("/employee_tracking/fetchtracksingledate", "POST", [middleware.fetchtracksingledate]);




/*payment process*/
// addRoute("/payment/payadd", "POST", [middleware.payadd]);
addRoute("/payment/paylist", "POST", [middleware.paylist]);
addRoute("/payment/paydelete", "POST", [middleware.paydelete]);
addRoute("/payment/payupdate", "POST", [middleware.payupdate]);
addRoute("/payment/payfetch", "POST", [middleware.payfetch]);


/*employee payment process*/
// addRoute("/payment/employee_payadd", "POST", [middleware.employee_payadd]);
addRoute("/payment/employee_paylist", "POST", [middleware.employee_paylist]);
addRoute("/payment/employee_paydelete", "POST", [middleware.employee_paydelete]);
addRoute("/payment/employee_payupdate", "POST", [middleware.employee_payupdate]);
addRoute("/paymentemployee_/payfetch", "POST", [middleware.employee_payfetch]);


/*requirment process*/
addRoute("/requirement/reqadd", "POST", [middleware.reqadd]);
addRoute("/requirement/reqlist", "POST", [middleware.reqlist]);
addRoute("/requirement/reqdelete", "POST", [middleware.reqdelete]);
addRoute("/requirement/reqfetch", "POST", [middleware.reqfetch]);
addRoute("/requirement/requpdate", "POST", [middleware.requpdate]);



/*Add Client*/
addRoute("/authentication/addclients", "POST", [middleware.addclients]);
addRoute("/authentication/deleteclient", "POST", [middleware.deleteclient]);
addRoute("/authentication/clientid", "POST", [middleware.clientid]);
addRoute("/authentication/fetchclient", "POST", [middleware.fetchclient]);
addRoute("/authentication/clientlist", "POST", [middleware.clientlist]);
addRoute("/authentication/updateclients", "POST", [middleware.updateclients]);


/*Client Attachment*/
addRoute("/client/addclientattach", "POST", [middleware.addclientattach]);
addRoute("/client/listclientattach", "POST", [middleware.listclientattach]);
addRoute("/client/mylistclientattach", "POST", [middleware.mylistclientattach]);
addRoute("/client/fetchclientattach", "POST", [middleware.fetchclientattach]);
addRoute("/client/deleteclientattach", "POST", [middleware.deleteclientattach])



/*Quality check*/
addRoute("/quality/addquality", "POST", [middleware.addquality]);
addRoute("/quality/listquality", "POST", [middleware.listquality]);
addRoute("/quality/fetchquality", "POST", [middleware.fetchquality]);
addRoute("/quality/deletequality", "POST", [middleware.deletequality]);
addRoute("/quality/updatequality", "POST", [middleware.updatequality]);


/*Quality check table*/
addRoute("/quality/addqualitytable", "POST", [middleware.addqualitytable]);
addRoute("/quality/listqualitytable", "POST", [middleware.listqualitytable]);
addRoute("/quality/fetchqualitytable", "POST", [middleware.fetchqualitytable]);
addRoute("/quality/deletequalitytable", "POST", [middleware.deletequalitytable]);
addRoute("/quality/updatequalitytable", "POST", [middleware.updatequalitytable]);


/*Training Report*/
addRoute("/training/addtrainingreport", "POST", [middleware.addtrainingreport]);
addRoute("/training/listtrainingreport", "POST", [middleware.listtrainingreport]);
addRoute("/training/fetchtrainingreport", "POST", [middleware.fetchtrainingreport]);
addRoute("/training/deletetrainingreport", "POST", [middleware.deletetrainingreport]);
addRoute("/training/updatetrainingreport", "POST", [middleware.updatetrainingreport]);


/*Training table Report*/
addRoute("/training/addtrainingreporttable", "POST", [middleware.addtrainingreporttable]);
addRoute("/training/listtrainingreporttable", "POST", [middleware.listtrainingreporttable]);
addRoute("/training/fetchtrainingreporttable", "POST", [middleware.fetchtrainingreporttable]);
addRoute("/training/deletetrainingreporttable", "POST", [middleware.deletetrainingreporttable]);
addRoute("/training/updatetrainingreporttable", "POST", [middleware.updatetrainingreporttable]);





/*night check Report*/
addRoute("/night_check/addnightreport", "POST", [middleware.addnightreport]);
addRoute("/night_check/listnightreport", "POST", [middleware.listnightreport]);
addRoute("/night_check/fetchnightreport", "POST", [middleware.fetchnightreport]);
addRoute("/night_check/deletenightreport", "POST", [middleware.deletenightreport]);
addRoute("/night_check/updatenightreport", "POST", [middleware.updatenightreport]);


/*night check table Report*/
addRoute("/night_check/addnightreporttable", "POST", [middleware.addnightreporttable]);
addRoute("/night_check/listnightreporttable", "POST", [middleware.listnightreporttable]);
addRoute("/night_check/fetchnightreporttable", "POST", [middleware.fetchnightreporttable]);
addRoute("/night_check/deletenightreporttable", "POST", [middleware.deletenightreporttable]);
addRoute("/night_check/updatenightreporttable", "POST", [middleware.updatenightreporttable]);



/*payment process*/
// addRoute("/payment/payadd", "POST", [middleware.payadd]);
addRoute("/payment/paylist", "POST", [middleware.paylist]);
addRoute("/payment/paydelete", "POST", [middleware.paydelete]);
addRoute("/payment/payupdate", "POST", [middleware.payupdate]);
addRoute("/payment/payfetch", "POST", [middleware.payfetch]);



addRoute("/notification/addnotification", "POST", [middleware.addnotification]);
addRoute("/notification/notificationcount", "POST", [middleware.notificationcount]);
addRoute("/notification/updatenotification", "POST", [middleware.updatenotification]);
addRoute("/notification/listofnotification", "POST", [middleware.listofnotification]);



/*uniforms process*/
addRoute("/uniform/deliverd", "POST", [middleware.deliverd]);
addRoute("/uniform/undeliverd", "POST", [middleware.undeliverd]);
addRoute("/uniform/uniformadd", "POST", [middleware.uniformadd]);
addRoute("/uniform/uniformlist", "POST", [middleware.uniformlist]);
addRoute("/uniform/uniformdelete", "POST", [middleware.uniformdelete]);
addRoute("/uniform/uniformupdate", "POST", [middleware.uniformupdate]);
addRoute("/uniform/uniformfetch", "POST", [middleware.uniformfetch]);





/*Master Table Details*/
/*Master Uniform item adding*/
addRoute("/uniform/additems", "POST", [middleware.additems]);
addRoute("/uniform/itemslists", "POST", [middleware.itemslists]);
addRoute("/uniform/itemsdeletes", "POST", [middleware.itemsdeletes]);
addRoute("/uniform/updateitems", "POST", [middleware.updateitems]);
addRoute("/uniform/fetchitems", "POST", [middleware.fetchitems]);


/*Master Company Name adding*/
addRoute("/company/addcompany", "POST", [middleware.addcompany]);
addRoute("/company/companylists", "POST", [middleware.companylists]);
addRoute("/company/updatecompany", "POST", [middleware.updatecompany]);
addRoute("/company/fetchcompany", "POST", [middleware.fetchcompany]);





/*Master employee type adding*/
addRoute("/employee/addemptype", "POST", [middleware.addemptype]);
addRoute("/employee/emptypelist", "POST", [middleware.emptypelist]);
addRoute("/employee/emptypedelete", "POST", [middleware.emptypedelete]);
addRoute("/employee/updateemptype", "POST", [middleware.updateemptype]);
addRoute("/employee/fetchemptype", "POST", [middleware.fetchemptype]);


/*Finanace process*/

/*Finanace management*/
addRoute("/finanace/addfinanace", "POST", [middleware.addfinanace]);
addRoute("/finanace/finanacelist", "POST", [middleware.finanacelist]);
addRoute("/finanace/finanacedelete", "POST", [middleware.finanacedelete]);
addRoute("/finanace/updatefinanace", "POST", [middleware.updatefinanace]);
addRoute("/finanace/fetchfinanace", "POST", [middleware.fetchfinanace]);




/*Bulk Uploading*/
addRoute("/advance/advcancebulk", "POST", [middleware.advcancebulk]);
addRoute("/client/addclientbulk", "POST", [middleware.addclientbulk]);
addRoute("/employee/addemployeebulk", "POST", [middleware.addemployeebulk]);





addRoute("/reports/getreportssssss", "GET", [middleware.getreportssssss]);


addRoute("/reports/gettingreportsall", "post", [middleware.gettingreportsall]);



addRoute("/reports/getreportssssssall", "GET", [middleware.getreportssssssall]);

// addRoute("/employee/addemployeebulkupload", "POST", [middleware.addemployeebulkupload]);






app.use(router);

exports.init = middleware.init;
exports.router = app;