const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const companySchema = new mongoose.Schema({
  company_name: { type: String },
  area: { type: String },
  company_address: { type: String },
  company_bank_name: { type: String },
  company_bank_a_c_no: { type: String },
  company_bank_ifsc: { type: String },
  company_bank_branch: { type: String },
  company_gst_tax_reg_no: { type: String },
  company_pan_no: { type: String },
  company_cin_no: { type: String },
  company_pf_code_no: { type: String },
  company_esi_code_no: { type: String },
});
companySchema.plugin(timestamps);
mongoose.model("company", companySchema);
module.exports = mongoose.model("company");
