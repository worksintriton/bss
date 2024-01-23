const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const paymentSchema = new mongoose.Schema({
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
  ebasic: { type: String },
  eda: { type: String },
  eadditional_hours: { type: String },
  eothers: { type: String },
  esubtotala: { type: String },
  eleave: { type: String },
  esubtotalb: { type: String },
  epf: { type: String },
  eesi: { type: String },
  egratuity: { type: String },
  ebound: { type: String },
  esubtotalc: { type: String },
  etotal: { type: String },
  eweekly_off: { type: String },
  eagency_charges: { type: String },
  esubtotal: { type: String },
  erounded_off: { type: String },
});
paymentSchema.plugin(timestamps);
mongoose.model("payment", paymentSchema);
module.exports = mongoose.model("payment");
