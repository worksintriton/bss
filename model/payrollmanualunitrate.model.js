const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const payRollManualUnitRate = new mongoose.Schema({
  rank: { type: String },
  basic: { type: String },
  da: { type: String },
  hra: { type: String },
  trv_exp: { type: String },
  others: { type: String },
  medical: { type: String },
  others1: { type: String },
  others2: { type: String },
  others3: { type: String },
  others4: { type: String },
  total_pay: { type: String },
  pf: { type: String },
  esi: { type: String },
  dec: { type: String },
  total: { type: String },
  unit_id: { type: String },
});
payRollManualUnitRate.plugin(timestamps);
mongoose.model("payroll_manual_unit_rate", payRollManualUnitRate);
module.exports = mongoose.model("payroll_manual_unit_rate");
