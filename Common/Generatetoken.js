const jwt = require("jsonwebtoken");
const generatetoken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "strict",
    // secure: process.env.NODE_ENV === "production" ? true : false,
    // strict: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    domain: process.env.NODE_ENV === "production" ? ".onrender.com" : "",
    path: "/",
  });
};

module.exports = { generatetoken };
