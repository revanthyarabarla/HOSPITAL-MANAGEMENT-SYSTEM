const express = require("express");
const router = express.Router();
const doctorAuth = require("./middlewares/doctorAuth.js");

const patient = require("../controllers/patientController.js");

router.get("/patients", patient.getPatients);
router.get("/patients/:id", patient.getPatientById);
router.post("/patients", patient.savePatient);
router.put("/patients/:id", patient.updatePatient);
router.delete("/patients/:id", patient.deletePatient);
router.get("/patients/history/:id", doctorAuth, patient.getPatientHistory);

module.exports = router;
