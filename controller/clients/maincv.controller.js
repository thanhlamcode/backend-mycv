const Account = require("../../models/account.model");
const Information = require("../../models/information.model"); // Đảm bảo đúng đường dẫn

// [GET] /information/:slug
module.exports.info = async (req, res) => {
  try {
    const slug = req.params.slug;

    const account = await Account.findOne({ slug: slug })
      .select("-password")
      .populate("information");

    return res.json(account.information);
  } catch (error) {
    console.log(error);
    return res.json(false);
  }
};

// [GET] /feature/:slug
module.exports.feature = async (req, res) => {
  try {
    const slug = req.params.slug;

    const account = await Account.findOne({ slug: slug })
      .select("-password")
      .populate("feature");

    return res.json(account.feature);
  } catch (error) {
    console.log(error);
    return res.json(false);
  }
};
