const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const nightCheckSchema = new mongoose.Schema({
  date: { type: String },
  checking_officer: { type: String },
  site_name: { type: String },
  visit_tiem_from: { type: String },
  visit_time_to: { type: String },
  shift_rank: { type: String },
  shift_auth: { type: String },
  shift_present: { type: String },
});
nightCheckSchema.plugin(timestamps);
mongoose.model("night_check", nightCheckSchema);
module.exports = mongoose.model("night_check");
