const mongoose = require("mongoose");
const slugify = require("slugify");

const accountSchema = new mongoose.Schema({
  emailAddress: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contact",
  },
  feature: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Feature",
  },
  information: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Information",
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  resume: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume",
  },
});

// Middleware tự động tạo slug trước khi lưu tài liệu
accountSchema.pre("save", function (next) {
  if (!this.slug) {
    // Tạo slug từ emailAddress hoặc một trường khác nếu bạn muốn
    this.slug = slugify(this.emailAddress.split("@")[0], { lower: true });
  }
  next();
});

const Account = mongoose.model("Account", accountSchema, "account");

module.exports = Account;
