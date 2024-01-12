const express = require("express");

//middleware for auth
const {restrictToLoginUser} = require("../middlewares/auth");


const {
  handleCreateShotUrl,
  handleRedirectById,
} = require("../controllers/url");

const urlRouter = express.Router();

urlRouter
  .route("/")
  .get((req, res) => res.redirect("/"))
  .post(restrictToLoginUser, handleCreateShotUrl);
urlRouter.route("/:id").get(handleRedirectById);

module.exports = urlRouter;
