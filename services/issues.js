
"use strict";

var _ = require("lodash"),
        db = require("../db"),
        async = require("async");

function issues() {}


issues.createIssue = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  executor.one('INSERT INTO public.issue_master("complaint_from", "poster_id", "complaint_type", "title", "description", "status", "posted_on","photo1","photo2","photo3","photo4" )VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)RETURNING *',
                 [ 
                 userInput.complaint_from,
                 userInput.user_id,
                 userInput.complaint_type,
                 userInput.title,
                 userInput.description,
                 userInput.status,
                 userInput.posted_on,
                 userInput.photo1,
                 userInput.photo2,
                 userInput.photo3,
                 userInput.photo4
                 ])
                 .then(data => {
                    resultCallback(null,true, data);
                 })
                 .catch(error => {
                    resultCallback(null,false, error );
                })
};


issues.createIssue1 = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  executor.one('INSERT INTO public.issue_master("complaint_from", "poster_id", "complaint_type", "title", "description", "status", "posted_on" )VALUES($1,$2,$3,$4,$5,$6,$7)RETURNING *',
                 [ 
                 userInput.complaint_from,
                 userInput.LoginKey,
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
  executor.one('INSERT INTO public.issues_history("complaint_id", "complaint_from", "poster_id", "complaint_type", "title", "description", "status", "posted_on","updated_at","moved_by","moved_to","taken_by","photo1","photo2","photo3","photo4")VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)RETURNING *',
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
                 userInput.taken_by,
                 userInput.photo1,
                 userInput.photo2,
                 userInput.photo3,
                 userInput.photo4
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
  executor.one('INSERT INTO public.issues_history("complaint_id", "title", "description", "status","updated_at","taken_by","photo1","photo2","photo3","photo4")VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)RETURNING *',
                 [
                 userInput.complaint_id, 
                 userInput.title,
                 userInput.description,
                 userInput.status,
                 userInput.updated_at,
                 userInput.taken_by,
                 userInput.photo1,
                 userInput.photo2,
                 userInput.photo3,
                 userInput.photo4,
                 ])
                 .then(data => {
                    resultCallback(null,true, data);
                 })
                 .catch(error => {
                    resultCallback(null,false, error);
                })


};


issues.updateissuecomplaint = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  
  executor.one('UPDATE public.issue_master SET "status"= $2 WHERE "complaint_id" = $1 RETURNING *',
                 [ 
                 userInput.complaint_id,
                 userInput.status
                 ])
                 .then(data => {
                    resultCallback(null,true, data);
                 })
                 .catch(error => {
                    resultCallback(null,false, error );
                })
};


issues.reportupdate = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  executor.one('UPDATE public.issue_master SET "status"= $2, "updated_at" = $3 , "taken_by" = $4 WHERE "complaint_id" = $1 RETURNING *',
                 [ 
                 userInput.complaint_id,
                 userInput.status,
                 userInput.updated_at,
                 userInput.taken_by
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


issues.clearissues = function (userInput, resultCallback) {
var executor = db.getdaata.getdb();
    executor.any('Delete  FROM public."issue_master" where "complaint_id"=$1',[userInput.complaint_id])
        .then(data => {
    executor.any('Delete  FROM public."issues_history" where  "complaint_id"=$1 ',[userInput.complaint_id])
        .then(data => {
            resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
        }) 

        })
        .catch(error => {
            resultCallback(error,null );
            
        }) 
};


issues.issuedetail = function (userInput, resultCallback) {
var executor = db.getdaata.getdb();
    executor.any('SELECT * FROM public."issue_master" where "complaint_id"=$1',[userInput.complaint_id])
        .then(data => {
            resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            
        }) 
};

issues.issuetracks = function (userInput, resultCallback) {
var executor = db.getdaata.getdb();
    executor.any('SELECT * FROM public."issues_history" where "complaint_id"=$1',[userInput.complaint_id])
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


issues.listissuess = function (userInput, resultCallback) {
var executor = db.getdaata.getdb();
    executor.any('SELECT * FROM public."issue_master" ',[userInput.LoginKey])
        .then(data => {
            resultCallback(null,data);
        })
        .catch(error => {
            resultCallback(error,null);
        }) 
};


issues.listmyIssueAttachments = function (userInput, resultCallback) {
var executor = db.getdaata.getdb();
    executor.any('SELECT * FROM public."issue_attachments" ',[userInput.LoginKey])
        .then(data => {
            resultCallback(null,data);
        })
        .catch(error => {
            resultCallback(error,null);
        }) 
};


issues.listissuess1 = function (userInput, resultCallback) {
var executor = db.getdaata.getdb();
    executor.any('SELECT * FROM public."issue_master" where "poster_id" = ($1)',[userInput.LoginKey])
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

issues.issuecounts = function (userInput , resultCallback) {
  var executor = db.getdaata.getdb(); 
       executor.any('SELECT count(*)  FROM public."issue_master" WHERE status = ($1)  UNION ALL SELECT count(*)  FROM public."issue_master" WHERE status = ($2)   UNION ALL SELECT count(*)  FROM public."issue_master" WHERE status = ($3)   UNION ALL SELECT count(*)  FROM public."issue_master" ',['open','Inprogress','completed'])
       .then(data => {
        console.log(data)
        resultCallback(null,data);
        })
        .catch(error => {
          resultCallback(error,{} );
          console.log('ERROR:', error);
        });
};


module.exports = issues;
