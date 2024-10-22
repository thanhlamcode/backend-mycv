const mongoose = require("mongoose");

// Tạo schema cho model Account
const accountSchema = new mongoose.Schema({
  emailAddress: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true, // password là bắt buộc
  },
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contact", // Tham chiếu đến model Contact
  },
  feature: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Feature", // Tham chiếu đến model Feature
  },
  information: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Information", // Tham chiếu đến model Information
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project", // Tham chiếu đến model Project
  },
  resume: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume", // Tham chiếu đến model Resume
  },
});

// Tạo model từ schema
const Account = mongoose.model("Account", accountSchema, "account");

module.exports = Account;
