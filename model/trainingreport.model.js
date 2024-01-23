const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const trainingReportSchema = new mongoose.Schema({
  unit: { type: String },
  date: { type: String },
  trainer: { type: String },
  subject: { type: String },
  time_duration_form: { type: String },
  time_duration_to: { type: String },
  uname: { type: String },
  usign: { type: String },
  tname: { type: String },
  tsign: { type: String },
  asoname: { type: String },
  asosign: { type: String },
});
trainingReportSchema.plugin(timestamps);
mongoose.model("training_report", trainingReportSchema);
module.exports = mongoose.model("training_report");
