const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const issueMasterSchema = new mongoose.Schema({
  complaint_from: { type: String },
  poster_id: { type: String },
  complaint_type: { type: String },
  title: { type: String },
  description: { type: String },
  status: { type: String },
  posted_on: { type: String },
  photo1: { type: String },
  photo2: { type: String },
  photo3: { type: String },
  photo4: { type: String },
});
issueMasterSchema.plugin(timestamps);
mongoose.model("issue_master", issueMasterSchema);
module.exports = mongoose.model("issue_master");
