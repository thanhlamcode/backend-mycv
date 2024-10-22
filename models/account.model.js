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
});

// Tạo model từ schema
const Account = mongoose.model("Account", accountSchema, "account");

module.exports = Account;
