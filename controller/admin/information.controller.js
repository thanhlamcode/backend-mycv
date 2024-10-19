const information = require("../../models/information.model");

// [GET] /admin/information
module.exports.index = async (req, res) => {
  try {
    const id = req.params.id;

    const info = await information.findOne({ _id: id }).select("-password");

    return res.json(info);
  } catch (error) {
    console.log(error);
    return res.json({
      code: 400,
      messgae: "Đã có lỗi xảy ra",
    });
  }
};
