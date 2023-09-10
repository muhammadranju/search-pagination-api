require("dotenv").config();
const mongoose = require("mongoose");

const dbConnect = mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connection Successfully"))
  .catch((err) => console.log("Error Is= " + err));

module.exports = dbConnect;
