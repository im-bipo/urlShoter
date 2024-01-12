const express = require("express");
const { handleCreateShotUrl, handleGetAllUrl, handleRedirectById } = require("../controllers/url");

const urlRouter = express.Router();

urlRouter.route("/").get(handleGetAllUrl).post(handleCreateShotUrl);
urlRouter.route("/:id").get(handleRedirectById)

module.exports = urlRouter;
