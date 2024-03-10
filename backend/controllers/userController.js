const User = require("../models/userModels");
const Patient = require("../models/patientModels");
const Doctor = require("../models/doctorModels");

//Get User by Id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Validation
const isUserValid = (newUser) => {
  let errorList = [];
  if (!newUser.firstName) {
    errorList.push("Please enter first name");
  }
  if (!newUser.lastName) {
    errorList.push("Please enter last name");
  }
  if (!newUser.email) {
    errorList.push("Please enter email");
  }
  if (!newUser.password) {
    errorList.push("Please enter password");
  }

  if (!newUser.userType) {
    errorList.push("Please enter User Type");
  }

  if (errorList.length > 0) {
    return {
      status: false,
      errors: errorList,
    };
  } else {
    return { status: true };
  }
};

// Add User to Database
const saveUser = async (req, res) => {
  let newUser = req.body;
  let userValidStatus = isUserValid(newUser);
  if (!userValidStatus.status) {
    res.status(400).json({
      message: "error",
      errors: userValidStatus.errors,
    });
  } else {
    try {
      const userDetails = await User.create({
        email: newUser.email,
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        password: newUser.password,
        userType: newUser.userType,
        activated: true,
      });

      if (newUser.userType === "Doctor") {
        await Doctor.create({
          userId: userDetails._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
        });
      }

      if (newUser.userType === "Patient") {
        await Patient.create({
          userId: userDetails._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
        });
      }

      res.status(200).json({ message: "success" });
    } catch (error) {
      res.status(400).json({ message: "error", errors: [error.message] });
    }
  }
};
//Get User
const getUsers = async (req, res) => {
  try {
    var name = req.query.name;
    var role = req.query.role;

    let conditions = [];

    if (name) {
      conditions.push({ firstName: name });
      conditions.push({ lastName: name });
    }

    if (role) {
      conditions.push({ userType: role });
    }

    let users = [];
    if (conditions.length === 0) {
      users = await User.find({});
    } else {
      console.log(conditions);

      users = await User.find({
        $or: conditions,
      });
    }

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update User
const updateUser = async (req, res) => {
  let newUser = req.body;
  let userValidStatus = isUserValid(newUser);
  if (!userValidStatus.status) {
    res.status(400).json({
      message: "error",
      errors: userValidStatus.errors,
    });
  } else {
    try {
      await User.updateOne({ _id: req.params.id }, { $set: req.body });
      res.status(200).json({ message: "success" });
    } catch (error) {
      res.status(400).json({ message: "error", errors: [error.message] });
    }
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user.userType === "Doctor") {
      await Doctor.deleteOne({ userId: req.params.id });
    }

    if (user.userType === "Patient") {
      await Patient.deleteOne({ userId: req.params.id });
    }

    const deletedUser = await User.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  saveUser,
  updateUser,
  deleteUser,
};
