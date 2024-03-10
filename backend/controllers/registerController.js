const User = require("../models/userModels");
const Doctor = require("../models/doctorModels");
const Patient = require("../models/patientModels");
require("dotenv").config();
const crypto = require("crypto");
const nodemailer = require("nodemailer");

//User Validation
const isUserValid = (newUser) => {
  const errorList = [];
  const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (!newUser.firstName) {
    errorList.push("Please enter first name");
  } else if (!nameRegex.test(newUser.firstName)) {
    errorList.push("First name is invalid");
  }
  if (!newUser.lastName) {
    errorList.push("Please enter last name");
  } else if (!nameRegex.test(newUser.lastName)) {
    errorList.push("Last name is invalid");
  }

  if (!newUser.email) {
    errorList.push("Please enter email");
  } else if (!emailRegex.test(newUser.email)) {
    errorList.push("Invalid email format");
  }

  if (!newUser.password) {
    errorList.push("Please enter password");
  }

  if (!newUser.userType) {
    errorList.push("Please enter User Type");
  }

  if (errorList.length > 0) {
    return { status: false, errors: errorList };
  } else {
    return { status: true };
  }
};

const saveVerificationToken = async (userId, verificationToken) => {
  await User.findOneAndUpdate(
    { _id: userId },
    { verificationToken: verificationToken }
  );
};

const generateVerificationToken = () => {
  const token = crypto.randomBytes(64).toString("hex");
  const expires = Date.now() + 3 * 60 * 60 * 1000;
  return {
    token: token,
    expires: expires,
  };
};

const sendVerificationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Verify your email address",
    text: `Please click the following link to verify your email address: http://localhost:8080//api/verify/${token}`,
    html: `<p>Please click this link to verify your account:</p> <a href="http://localhost:8080/api/verify/${token}">Verify</a>`,
  };

  return await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

// SignUp Function
const signUp = async (req, res) => {
  const newUser = req.body;

  const userValidStatus = isUserValid(newUser);
  if (!userValidStatus.status) {
    res.status(400).json({ message: "error", errors: userValidStatus.errors });
  } else {
    try {
      const userDetails = await User.create({
        email: newUser.email,
        username: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        password: newUser.password,
        userType: newUser.userType,
      });

      // const verificationToken = generateVerificationToken();
      // await saveVerificationToken(userDetails._id, verificationToken);

      if (newUser.userType === "Doctor") {
        const doctorDetails = await Doctor.create({
          userId: userDetails._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          username: newUser.email,
        });

        // await sendVerificationEmail(userDetails.email, verificationToken.token);

        res.json({ message: "success" });
        return;
      } else if (newUser.userType === "Patient") {
        const patientDetails = await Patient.create({
          userId: userDetails._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          username: newUser.email,
        });

        // await sendVerificationEmail(userDetails.email, verificationToken.token);

        res.json({ message: "success" });
        return;
      }
      res.json({ message: "success" });
    } catch (error) {
      res.status(400).json({ message: "error", errors: [error.message] });
    }
  }
};

// Verify User
const verifyUser = async (req, res) => {
  const token = req.params.id;

  try {
    const user = await User.findOneAndUpdate(
      {
        "verificationToken.token": token,
        "verificationToken.expires": { $gt: Date.now() },
      },
      {
        activated: true,
        "verificationToken.token": null,
      }
    );

    if (!user) {
      console.log("Email could not be verified");
      res.status(500).json({ message: "Error verifying account" });
    } else {
      console.log("Email verified");
      res.send("Email verified");
    }
  } catch (error) {
    res.status(500).json({ message: "Error verifying account", error });
  }
};

module.exports = {
  signUp,
  verifyUser,
};
