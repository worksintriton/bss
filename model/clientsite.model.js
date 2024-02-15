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
  lon1: { type: String },
  lon2: { type: String },
  lon3: { type: String },
  lon4: { type: String },
  lon5: { type: String },
  contactDetails: { type: Array },
  company_name: { type: String },
  billing_address: { type: String },
  isActive: { type: Boolean, default: true },
});
clientSiteSchema.plugin(timestamps);
mongoose.model("client_site", clientSiteSchema);
module.exports = mongoose.model("client_site");
