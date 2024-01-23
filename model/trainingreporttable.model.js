const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const trainingReportTableSchema = new mongoose.Schema({
  bss_no: { type: String },
  rank: { type: String },
  name: { type: String },
  signature: { type: String },
  remarks_by_trainer: { type: String },
  report_id: { type: String },
});
trainingReportTableSchema.plugin(timestamps);
mongoose.model("training_report_table", trainingReportTableSchema);
module.exports = mongoose.model("training_report_table");
