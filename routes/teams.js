/* routes/teams.js */

const email = require("../config/email.js");
const { log, genJoinCode } = require("../config/utilities.js");
const mongoose = require("mongoose");

// Load input validation
const validateTeamInput = require("../validation/validateTeamName.js");
const validateJoinCode = require("../validation/validateJoinCode.js");
const validateBlockUser = require("../validation/validateBlockUser");

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
    @route /api/teams/view-join-code
    @method GET

    @outputs
      If error occurs at any point
        packet: Object (status: ERROR_WHILE_GETTING_TEAM_CODE)

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
              packet: Object (status: USER_NOT_QUALIFIED)
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
            packet.status = "ERROR_WHILE_GETTING_TEAM_CODE";
            response.json(packet);
          }

          if (team) {
            if (team.members.indexOf(request.user._id) >= 0 || team.editors.indexOf(request.user._id) >= 0 || team.admins.indexOf(request.user._id) >= 0) {
              packet.status = "TEAM_CODE_FOUND";
              packet.join_code = team.join_code;
              response.json(packet);
            } else {
              packet.status = "USER_NOT_QUALIFIED";
              response.json(packet);
            }
          } else {
            packet.status = "TEAM_DOES_NOT_EXIST";
            response.json(packet);
          }
        }).catch(error => {
          packet.status = "ERROR_WHILE_GETTING_TEAM_CODE";
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
    @route /api/teams/view-team
    @method POST

    @outputs
    If error occurs at any point
      packet: Object (status: ERROR_WHILE_GETTING_TEAM)

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
            packet: Object (status: USER_NOT_QUALIFIED)
          Else
            packet: Object (status: TEAM_FOUND, team_data)
  */
  app.get("/api/teams/view-team", (request, response, done) => {
    log("GET REQUEST AT /api/teams/view-team");
    done();
  }, passport.authenticate("jwt", { session: false }), async (request, response) => {
    let packet = {
      status: ""
    };
    if (request.user.verified) {
      if (request.user.team_code) {
        Team.findOne({ join_code: request.user.team_code }).then(async (team, error) => {
          if (error) {
            console.log(error);
            packet.status = "ERROR_WHILE_GETTING_TEAM";
            response.json(packet);
          }

          if (team) {
            if (team.members.indexOf(request.user._id) >= 0 || team.editors.indexOf(request.user._id) >= 0 || team.admins.indexOf(request.user._id) >= 0) {
              let team_data = {
                name: team.name,
                join_code: team.join_code,
                members: [],
                editors: [],
                admins: []
              };

              let index;
              index = 0;
              while (index < team.members.length) {
                await new Promise((resolve, reject) => {
                  User.findOne({ _id: mongoose.Types.ObjectId(team.members[index]) }).then(async (user, error) => {
                    let user_data = {
                      username: user.username
                    };
                    team_data.members.push(user_data);
                    resolve(true);
                  }).catch(error => {
                    console.log(error);
                    packet.status = "ERROR_WHILE_GETTING_TEAM";
                    response.json(packet);
                    reject(false);
                  })
                });
                index++;
              }
              index = 0;
              while (index < team.editors.length) {
                await new Promise((resolve, reject) => {
                  User.findOne({ _id: mongoose.Types.ObjectId(team.editors[index]) }).then(async (user, error) => {
                    let user_data = {
                      username: user.username
                    };
                    team_data.editors.push(user_data);
                    resolve(true);
                  }).catch(error => {
                    console.log(error);
                    packet.status = "ERROR_WHILE_GETTING_TEAM";
                    response.json(packet);
                    reject(false);
                  })
                });
                index++;
              }
              index = 0;
              while (index < team.admins.length) {
                await new Promise((resolve, reject) => {
                  User.findOne({ _id: mongoose.Types.ObjectId(team.admins[index]) }).then(async (user, error) => {
                    let user_data = {
                      username: user.username
                    };
                    team_data.admins.push(user_data);
                    resolve(true);
                  }).catch(error => {
                    console.log(error);
                    packet.status = "ERROR_WHILE_GETTING_TEAM";
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
          } else {
            packet.status = "TEAM_DOES_NOT_EXIST";
            response.json(packet);
          }
        }).catch(error => {
          packet.status = "ERROR_WHILE_GETTING_TEAM";
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
            packet.status = "ERROR_WHILE_CREATING_TEAM";
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
                strategies: [],
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
                      if (process.env.NODE_ENV === "TESTING") {
                        packet.team_code = newTeam.join_code;
                      }
                      response.json(packet);
                    });
                  }).catch(error => {
                    console.log(error);
                  });
                }).catch(error => {
                  console.log(error);
                  packet.status = "ERROR_WHILE_CREATING_TEAM";
                  response.json(packet);
                });
              }).catch(error => {
                console.log(error);
                packet.status = "ERROR_WHILE_CREATING_TEAM";
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
  app.patch("/api/teams/update-name", (request, response, done) => {
    log("PATCH REQUEST AT /api/teams/update-name");
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

      If user is not verified
        packet: Object (status: USER_NOT_VERIFIED)
      Else
        If users's platform is not same as team
          packet: Object (status: PLATFORM_DOES_NOT_MATCH)
        Else
          If team does not exist
            packet: Object (status: TEAM_DOES_NOT_EXIST)
          Else
            If user has a team already
              packet: Object (status: USER_HAS_TEAM)
            Else
              If user is blocked from the team
                packet: Object (status: UNABLE_TO_JOIN_TEAM)
              Else
                packet: Object (status: TEAM_JOINED)

  */
  app.patch("/api/teams/join-team", (request, response, done) => {
    log("PATCH REQUEST AT /api/teams/join-team");
    done();
  }, passport.authenticate("jwt", { session: false }), validateJoinCode, async (request, response) => {
    let packet = {
      status: ""
    };
    if (request.user.verified) {
      if (request.user.team_code) {
        packet.status = "USER_HAS_TEAM";
        response.json(packet);
      } else {
        Team.findOne({ join_code: request.body.join_code }).then((team, error) => {
          if (team) {
            if (team.platform === request.user.platform.toUpperCase()) {
              if (team.blocked_users.indexOf(String(request.user._id)) >= 0) {
                packet.status = "UNABLE_TO_JOIN_TEAM";
                response.json(packet);
              } else {
                team.members.push(String(request.user._id));
                team.save().then(() => {
                  if (process.env.NODE_ENV === "TESTING") {
                    packet.team_code = team.join_code;
                  }
                  User.findOne({ _id: mongoose.Types.ObjectId(request.user._id) }).then((user, error) => {
                    user.team_code = request.body.join_code;
                    user.status = MEMBER;
                    user.save().then(() => {
                      packet.status = "TEAM_JOINED";
                      response.json(packet);
                    }).catch(error => {
                      console.log(error);
                      packet.status = "ERROR_WHILE_JOINING_TEAM";
                      response.json(packet);
                    });
                  }).catch(error => {
                    console.log(error);
                    packet.status = "ERROR_WHILE_JOINING_TEAM";
                    response.json(packet);
                  });
                }).catch(error => {
                  console.log(error);
                  packet.status = "ERROR_WHILE_JOINING_TEAM";
                  response.json(packet);
                  return;
                });
              }
            } else {
              packet.status = "PLATFORM_DOES_NOT_MATCH";
              response.json(packet);
            }
          } else {
            packet.status = "TEAM_DOES_NOT_EXIST";
            response.json(packet);
          }
        }).catch(error => {
          console.log(error);
          packet.status = "ERROR_WHILE_JOINING_TEAM";
          response.json(packet);
        });
      }
    } else {
      packet.status = "USER_NOT_VERIFIED";
      response.json(packet);
    }
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
      Else
        If user is not verified
          packet: Object (status: USER_NOT_VERIFIED)
        Else
          If user doesn't have a team code
            packet: Object (status: USER_HAS_NO_TEAM)
          Else
            If user is not an admin
              packet: Object (status: USER_NOT_QUALIFIED)
            Else
              If there is no team with the sent join code
                packet: Object (status: TEAM_DOES_NOT_EXIST)
              ELse
                If user is not an admin on that team
                  packet: Object (status: USER_NOT_QUALIFIED)
                Else
                  If user is removing someone that cannot be found
                    packet: Object (status: USER_NOT_FOUND)
                  Else
                    packet: Object (status: USER_BLOCKED)
  */
  app.patch("/api/teams/block-user", (request, response, done) => {
    log("PATCH REQUEST AT /api/teams/remove-user");
    done();
  }, passport.authenticate("jwt", { session: false }), validateBlockUser, async (request, response) => {
    let packet = {
      status: ""
    };
    if (request.body.username === request.user.username) {
      packet.status = "CANNOT_REMOVE_SELF";
      response.json(packet);
    } else {
      if (request.user.verified) {
        if (request.user.team_code) {
          if (request.user.status === ADMIN) {
            Team.findOne({ join_code: request.user.team_code }).then((team, error) => {
              if (team) {
                if (team.admins.indexOf(String(request.user._id)) >= 0) {
                  User.findOne({ username: request.body.username }).then((user, error) => {
                    if (user) {
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
                        packet.status = "ERROR_WHILE_BLOCKING_USER";
                        response.json(packet);
                      });
                    } else {
                      packet.status = "USER_NOT_FOUND";
                      response.json(packet);
                    }
                  }).catch(error => {
                    console.log(error);
                    packet.status = "ERROR_WHILE_BLOCKING_USER";
                    response.json(packet);
                  });
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
              packet.status = "ERROR_WHILE_BLOCKING_USER";
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

                // delete team strategies
                await Strategies.deleteOne({ join_code: request.user.team_code }).catch(error => {
                  console.log(error);
                  packet.status = "ERROR_WHILE_DELETING_TEAM";
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
                      packet.status = "ERROR_WHILE_DELETING_TEAM";
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
                      packet.status = "ERROR_WHILE_DELETING_TEAM";
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
};
