const Account = require("../../models/account.model");
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

    // Nếu có ảnh được tải lên, cập nhật URL avatar trong `req.body`
    if (req.uploadedFileUrl) {
      req.body.avatar = req.uploadedFileUrl;
    } else {
      // Xóa avatar khỏi `req.body` nếu không có ảnh nào được tải lên
      delete req.body.avatar;
    }

    // Tìm thông tin cũ
    const oldInformation = await Information.findOne({ _id: id });
    if (!oldInformation) {
      return res.status(404).json({ message: "Information not found" });
    }

    // Cập nhật thông tin trong database
    const record = await Information.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    // Nếu có slug mới trong `req.body`, cập nhật slug trong Account
    if (req.body.slug) {
      await Account.updateOne(
        { slug: oldInformation.slug },
        { slug: req.body.slug }
      );
    }

    return res.json(record);
  } catch (error) {
    console.log(error);
    return res.status(400).json(false);
  }
};
