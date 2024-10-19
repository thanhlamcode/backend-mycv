const mongoose = require("mongoose");

const infoSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
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
  },
  description: {
    type: String,
  },
  avatar: String,
  password: {
    type: String,
    require: true,
  },
});

const Information = mongoose.model("information", infoSchema, "information");

module.exports = Information;
