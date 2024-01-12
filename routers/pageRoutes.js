const express = require("express");

const router = express.Router();

router
  .get("/", (req, res) => {
    res.send(`<h1>home</h1>`);
  })
  .get("/about", (req, res) => {
    res.send(`<h1>about us </h1>`);
  });

module.exports = router;
