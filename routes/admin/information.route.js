const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/information.controller");

router.get("/:id", controller.index);

module.exports = router;
