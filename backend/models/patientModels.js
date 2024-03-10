const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// Patient Schema
const PatientSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  gender: {
    type: String,
  },
  dob: {
    type: String,
  },
  email: {
    type: String,
  },
});

const Patient = mongoose.model("Patient", PatientSchema);

module.exports = Patient;
