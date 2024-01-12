const { getUser } = require("../service/auth");

const restrictToLoginUser =  (req, res, next) => {
  if (!req.cookies?.uid) return res.redirect("./user/login");
  const user = getUser(req.cookies.uid);
  if (!user) return res.redirect("./user/login");
  req.user = user;
  next();
};

const checkLogin = (req,res,next) =>{
  if (req.cookies?.uid) {
    const user = getUser(req.cookies.uid);
    req.user = user;
  }
  else req.user = null
  next();
}

module.exports = {restrictToLoginUser,checkLogin};
