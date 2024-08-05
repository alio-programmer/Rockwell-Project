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
      return res.status(201).json(
        {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
        },
        { message: "User created successfully" }
      );
    }
  } catch (error) {
    return res.json({ error: "Internal Server Error", error }).status(500);
  }
};

modules.export = { signup };
