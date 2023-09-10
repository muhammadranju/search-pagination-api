const preFix = require("express").Router();
const productRoute = require("./product/productRoute");
const userRoute = require("./user/userRoute");

preFix.use([productRoute, userRoute]);

// TODO: remove This [ /, /health] routes in future

preFix.get("/", (req, res) => {
  return res.status(200).send("<h1>Server is running...</h1>");
});
preFix.get("/health", (req, res) => {
  return res.status(200).send(`<h1>  message: Health is ok  </h1>`);
});
module.exports = preFix;
