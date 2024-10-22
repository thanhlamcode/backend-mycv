const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  education: [
    {
      title: String,
      university: String,
      GPA: Number,
      description: String,
    },
  ],
  achievement: [
    {
      university: String,
      achievement: String,
      description: String,
    },
  ],
  certificate: [
    {
      certificate: String,
      description: String,
    },
  ],
});

const Resume = mongoose.model("Resume", resumeSchema, "resume");

module.exports = Resume;
