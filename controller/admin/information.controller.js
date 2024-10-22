const Information = require("../../models/information.model");

// [GET] /admin/information/:id
module.exports.index = async (req, res) => {
  try {
    const id = req.params.id;

    const info = await Information.findOne({ _id: id }).select("-password");

    return res.json(info);
  } catch (error) {
    console.log(error);
    return res.json(false);
  }
};

// [PATCH] /admin/information/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;

    // Nếu có ảnh được upload, cập nhật URL avatar
    if (req.uploadedFileUrl) {
      req.body.avatar = req.uploadedFileUrl; // Gán URL ảnh đã upload vào body
    }

    // Cập nhật thông tin trong database
    const record = await Information.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    return res.json(record);
  } catch (error) {
    console.log(error);
    return res.status(400).json(false);
  }
};
