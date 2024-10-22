const express = require("express");
const router = express.Router();
const controller = require("../../controller/clients/contact.controller");

router.post("/:id", controller.post);

module.exports = router;
