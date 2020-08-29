/* routes/teams.js */

const email = require("../config/email.js");
const { log, genJoinCode } = require("../config/utilities.js");

// Load input validation
const validateTeamInput = require("../validation/validateTeamName.js");

// Prepare user verification
let host;

// Define roles
const ADMIN = "ADMIN";
const MEMBER = "MEMBER";
const EDITOR = "EDITOR";

// Load User model
require("../models/User.js");
const User = require("../models/User.js");

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

    @inputs (body):
      name: String

    @outputs:
      If at any point there is an error
        packet: Object (status: UNABLE_TO_CREATE_TEAM)

      If input data is invalid
        packet: Object (status: INVALID_TEAM_INPUT, errors: errors)

      If user has not verified their account
        packet: Object (status: USER_NOT_VERIFIED)
      Else
        If the user already has a team
          packet: Object (status: USER_HAS_TEAM)

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
      if (request.user.team_code) {
        packet.status = "USER_HAS_TEAM";
        response.json(packet);
      } else {
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
                  User.findOne({ _id: request.user._id }).then((user, error) => {
                    user.team_code = newTeam.join_code;
                    user.status = ADMIN;
                    user.save().then(() => {
                      packet.status = "TEAM_CREATED";
                      response.json(packet);
                    });
                  }).catch(error => {
                    console.log(error);
                  });
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
      }
    } else {
      packet.status = "USER_NOT_VERIFIED";
      response.json(packet);
    }
  });

  /*
    @route /api/teams/view-join-code
    @method GET

    @outputs
      If error occurs at any point
        packet: Object (status: UNABLE_TO_GET_TEAM_CODE)

      If user is not verified
        packet: Object (status: USER_NOT_VERIFIED)
      Else
        If user does not have a team
          packet: Object (status: USER_HAS_NO_TEAM)
        Else
          If team code from user does not match a team
            packet: Object (status: TEAM_DOES_NOT_EXIST)
          ELse
            If user is not a member of the team
              packet: Object (status: USER_NOT_MEMBER_OF_TEAM)
            Else
              packet: Object (status: TEAM_CODE_FOUND, join_code)
  */
  app.get("/api/teams/view-join-code", (request, response, done) => {
    log("GET REQUEST AT /api/teams/view-join-code");
    done();
  }, passport.authenticate("jwt", { session: false }), (request, response) => {
    let packet = {
      status: ""
    };
    if (request.user.verified) {
      if (request.user.team_code) {
        Team.findOne({ join_code: request.user.team_code }).then((team, error) => {
          if (error) {
            console.log(error);
            packet.status = "UNABLE_TO_GET_TEAM_CODE";
            response.json(packet);
          }

          if (team) {
            if (team.members.indexOf(request.user._id) >= 0 || team.editors.indexOf(request.user._id) >= 0 || team.admins.indexOf(request.user._id) >= 0) {
              packet.status = "TEAM_CODE_FOUND";
              packet.join_code = team.join_code;
              response.json(packet);
            } else {
              packet.status = "USER_NOT_MEMBER_OF_TEAM";
              response.json(packet);
            }
          } else {
            packet.status = "TEAM_DOES_NOT_EXIST";
            response.json(packet);
          }
        }).catch(error => {
          packet.status = "UNABLE_TO_GET_TEAM_CODE";
          response.json(packet);
        });
      } else {
        packet.status = "USER_HAS_NO_TEAM";
        response.json(packet);
      }
    } else {
      packet.status = "USER_NOT_VERIFIED";
      response.json(packet);
    }
  });

  /*
    @route /api/teams/delete-team
    @method DELETE

    @outputs
      If at any point there is an error
        packet: Object (status: ERROR_WHILE_DELETING_TEAM)

      If user is not verified
        packet: Object (status: USER_NOT_VERIFIED)
      Else
        If user doesn't have a team
          packet: Object (status: USER_HAS_NO_TEAM)
        Else
          If user is not an admin
            packet: Object (status: USER_NOT_QUALIFIED)
          Else
            If team cannot be found
              packet: Object (status: TEAM_DOES_NOT_EXIST)
            Else
              If user is not apart of the requested team
                packet: Object (status: USER_NOT_QUALIFIED)
              ELse
                packet: Object (status: TEAM_DELETED)
  */
  app.delete("/api/teams/delete-team", (request, response, done) => {
    log("DELETE REQUEST AT /api/teams/delete-team");
    done();
  }, passport.authenticate("jwt", { session: false }), async (request, response) => {
    let packet = {
      status: ""
    };
    if (request.user.verified) {
      if (request.user.team_code) {
        if (request.user.status === ADMIN) {
          await Team.findOne({ join_code: request.user.team_code }).then(async (team, error) => {
            if (team) {
              if (team.admins.indexOf(String(request.user._id)) < 0) {
                packet.status = "USER_NOT_QUALIFIED";
                response.json(packet);
              } else {
                // delete team
                await Team.deleteOne({ join_code: request.user.team_code }).catch(error => {
                  console.log(error);
                  packet.status = "ERROR_WHILE_DELETING_TEAM";
                  response.json(packet);
                });

                // update status of all members
                let index = 0;
                while (index < members.length) {
                  await new Promise((resolve, reject) => {
                    User.findOne({ _id: members[index] }).then(async (user, error) => {
                      user.team_code = null;
                      user.status = null;
                      await new Promise((resolve, reject) => {
                        user.save().then(() => {
                          resolve(true);
                        }).catch((error) => {
                          console.log(error);
                          reject(false);
                        })
                      });
                      resolve(true);
                    }).catch(error => {
                      console.log(error);
                      packet.status = "ERROR_WHILE_DELETING_TEAM";
                      response.json(packet);
                      reject(false);
                    });
                  });
                  index++;
                }

                packet.status = "TEAM_DELETED";
                response.json(packet);
              }
            } else {
              packet.status = "TEAM_DOES_NOT_EXIST";
              response.json(packet);
            }
          }).catch(error => {
            console.log(error);
            packet.status = "UNABLE_TO_DELETE_TEAM";
            response.json(packet);
          });
        } else {
          packet.status = "USER_NOT_QUALIFIED";
          response.json(packet);
        }
      } else {
        packet.status = "USER_HAS_NO_TEAM";
        response.json(packet);
      }
    } else {
      packet.status = "USER_NOT_VERIFIED";
      response.json(packet);
    }
  });

  /*
    @route /api/teams/update-name
    @method PUT

    @inputs (body)
      name: String

    @outputs
      If at any point there is an error
        packet: Object (status: ERROR_WHILE_UPDATING_TEAM_NAME)

      If user is not verified
        packet: Object (status: USER_NOT_VERIFIED)
      Else
        If user doesn't have a team code
          packet: Object (status: USER_HAS_NO_TEAM)
        Else
          If user is not an admin
            packet: Object (status: USER_NOT_QUALIFIED)
          Else
            If there is no team with the users join code
              packet: Object (status: TEAM_DOES_NOT_EXIST)
            Else
              If user is not an admin on that team
                packet: Object (status: USER_NOT_QUALIFIED)
              Else
                packet: Object (status: TEAM_NAME_UPDATED)

  */
  app.put("/api/teams/update-name", (request, response, done) => {
    log("PUT REQUEST AT /api/teams/update-name");
    done();
  }, passport.authenticate("jwt", { session: false }), validateTeamInput, async (request, response) => {
    let packet = {
      status: ""
    };
    if (request.user.verified) {
      if (request.user.team_code) {
        if (request.user.status === ADMIN) {
          await Team.findOne({ join_code: request.user.team_code }).then((team, error) => {
            if (team) {
              if (team.admins.indexOf(String(request.user._id)) < 0) {
                packet.status = "USER_NOT_QUALIFIED";
                response.json(packet);
              } else {
                Team.findOne({ name: request.body.name }).then((team, error) => {
                  if (team) {
                    packet.status = "TEAM_ALREADY_EXISTS";
                    response.json(packet);
                  } else {
                    Team.findOne({ join_code: request.user.team_code }).then((team, error) => {
                      team.name = request.body.name;
                      team.save().then(() => {
                        packet.status = "TEAM_NAME_UPDATED";
                        response.json(packet);
                      }).catch(error => {
                        console.log(error);
                        packet.status = "ERROR_WHILE_UPDATING_TEAM_NAME";
                        response.json(packet);
                      });
                    }).catch(error => {
                      console.log(error);
                      packet.status = "ERROR_WHILE_UPDATING_TEAM_NAME";
                      response.json(packet);
                    });
                  }
                }).catch(error => {
                  if (error) {
                    console.log(error);
                    packet.status = "ERROR_WHILE_UPDATING_TEAM_NAME";
                    response.json(packet);
                  }
                })
              }
            } else {
              packet.status = "TEAM_DOES_NOT_EXIST";
              response.json(packet);
            }
          }).catch(error => {
            console.log(error);
            packet.status = "UNABLE_TO_UPDATE_TEAM_NAME";
            response.json(packet);
          });
        } else {
          packet.status = "USER_NOT_QUALIFIED";
          response.json(packet);
        }
      } else {
        packet.status = "USER_HAS_NO_TEAM";
        response.json(packet);
      }
    } else {
      packet.status = "USER_NOT_VERIFIED";
      response.json(packet);
    }
  })
};
