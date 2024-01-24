const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const attendanceSchema = new mongoose.Schema({
  employee_id: { type: String },
  name: { type: String },
  time_in: { type: Date },
  status: { type: String },
  date: { type: Date },
  check: { type: String },
});
attendanceSchema.plugin(timestamps);
mongoose.model("attendance", attendanceSchema);
module.exports = mongoose.model("attendance");
