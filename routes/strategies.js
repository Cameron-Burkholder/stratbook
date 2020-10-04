/* routes/strategies.js */

const email = require("../config/email.js");
const { log, genJoinCode } = require("../config/utilities.js");
const mongoose = require("mongoose");

// Load input validation


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
        packet: Object (status: ERROR_WHILE_GETTING_STRATEGIES)

      If user is not verified
        packet: Object (status: USER_NOT_VERIFIED)

      If user has no team
        packet: Object (status: USER_HAS_NO_TEAM)

      If team does not exist
        packet: Object (status: TEAM_DOES_NOT_EXIST)

      If user is not on team
        packet: Object (status: USER_NOT_QUALIFIED)

      If strategies are able to be sent
        packet: Object (status: STRATEGIES_FOUND)
  */
  app.get("/api/strategies/view", (request, response, done) => {
    log("GET REQUEST AT /api/strategies/view");
    done();
  }, passport.authenticate("jwt", { session: false }), (request, response, done) => {
    let packet = {
      status: ""
    };
    if (request.user.verified) {
      if (request.user.team_code) {
        Team.findOne({ join_code: request.user.team_code }).then((team) => {
          if (team) {
            if (team.members.indexOf(String(request.user._id)) >= 0 || team.editors.indexOf(String(request.user._id)) >= 0 || team.admins.indexOf(String(request.user._id)) >= 0) {
              Strategies.findOne({ join_code: request.user.team_code }).then((strategies) => {
                packet.status = "STRATEGIES_FOUND";
                packet.strategies = strategies.strategies;
                response.json(packet);
              }).catch(error => {
                console.log(error);
                packet.status = "ERROR_WHILE_GETTING_STRATEGIES";
                response.json(packet);
              })
            } else {
              packet.status = "USER_NOT_QUALIFIED";
              response.json(packet);
            }
          } else {
            packet.status = "TEAM_DOES_NOT_EXIST";
            response.json(packet);
          }
        }).catch(error => {
          console.log(error);
          packet.status = "ERROR_WHILE_GETTING_STRATEGIES";
          response.json(packet);
        })
      } else {
        packet.status = "USER_HAS_NO_TEAM";
        response.json(packet);
      }
    } else {
      packet.status = "USER_NOT_VERIFIED";
      response.json(packet);
    }
  });

};
