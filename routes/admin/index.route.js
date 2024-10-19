const systemAdmin = require("../../config/systems");
const informationRouter = require("./information.route");

module.exports = (app) => {
  const PATCH_ADMIN = systemAdmin.prefitAdmin;
  app.use(PATCH_ADMIN + "/information", informationRouter);
};
