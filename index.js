const express = require("express");
require("./mongoose");
require("dotenv").config();
const path = require("path");
const app = express();

const root_router = require("./routers/index");

const port = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(express.urlencoded());

app.use((req, res, next) => {
  // "https://ecommerce-prod-application.netlify.app"
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  next();
});

// Middleware for Root Router
app.use(root_router);

app.listen(port, () => {
  console.log(`Server is running om Port No.- ${port}`);
});
