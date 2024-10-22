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

// [POST] /admin/resume/education/:id
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

// [POST] /admin/resume/achievement/:id
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

// [POST] /admin/resume/certificate/:id
module.exports.certificate = async (req, res) => {
  try {
    const userId = req.params.id;

    const record = await Resume.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          certificate: req.body,
        },
      },
      { new: true, fields: { certificate: { $slice: -1 } } } // Trả về chỉ phần tử cuối cùng trong education
    );

    return res.json(record.certificate[0]); // Trả về bản ghi mới nhất
  } catch (error) {
    console.log(error);
    return res.json(false);
  }
};

// [PATCH] /admin/resume/edit/education/:resumeId/:educationId
module.exports.editEducation = async (req, res) => {
  try {
    const { resumeId, educationId } = req.params;

    await Resume.updateOne(
      { _id: resumeId, "education._id": educationId },
      {
        $set: {
          "education.$": req.body, // Cập nhật toàn bộ phần tử education tương ứng
        },
      }
    );

    return res.json(true);
  } catch (error) {
    console.log(error);
    return res.json(false);
  }
};

// [PATCH] /admin/resume/edit/achievement/:resumeId/:achievementId
module.exports.editAchievement = async (req, res) => {
  try {
    const { achievementId, resumeId } = req.params;

    await Resume.updateOne(
      { _id: resumeId, "achievement._id": achievementId },
      {
        $set: {
          "achievement.$": req.body, // Cập nhật toàn bộ phần tử education tương ứng
        },
      }
    );

    return res.json(true);
  } catch (error) {
    console.log(error);
    return res.json(false);
  }
};

// [PATCH] /admin/resume/edit/certificate/:resumeId/:certificateId
module.exports.editCertificate = async (req, res) => {
  try {
    const { certificateId, resumeId } = req.params;

    await Resume.updateOne(
      { _id: resumeId, "certificate._id": certificateId },
      {
        $set: {
          "certificate.$": req.body, // Cập nhật toàn bộ phần tử education tương ứng
        },
      }
    );

    return res.json(true);
  } catch (error) {
    console.log(error);
    return res.json(false);
  }
};
