const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const contractPageSchema = new mongoose.Schema({
  site_id: { type: String },
  contract_start_date: { type: String },
  contract_end_date: { type: String },
  contract_type: { type: String },
  last_revision_date: { type: String },
  status: { type: String },
  invoice_cycle: { type: String },
});
contractPageSchema.plugin(timestamps);
mongoose.model("contract_page", contractPageSchema);
module.exports = mongoose.model("contract_page");
