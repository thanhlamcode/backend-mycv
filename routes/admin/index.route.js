const systemAdmin = require("../../config/systems");
const informationRouter = require("./information.route");
const featureRouter = require("./feature.route");
const projectRouter = require("./project.route");
const authRouter = require("./auth.route");

module.exports = (app) => {
  const PATCH_ADMIN = systemAdmin.prefitAdmin;
  app.use("/auth", authRouter);
  app.use(PATCH_ADMIN + "/information", informationRouter);
  app.use(PATCH_ADMIN + "/feature", featureRouter);
  app.use(PATCH_ADMIN + "/project", projectRouter);
};
