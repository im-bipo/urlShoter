const url = require("url");
const dotenv = require("dotenv");

const shortid = require("shortid");
const validUrl = require("valid-url");

const URL = require("../models/url");

dotenv.config();

const handleCreateShotUrl = async (req, res) => {
  const shortID = shortid.generate();

  if (!req.body.url) {
    return res.status(400).render("error", {
      msg: "Url Required",
      UrlExample: "https://www.google.com",
    });
  }
  if (validUrl.isUri(req.body.url)) {
    await URL.create({
      redirectUrl: req.body.url,
      shotId: shortID,
      visitHistory: [],
      createdBy: req.user._id,
    });
    return res.render("url", {
      newUrlId: { shortId: shortID, ReUrl: req.body.url, host: process.env.DOMAIN_PATH+'/'+shortID },
    });
  } else {
    return res.render("error", {
      req : req.body.url,
      msg: "Invalid Url",
      UrlExample: "https://www.google.com",
    });
  }
};

const handleRedirectById = async (req, res) => {
  const shotId = req.params.id;
  const entry = await URL.findOneAndUpdate(
    { shotId },
    {
      $push: {
        visitHistory: {
          timeStamp: Date.now(),
        },
      },
    }
  );
  try {
    res.redirect(entry.redirectUrl);
  } catch (err) {
    res.send(`<h1>your url is invalid</h1>`);
  }
};

module.exports = { handleCreateShotUrl, handleRedirectById };
