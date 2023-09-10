const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const middleware = [
  express.json(),
  express.urlencoded({ extended: false }),
  cors(),
  morgan("dev"),
];

module.exports = middleware;
