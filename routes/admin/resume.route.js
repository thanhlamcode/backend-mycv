const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/resume.controller");

router.get("/:id", controller.index);
router.post("/add/education/:id", controller.education);
router.post("/add/achievement/:id", controller.achievement);
// router.get("/add/certificate", controller.certificate);

module.exports = router;
