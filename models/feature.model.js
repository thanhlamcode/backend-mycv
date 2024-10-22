const mongoose = require("mongoose");

const featureSchema = new mongoose.Schema({
  userId: String,
  skills: [
    {
      skillName: String,
      description: String,
    },
  ],
});

const Feature = mongoose.model("Feature", featureSchema, "feature");

module.exports = Feature;
