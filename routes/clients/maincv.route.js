const express = require("express");
const router = express.Router();
const controller = require("../../controller/clients/maincv.controller");

router.get("/information/:slug", controller.info);
router.get("/feature/:slug", controller.feature);
router.get("/project/:slug", controller.project);
router.get("/resume/:slug", controller.resume);
router.get("/contact/:slug", controller.contact);

module.exports = router;
