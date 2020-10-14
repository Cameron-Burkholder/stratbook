/* routes/strategies.js */

const email = require("../config/email.js");
const { log, genJoinCode } = require("../config/utilities.js");
const mongoose = require("mongoose");

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

  /*
    @route /api/strategies/view
    @method GET

    @outputs
      If there is an error
        packet: Object (status: ERROR)

      If user is not verified
        packet: Object (status: USER_NOT_VERIFIED)

      If user has no team
        packet: Object (status: USER_HAS_NO_TEAM)

      If team does not exist
        packet: Object (status: TEAM_NOT_FOUND)

      If user is not on team
        packet: Object (status: USER_NOT_QUALIFIED)

      If strategies are able to be sent
        packet: Object (status: STRATEGIES_FOUND)
  */
  app.get("/api/strategies/view", (request, response, done) => {
    log("GET REQUEST AT /api/strategies/view");
    done();
  }, passport.authenticate("jwt", { session: false }), middleware.userIsVerified, middleware.userHasTeam, (request, response, done) => {
    let packet = {};
    if (request.team.members.indexOf(String(request.user._id)) >= 0 || request.team.editors.indexOf(String(request.user._id)) >= 0 || request.team.admins.indexOf(String(request.user._id)) >= 0) {
      Strategies.findOne({ join_code: request.user.team_code }).then((strategies) => {
        packet.status = "STRATEGIES_FOUND";
        packet.strategies = strategies.strategies;
        response.json(packet);
      }).catch(error => {
        console.log(error);
        packet.status = "ERROR";
        packet.message = "An error occurred while attempting to get strategies for the requested team.";
        response.json(packet);
      })
    } else {
      packet.status = "USER_NOT_QUALIFIED";
      packet.message = "User is not on requested team.";
      response.json(packet);
    }
  });

  /*
    @route /api/strategies/create
    @method POST

    @outputs
      If there is an error
        packet: Object (status: ERROR)

      If user is not verified
        packet: Object (status: USER_NOT_VERIFIED)

      If user has no team
        packet: Object (status: USER_HAS_NO_TEAM)

      If team does not exist
        packet: Object (status: TEAM_NOT_FOUND)

      If user is not on team
        packet: Object (status: USER_NOT_QUALIFIED)

      If strategy is created
        packet: Object (status: STRATEGY_CREATED)
  */
  app.post("/api/strategies/create", (request, response, done) => {
    log("POST REQUEST AT /api/strategies/create");
    done();
  }, passport.authenticate("jwt", { session: false }), validation.validateStrategyInput, middleware.userIsVerified, middleware.userHasTeam, (request, response, done) => {
    let packet = {};
    if (request.team.editors.indexOf(String(request.user._id)) >= 0 || request.team.admins.indexOf(String(request.user._id)) >= 0) {
      Strategies.findOne({ join_code: request.user.team_code }).then((strategies) => {
        let uniqueStrategy = true;
        strategies.strategies.map((strat) => {
          if (strat.name.toUpperCase() === request.body.strategy.name.toUpperCase()) {
            uniqueStrategy = false;
            break;
          }
        });
        if (uniqueStrategy) {
          strategies.strategies.push(request.body.strategy);
          strategies.save().then(() => {
            packet.status = "STRATEGY_CREATED";
            response.json(packet);
          }).catch(error => {
            console.log(error);
            packet.status = "ERROR";
            packet.message = "An error occurred while attempting to create a strategy.";
            response.json(packet);
          });
        } else {
          packet.status = "NOT_UNIQUE_STRATEGY";
          packet.message = "A strategy with that name already exists.";
          response.json(packet);
        }

      }).catch(error => {
        console.log(error);
        packet.status = "ERROR";
        packet.message = "An error occurred while attempting to create a strategy.";
        response.json(packet);
      })
    } else {
      packet.status = "USER_NOT_QUALIFIED";
      packet.message = "User is not and editor or admin on requested team.";
      response.json(packet);
    }
  });

};
