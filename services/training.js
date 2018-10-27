
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

module.exports = training;
