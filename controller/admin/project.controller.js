const Project = require("../../models/project.model");
const streamUpload = require("../../helpers/uploadCloudDinary");

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

// [PATCH] /admin/project/upload
module.exports.upload = async (req, res) => {
  try {
    console.log("Upload request received.");
    if (req.files && req.files.file) {
      const fileBuffer = req.files.file.data;
      const secureUrl = await streamUpload(fileBuffer); // Upload file to Cloudinary
      console.log("File uploaded successfully: ", secureUrl);
      return res.status(200).json({ secure_url: secureUrl });
    } else {
      console.log("No file found in request.");
      return res.status(400).json({ error: "No file uploaded" });
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(500).json({ error: "Error uploading file" });
  }
};
