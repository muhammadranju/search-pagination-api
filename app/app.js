const express = require("express");
const app = express();
app.use([require("./middleware"), require("../routes/preFix.js")]);
app.use((req, res, next) => {
  return res.status(404).send(`not found ${req.url}`);
});
module.exports = app;
