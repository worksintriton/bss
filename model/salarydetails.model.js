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
  phonenumber: { type: Number },
  emailid: { type: String },
  basic: { type: Number },
  da: { type: Number },
  hra: { type: String },
  others: { type: Number },
  leave: { type: Number },
  bouns: { type: Number },
  weeklyoff: { type: Number },
  noofdays: { type: Number },
  gross: { type: Number },
  pf: { type: Number },
  esi: { type: Number },
  prtax: { type: Number },
  adv: { type: Number },
  uniform: { type: String },
  mess: { type: String },
  rent: { type: Number },
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
  epf: { type: Number },
  net: { type: Number },
});
salaryDetailsSchema.plugin(timestamps);
mongoose.model("salary_details", salaryDetailsSchema);
module.exports = mongoose.model("salary_details");
