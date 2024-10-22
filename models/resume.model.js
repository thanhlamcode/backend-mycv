const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
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
      title: String,
      university: String,
      achievement: String,
      description: String,
    },
  ],
  certificate: [
    {
      title: String,
      university: String,
      certificate: String,
      description: String,
    },
  ],
});

const Resume = mongoose.model("Resume", resumeSchema, "resume");

module.exports = Resume;
