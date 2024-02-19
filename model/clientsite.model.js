const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const clientSiteSchema = new mongoose.Schema({
  client_id: { type: String },
  title: { type: String },
  description: { type: String },
  address: { type: String },
  lat1: { type: Number },
  lat2: { type: Number },
  lat3: { type: Number },
  lat4: { type: Number },
  lat5: { type: Number },
  lon1: { type: Number },
  lon2: { type: Number },
  lon3: { type: Number },
  lon4: { type: Number },
  lon5: { type: Number },
  contactperson1: { type: String },
  contactnumber1: { type: String },
  contactemail1: { type: String },
  contactperson2: { type: String },
  contactnumber2: { type: String },
  contactemail2: { type: String },
  contactperson3: { type: String },
  contactnumber3: { type: String },
  contactemail3: { type: String },
  company_name: { type: String },
  billing_address: { type: String },
  city: { type: String },
  street: { type: String },
  state: { type: String },
  country: { type: String },
  area: { type: String },
  googleMapLocation: { type: String },
  postalCode: { type: String },
  result: { type: Object },
  isActive: { type: Boolean, default: true },
});
clientSiteSchema.plugin(timestamps);
mongoose.model("client_site", clientSiteSchema);
module.exports = mongoose.model("client_site");
