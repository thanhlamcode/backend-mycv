const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true, // Đảm bảo userId là bắt buộc
  },
  projects: [
    {
      projectName: {
        type: String,
        required: true, // Đảm bảo tên dự án là bắt buộc
      },
      description: String,
      linkProject: String,
      image: String,
    },
  ],
});

const Project = mongoose.model("Project", projectSchema, "projects"); // Đổi tên collection thành số nhiều

module.exports = Project;
