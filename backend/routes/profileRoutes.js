const express = require("express");
const router = express.Router();

const profilecontroller = require("../controllers/profileController");

router.get("/profile/admin/:id", profilecontroller.getAdminByUserId);
router.put("/profile/admin/:id", profilecontroller.updateAdmin);

router.get("/profile/patient/:id", profilecontroller.getPatientByUserId);
router.put("/profile/patient/:id", profilecontroller.updatePatient);

router.get("/profile/doctor/:id", profilecontroller.getDoctorByUserId);
router.put("/profile/doctor/:id", profilecontroller.updateDoctor);

module.exports = router;
