const mongoose = require("mongoose");
require("dotenv").config();

const db = process.env.MONGODB_URL;

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const conSuccess = mongoose.connection;
conSuccess.once("open", () => {
  console.log("Database connected:", db);
});
