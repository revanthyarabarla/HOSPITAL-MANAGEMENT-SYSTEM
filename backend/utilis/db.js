const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

mongoose.connect("mongodb://127.0.0.1:27017/HCMS", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("Failed to Connect MongoDb");
});

db.once("open", () => {
  console.log("Connected To MongoDB");
});