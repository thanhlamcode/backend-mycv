const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  contacts: [
    {
      senderName: String,
      email: String,
      subject: String,
      message: String,
    },
  ],
});

const Contact = mongoose.model("Contact", contactSchema, "contact");

module.exports = Contact;
