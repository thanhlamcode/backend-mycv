const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/project.controller");

router.get("/:id", controller.index);
router.patch("/edit/:id", controller.edit);
router.post("/upload", controller.upload);

module.exports = router;
