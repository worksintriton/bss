const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const clientSiteSchema = new mongoose.Schema({
  client_id: { type: String },
  title: { type: String },
  description: { type: String },
  address: { type: String },
  contactperson1: { type: String },
  contactnumber1: { type: String },
  contactemail1: { type: String },
  contactperson2: { type: String },
  contactnumber2: { type: String },
  contactemail2: { type: String },
  contactperson3: { type: String },
  contactnumber3: { type: String },
  contactemail3: { type: String },
  status: { type: String },
  company_name: { type: String },
  sitelogin: { type: String },
  sitepassword: { type: String },
  billing_address: { type: String },
  isActive: { type: Boolean, default: true },
});
clientSiteSchema.plugin(timestamps);
mongoose.model("client_site", clientSiteSchema);
module.exports = mongoose.model("client_site");
