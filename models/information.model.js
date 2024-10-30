const mongoose = require("mongoose");

const infoSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  facebookAddress: {
    type: String,
  },
  zaloAddress: {
    type: String,
  },
  linkedinAddress: {
    type: String,
  },
  emailAddress: {
    type: String,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
    unique: true,
  },
  description: {
    type: String,
  },
  slug: {
    type: String,
    unique: true,
  },
  expertise: String,
  avatar: String,
});

const Information = mongoose.model("Information", infoSchema, "information");

module.exports = Information;
