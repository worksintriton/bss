const mongoose = require("mongoose");

const db = async () => {
  mongoose
    .connect("mongodb://localhost:27017/test")
    .then(() => {
      console.log("DB Connected");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = { db };
