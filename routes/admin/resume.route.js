const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/resume.controller");

router.get("/:id", controller.index);
router.post("/add/education/:id", controller.education);
router.post("/add/achievement/:id", controller.achievement);
router.post("/add/certificate/:id", controller.certificate);
router.patch(
  "/edit/education/:resumeId/:educationId",
  controller.editEducation
);
router.patch(
  "/edit/achievement/:resumeId/:achievementId",
  controller.editAchievement
);
router.patch(
  "/edit/certificate/:resumeId/:certificateId",
  controller.editCertificate
);

module.exports = router;
