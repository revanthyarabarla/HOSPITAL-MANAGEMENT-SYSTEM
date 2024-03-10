const Prescription = require("../models/prescriptionModels.js");
const Appointment = require("../models/appointmentModels.js");

const getPrescriptions = async (req, res) => {
  try {
    const userType = req.sender.userType;
    let prescriptions = [];

    const searchpatient = req.body.patientId;
    const searchdoctor = req.sender.doctorId;

    const matchdoctorpatient = {};

    if (searchpatient) {
      matchdoctorpatient.patientId = searchpatient;
    }

    if (searchdoctor) {
      matchdoctorpatient.doctorId = searchdoctor;
    }

    if (searchpatient && searchdoctor) {
      matchdoctorpatient.patientId = searchpatient;
      matchdoctorpatient.doctorId = searchdoctor;
    }

    prescriptions = await Prescription.find({})
      .populate({
        path: "prescribedMed.medicineId",
      })
      .populate({
        path: "appointmentId",
        match: matchdoctorpatient,
        populate: [
          {
            path: "patientId",
            populate: {
              path: "userId",
            },
          },
          {
            path: "doctorId",
            populate: {
              path: "userId",
            },
          },
        ],
      })
      .then((prescriptions) =>
        prescriptions.filter((pre) => pre.appointmentId != null)
      );

    res.json({ message: "success", prescriptions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const savePrescription = async (req, res) => {
  try {
    const prescription = req.body;

    const prescriptionDetails = await Prescription.create(prescription);
    await Appointment.findByIdAndUpdate(prescription.appointmentId, {
      completed: 1,
    });

    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(400).json({ message: "error", errors: [error.message] });
  }
};

module.exports = {
  getPrescriptions,
  savePrescription,
};
