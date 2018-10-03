

"use strict";

var _ = require("lodash"),
        db = require("../db"),
        async = require("async");

function clientmanagement() {}



clientmanagement.employeereqiureds = function (userInput , resultCallback) {
  var executor = db.getdaata.getdb();
  console.log(userInput);
      executor.one('UPDATE public.clientmanagment SET  "no_am"=($2),"no_sup"=($3),"no_security"=($4),"pay_sup"=($5),"pay_am"=($6),"pay_security"=($7),"overtime_pay"=($8),"bsspay_am"=($9),"bsspay_security"=($10),"bsspay_sup"=($11) ,"bssovertime_pay"=($12) ,"shift_type"=($13),"shift_hours"=($14) WHERE cliid = ($1) RETURNING *',
        [userInput.cliid,userInput.no_am,userInput.no_sup,userInput.no_security,userInput.pay_sup,userInput.pay_am,userInput.pay_security,userInput.overtime_pay,userInput.bsspay_am,userInput.bsspay_security,userInput.bsspay_sup,userInput.bssovertime_pay,userInput.shift_type,userInput.shift_hours])
       .then(data => {
        console.log(data);
        resultCallback(null,data);
        })
        .catch(error => {
          resultCallback(error,{} );
          console.log('ERROR:', error);
        });
};


clientmanagement.add = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
   executor.any('SELECT * FROM public.user WHERE "email_id"=($1) ' , [userInput.email_id])
        .then(data => {
                 if(data.length > 0 )//eruthuchuna
                 {
                  var string = {message:"This email_id already exits!",status:"falied"} ;
                 resultCallback(null,string);
                 
               }else{
                   console.log("2");
                   executor.none('INSERT INTO public.user (flat_no, block_name, user_name, user_phone, password, email_id,owner_tent,type,appartment_name) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);',
                 [userInput.flat_no,userInput.block_name,userInput.user_name,userInput.user_phone,userInput.password,userInput.email_id,userInput.owner_tent,userInput.type,userInput.appartment_name]),
                  executor.any('SELECT * FROM public.user_login WHERE "email_id"=($1) ' , [userInput.email_id])
                 .then(data => {
              resultCallback(null,data);

                 })

              }
                 
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })


};


module.exports = clientmanagement;
