const express = require("express");
const router = express.Router();

const {
  add,
  update,
  count
} = require("../controllers/operations");

router.post("/add", add);
router.post("/update", update);
router.post("/count", count);

module.exports = router;