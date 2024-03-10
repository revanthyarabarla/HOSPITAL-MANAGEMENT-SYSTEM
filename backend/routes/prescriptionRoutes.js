const express = require("express");
const router = express.Router();

const doctorAuth = require("./middlewares/doctorAuth.js");
const userAuth = require("./middlewares/userAuth");
const prescriptioncontroller = require("../controllers/prescriptionController");

router.post(
  "/prescriptions",
  userAuth,
  prescriptioncontroller.getPrescriptions
);
router.post(
  "/prescription",
  doctorAuth,
  prescriptioncontroller.savePrescription
);

module.exports = router;
