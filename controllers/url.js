const shortid = require("shortid");
const URL = require("../models/url");

const handleCreateShotUrl = async (req, res) => {
  const shortID = shortid.generate();
  if (!req.body.url) return res.status(400).json({ msg: "url required" });
  await URL.create({
    redirectUrl: req.body.url,
    shotId: shortID,
    visitHistory: [],
  });
  return res.json({ msg: "url recived", url: req.body.url, shortUrl: shortID });
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
  const entry  = await URL.findOneAndUpdate(
    { shotId },{
        $push :{
            visitHistory : {
                timeStamp : Date.now()
            }
        }
    }
  );
    console.log(entry);
    try {
        res.redirect(entry.redirectUrl);
    } catch (err) {
        res.send(`<h1>your url is invalid</h1>`)
    }
};

module.exports = { handleCreateShotUrl, handleGetAllUrl, handleRedirectById };
