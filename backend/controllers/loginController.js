const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
const bcrypt = require("bcrypt");
require("dotenv").config();

const isLoginValid = (email, password) => {
  const errorList = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    errorList.push("Please enter email");
  } else if (!emailRegex.test(email)) {
    errorList.push("Invalid email format");
  }

  if (!password) {
    errorList.push("Please enter password");
  }

  if (errorList.length > 0) {
    return { status: false, errors: errorList };
  } else {
    return { status: true };
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const loginValidStatus = isLoginValid(email, password);
    if (!loginValidStatus.status) {
      return res
        .status(400)
        .json({ message: "error", errors: loginValidStatus.errors });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "error", errors: ["User not found"] });
    }

    const result = await bcrypt.compare(password, user.password);

    if (!result) {
      return res
        .status(401)
        .json({ message: "error", errors: ["Invalid password"] });
    }

    const currentUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      userType: user.userType,
      userId: user._id,
    };

    const token = jwt.sign(
      { id: user._id, userType: user.userType },
      process.env.SECRET_KEY,
      { expiresIn: "365d" }
    );
    res.json({ message: "success", user: currentUser, token: token });
  } catch (error) {
    res.status(500).json({ message: "error", errors: [error.message] });
  }
};

module.exports = {
  loginUser,
};
