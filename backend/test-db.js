require("dotenv").config();
const mongoose = require("mongoose");

(async () => {
  try {
    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected");
  } catch (e) {
    console.error(e);
  }
})();