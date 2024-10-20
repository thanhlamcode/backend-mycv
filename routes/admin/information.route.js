const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/information.controller");
const uploadMiddleware = require("../../middleware/admin/upload.middleware");

router.get("/:id", controller.index);
router.patch("/edit/:id", uploadMiddleware("avatar"), controller.edit);

module.exports = router;
