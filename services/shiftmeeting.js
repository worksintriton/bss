const model = require("../model/index");

function shiftMeeting() {}

shiftMeeting.checkUniform = async function (userInput, resultCallback) {
  await model.shiftmeeting
    .create({
      Empolyee_id: userInput.Empolyee_id,
      Name: userInput.Name,
      image: userInput.image,
      site_id: userInput.site_id,
      site_name: userInput.site_name,
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
  const { searchKey, skip, limit, sortkey, sortOrder, site_id } = query;

  const sort = { [sortkey]: !sortOrder || sortOrder === "DESC" ? -1 : 1 };

  const searchRegex = new RegExp(["^.*", searchKey, ".*$"].join(""), "i");
  await model.shiftmeeting
    .aggregate([
      {
        $match: site_id
          ? {
              site_id: new objectId(site_id),
            }
          : {},
      },
      {
        $match: searchKey
          ? {
              $or: [{ Empolyee_id: searchRegex }],
            }
          : {},
      },

      {
        $sort: sort,
      },
      {
        $facet: {
          pagination: [{ $count: "totalCount" }],
          data: [{ $skip: Number(skip) || 0 }, { $limit: Number(limit) || 10 }],
        },
      },
    ])

    .then((data) => {
      resultCallback(null, data, true);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

module.exports = shiftMeeting;
