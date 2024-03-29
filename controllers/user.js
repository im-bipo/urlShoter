const User = require("../models/users");
const { setUser } = require("../service/auth");

const UserSignUpPage = async (req, res) => {
  res.render("signUp");
};
const UserlogInPage = async (req, res) => {
  res.render("logIn");
};
const createNewUser = async (req, res) => {
  const result = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  
  const tooken = setUser(result);
  res.cookie("uid", tooken);
  res.redirect("/");
};
const handleUserLogIn = async (req, res) => {
  email = req.body.email;
  password = req.body.password;
  const user = await User.findOne({ email, password });
  if (!user)
    return res.render("login", {
      error: "invalid email or password",
    });

  const tooken = setUser(user);
  res.cookie("uid", tooken);
  return res.redirect("/");
};

module.exports = {
  UserSignUpPage,
  UserlogInPage,
  createNewUser,
  handleUserLogIn,
};
