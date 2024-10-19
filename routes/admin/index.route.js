const systemAdmin = require("../../config/systems");
const informationRouter = require("./information.route");
const authRouter = require("./auth.route");

module.exports = (app) => {
  const PATCH_ADMIN = systemAdmin.prefitAdmin;
  app.use("/auth", authRouter);
  app.use(PATCH_ADMIN + "/information", informationRouter);
};
