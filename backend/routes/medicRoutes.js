const express = require("express");
const router = express.Router();

const mediccotnroller = require("../controllers/medicControllers");

router.get("/medicines", mediccotnroller.getMedicines);
router.get("/medicines/:id", mediccotnroller.getMedicineById);
router.post("/medicines", mediccotnroller.saveMedicine);
router.put("/medicines/:id", mediccotnroller.updateMedicine);
router.delete("/medicines/:id", mediccotnroller.deleteMedicine);

module.exports = router;
