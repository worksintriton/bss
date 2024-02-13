const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const attendanceSchema = new mongoose.Schema({
  employee_id: { type: String },
  name: { type: String },
  time: { type: String },
  status: { type: String },
  date: { type: Date },
  check: { type: String },
  lat: { type: String },
  lon: { type: String },
  supervisor_id: { type: objectId },
  site_id: { type: objectId },
  remark: { type: String }
});
attendanceSchema.plugin(timestamps);
mongoose.model("attendance", attendanceSchema);
module.exports = mongoose.model("attendance");
