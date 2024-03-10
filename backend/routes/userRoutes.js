const express = require("express");

const router = express.Router();

const adminAuth = require("./middlewares/adminAuth");
const usercontroller = require("../controllers/userController");
const logincontroller = require("../controllers/loginController");
const registercontroller = require("../controllers/registerController");

router.post("/register", registercontroller.signUp);
router.get("/verify/:id", registercontroller.verifyUser);
router.post("/login", logincontroller.loginUser);

router.get("/users", adminAuth, usercontroller.getUsers);
router.get("/users/:id", adminAuth, usercontroller.getUserById);
router.post("/users", adminAuth, usercontroller.saveUser);
router.put("/users/:id", adminAuth, usercontroller.updateUser);
router.delete("/users/:id", adminAuth, usercontroller.deleteUser);

module.exports = router;
