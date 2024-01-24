const mongoose = require("mongoose");

async function db() {
  await mongoose
    .connect("mongodb://localhost:27017/bss", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB Connected");
    })
    .catch((error) => {
      console.log(error);
    });
}
db();

module.exports = db;
