
"use strict";

var _ = require("lodash"),
        db = require("../db"),
        async = require("async");

function training() {}


training.setoftraining = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  executor.one('INSERT INTO public.training("training_title","training_description")VALUES($1,$2)RETURNING *',
                 [ 
                 userInput.title,
                 userInput.description
                 ])
                 .then(data => {
                    resultCallback(null,data);
                 })
                 .catch(error => {
                    resultCallback(null,error );
                })
};

training.traininglessons = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  executor.one('INSERT INTO public.traininglesson("title","descriptions","lesson_id")VALUES($1,$2,$3)RETURNING *',
                 [ 
                 userInput.title,
                 userInput.descriptions,
                 userInput.lesson_id
                 ])
                 .then(data => {
                    resultCallback(null,data);
                 })
                 .catch(error => {
                    resultCallback(null,error );
                })
};

training.trainingvideos = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  executor.one('INSERT INTO public.trainingvideos("title","descriptions","video_url","videos_id")VALUES($1,$2,$3,$4)RETURNING *',
                 [ 
                 userInput.title,
                 userInput.descriptions,
                 userInput.video_url,
                 userInput.videos_id,
                 ])
                 .then(data => {
                    resultCallback(null,data);
                 })
                 .catch(error => {
                    resultCallback(null,error );
                })
};

training.traininglists = function (userInput, resultCallback) {
var executor = db.getdaata.getdb();
    executor.any('SELECT * FROM public."training" ',[userInput.emp_id])
        .then(data => {
            resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            
        }) 
};

training.traininglessonlist = function (userInput, resultCallback) {
var executor = db.getdaata.getdb();
    executor.any('SELECT * FROM public."traininglesson" ',[userInput.emp_id])
        .then(data => {
            resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            
        }) 
};

training.trainingvideoslist = function (userInput, resultCallback) {
var executor = db.getdaata.getdb();
    executor.any('SELECT * FROM public."trainingvideos" ',[userInput.emp_id])
        .then(data => {
            resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            
        }) 
};




training.Trackings = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  executor.one('INSERT INTO public.employee_track("Employee_id","Lat","Long","updated_at","Name")VALUES($1,$2,$3,$4,$5)RETURNING *',
                 [ 
                 userInput.Employee_id,
                 userInput.Lat,
                 userInput.Long,
                 userInput.updated_at,
                 userInput.Name
                 ])
                 .then(data => {
                    resultCallback(null,data);
                 })
                 .catch(error => {
                    resultCallback(null,error );
                })
};
training.fetchtrackdates = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
    executor.any('SELECT * FROM public."employee_track" WHERE  updated_at::date >= $1  AND updated_at::date <= $2 And "Employee_id"=$3' , [userInput.start_date,userInput.end_date,userInput.Employee_id])
        .then(data => {
       resultCallback(null,data );  
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};


training.fetchtracksingledates = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();

  //\''+userInput.appartment_ukey+'\' 
    executor.any('SELECT * FROM public."employee_track" WHERE  updated_at::date = $1 ' , [userInput.date])
        .then(data => {

                 resultCallback(null,data );  
        })
        .catch(error => {
            resultCallback(error,null );
            console.log('ERROR:', error);
        })
};



training.Trackingsupdate = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  executor.one('update public.employee_track set "Lat"= ($2),"Long"= ($3),"updated_at"= ($4),"Name"= ($5) where  "Employee_id" = ($1) RETURNING *',
                 [ 
                 userInput.Employee_id,
                 userInput.Lat,
                 userInput.Long,
                 userInput.updated_at,
                 userInput.Name
                 ])
                 .then(data => {
                    resultCallback(null,data);
                 })
                 .catch(error => {
                    resultCallback(null,error );
                })
};

training.Trackingpersons = function (userInput, resultCallback) {
var executor = db.getdaata.getdb();
    executor.any('SELECT * FROM public."employee_track" where "Employee_id"=($1) ',[userInput.Employee_id])
        .then(data => {
            resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            
        }) 
};

training.deleteTrackinglists = function (userInput, resultCallback) {
var executor = db.getdaata.getdb();
    executor.any('Delete FROM public."employee_track" where "Employee_id"=($1) ',[userInput.Employee_id])
        .then(data => {
            resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            
        }) 
};

training.Trackinglists = function (userInput, resultCallback) {
var executor = db.getdaata.getdb();
    executor.any('SELECT * FROM public."employee_track" ',[userInput.client_ID])
        .then(data => {
            resultCallback(null,data );
        })
        .catch(error => {
            resultCallback(error,null );
            
        }) 
};



module.exports = training;
