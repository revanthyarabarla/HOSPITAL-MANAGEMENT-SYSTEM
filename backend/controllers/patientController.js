const Patient = require("../models/patientModels");
const Prescription = require("../models/prescriptionModels.js");
const User = require("../models/userModels");

const getPatients = async (req, res) => {
  try {
    var searchpatient = new RegExp(req.query.name, "i");

    let patients = [];
    if (!searchpatient) {
      patients = await Patient.find({}).populate("userId");
    } else {
      patients = await Patient.find()
        .populate({
          path: "userId",
          select: "firstName lastName email username",
          match: {
            $or: [
              { firstName: { $regex: searchpatient } },
              { lastName: { $regex: searchpatient } },
              { email: { $regex: searchpatient } },
            ],
          },
        })
        .then((patients) =>
          patients.filter((patient) => patient.userId != null)
        );
    }

    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate("userId");
    res.json(patient);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const isPatientValid = (newPatient) => {
  let errorList = [];
  if (!newPatient.firstName) {
    errorList[errorList.length] = "Please enter first name";
  }
  if (!newPatient.lastName) {
    errorList[errorList.length] = "Please enter last name";
  }
  if (!newPatient.email) {
    errorList[errorList.length] = "Please enter email";
  }
  if (!newPatient.password) {
    errorList[errorList.length] = "Please enter password";
  }

  if (!newPatient.phone) {
    errorList[errorList.length] = "Please enter phone";
  }

  if (errorList.length > 0) {
    result = {
      status: false,
      errors: errorList,
    };
    return result;
  } else {
    return { status: true };
  }
};

const savePatient = async (req, res) => {
  try {
    let newPatient = req.body;
    let PatientValidStatus = isPatientValid(newPatient);

    if (!PatientValidStatus.status) {
      return res.status(400).json({
        message: "error",
        errors: PatientValidStatus.errors,
      });
    }

    // Create a new User
    const userDetails = await User.create({
      email: newPatient.email,
      username: newPatient.username,
      firstName: newPatient.firstName,
      lastName: newPatient.lastName,
      password: newPatient.password,
      userType: "Patient",
      activated: true,
    });

    await Patient.create({
      userId: userDetails._id,
      phone: newPatient.phone,
      address: newPatient.address,
      gender: newPatient.gender,
      dob: newPatient.dob,
    });

    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(400).json({ message: "error", errors: [error.message] });
  }
};

const updatePatient = async (req, res) => {
  let newPatient = req.body;
  let PatientValidStatus = isPatientValid(newPatient);
  if (!PatientValidStatus.status) {
    res.status(400).json({
      message: "error",
      errors: PatientValidStatus.errors,
    });
  } else {
    try {
      const updatedPatient = await Patient.updateOne(
        { _id: req.params.id },
        {
          $set: {
            phone: req.body.phone,
            address: req.body.address,
            gender: req.body.gender,
            dob: req.body.dob,
          },
        }
      );

      const updateduser = await User.updateOne(
        { _id: req.body.userId },
        {
          $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
          },
        }
      );

      res.status(200).json({ message: "success" });
    } catch (error) {
      res.status(400).json({ message: "error", errors: [error.message] });
    }
  }
};

const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate("userId");

    const deletedPatient = await Patient.deleteOne({ _id: req.params.id });

    const deleteduser = await User.deleteOne({ _id: patient.userId._id });

    res.status(200).json(deletedPatient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getPatientHistory = async (req, res) => {
  try {
    let prescriptions = await Prescription.find()
      .populate({
        path: "prescribedMed.medicineId",
      })
      .populate({
        path: "appointmentId",
        match: { patientId: req.params.id },
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

    res.status(200).json({
      message: "success",
      prescriptions: prescriptions,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getPatients,
  getPatientById,
  savePatient,
  updatePatient,
  deletePatient,
  getPatientHistory,
};
