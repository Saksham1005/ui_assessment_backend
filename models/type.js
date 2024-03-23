const mongoose = require("mongoose");
const validator = require("validator");

const Type_Schema = new mongoose.Schema({
  document: {
    type: mongoose.Schema.Types.ObjectId,
  },

  component: {
    type: Number,
    required: true,
    min: 1,
    max: 3,
  },

  count: {
    type: Number,
    default: 0,
  },
});

Type_Schema.index(
  {
    component: 1,
  },
  { unique: true }
);

const Type = mongoose.model("Type", Type_Schema);
module.exports = Type;
