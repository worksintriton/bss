"use strict";

var _ = require("lodash"),
        db = require("../db"),
        async = require("async");

function login_page() {}




login_page.bsslogincheck = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
   executor.any('SELECT * FROM public.usermanage WHERE "Email_id"=($1) and "Password"=($2)',[userInput.Email_id,userInput.password])
        .then(data => {
          console.log(data.length);
          if(data.length == 0 ){
            var string = "Invalid Account";
            resultCallback(null,string);
          }else{
            resultCallback(null,data );
          }  
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};

login_page.clientlogincheck = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
   executor.any('SELECT "Login_in","Contact_Name","Contact_Number","E_mail_ID","Designations",id,"client_id","Client_Name","Address" FROM public."client_Management" WHERE "Login_in"=($1) and "Password"=($2)',[userInput.Email_id,userInput.password])
        .then(data => {
          console.log(data.length);
          if(data.length == 0 ){
            resultCallback(null,{},false);
          }else{
            resultCallback(null,data,true);
          }
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};



login_page.securitytlogins = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
   executor.any('SELECT * FROM public.employeemanagement WHERE "Email_id"=($1) and "Password"=($2)',[userInput.Email_id,userInput.password])
        .then(data => {
          console.log(data.length);
          if(data.length == 0 ){
            var string = "Invalid Account";
            resultCallback(null,string);
          }else{
            resultCallback(null,data );
          }  
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};





module.exports = login_page;