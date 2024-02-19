const { Schema } = require("mongoose");
const model = require("../model/index");
const objectId = Schema.Types.ObjectId;
function shiftMeeting() {}

shiftMeeting.checkUniform = async function (userInput, resultCallback) {
  await model.shiftmeeting
    .create({
      Empolyee_id: userInput.Empolyee_id,
      Name: userInput.Name,
      image: userInput.image,
      site_id: userInput.site_id,
      site_name: userInput.site_name,
      lat: userInput.lat,
      lon: userInput.lon,
      date: userInput.date,
      submittedBy: userInput.submittedBy,
    })
    .then((data) => {
      resultCallback(null, data, true);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

shiftMeeting.listUser = async function (userInput, query, resultCallback) {
  const { searchKey, skip, limit, sortkey, sortOrder, siteId } = query;

  const sort = { [sortkey]: !sortOrder || sortOrder === "DESC" ? -1 : 1 };

  const searchRegex = new RegExp(["^.*", searchKey, ".*$"].join(""), "i");

  let filter;

  const endOfDay = new Date(userInput.date);
  endOfDay.setHours(23, 59, 59, 999);

  if (siteId) {
    filter = { site_id: siteId, isActive: true };
  } else if (userInput.date) {
    filter = {
      createdAt: {
        $gte: new Date(userInput.date),
        $lte: endOfDay,
      },
      isActive: true,
    };
  } else if (searchRegex) {
    filter = {
      $or: [{ site_name: searchRegex }],
    };
  } else {
    filter = { isActive: true };
  }

  await model.shiftmeeting
    .find(filter)

    .then((data) => {
      resultCallback(null, data, true);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

module.exports = shiftMeeting;
