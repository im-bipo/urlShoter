const jwt = require("jsonwebtoken");
const SEQURED = "DKkIU8734bcj2@fd";

const setUser = (user) => {
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    SEQURED
  );
  return token;
};
const getUser = (tooken) => {
  return jwt.verify(tooken,SEQURED);
};

module.exports = { setUser, getUser };