const Account = require("../../models/account.model");
const Contact = require("../../models/contact.model");
const Feature = require("../../models/feature.model");
const Information = require("../../models/information.model");
const Project = require("../../models/project.model");
const Resume = require("../../models/resume.model");

// [DELETE] /admin/account/delete/:accountId
module.exports.deleteAccount = async (req, res) => {
  try {
    const account = await Account.findOne({ _id: req.params.accountId }).select(
      "-password"
    );

    await Resume.deleteOne({ _id: account.resume });
    await Contact.deleteOne({ _id: account.contact });
    await Feature.deleteOne({ _id: account.feature });
    await Information.deleteOne({ _id: account.information });
    await Project.deleteOne({ _id: account.project });
    await Account.deleteOne({ _id: req.params.accountId });

    return res.json({ code: 200, message: "Xóa tài khoản thành công" });
  } catch (error) {
    console.log(error);
    return res.json({
      code: 400,
      messgae: "Đã có lỗi xảy ra",
    });
  }
};
