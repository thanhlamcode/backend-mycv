const contactRoute = require("./contact.route");

module.exports = (app) => {
  app.use("/contact", contactRoute);
};
