"use strict";

var _ = require("lodash"),
  db = require("../db"),
  async = require("async");

function issues() {}

const model = require("../model/index");
const { mode } = require("crypto-js");

issues.createIssue = async function (userInput, resultCallback) {
  await model.issuemaster
    .create({
      complaint_from: userInput.complaint_from,
      user_id: userInput.user_id,
      complaint_type: userInput.complaint_type,
      title: userInput.title,
      description: userInput.description,
      status: userInput.status,
      posted_on: userInput.posted_on,
      photo1: userInput.photo1,
      photo2: userInput.photo2,
      photo3: userInput.photo3,
      photo4: userInput.photo4,
    })

    .then((data) => {
      resultCallback(null, true, data);
    })
    .catch((error) => {
      resultCallback(null, false, error);
    });
};

issues.createIssue1 = async function (userInput, resultCallback) {
  await model.issuemaster
    .create({
      complaint_from: userInput.complaint_from,
      LoginKey: userInput.LoginKey,
      complaint_type: userInput.complaint_type,
      title: userInput.title,
      description: userInput.description,
      status: userInput.status,
      posted_on: userInput.posted_on,
    })

    .then((data) => {
      resultCallback(null, true, data);
    })
    .catch((error) => {
      resultCallback(null, false, error);
    });
};

issues.createIssuehistory = async function (userInput, resultCallback) {
  await model.issuehistory
    .create({
      complaint_id: userInput.complaint_id,
      complaint_from: userInput.complaint_from,
      poster_id: userInput.poster_id,
      complaint_type: userInput.complaint_type,
      title: userInput.title,
      description: userInput.description,
      status: userInput.status,
      posted_on: userInput.posted_on,
      updated_at: userInput.updated_at,
      moved_by: userInput.moved_by,
      moved_to: userInput.moved_to,
      taken_by: userInput.taken_by,
      photo1: userInput.photo1,
      photo2: userInput.photo2,
      photo3: userInput.photo3,
      photo4: userInput.photo4,
    })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

issues.updateissue = async function (userInput, resultCallback) {
  await model.issuemaster
    .findOneAndUpdate(
      { complaint_id: userInput.complaint_id },
      {
        status: userInput.status,
        moved_by: userInput.moved_by,
        moved_to: userInput.moved_to,
      }
    )

    .then((data) => {
      resultCallback(null, true, data);
    })
    .catch((error) => {
      resultCallback(null, false, error);
    });
};

issues.taken_bys = async function (userInput, resultCallback) {
  await model.issuemaster
    .findOneAndUpdate(
      { complaint_id: userInput.complaint_id },
      { taken_by: userInput.taken_by }
    )

    .then((data) => {
      resultCallback(null, true, data);
    })
    .catch((error) => {
      resultCallback(null, false, error);
    });
};

issues.reports = async function (userInput, resultCallback) {
  await model.issuehistory
    .create({
      complaint_id: userInput.complaint_id,
      title: userInput.title,
      description: userInput.description,
      status: userInput.status,
      updated_at: userInput.updated_at,
      taken_by: userInput.taken_by,
      photo1: userInput.photo1,
      photo2: userInput.photo2,
      photo3: userInput.photo3,
      photo4: userInput.photo4,
    })

    .then((data) => {
      resultCallback(null, true, data);
    })
    .catch((error) => {
      resultCallback(null, false, error);
    });
};

issues.updateissuecomplaint = async function (userInput, resultCallback) {
  await model.issuemaster
    .findOneAndUpdate(
      { complaint_id: userInput.complaint_id },
      { status: userInput.status }
    )

    .then((data) => {
      resultCallback(null, true, data);
    })
    .catch((error) => {
      resultCallback(null, false, error);
    });
};

issues.reportupdate = async function (userInput, resultCallback) {
  await model.issuemaster
    .findOneAndUpdate(
      { complaint_id: userInput.complaint_id },
      {
        status: userInput.status,

        taken_by: userInput.taken_by,
      }
    )

    .then((data) => {
      resultCallback(null, true, data);
    })
    .catch((error) => {
      resultCallback(null, false, error);
    });
};

issues.createIssueAttachment = async function (
  basepath,
  filename,
  issue_id,
  resultCallback
) {
  await model.issueattachment
    .create({
      basepath: basepath,
      filename: filename,
      issue_id: issue_id,
      is_Deleted: false,
    })

    .then((data) => {
      resultCallback(null, true, data);
    })
    .catch((error) => {
      resultCallback(null, false, error);
    });
};

issues.listIssues = async function (userInput, resultCallback) {
  await model.issuemaster
    .find({})

    // executor.any('SELECT * FROM public."issue_master" ',[userInput.E_mail_ID])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
    });
};

issues.clearissues = async function (userInput, resultCallback) {
  await model.issuemaster
    .deleteOne({ complaint_id: userInput.complaint_id })
    .then(async (data) => {
      await model.issuehistory
        .deleteOne({ complaint_id: userInput.complaint_id })
        .then((data) => {
          resultCallback(null, data);
        })
        .catch((error) => {
          resultCallback(error, null);
        });
    })
    .catch((error) => {
      resultCallback(error, null);
    });
};

issues.issuedetail = async function (userInput, resultCallback) {
  await model.issuemaster
    .findOne({ complaint_id: userInput.complaint_id })
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
    });
};

issues.issuetracks = async function (userInput, resultCallback) {
  await model.issuehistory
    .findOne({ complaint_id: userInput.complaint_id })
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
    });
};

issues.listIssueAttachment = async function (issueid, resultCallback) {
  await model.issueattachment
    .aggregate([
      {
        $lookup: {
          from: "issue_master",
          localField: "issue_id",
          foreignField: "_id",
          as: "result",
        },
      },
      {
        $unwind: {
          path: "$result",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          "result.status": {
            $ne: "closed",
          },
        },
      },
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, []);
    });
};

issues.listMyIssues = async function (userInput, resultCallback) {
  await model.issuemaster
    .find({ poster_id: userInput.user_id })
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
    });
};

issues.listissuess = async function (userInput, resultCallback) {
  await model.issuemaster
    .find({})
    // executor.any('SELECT * FROM public."issue_master" ',[userInput.LoginKey])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
    });
};

issues.listmyIssueAttachments = async function (userInput, resultCallback) {
  await model.issueattachment
    .find({})
    // executor.any('SELECT * FROM public."issue_attachments" ',[userInput.LoginKey])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
    });
};

issues.listissuess1 = async function (userInput, resultCallback) {
  await model.issuemaster
    .find({ poster_id: userInput.LoginKey })
    // executor.any('SELECT * FROM public."issue_master" where "poster_id" = ($1)',[userInput.LoginKey])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
    });
};

issues.listmyIssueAttachment = async function (userInput, resultCallback) {
  await model.issueattachment
    .aggregate([
      {
        $lookup: {
          from: "issue_master",
          localField: "issue_id",
          foreignField: "_id",
          as: "record",
        },
      },
      {
        $unwind: {
          path: "$record",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          poster_id: userInput.user_id,
        },
      },
    ])

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, []);
    });
};

issues.issuecounts = async function (userInput, resultCallback) {
  await model.issuemaster
    .aggregate([
      {
        _id: "$status",
        count: {
          $sum: 1,
        },
      },
    ])
    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, {});
      console.log("ERROR:", error);
    });
};

module.exports = issues;
