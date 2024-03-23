const mongoose = require("mongoose");
const validator = require("validator");
const autoIncrement = require('mongoose-auto-increment');

const Component_Schema = new mongoose.Schema({
  id: {
    type: Number,
    autoIncrement: true,
  },

  component:{
    type: Number,
    required: true
  },

  description: {
    type: String,
  },
});

Component_Schema.plugin(autoIncrement.plugin, {
  model: 'Component',
  field: 'id',
  startAt: 1,
});

Component_Schema.index({
  id: 1,
},
{ unique: true }
);

const Component = mongoose.model("Component", Component_Schema);
module.exports = Component;
