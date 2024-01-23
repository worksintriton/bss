const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const notificationSchema = new mongoose.Schema({
  client_id: { type: String },
  client_name: { type: String },
  site_id: { type: String },
  site_name: { type: String },
  contract_start_date: { type: String },
  contract_end_date: { type: String },
  invoice_cycle: { type: String },
  contract_type: { type: String },
  user_id: { type: String },
  status: { type: String },
  contract_id: { type: String },
  date: { type: String },
});
notificationSchema.plugin(timestamps);
mongoose.model("notification", notificationSchema);
module.exports = mongoose.model("notification");
