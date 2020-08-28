// Load User model
require("../models/User.js");
const User = require("../models/User.js");

module.exports = async (app, passport) => {

  app.get("/dashboard", passport.authenticate("jwt", { session: false }), (request, response) => {
    response.json({ "datareceieved": "true" });
  });

};
