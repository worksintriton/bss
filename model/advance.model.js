const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const advanceSchema = new mongoose.Schema({
  employee_id: { type: String },
  employee_name: { type: String },
  account_number: { type: String },
  pamount: { type: String },
  pbalanceamount: { type: String },
  pinstalment: { type: String },
  ppendinginstalment: { type: String },
  dfullcash: { type: String },
  dpaytype: { type: String },
  ddate: { type: String },
  damount: { type: String },
  daddi: { type: String },
  dnaration: { type: String },
  advance_type: { type: String },
  company_name: { type: String },
  site: { type: String },
  status: { type: String },
  loan_number: { type: String },
  cdate: { type: String },
});
advanceSchema.plugin(timestamps);
mongoose.model("advance", advanceSchema);
module.exports = mongoose.model("advance");
