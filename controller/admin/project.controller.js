const Project = require("../../models/project.model");

// [GET] /admin/project/:id
module.exports.index = async (req, res) => {
  try {
    const id = req.params.id;

    const project = await Project.findOne({ _id: id });

    return res.json(project);
  } catch (error) {
    console.log(error);
    return res.json(false);
  }
};

// [PATCH] /admin/project/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;

    // Nếu có ảnh được upload, cập nhật URL avatar
    if (req.uploadedFileUrl) {
      req.body.avatar = req.uploadedFileUrl;
    }

    // Cập nhật thông tin trong database
    const record = await Project.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    return res.json(record);
  } catch (error) {
    console.log(error);
    return res.status(400).json(false);
  }
};
