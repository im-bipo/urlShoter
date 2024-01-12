const express = require("express");
const URL = require("../models/url");
const { checkLogin } = require("../middlewares/auth");

const router = express.Router();

router
  .get("/", checkLogin, async (req, res) => {
    urlsCreatedByUser = await URL.find({
      createdBy: req.user?._id,
    });
    if(req.isUserLogin)
    {
       res.render("home", {
        Urls: urlsCreatedByUser,
        isLogin: req.isUserLogin,
        userName : req.user.name
      });
    }
    else{
      res.render("home", {
        Urls: urlsCreatedByUser,
      });
    }
  })
  .get("/about", (req, res) => {
    res.send(`<h1>about us </h1>`);
  });

module.exports = router;
