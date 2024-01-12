const url = require("url");

const shortid = require("shortid");
const validUrl = require("valid-url");

const URL = require("../models/url");

const handleCreateShotUrl = async (req, res) => {
  const shortID = shortid.generate();


  if (!req.body.url) {
    return res.status(400).json({ msg: "url required" });
  }
  if (validUrl.isUri(req.body.url)) {
    await URL.create({
      redirectUrl: req.body.url,
      shotId: shortID,
      visitHistory: [],
      createdBy : req.user._id
    });
    return res.render("url", {
      newUrlId: { shortId: shortID, ReUrl: req.body.url, host: url.host },
    });
  } else {
    return res.status(400).json({
      msg: `${req.body.url} is not a perfect url`,
      "Url example": "https://google.com",
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
