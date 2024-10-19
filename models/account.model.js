const mongoose = require("mongoose");

// Tạo schema cho model Account
const accountSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true, // userName là bắt buộc
    unique: true, // userName phải là duy nhất
  },
  password: {
    type: String,
    required: true, // password là bắt buộc
  },
});

// Tạo model từ schema
const Account = mongoose.model("Account", accountSchema, "account");

module.exports = Account;
