const Information = require("../../models/information.model");

// [GET] /admin/information/:id
module.exports.index = async (req, res) => {
  try {
    const id = req.params.id;

    const info = await Information.findOne({ _id: id }).select("-password");

    return res.json(info);
  } catch (error) {
    console.log(error);
    return res.json({
      code: 400,
      messgae: "Đã có lỗi xảy ra",
    });
  }
};

// [PATCH] /admin/information/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;

    // console.log(req.body);

    const record = await Information.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    return res.json({
      code: 200,
      message: "Cập nhật thành công",
      record: record,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      code: 400,
      messgae: "Đã có lỗi xảy ra",
    });
  }
};
