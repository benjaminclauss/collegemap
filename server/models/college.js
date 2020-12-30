const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CollegeSchema = new Schema({
  name: String,
  coordinates: {
    latitude: Number,
    longitude: Number,
  },
});

module.exports = mongoose.model("College", CollegeSchema);
