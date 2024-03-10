const express = require("express");
const router = express.Router();

const doctorcontroller = require("../controllers/doctorController");

router.get("/doctors", doctorcontroller.getDoctors);
router.get("/doctors/:id", doctorcontroller.getDoctorById);
router.post("/doctors", doctorcontroller.saveDoctor);
router.put("/doctors/:id", doctorcontroller.updateDoctor);
router.delete("/doctors/:id", doctorcontroller.deleteDoctor);

module.exports = router;
