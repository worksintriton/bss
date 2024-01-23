const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const advanceHistorySchema = new mongoose.Schema({
  employee_id: { type: String },
  employee_name: { type: String },
  account_number: { type: Number },
  pamount: { type: Number },
  pbalanceamount: { type: Number },
  pinstalment: { type: String },
  ppendinginstalment: { type: String },
  dfullcash: { type: String },
  dpaytype: { type: String },
  ddate: { type: String },
  damount: { type: Number },
  daddi: { type: String },
  dnaration: { type: String },
  advance_type: { type: String },
  company_name: { type: String },
  site: { type: String },
  status: { type: String },
  loan_number: { type: String },
  cdate: { type: String },
  id: { type: String },
});
advanceHistorySchema.plugin(timestamps);
mongoose.model("advance_history", advanceHistorySchema);
module.exports = mongoose.model("advance_history");
