const express = require("express");
const middleware = require("./middleware");
const app = express();
app.use([require("./middleware"), require("../routes/preFix.js")]);
app.use((req, res, next) => {
  return res.status(404).send(message`not found ${req.url}`);
  next();
});
module.exports = app;
