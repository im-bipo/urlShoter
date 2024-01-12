const express = require("express");
const URL = require("../models/url");
const {checkLogin} = require("../middlewares/auth");

const router = express.Router();

router
  .get("/", checkLogin, async (req, res) => {
    
    urlsCreatedByUser = await URL.find({createdBy : req.user?._id})
    res.render("home", {
      Urls: urlsCreatedByUser,
    });
  })
  .get("/about", (req, res) => {
    res.send(`<h1>about us </h1>`);
  });

module.exports = router;
