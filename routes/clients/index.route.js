const contactRoute = require("./contact.route");
const mainCVRoute = require("./maincv.route");

module.exports = (app) => {
  app.use("/contact", contactRoute);
  app.use("/maincv", mainCVRoute);
};
