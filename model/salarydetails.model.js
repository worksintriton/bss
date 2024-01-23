const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const salaryDetailsSchema = new mongoose.Schema({
  employee_name: { type: String },
  employee_type: { type: String },
  employee_id: { type: String },
  bank_name: { type: String },
  account_number: { type: String },
  ifscnumber: { type: String },
  phonenumber: { type: String },
  emailid: { type: String },
  basic: { type: String },
  da: { type: String },
  hra: { type: String },
  others: { type: String },
  leave: { type: String },
  bouns: { type: String },
  weeklyoff: { type: String },
  noofdays: { type: String },
  gross: { type: String },
  pf: { type: String },
  esi: { type: String },
  prtax: { type: String },
  adv: { type: String },
  uniform: { type: String },
  mess: { type: String },
  rent: { type: String },
  atm: { type: String },
  loan: { type: String },
  otherss: { type: String },
  totaldedcation: { type: String },
  netamount: { type: String },
  site_name: { type: String },
  date: { type: String },
  additional_duty: { type: String },
  duty_amount: { type: String },
  total_amount: { type: String },
});
salaryDetailsSchema.plugin(timestamps);
mongoose.model("salary_details", salaryDetailsSchema);
module.exports = mongoose.model("salary_details");
