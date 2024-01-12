const url = require('url')

const shortid = require("shortid");
const validUrl = require("valid-url");

const URL = require("../models/url");

const handleCreateShotUrl = async (req, res) => {
  const shortID = shortid.generate();

  //   console.log(req.body.url);

  if (!req.body.url) {
    return res.status(400).json({ msg: "url required" });
  }
  if (validUrl.isUri(req.body.url)) {
    await URL.create({
      redirectUrl: req.body.url,
      shotId: shortID,
      visitHistory: [],
    });
    return res.render('url',{
      newUrlId : {shortId : shortID , ReUrl : req.body.url, host : url.host}
    })

    return res.json({
      msg: "url recived",
      url: req.body.url,
      shortUrl: shortID,
    });
  } else {
    return res
      .status(400)
      .json({
        msg: `${req.body.url} is not a perfect url`,
        "Url example": "https://google.com",
      });
  }
};

const handleGetAllUrl = async (req, res) => {
  const allUrls = await URL.find({});
  const html = `
  <html>
  <head>
  <title>All Urls</title>
  </head>
  <body>
  <section>
  <div>
  ${allUrls
    .map(
      (url) => `
        <ul>
        <li>Original Url : ${url.redirectUrl}</li>
        <li>Short Url : <a href="http://localhost:8000/url/${url.shotId}" target="_blank">${url.shotId}</a></li>
        <li>Number Of Clicks : ${url.visitHistory.length}</li>
        </ul>`
    )
    .join("")} 
        </div>
        </section>
        </body>
        </html>
        `;
  res.send(html);
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
  console.log(entry);
  try {
    res.redirect(entry.redirectUrl);
  } catch (err) {
    res.send(`<h1>your url is invalid</h1>`);
  }
};

module.exports = { handleCreateShotUrl, handleGetAllUrl, handleRedirectById };

// if (validUrl.isUri(suspect)){
//     console.log('Looks like an URI');
// } else {
//     console.log('Not a URI');
// }
