"use strict";

var _ = require("lodash"),
  db = require("../db"),
  async = require("async");

function training() {}

const model = require("../model/index");

training.setoftraining = async function (userInput, resultCallback) {
  await model.training
    .create({
      training_title: userInput.title,
      training_description: userInput.description,
    })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

training.traininglessons = async function (userInput, resultCallback) {
  await model.traininglesson
    .create({
      title: userInput.title,
      descriptions: userInput.descriptions,
      lesson_id: userInput.lesson_id,
    })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

training.trainingvideos = async function (userInput, resultCallback) {
  await model.trainingvideos
    .create({
      title: userInput.title,
      descriptions: userInput.descriptions,
      video_url: userInput.video_url,
      videos_id: userInput.videos_id,
    })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

training.traininglists = async function (userInput, resultCallback) {
  await model.training
    .find({ Emp_id: userInput.emp_id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
    });
};

training.traininglessonlist = async function (userInput, resultCallback) {
  await model.traininglesson
    .find({ Emp_id: userInput.emp_id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
    });
};

training.trainingvideoslist = async function (userInput, resultCallback) {
  await model.trainingvideos
    .find({ Emp_id: userInput.emp_id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
    });
};

training.Trackings = async function (userInput, resultCallback) {
  await model.employeetrack
    .create({
      Employee_id: userInput.Employee_id,
      Lat: userInput.Lat,
      Long: userInput.Long,
      updated_at: userInput.updated_at,
      Name: userInput.Name,
    })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};
training.fetchtrackdates = async function (userInput, resultCallback) {
  await model.employeetrack
    .aggregate([
      {
        $match: {
          updatedAt: {
            $gte: new Date(userInput.start_date),
            $lte: new Date(userInput.end_date),
          },
        },
      },
      {
        $match: {
          Employee_id: userInput.Employee_id,
        },
      },
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

training.fetchtracksingledates = async function (userInput, resultCallback) {
  await model.employeetrack
    .find({ updatedAt: userInput.date })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

training.Trackingsupdate = async function (userInput, resultCallback) {
  await model.employeetrack
    .findOneAndUpdate(
      { Employee_id: userInput.Employee_id },
      { Lat: userInput.Lat, Long: userInput.Long, Name: userInput.Name }
    )

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

training.Trackingpersons = async function (userInput, resultCallback) {
  await model.employeetrack
    .findOne({ Employee_id: userInput.Employee_id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
    });
};

training.deleteTrackinglists = async function (userInput, resultCallback) {
  await model.employeetrack
    .deleteOne({ Employee_id: userInput.Employee_id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
    });
};

training.Trackinglists = async function (userInput, resultCallback) {
  await model.employeetrack
    .find({})
    //.any('SELECT * FROM public."employee_track" ', [userInput.client_ID])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
    });
};

module.exports = training;
