const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
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
