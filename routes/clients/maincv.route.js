const express = require("express");
const router = express.Router();
const controller = require("../../controller/clients/maincv.controller");

router.get("/information/:slug", controller.info);

module.exports = router;
