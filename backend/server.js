const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser"); // Changed from bodyparser to bodyParser
const app = express();
require("dotenv").config();

const port = 8080;
const dbconnection = require("./utilis/db");

const userroutes = require("./routes/userRoutes");
const profileroutes = require("./routes/profileRoutes");
const prescriptionroutes = require("./routes/prescriptionRoutes");
const doctorroutes = require("./routes/doctorRoutes");
const medicroutes = require("./routes/medicRoutes");
const dashboardroutes = require("./routes/DashboardRoutes");
const patientroutes = require("./routes/patientRoutes");
const AppointmentRoute = require("./routes/AppointmentRoute.js");
const InvoiceRoute = require("./routes/InvoiceRoute.js");

app.use(bodyParser.json()); // Use bodyParser.json() for JSON parsing
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/api", userroutes);
app.use("/api", profileroutes);
app.use("/api", doctorroutes);
app.use("/api", prescriptionroutes);
app.use("/api", medicroutes);
app.use("/api", dashboardroutes);
app.use("/api", patientroutes);
app.use("/api", AppointmentRoute);
app.use("/api", InvoiceRoute);

app.use("/api/paypal", require("./routes/api/paypal"));

dbconnection;

app.listen(port, () => {
  console.log(`Port is listening at local host ${port}`);
});


