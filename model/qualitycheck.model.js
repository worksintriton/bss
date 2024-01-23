const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const qualityCheckSchema = new mongoose.Schema({
  date: { type: Date },
  time: { type: Date },
  unit_name: { type: String },
  unit_in_charge: { type: String },
  contact_no: { type: Number },
  unit_strength: { type: String },
  roll_call: { type: String },
  uniform_deficiency: { type: String },
  no_of_duty: { type: String },
  availability: { type: String },
  kl_duty_post: { type: String },
  kl_fire_emergency: { type: String },
  details_of_bsspl: { type: String },
  regularity_of_ops: { type: String },
  regularity_of_night: { type: String },
  last_training_details: { type: String },
  Weak_arears: { type: String },
  quality_remarks: { type: String },
  client_remarks: { type: String },
  client_name: { type: String },
  client_contact: { type: String },
  mail_id: { type: String },
  Remarks_by_cod: { type: String },
});
qualityCheckSchema.plugin(timestamps);
mongoose.model("quality_check", qualityCheckSchema);
module.exports = mongoose.model("quality_check");
