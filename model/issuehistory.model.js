const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const issueHistorySchema = new mongoose.Schema({
  complaint_id: { type: String },
  complaint_from: { type: String },
  poster_id: { type: String },
  complaint_type: { type: String },
  title: { type: String },
  description: { type: String },
  status: { type: String },
  posted_on: { type: String },
  updated_at: { type: String },
  moved_by: { type: String },
  moved_to: { type: String },
  taken_by: { type: String },
  photo1: { type: String },
  photo2: { type: String },
  photo3: { type: String },
  photo4: { type: String },
});
issueHistorySchema.plugin(timestamps);
mongoose.model("issue_history", issueHistorySchema);
module.exports = mongoose.model("issue_history");
