const express = require("express");
const Router = express.Router();

Router.get("/", (req, res) => {
  res.send("Server is up and Running").status(200);
});

module.exports = Router;
