const express = require("express");
const router = express.Router();

const userAuth = require("./middlewares/userAuth");
const doctorAuth = require("./middlewares/doctorAuth");

const dashboard = require("../controllers/AdminDashController.js");
router.post("/count/users", userAuth, dashboard.getUserCountByRole);
router.get("/count/appointments", userAuth, dashboard.getAppointmentCount);
router.get(
  "/count/patients/treated",
  doctorAuth,
  dashboard.getPatientsTreatedCount
);

module.exports = router;
