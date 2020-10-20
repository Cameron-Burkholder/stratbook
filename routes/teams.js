/* routes/teams.js */

const email = require("../config/email.js");
const { log, genJoinCode } = require("../config/utilities.js");
const mongoose = require("mongoose");

// Load validation
const validation = require("../validation.js");
// Load middleware
const middleware = require("../middleware.js");

// Prepare user verification
let host;

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
    @route /api/teams/view-team
    @method GET

    @outputs
    If error occurs at any point
      packet: Object (status: ERROR_WHILE_GETTING_TEAM)

    If user is not verified
      packet: Object (status: USER_NOT_VERIFIED)

    If user does not have a team
      packet: Object (status: USER_HAS_NO_TEAM)

    If team code from user does not match a team
      packet: Object (status: TEAM_DOES_NOT_EXIST)

    If user is not a member of the team
      packet: Object (status: USER_NOT_QUALIFIED)

    If user is allowed to view team
      packet: Object (status: TEAM_FOUND, team_data)
  */
  app.get("/api/teams/view-team", (request, response, done) => {
    log("GET REQUEST AT /api/teams/view-team");
    done();
  }, passport.authenticate("jwt", { session: false }), middleware.userIsVerified, middleware.userHasTeam, async (request, response) => {
    let packet = {
      status: ""
    };
    if (request.team.members.indexOf(request.user._id) >= 0 || request.team.editors.indexOf(request.user._id) >= 0 || request.team.admins.indexOf(request.user._id) >= 0) {
      let team_data = {
        name: request.team.name,
        join_code: request.team.join_code,
        platform: request.team.platform,
        members: [],
        editors: [],
        admins: []
      };

      let index;
      index = 0;
      while (index < request.team.members.length) {
        await new Promise((resolve, reject) => {
          User.findOne({ _id: mongoose.Types.ObjectId(request.team.members[index]) }).then(async (user, error) => {
            let user_data = user;
            user_data.password = undefined;
            team_data.members.push(user_data);
            resolve(true);
          }).catch(error => {
            console.log(error);
            packet.status = "ERROR";
            packet.message = "An error occurred while getting team data.";
            response.json(packet);
            reject(false);
          })
        });
        index++;
      }
      index = 0;
      while (index < request.team.editors.length) {
        await new Promise((resolve, reject) => {
          User.findOne({ _id: mongoose.Types.ObjectId(request.team.editors[index]) }).then(async (user, error) => {
            let user_data = user;
            user_data.password = undefined;
            team_data.editors.push(user_data);
            resolve(true);
          }).catch(error => {
            console.log(error);
            packet.status = "ERROR";
            packet.message = "An error occurred while getting team data.";
            response.json(packet);
            reject(false);
          })
        });
        index++;
      }
      index = 0;
      while (index < request.team.admins.length) {
        await new Promise((resolve, reject) => {
          User.findOne({ _id: mongoose.Types.ObjectId(request.team.admins[index]) }).then(async (user, error) => {
            let user_data = user;
            user_data.password = undefined;
            user_data.__v = undefined;
            user_data._id = undefined;
            team_data.admins.push(user_data);
            resolve(true);
          }).catch(error => {
            console.log(error);
            packet.status = "ERROR";
            packet.message = "An error occurred while getting team data.";
            response.json(packet);
            reject(false);
          })
        });
        index++;
      }
      packet.status = "TEAM_FOUND";
      packet.team = team_data;
      response.json(packet);
    } else {
      packet.status = "USER_NOT_QUALIFIED";
      response.json(packet);
    }
  });

  /*
    @route /api/teams/create-team
    @method: POST

    @inputs (body):
      name: String

    @outputs:
      If at any point there is an error
        packet: Object (status: ERROR_WHILE_CREATING_TEAM)

      If input data is invalid
        packet: Object (status: INVALID_TEAM_INPUT, errors: errors)

      If input data is inappropriate
        packet: Object (status: PROFANE_TEAM_INPUT)

      If user has not verified their account
        packet: Object (status: USER_NOT_VERIFIED)

      If the user already has a team
        packet: Object (status: USER_HAS_TEAM)

      If a team with the same name already exists
        packet: Object (status: TEAM_ALREADY_EXISTS)

      If a user is allowed to create a team
        packet: Object (status: TEAM_CREATED)
  */
  app.post("/api/teams/create-team", (request, response, done) => {
    log("POST REQUEST AT /api/teams/create-team");
    done();
  }, passport.authenticate("jwt", { session: false }), validation.validateTeamInput, middleware.userIsVerified, middleware.userHasNoTeam, async (request, response) => {
    let packet = {};
    Team.findOne({ name: request.body.name }).then(async (team) => {
        if (team) {
          packet.status = "TEAM_ALREADY_EXISTS";
          packet.errors = {
            name: "A team with that name already exists"
          }
          response.json(packet);
        } else {
          const join_code = await genJoinCode();
          let admins = [];
          admins.push(request.user._id);
          const newStrategies = new Strategies({
            join_code: join_code
          });
          const newTeam = new Team({
            join_code: join_code,
            members: [],
            admins: admins,
            editors: [],
            blocked_users: [],
            name: request.body.name,
            strategies_id: newStrategies._id,
            platform: request.user.platform.toUpperCase()
          });
          newStrategies.save().then((strategies) => {
            newTeam.save().then((team) => {
              User.findOne({ _id: request.user._id }).then((user, error) => {
                user.team_code = newTeam.join_code;
                user.status = ADMIN;
                user.save().then(() => {
                  packet.status = "TEAM_CREATED";
                  if (process.env.NODE_ENV === "development") {
                    packet.team_code = newTeam.join_code;
                  }
                  response.json(packet);
                });
              }).catch(error => {
                console.log(error);
                packet.status = "ERROR";
                packet.message = "An error occurred while attempting to create team.";
                response.json(packet);
              });
            }).catch(error => {
              console.log(error);
              packet.status = "ERROR";
              packet.message = "An error occurred while attempting to create team.";
              response.json(packet);
            });
          }).catch(error => {
            console.log(error);
            packet.status = "ERROR";
            packet.message = "An error occurred while attempting to create team.";
            response.json(packet);
          });
        }
    }).catch(error => {
      console.log(error);
      packet.status = "ERROR";
      packet.message = "An error occurred while attempting to create team.";
      response.json(packet);
    });
  });

  /*
    @route /api/teams/update-name
    @method PATCH

    @inputs (body)
      name: String

    @outputs
      If team input is invalid
        packet: Object (status: INVALID_TEAM_INPUT)

      If team input is inappropriate
        packet: Object (status: PROFANE_TEAM_INPUT)

      If at any point there is an error
        packet: Object (status: ERROR_WHILE_UPDATING_TEAM_NAME)

      If user is not verified
        packet: Object (status: USER_NOT_VERIFIED)

      If user doesn't have a team code
        packet: Object (status: USER_HAS_NO_TEAM)

      If user is not an admin
        packet: Object (status: USER_NOT_QUALIFIED)

      If there is no team with the users join code
        packet: Object (status: TEAM_NOT_FOUND)

      If user is not an admin on that team
        packet: Object (status: USER_NOT_QUALIFIED)

      If user is allowed to update team name
        packet: Object (status: TEAM_NAME_UPDATED)

  */
  app.patch("/api/teams/update-name", (request, response, done) => {
    log("PATCH REQUEST AT /api/teams/update-name");
    done();
  }, passport.authenticate("jwt", { session: false }), validation.validateTeamInput, middleware.userIsVerified, middleware.userIsAdmin, middleware.userHasTeam, async (request, response) => {
    let packet = {};
    Team.findOne({ _id: request.team._id }).then(team => {
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
                packet.status = "ERROR";
                packet.message = "An error occurred while attempting to update team name.";
                response.json(packet);
              });
            }).catch(error => {
              console.log(error);
              packet.status = "ERROR";
              packet.message = "An error occurred while attempting to update team name.";
              response.json(packet);
            });
          }
        }).catch(error => {
          if (error) {
            console.log(error);
            packet.status = "ERROR";
            packet.message = "An error occurred while attempting to update team name.";
            response.json(packet);
          }
        })
      }
    }).catch(error => {
      console.log(error);
      packet.status = "ERROR";
      packet.message = "An error occurred while attempting to update team name."
      response.json(packet);
    });
  });

  /*
    @route /api/teams/join-team
    @method PATCH

    @inputs (body):
      join_code: String

    @outputs:

      If at any point an error occurs
        packet: Object (status: ERROR_WHILE_JOINING_TEAM)

      If join code is invalid
        packet: Object (status: INVALID_JOIN_CODE)

      If user is not found
        packet: Object (USER_NOT_FOUND)

      If user is not verified
        packet: Object (status: USER_NOT_VERIFIED)

      If users's platform is not same as team
        packet: Object (status: PLATFORM_DOES_NOT_MATCH)

      If team does not exist
        packet: Object (status: TEAM_DOES_NOT_EXIST)

      If user has a team already
        packet: Object (status: USER_HAS_TEAM)

      If user is blocked from the team
        packet: Object (status: UNABLE_TO_JOIN_TEAM)

      If user is allowed to join team
        packet: Object (status: TEAM_JOINED)

  */
  app.patch("/api/teams/join-team", (request, response, done) => {
    log("PATCH REQUEST AT /api/teams/join-team");
    done();
  }, passport.authenticate("jwt", { session: false }), validation.validateJoinCode, middleware.userIsVerified, middleware.userHasNoTeam, async (request, response) => {
    let packet = {};
    Team.findOne({ join_code: request.body.join_code }).then(async (team, error) => {
      if (team) {
        if (team.platform === request.user.platform.toUpperCase()) {
          if (team.blocked_users.indexOf(String(request.user._id)) >= 0) {
            packet.status = "UNABLE_TO_JOIN_TEAM";
            response.json(packet);
          } else {
            team.members.push(String(request.user._id));
            team.save().then(async () => {
              if (process.env.NODE_ENV === "development") {
                packet.team_code = team.join_code;
              }
              User.findOne({ _id: mongoose.Types.ObjectId(request.user._id) }).then(async (user, error) => {
                if (user) {
                  user.team_code = request.body.join_code;
                  user.status = MEMBER;
                  user.save().then(async () => {
                    packet.status = "TEAM_JOINED";
                    if (process.env.NODE_ENV !== "development") {
                      let index = 0;
                      while (index < team.admins.length) {
                        await new Promise((resolve, reject) => {
                          email(team.admins[index].email, "User Joined Team", "<h1>A New User joined " + team.name + "</h1><p>" + user.username + "Joined your team.</p>");
                          resolve(true);
                        });
                        index++;
                      }
                    }
                    response.json(packet);
                  }).catch(error => {
                    console.log(error);
                    packet.status = "ERROR";
                    packet.message = "An error occurred while attempting to join team.";
                    response.json(packet);
                  });
                } else {
                  packet.status = "USER_NOT_FOUND";
                  response.json(packet);
                }
              }).catch(error => {
                console.log(error);
                packet.status = "ERROR";
                packet.message = "An error occurred while attempting to join team.";
                response.json(packet);
              });
            }).catch(error => {
              console.log(error);
              packet.status = "ERROR";
              packet.message = "An error occurred while attempting to join team.";
              response.json(packet);
              return;
            });
          }
        } else {
          packet.status = "PLATFORM_DOES_NOT_MATCH";
          packet.message = "The platform of the team you requested to join does not match the platform associated with your account.";
          response.json(packet);
        }
      } else {
        packet.status = "TEAM_NOT_FOUND";
        packet.message = "The team requested was not found.";
        response.json(packet);
      }
    }).catch(error => {
      console.log(error);
      packet.status = "ERROR";
      packet.message = "An error occurred while attempting to join team.";
      response.json(packet);
    });
  });


  /*
    @route /api/teams/leave-team
    @method PATCH

    @outputs:
      If an error occurs:
        packet: Object (status: ERROR_WHILE_LEAVING_TEAM)

      If user is not verified
        packet: Object (status: USER_NOT_VERIFIED)

      If user does not have a team code
        packet: Object (status: USER_HAS_NO_TEAM)

      If user does not exist
        packet: Object (status: USER_NOT_FOUND)

      If team is not found
        packet: Object (status: TEAM_DOES_NOT_EXIST)

      If user has left team
        packet: Object (status: USER_LEFT_TEAM)

  */
  app.patch("/api/teams/leave-team", (request, response, done) => {
    log("PATCH REQUEST AT /api/teams/leave-team");
    done();
  }, passport.authenticate("jwt", { session: false }), middleware.userIsVerified, middleware.userHasTeam, async (request, response) => {
    let packet = {};
    User.findOne({ _id: mongoose.Types.ObjectId(request.user._id) }).then(async (user) => {
      Team.findOne({ _id: request.team._id }).then(async (team) => {
        user.status = undefined;
        user.team_code = undefined;
        user.save().then(async () => {
          if (team.members.indexOf(String(request.user._id)) >= 0) {
            let index = team.members.indexOf(String(request.user._id));
            team.members.splice(index, 1);
          } else if (team.editors.indexOf(String(request.user._id)) >= 0) {
            let index = team.editors.indexOf(String(request.user._id));
            team.editors.splice(index, 1);
          } else if (team.admins.indexOf(String(request.user._id)) >= 0) {
            let index = team.admins.indexOf(String(request.user._id));
            team.admins.splice(index, 1);
          }

          team.save().then(async () => {
            // Team cannot be managed
            if (team.admins.length === 0) {
              // delete team
              await Team.deleteOne({ join_code: request.user.team_code }).catch(error => {
                console.log(error);
                packet.status = "ERROR";
                packet.message = "An error occurred while attempting to leave team.";
                response.json(packet);
              });

              // delete team strategies
              await Strategies.deleteOne({ join_code: request.user.team_code }).catch(error => {
                console.log(error);
                packet.status = "ERROR";
                packet.message = "An error occurred while attempting to leave team.";
                response.json(packet);
              })

              // update status of all members
              let index = 0;
              while (index < team.members.length) {
                await new Promise((resolve, reject) => {
                  User.findOne({ _id: mongoose.Types.ObjectId(team.members[index]) }).then(async (user, error) => {
                    user.team_code = undefined;
                    user.status = undefined;
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
                    packet.status = "ERROR";
                    packet.message = "An error occurred while attempting to leave team.";
                    response.json(packet);
                    reject(false);
                  });
                });
                index++;
              }

              index = 0;
              while (index < team.editors.length) {
                await new Promise((resolve, reject) => {
                  User.findOne({ _id: mongoose.Types.ObjectId(team.editors[index]) }).then(async (user, error) => {
                    user.team_code = undefined;
                    user.status = undefined;
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
                    packet.status = "ERROR";
                    packet.message = "An error occurred while attempting to leave team.";
                    response.json(packet);
                    reject(false);
                  });
                });
                index++;
              }

              index = 0;
              while (index < team.admins.length) {
                await new Promise((resolve, reject) => {
                  User.findOne({ _id: mongoose.Types.ObjectId(team.admins[index]) }).then(async (user, error) => {
                    user.team_code = undefined;
                    user.status = undefined;
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
                    packet.status = "ERROR";
                    packet.message = "An error occurred while attempting to leave team.";
                    response.json(packet);
                    reject(false);
                  });
                });
                index++;
              }
              packet.status = "USER_LEFT_TEAM";
              response.json(packet);
            } else {
              packet.status = "USER_LEFT_TEAM";
              response.json(packet);
            }
          }).catch(error => {
            console.log(error);
            packet.status = "ERROR";
            packet.message = "An error occurred while attempting to leave team.";
            response.json(packet);
          });
        }).catch(error => {
          console.log(error);
          packet.status = "ERROR";
          packet.message = "An error occurred while attempting to leave team.";
          response.json(packet);
        });
      }).catch(error => {
        console.log(error);
        packet.status = "ERROR";
        packet.message = "An error occurred while attempting to leave team.";
        response.json(packet);
      });
    }).catch(error => {
      console.log(error);
      packet.status = "ERROR";
      packet.message = "An error occurred while attempting to leave team.";
      response.json(packet);
    });
  });

  /*
    @route /api/teams/block-user
    @method PATCH

    @inputs (body):
      username: String

    @outputs

      If at any point there is an error
        packet: Object (status: ERROR_WHILE_BLOCKING_USER)

      If user is attempting to block self
        packet: Object (status, CANNOT_REMOVE_SELF)

      If username or join_code is invalid
        packet: Object (status: INVALID_BLOCK_USER_INPUT)

      If user is not verified
        packet: Object (status: USER_NOT_VERIFIED)

      If user doesn't have a team code
        packet: Object (status: USER_HAS_NO_TEAM)

      If user is not an admin
        packet: Object (status: USER_NOT_QUALIFIED)

      If there is no team with the sent join code
        packet: Object (status: TEAM_DOES_NOT_EXIST)

      If user is not an admin on that team
        packet: Object (status: USER_NOT_QUALIFIED)

      If user is removing someone that cannot be found
        packet: Object (status: USER_NOT_FOUND)

      If user is allowed to block a user
        packet: Object (status: USER_BLOCKED)
  */
  app.patch("/api/teams/block-user", (request, response, done) => {
    log("PATCH REQUEST AT /api/teams/remove-user");
    done();
  }, passport.authenticate("jwt", { session: false }), validation.validateBlockUser, middleware.userIsVerified, middleware.userHasTeam, middleware.userIsAdmin, async (request, response) => {
    let packet = {};
    Team.findOne({ join_code: request.team.join_code }).then((team, error) => {
      if (team.admins.indexOf(String(request.user._id)) >= 0) {
        User.findOne({ username: request.body.username }).then((user, error) => {
          team.blocked_users.push(String(user._id));
          if (team.members.indexOf(String(user._id)) >= 0) {
            let index = team.members.indexOf(String(user._id));
            team.members.splice(index, 1);
            user.team_code = undefined;
            user.status = undefined;
          } else if (team.editors.indexOf(String(user._id)) >= 0) {
            let index = team.editors.indexOf(String(user._id));
            team.editors.splice(index, 1);
            user.team_code = undefined;
            user.status = undefined;
          } else if (team.admins.indexOf(String(user._id)) >= 0) {
            let index = team.admins.indexOf(String(user._id));
            team.admins.splice(index, 1);
            user.team_code = undefined;
            user.status = undefined;
          }

          team.save().then(() => {
            user.save().then(() => {
              packet.status = "USER_BLOCKED";
              response.json(packet);
            }).catch(error => {
              console.log(error);
              packet.status = "ERROR_WHILE_BLOCKING_USER";
              response.json(packet);
            });
          }).catch(error => {
            console.log(error);
            packet.status = "ERROR";
            packet.message = "An error occurred while attempting to block user.";
            response.json(packet);
          });
        }).catch(error => {
          console.log(error);
          packet.status = "ERROR";
          packet.message = "An error occurred while attempting to block user.";
          response.json(packet);
        });
      } else {
        packet.status = "USER_NOT_QUALIFIED";
        packet.message = "User not admin on team. Only admins can block users.";
        response.json(packet);
      }
    }).catch(error => {
      console.log(error);
      packet.status = "ERROR";
      packet.message = "An error occurred while attempting to block user.";
      response.json(packet);
    });
  });

  /*
    @route /api/teams/delete-team
    @method DELETE

    @outputs
      If at any point there is an error
        packet: Object (status: ERROR_WHILE_DELETING_TEAM)

      If user is not verified
        packet: Object (status: USER_NOT_VERIFIED)

      If user doesn't have a team
        packet: Object (status: USER_HAS_NO_TEAM)

      If user is not an admin
        packet: Object (status: USER_NOT_QUALIFIED)

      If team cannot be found
        packet: Object (status: TEAM_DOES_NOT_EXIST)

      If user is not apart of the requested team
        packet: Object (status: USER_NOT_QUALIFIED)

      If user is allowed to delete the team
        packet: Object (status: TEAM_DELETED)
  */
  app.delete("/api/teams/delete-team", (request, response, done) => {
    log("DELETE REQUEST AT /api/teams/delete-team");
    done();
  }, passport.authenticate("jwt", { session: false }), middleware.userIsVerified, middleware.userIsAdmin, middleware.userHasTeam, async (request, response) => {
    let packet = {};
    await Team.findOne({ _id: request.team._id }).then(async (team, error) => {
      if (team.admins.indexOf(String(request.user._id)) < 0) {
        packet.status = "USER_NOT_QUALIFIED";
        packet.message = "User must be an admin on team to delete team.";
        response.json(packet);
      } else {
        // delete team
        await Team.deleteOne({ join_code: request.user.team_code }).catch(error => {
          console.log(error);
          packet.status = "ERROR";
          packet.message = "An error occurred while attempting to delete team.";
          response.json(packet);
        });

        // delete team strategies
        await Strategies.deleteOne({ join_code: request.user.team_code }).catch(error => {
          console.log(error);
          packet.status = "ERROR";
          packet.message = "An error occurred while attempting to delete team.";
          response.json(packet);
        })

        // update status of all members
        let index = 0;
        while (index < team.members.length) {
          await new Promise((resolve, reject) => {
            User.findOne({ _id: mongoose.Types.ObjectId(team.members[index]) }).then(async (user, error) => {
              user.team_code = undefined;
              user.status = undefined;
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
              packet.status = "ERROR";
              packet.message = "An error occurred while attempting to delete team.";
              response.json(packet);
              reject(false);
            });
          });
          index++;
        }

        index = 0;
        while (index < team.editors.length) {
          await new Promise((resolve, reject) => {
            User.findOne({ _id: mongoose.Types.ObjectId(team.editors[index]) }).then(async (user, error) => {
              user.team_code = undefined;
              user.status = undefined;
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
              packet.status = "ERROR";
              packet.message = "An error occurred while attempting to delete team.";
              response.json(packet);
              reject(false);
            });
          });
          index++;
        }

        index = 0;
        while (index < team.admins.length) {
          await new Promise((resolve, reject) => {
            User.findOne({ _id: mongoose.Types.ObjectId(team.admins[index]) }).then(async (user, error) => {
              user.team_code = undefined;
              user.status = undefined;
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
              packet.status = "ERROR";
              packet.message = "An error occurred while attempting to delete team.";
              response.json(packet);
              reject(false);
            });
          });
          index++;
        }

        packet.status = "TEAM_DELETED";
        packet.message = "The team was successfully deleted.";
        response.json(packet);
      }
    }).catch(error => {
      console.log(error);
      packet.status = "ERROR";
      packet.message = "An error occurred while attempting to delete team.";
      response.json(packet);
    });
  });
};
