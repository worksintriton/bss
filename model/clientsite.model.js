const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const clientSiteSchema = new mongoose.Schema({
  client_id: { type: String },
  title: { type: String },
  description: { type: String },
  address: { type: String },
  lat1: { type: String },
  lat2: { type: String },
  lat3: { type: String },
  lat4: { type: String },
  lat5: { type: String },
  long1: { type: String },
  long2: { type: String },
  long3: { type: String },
  long4: { type: String },
  long5: { type: String },
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
