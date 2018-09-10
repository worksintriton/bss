

"use strict";

var _ = require("lodash"),
        db = require("../db"),
        async = require("async");

function user() {}

// user.getuser_details = function (userInput, resultCallback) {
//   var executor = db.getdaata.getdb();
//   //\''+userInput.appartment_ukey+'\' 
//    executor.any('SELECT * FROM public.user WHERE user_id=($1) ' , [userInput.user_id])
//         .then(data => {

                 
//                  console.log(data);
//                  resultCallback(null,data );
            
//         })
//         .catch(error => {
//             resultCallback(error,null );
//             console.log('ERROR:', error);
//         })


// };


user.create = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
   executor.any('SELECT * FROM public.userregisterpage WHERE "email_id"=($1) ' , [userInput.email_id])
        .then(data => {
                 if(data.length > 0 )//eruthuchuna
                 {
                  var string = {message:"This email_id already exits!",status:"falied"} ;
                 resultCallback(null,string);
                 
               }else{
                   console.log("2");
                   executor.one('INSERT INTO public.userregisterpage (user_name, mobile_number, password, email_id ) VALUES ($1,$2,$3,$4) RETURNING *',
                 [userInput.name,userInput.mobile_number,userInput.password,userInput.email_id])
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

user.check = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  //\''+userInput.appartment_ukey+'\' 
   executor.any('select * from public.userregisterpage where email_id=($1) and password=($2)',[userInput.user_id,userInput.password])
  .then(data => {
   resultCallback(null,data) 
  })
  .catch(error => {

    resultCallback(error,null);
    console.log('error:',error);
  })

};


module.exports = user;
