
"use strict";

var _ = require("lodash"),
        db = require("../db"),
        async = require("async");

function issues() {}


issues.createIssue = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  executor.one('INSERT INTO public.issue_master("complaint_from", "poster_id", "complaint_type", "title", "description", "status", "posted_on" )VALUES($1,$2,$3,$4,$5,$6,$7)RETURNING *',
                 [ 
                 userInput.complaint_from,
                 userInput.user_id,
                 userInput.complaint_type,
                 userInput.title,
                 userInput.description,
                 userInput.status,
                 userInput.posted_on
                 ])
                 .then(data => {
                    resultCallback(null,true, data);
                 })
                 .catch(error => {
                    resultCallback(null,false, error );
                })


};


issues.createIssuehistory = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  executor.one('INSERT INTO public.issues_history("complaint_id", "complaint_from", "poster_id", "complaint_type", "title", "description", "status", "posted_on","updated_at","moved_by","moved_to","taken_by")VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)RETURNING *',
                 [
                 userInput.complaint_id, 
                 userInput.complaint_from,
                 userInput.poster_id,
                 userInput.complaint_type,
                 userInput.title,
                 userInput.description,
                 userInput.status,
                 userInput.posted_on,
                 userInput.updated_at,
                 userInput.moved_by,
                 userInput.moved_to,
                 userInput.taken_by
                 ])
                 .then(data => {
                    resultCallback(null,data);
                 })
                 .catch(error => {
                    resultCallback(null,error );
                })


};

issues.updateissue = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  
  executor.one('UPDATE public.issue_master SET "status"= $2, "moved_by"= $3, "moved_to"= $4 ,"updated_at" = $5 WHERE "complaint_id" = $1 RETURNING *',
                 [ 
                 userInput.complaint_id,
                 userInput.status,
                 userInput.moved_by,
                 userInput.moved_to,
                 userInput.updated_at
                 ])
                 .then(data => {
                    resultCallback(null,true, data);
                 })
                 .catch(error => {
                    resultCallback(null,false, error );
                })
};



issues.taken_bys = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  console.log(userInput)
  executor.one('UPDATE public.issue_master SET "taken_by"= $2 ,"updated_at" = $3  WHERE "complaint_id" = $1 RETURNING *',
                 [ 
                 userInput.complaint_id,
                 userInput.taken_by,
                 userInput.updated_at
                 ])
                 .then(data => {
                    resultCallback(null,true, data);
                 })
                 .catch(error => {
                    resultCallback(null,false, error );
                })


};

issues.reports = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  executor.one('INSERT INTO public.issues_history("complaint_id", "title", "description", "status","updated_at","taken_by")VALUES($1,$2,$3,$4,$5,$6)RETURNING *',
                 [
                 userInput.complaint_id, 
                 userInput.title,
                 userInput.description,
                 userInput.status,
                 userInput.updated_at,
                 userInput.taken_by
                 ])
                 .then(data => {
                    resultCallback(null,true, data);
                 })
                 .catch(error => {
                    resultCallback(null,false, error);
                })


};

issues.reportupdate = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  executor.one('UPDATE public.issue_master SET "status"= $2, "updated_at" = $3 WHERE "complaint_id" = $1 RETURNING *',
                 [ 
                 userInput.complaint_id,
                 userInput.status,
                 userInput.updated_at
                 ])
                 .then(data => {
                    resultCallback(null,true, data);
                 })
                 .catch(error => {
                    resultCallback(null,false, error );
                })
};


issues.createIssueAttachment = function (basepath, filename, issue_id, resultCallback) {
  var executor = db.getdaata.getdb();
  
  executor.one('INSERT INTO public.issue_attachments(basepath, filename, issue_id, "is_Deleted")VALUES($1,$2,$3,$4)RETURNING *',
                 [ 
                 basepath,
                 filename,
                 issue_id,
                 false
                 ])
                 .then(data => {
                    resultCallback(null,true, data);
                 })
                 .catch(error => {
                    resultCallback(null,false, error );
                })


};




issues.listIssues = function (userInput, resultCallback) {
var executor = db.getdaata.getdb();
    executor.any('SELECT * FROM public."issue_master" ',[userInput.E_mail_ID])
        .then(data => {
            resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            
        }) 
};

issues.listIssueAttachment = function (issueid, resultCallback) {
var executor = db.getdaata.getdb();
    executor.any('SELECT * FROM public."issue_attachments" where issue_id in ( select id FROM public."issue_master" where "status" != ($1) )',["closed"])
        .then(data => {
            resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,[] );
            
        }) 
};

issues.listMyIssues = function (userInput, resultCallback) {
var executor = db.getdaata.getdb();
    executor.any('SELECT * FROM public."issue_master" where "poster_id" = ($1)',[""+userInput.user_id])
        .then(data => {
            resultCallback(null,data);
        })
        .catch(error => {
            resultCallback(error,null);
        }) 
};

issues.listmyIssueAttachment = function (userInput, resultCallback) {
var executor = db.getdaata.getdb();
    executor.any('SELECT * FROM public."issue_attachments" where issue_id in ( select id FROM public."issue_master" where "poster_id" = ($1) )',[""+userInput.user_id])
        .then(data => {
            resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,[] );
            
        }) 
};

module.exports = issues;
