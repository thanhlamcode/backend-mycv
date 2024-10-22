const Resume = require("../../models/resume.model");

// [GET] /admin/resume/:id
module.exports.index = async (req, res) => {
  try {
    const id = req.params.id;

    const resume = await Resume.findOne({ _id: id });

    return res.json(resume);
  } catch (error) {
    console.log(error);
    return res.json(false);
  }
};

// [POST] /admin/resume/education
module.exports.education = async (req, res) => {
  try {
    const userId = req.params.id;

    const record = await Resume.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          education: req.body,
        },
      },
      { new: true, fields: { education: { $slice: -1 } } } // Trả về chỉ phần tử cuối cùng trong education
    );

    return res.json(record.education[0]); // Trả về bản ghi mới nhất
  } catch (error) {
    console.log(error);
    return res.json(false);
  }
};

// [POST] /admin/resume/achievement
module.exports.achievement = async (req, res) => {
  try {
    const userId = req.params.id;

    const record = await Resume.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          achievement: req.body,
        },
      },
      { new: true, fields: { achievement: { $slice: -1 } } } // Trả về chỉ phần tử cuối cùng trong education
    );

    return res.json(record.achievement[0]); // Trả về bản ghi mới nhất
  } catch (error) {
    console.log(error);
    return res.json(false);
  }
};
