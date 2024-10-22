const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/feature.controller");

router.get("/:id", controller.index);
router.patch("/edit/:id", controller.edit);

module.exports = router;
