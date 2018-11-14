

"use strict";

var _ = require("lodash"),
        db = require("../db"),
        async = require("async");

function attendance() {}

attendance.MarkAttendancemob = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();


   executor.any('SELECT * FROM public."attendance"  where "employee_id"=$1 and "check"=$2  and "date"=$3  '  , [userInput.id,"Out",userInput.date])
        .then(data => {
            console.log(data);
            if(data.length == 1 ){
                 var data = "You are already Singed-Out";
                 resultCallback(null,data );
                   
            }else{
    executor.any('SELECT * FROM public.attendance where "employee_id"=$1 and "check"=$2  and "date"=$3 ' , [userInput.id,"In",userInput.date])
        .then(data => {
            if(data.length < 1 ){
              executor.one('INSERT INTO public."attendance"("employee_id","name","time_in","status","date","check")VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
                 [userInput.id,
                 userInput.Name,
                 userInput.time,
                 "Present",
                 userInput.date,
                 "In"
                 ])
               .then(data => {
                 console.log(data);
                 resultCallback(null,data );
        })             
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
            }else{
                executor.one('UPDATE public."attendance" SET  "time_out"= $2 , "check"=$4   WHERE  "employee_id" = $1  and "date"= $3  RETURNING *',
                [userInput.id,
                 userInput.time,
                 userInput.date,
                 "Out"
                 ])
        .then(data => {
               executor.one('UPDATE public.attendance  SET  "work_duration"= "time_out" - "time_in" where "employee_id"=$1 and "check"=$2  and "date"=$3 RETURNING * ',[userInput.id,"Out",userInput.date
                 ])
               .then(data => {

                 resultCallback(null,data );    
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
        })             
            }
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
            }
})
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};



attendance.Weeklystatusweb = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
    executor.any('SELECT * FROM public."attendance" WHERE  "date" >= $1  AND "date" < $2 ' , [userInput.start_date,userInput.end_date])
        .then(data => {

                 resultCallback(null,data );  
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


attendance.Allstatusweb = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('SELECT * FROM public.attendance' , [userInput.id])
        .then(data => {
                 resultCallback(null,data );    
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};



attendance.dailystatusweb = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
    executor.any('SELECT * FROM public.attendance WHERE "date"= $1',[userInput.date])
        .then(data => {
                 resultCallback(null,data );    
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};

















module.exports = attendance;
