const express = require("express");
const router = express.Router();

const operations = require("./operations");

router.use("/operations", operations);

module.exports = router;
