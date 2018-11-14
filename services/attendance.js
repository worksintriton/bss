

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










//updateuser///
attendance.updateuser = function (userInput,resultCallback) {
  var executor = db.getdaata.getdb();
executor.one('UPDATE public.usermanage  SET  "Employee_ID"=($2),"Name"=($3),"Designation"=($4),"Level"=($5),"Phone_number"=($6),"Password"=($7),"Add_by"=($8) WHERE "Email_id" = ($1)RETURNING *',
        [userInput.Email_id,userInput.Employee_ID,userInput.Name,userInput.Designation,userInput.Level,userInput.Phone_number,userInput.Password,userInput.Add_by])
       .then(data => {
        console.log(data);
        resultCallback(null,data);
        })
        .catch(error => {
          resultCallback(error,{} );
          console.log('ERROR:', error);
        });
};


attendance.clientids1 = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
    executor.any('SELECT * FROM public."client_amount" WHERE "cliid"=($1) ' , [userInput.cliid])
        .then(data => {

                 resultCallback(null,data );  
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};




attendance.qrlistweb = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
    executor.any('SELECT * FROM public.qrcode' , [userInput.id])
        .then(data => {

                 resultCallback(null,data );    
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};

attendance.deleteqrweb = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
    executor.any('Delete FROM public.qrcode WHERE "id"=($1) ' , [userInput.id])
        .then(data => {

                 resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};




module.exports = attendance;
