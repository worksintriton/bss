const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const payRollManualUnitEntry = new mongoose.Schema({
  company: { type: String },
  unit_code: { type: String },
  option: { type: String },
  salary_type: { type: String },
  unit_name: { type: String },
  day_month: { type: String },
  pf_cover: { type: String },
  pf_amount: { type: String },
  esi_cover: { type: String },
  esi_amount: { type: String },
  esi_code: { type: String },
  esi_district: { type: String },
  pf_basic: { type: String },
  pf_da: { type: String },
  pf_hra: { type: String },
  pf_trv: { type: String },
  esi_basic: { type: String },
  esi_da: { type: String },
  esi_hra: { type: String },
  esi_trv: { type: String },
  esi_protax: { type: String },
  salary_type_amount: { type: String },
  day_month_date: { type: String },
  pf_amount_amount: { type: String },
});
payRollManualUnitEntry.plugin(timestamps);
mongoose.model("payroll_manual_unit_entry", payRollManualUnitEntry);
module.exports = mongoose.model("payroll_manual_unit_entry");
