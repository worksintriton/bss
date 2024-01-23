const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const attendanceMarkSchema = new mongoose.Schema({
  employee_id: { type: String },
  employee_name: { type: String },
  employee_type: { type: String },
  hrs: { type: String },
  site_id: { type: String },
  site_name: { type: String },
  contract_id: { type: String },
  date: { type: String },
  status: { type: String },
  basic: { type: String },
  da: { type: String },
  addhours: { type: String },
  other: { type: String },
  leave: { type: String },
  bouns: { type: String },
  weekly: { type: String },
  gross: { type: String },
  epf: { type: String },
  esi: { type: String },
  net: { type: String },
  timein: { type: String },
  timeout: { type: String },
  duration: { type: String },
});
attendanceMarkSchema.plugin(timestamps);
mongoose.model("attendance_mark", attendanceMarkSchema);
module.exports = mongoose.model("attendance_mark");
