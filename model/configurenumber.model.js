const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const configureNumberSchema = new mongoose.Schema({
  field: { type: String },
  number: { type: Number },
});
configureNumberSchema.plugin(timestamps);
mongoose.model("configure_number", configureNumberSchema);
module.exports = mongoose.model("configure_number");
