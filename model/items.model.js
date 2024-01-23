const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const itemsSchema = new mongoose.Schema({
  items: { type: String },
  rates: { type: String },
});
itemsSchema.plugin(timestamps);
mongoose.model("items", itemsSchema);
module.exports = mongoose.model("items");
