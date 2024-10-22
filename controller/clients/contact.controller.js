const Contact = require("../../models/contact.model");

// [POST] /contact/:id
module.exports.post = async (req, res) => {
  try {
    const id = req.params.id;

    await Contact.updateOne(
      { _id: id },
      {
        $push: {
          contacts: req.body,
        },
      }
    );

    return res.json(true);
  } catch (error) {
    console.log(error);
    return res.json(false);
  }
};
