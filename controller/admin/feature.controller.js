const Feature = require("../../models/feature.model");

// [GET] /admin/feature/:id
module.exports.index = async (req, res) => {
  try {
    const id = req.params.id;

    const info = await Feature.findOne({ _id: id });

    return res.json(info);
  } catch (error) {
    console.log(error);
    return res.json({
      code: 400,
      messgae: "Đã có lỗi xảy ra",
    });
  }
};

// [PATCH] /admin/feature/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;

    // Cập nhật thông tin trong database
    const record = await Feature.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    return res.json({
      code: 200,
      message: "Cập nhật thành công",
      record: record,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Đã có lỗi xảy ra",
    });
  }
};
