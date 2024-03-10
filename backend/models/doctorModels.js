const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Doctor Schema
const DoctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  phone: {
    type: String,
  },
  department: {
    type: String,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
  },
});

const Doctor = mongoose.model("Doctor", DoctorSchema);

module.exports = Doctor;
