const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/contact.controller");

router.get("/:id", controller.get);
router.delete("/:contactId/:itemId", controller.deleteContact);

module.exports = router;
