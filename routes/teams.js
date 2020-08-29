/* routes/teams.js */

const email = require("../config/email.js");

const { log, genJoinCode } = require("../config/utilities.js");

// Load input validation
const validateTeamInput = require("../validation/createTeam.js");

// Prepare user verification
let host;

// Load _Map model
const Map = require("../models/Map_.js");

// Load Strategies model
require("../models/Strategies.js");
const Strategies = require("../models/Strategies.js");

// Load Team model
require("../models/Team.js");
const Team = require("../models/Team.js");

module.exports = async (app, passport) => {

  /*
    @route /api/teams/create-team
    @method: POST

    @inputs:
      name: String

    @outputs:
      If at any point there is an error
        packet: Object (status: UNABLE_TO_CREATE_TEAM)

      If input data is invalid
        packet: Object (status: INVALID_TEAM_INPUT, errors: errors)

      If user has not verified their account
        packet: Object (status: USER_NOT_VERIFIED)
      Else
        If a team with the same name already exists
          packet: Object (status: TEAM_ALREADY_EXISTS)
        Else
          packet: Object (status: TEAM_CREATED)
  */
  app.post("/api/teams/create-team", (request, response, done) => {
    log("POST REQUEST AT /api/teams/create-team");
    done();
  }, passport.authenticate("jwt", { session: false }), validateTeamInput, async (request, response) => {
    let packet = {
      status: ""
    };
    if (request.user.verified) {
      Team.findOne({ name: request.body.name }).then(async function(team, error) {
        if (error) {
          console.log("error" + error);
          packet.status = "UNABLE_TO_CREATE_TEAM";
          response.json(packet);
        } else {
          if (team) {
            packet.status = "TEAM_ALREADY_EXISTS";
            response.json(packet);
          } else {
            const join_code = await genJoinCode();
            let admins = [];
            admins.push(request.user._id);
            const newStrategies = new Strategies({
              strategies: []
            });
            const newTeam = new Team({
              join_code: join_code,
              members: [],
              admins: admins,
              editors: [],
              blocked_users: [],
              name: request.body.name,
              strategies_id: newStrategies._id
            });
            newStrategies.save().then((strategies) => {
              newTeam.save().then((team) => {
                packet.status = "TEAM_CREATED";
                response.json(packet);
              }).catch(error => {
                console.log(error);
                packet.status = "UNABLE_TO_CREATE_TEAM";
                response.json(packet);
              });
            }).catch(error => {
              console.log(error);
              packet.status = "UNABLE_TO_CREATE_TEAM";
              response.json(packet);
            });
          }
        }
      });
    } else {
      packet.status = "USER_NOT_VERIFIED";
      response.json(packet);
    }
  });
};
