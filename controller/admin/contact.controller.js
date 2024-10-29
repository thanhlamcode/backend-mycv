const Contact = require("../../models/contact.model");

// [DELETE] /admin/contact
module.exports.get = async (req, res) => {
  try {
    const id = req.params.id;
    const contact = await Contact.findOne({ _id: id });

    res.json(contact);
  } catch (error) {
    console.log(error);
    return res.json({
      code: 400,
      messgae: "Đã có lỗi xảy ra",
    });
  }
};
