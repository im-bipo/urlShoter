const express = require("express");
const URL = require("../models/url");

const router = express.Router();

router
  .get("/", async (req, res) => {
    res.render('home',{
      Urls : await URL.find({})
    })
  })
  .get("/about", (req, res) => {
    res.send(`<h1>about us </h1>`);
  });

module.exports = router;
