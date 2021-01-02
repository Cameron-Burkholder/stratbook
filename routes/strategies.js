/* routes/strategies.js */

const email = require("../config/email.js");
const { log, genJoinCode } = require("../config/utilities.js");
const mongoose = require("mongoose");
const messages = require("../messages/messages.js");

// Load input validation
const validation = require("../validation.js");

// Load middleware
const middleware = require("../middleware.js");

// Define roles
const ADMIN = "ADMIN";
const MEMBER = "MEMBER";
const EDITOR = "EDITOR";

// Load User model
require("../models/User.js");
const User = require("../models/User.js");

// Load Strategies model
require("../models/Strategies.js");
const Strategies = require("../models/Strategies.js");

// Load Team model
require("../models/Team.js");
const Team = require("../models/Team.js");

module.exports = async (app, passport) => {

  /**
  * Fetch strategies
  * @name /api/strategies/view
  * @function
  * @async
  * @description The user submits a request to view strategies.
  *   If the user is not on the team, this returns a permission denied object.
  *   If the user is able to view the strategies, this returns a strategies found object.
  */
  app.get("/api/strategies/view", (request, response, done) => {
    log("GET REQUEST AT /api/strategies/view");
    done();
  }, passport.authenticate("jwt", { session: false }), middleware.userIsVerified, middleware.userHasTeam, async (request, response, done) => {
    if (request.team.members.indexOf(String(request.user._id)) < 0 && request.team.editors.indexOf(String(request.user._id)) < 0 && request.team.admins.indexOf(String(request.user._id)) < 0) {
      return response.json(messages.PERMISSION_DENIED);
    }

    let strategies;
    try {
      strategies = await Strategies.findOne({ join_code: request.user.team_code }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_VIEW_STRATEGIES);
    }

    let packet = messages.STRATEGIES_FOUND;
    packet.strategies = strategies;
    response.json(packet);
  });


};
