const express = require("express");
const router = express.Router();

const { add, update, count } = require("../controllers/operations");

router.post("/add/:component", add);
router.post("/update", update);
router.get("/count", count);

module.exports = router;
