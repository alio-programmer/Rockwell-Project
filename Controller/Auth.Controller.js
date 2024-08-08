const bcrypt = require("bcryptjs");
const { User } = require("../Model/Auth.model");
const { generatetoken } = require("../Common/Generatetoken");

const signup = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;
    const isusername = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });
    if (isusername) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });
    if (newUser) {
      generatetoken(newUser._id, res);
      const response = {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      };
      return res
        .json({ response, message: "User created successfully" })
        .status(201);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields not provided" }).status(400);
    }
    const finduser = await User.findOne({ email });
    if (!finduser) {
      return res.json({ message: "user not found" }).status(404);
    }
    const ispasswordtrue = await bcrypt.compare(password, finduser.password);
    if (!ispasswordtrue) {
      return res.json({ message: "password is incorrect" }).status(400);
    }
    generatetoken(finduser._id, res);
    res.status(200).json({
      _id: finduser._id,
      username: finduser.username,
      email: finduser.email,
    });
  } catch (error) {
    return res.json({ error: "Internal server error" }).status(500);
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.json({ message: "logged out successfully" }).status(200);
  } catch (error) {
    return res.json({ error: "Internal server error" }).status(500);
  }
};

module.exports = { signup, login, logout };
