const Contact = require("../../models/contact.model");

// [GET] /admin/contact
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

// [DELETE] /admin/contact/:contactId/:itemId
module.exports.deleteContact = async (req, res) => {
  try {
    const { contactId, itemId } = req.params;
    await Contact.updateOne(
      { _id: contactId },
      {
        $pull: { contacts: { _id: itemId } },
      }
    );

    res.json(true);
  } catch (error) {
    console.log(error);
    return res.json({
      code: 400,
      messgae: "Đã có lỗi xảy ra",
    });
  }
};
