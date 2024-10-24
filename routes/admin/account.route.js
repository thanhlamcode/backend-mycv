const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/account.controller");

router.delete("/delete/:accountId", controller.deleteAccount);

module.exports = router;
