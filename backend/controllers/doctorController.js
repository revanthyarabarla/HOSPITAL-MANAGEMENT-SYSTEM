const Doctor = require("../models/doctorModels");
const User = require("../models/userModels");

//Get Doctor By Id
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate("userId");
    res.json(doctor);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Doctor Vaidation
const isDoctorValid = (newdoctor) => {
  let errorList = [];
  if (!newdoctor.firstName) {
    errorList[errorList.length] = "Please enter first name";
  }
  if (!newdoctor.lastName) {
    errorList[errorList.length] = "Please enter last name";
  }
  if (!newdoctor.email) {
    errorList[errorList.length] = "Please enter email";
  }
  if (!newdoctor.password) {
    errorList[errorList.length] = "Please enter password";
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

// Add Doctor TO DataBase
const saveDoctor = async (req, res) => {
  try {
    let newdoctor = req.body;

    let doctorValidStatus = isDoctorValid(newdoctor);
    if (!doctorValidStatus.status) {
      return res.status(400).json({
        message: "error",
        errors: doctorValidStatus.errors,
      });
    }

    const userDetails = await User.create({
      email: newdoctor.email,
      username: newdoctor.username,
      firstName: newdoctor.firstName,
      lastName: newdoctor.lastName,
      password: newdoctor.password,
      userType: "Doctor",
      activated: true,
    });

    await Doctor.create({
      userId: userDetails._id,
      phone: newdoctor.phone,
      department: newdoctor.department,
    });

    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(400).json({ message: "error", errors: [error.message] });
  }
};

//get Doctor
const getDoctors = async (req, res) => {
  try {
    var searchdoctor = new RegExp(req.query.name, "i");

    let doctors = [];
    if (!searchdoctor) {
      doctors = await Doctor.find({}).populate("userId");
    } else {
      doctors = await Doctor.find()
        .populate({
          path: "userId",
          select: "firstName lastName email username",
          match: {
            $or: [
              { firstName: { $regex: searchdoctor } },
              { lastName: { $regex: searchdoctor } },
              { email: { $regex: searchdoctor } },
            ],
          },
        })
        .then((doctors) => doctors.filter((doctor) => doctor.userId != null));
    }

    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update Doctors
const updateDoctor = async (req, res) => {
  let newdoctor = req.body;

  let doctorValidStatus = isDoctorValid(newdoctor);
  if (!doctorValidStatus.status) {
    res.status(400).json({
      message: "error",
      errors: doctorValidStatus.errors,
    });
  } else {
    try {
      await Doctor.updateOne({ _id: req.params.id }, { $set: req.body });
      res.status(200).json({ message: "success" });
    } catch (error) {
      res.status(400).json({ message: "error", errors: [error.message] });
    }
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate("userId");

    const deleteddoctor = await Doctor.deleteOne({ _id: req.params.id });

    const deleteduser = await User.deleteOne({ _id: doctor.userId._id });
    res.status(200).json(deleteddoctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getDoctors,
  getDoctorById,
  saveDoctor,
  updateDoctor,
  deleteDoctor,
};
