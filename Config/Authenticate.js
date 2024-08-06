const jwt = require("jsonwebtoken");
const { User } = require("../Model/Auth.model");

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .json({ message: "Unauthorized- No token provided" })
        .status(401);
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.json({ message: "Unauthorized- Invalid Token" }).status(401);
    }
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.json({ message: "User not found" }).status(404);
    }
    req.user = user;
    next();
  } catch (error) {
    return res.json({ error: "Internal Server Error", error }).status(500);
  }
};

module.exports = { protectRoute };
