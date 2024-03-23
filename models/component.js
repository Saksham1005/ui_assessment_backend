const mongoose = require("mongoose");
const validator = require("validator");

const Component_Schema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  component: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
  },
});

const Component = mongoose.model("Component", Component_Schema);
module.exports = Component;
