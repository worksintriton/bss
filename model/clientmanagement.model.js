const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const clientManagementSchema = new mongoose.Schema({
  login: { type: String },
  password: { type: String },
  company_name: { type: String },
  company_type: { type: String },
  address: { type: String },
});
clientManagementSchema.plugin(timestamps);
mongoose.model("client_management", clientManagementSchema);
module.exports = mongoose.model("client_management");
