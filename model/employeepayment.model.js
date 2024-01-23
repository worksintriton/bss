const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const employeePaymentSchema = new mongoose.Schema({
  site_id: { type: String },
  employee_type: { type: String },
  basic: { type: String },
  da: { type: String },
  additional_hours: { type: String },
  others: { type: String },
  subtotala: { type: String },
  leave: { type: String },
  subtotalb: { type: String },
  pf: { type: String },
  esi: { type: String },
  gratuity: { type: String },
  bouns: { type: String },
  subtotalc: { type: String },
  total: { type: String },
  weekly_off: { type: String },
  agency_charges: { type: String },
  subtotal: { type: String },
  rounded_off: { type: String },
  id: { type: String },
});
employeePaymentSchema.plugin(timestamps);
mongoose.model("employee_payment", employeePaymentSchema);
module.exports = mongoose.model("employee_payment");
