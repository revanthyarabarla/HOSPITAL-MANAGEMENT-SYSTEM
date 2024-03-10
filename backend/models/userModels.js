const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var uniqueValidator = require("mongoose-unique-validator");

//User Schema
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Please provide username"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
    },
    activated: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      token: { type: String },
      expires: { type: Date },
    },
    firstName: {
      type: String,
      required: [true, "Please provide first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide last name"],
    },
    userType: {
      type: String,
      required: true,
      enum: ["Admin", "Patient", "Doctor"],
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(uniqueValidator, { message: "{PATH} must be unique" });

// Hashing password
UserSchema.pre("save", async function (next) {
  try {
    const user = this;
    if (!user.isModified("password")) {
      return next();
    }
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

// Hashing password before Updating
UserSchema.pre("updateOne", async function (next) {
  try {
    const password = this.getUpdate().$set.password;

    if (!password) {
      return next();
    }

    const hash = await bcrypt.hash(password, 10);
    this.getUpdate().$set.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
