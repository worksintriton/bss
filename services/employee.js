
"use strict";

var _ = require("lodash"),
        db = require("../db"),
        async = require("async");

function employee() {}


employee.EmployeeAuth = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
   executor.any('SELECT * FROM public.employeedetails WHERE ("Email_ID"=($1) or  "Mobile_No"  = ($1)) ' , [userInput.LoginKey])
        .then(data => {

      		if(data.length > 0 ){
    					if(data[0].Password == userInput.Password){
    						resultCallback(null,200, "Password MissMatched", data[0] );
                delete data[0].password;
    					}
    					else{
    						resultCallback(null,401, "Password MissMatched", {} );
    					}
      		}
      		else
               resultCallback(null,401, "User Doesnot Exist", {} );
          console.log(data);
          
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};


employee.setUserId = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
   executor.any('SELECT * FROM public.employeedetails WHERE ("Email_ID"=($1) or  "Mobile_No"  = ($1)) ' , [userInput.LoginKey])
        .then(data => {

          if(data.length > 0 ){
              
                resultCallback(null,true, data[0].id );
                
          }
          else
               resultCallback(null,false, 0 );
         
          
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};





module.exports = employee;
