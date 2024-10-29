const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/contact.controller");

router.get("/:id", controller.get);

module.exports = router;
