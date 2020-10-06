/* routes/users.js */

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const email = require("../config/email.js");

const { log, verifyPassword, hashPassword, issueJWT, genVerificationLink } = require("../config/utilities.js");

// Load validation
const validation = require("../validation.js");

// Load middleware
const middleware = require("../middleware.js");

// Prepare user verification
let host;

// Load User model
require("../models/User.js");
const User = require("../models/User.js");

// Load UnverifiedUser model
require("../models/UnverifiedUser.js");
const UnverifiedUser = require("../models/UnverifiedUser.js");

module.exports = async (app, passport) => {

  /*
    @route /api/users/verify
    @method: GET

    @inputs:
      verification_id: String

    @outputs:
      If verification id isn't in the database
        redirect: /register
      Else
        update verification state for user, delete record from verification database
        redirect: /login
  */
  app.get("/api/users/verify", (request, response) => {
    log("GET REQUEST AT /api/users/verify");
    UnverifiedUser.findOne({ verification_id: request.query.verification_id }, function(error, item) {
      if (error) {
        console.log(error);
        response.redirect("/register");
      }
      if (!item) {
        response.redirect("/register");
      } else {
        User.findOne({ _id: mongoose.Types.ObjectId(item.user_id) }, function(error, user) {
          if (error) {
            console.log(error);
            response.redirect("/register");
          } else {
            if (user) {
              user.verified = true;
              user.save().then(() => {
                UnverifiedUser.deleteOne({ user_id: user._id }, (error) => {
                  if (error) {
                    console.log(error);
                    response.redirect("/register");
                  } else {
                    email(user.email, "Account Verified", "<h1>Thanks for verifying your account!</h1><br/><p>You can now create or join a team.</p>");
                    response.redirect("/login");
                  }
                }).catch(error => {
                  console.log(error);
                  response.redirect("/login");
                });
              });
            } else {
              response.redirect("/register");
            }
          }
        });
      }
    });
  });

  /*
    @route /api/users/login
    @method: POST

    @inputs:
      email: String
      password: String

    @outputs:
      If an error occurs at any point
        packet: Object (status: ERROR)

      If input data is invalid
        packet: Object (status: INVALID_LOGIN, errors: errors)

      If user does not exist in database
        packet: Object (status: USER_NOT_FOUND)

      If password is incorrect
        packet: Object (status: INCORRECT_PASSWORD)

      If password is correct
        packet: Object (status: TOKEN_ISSUED, user_status: undefined or user_stats)

  */
  app.post("/api/users/login", (request, response, done) => {
    log("POST REQUEST AT /api/users/login");
    done();
  }, validation.validateLoginInput, (request, response) => {
    let packet = {
      status: ""
    };
    User.findOne({ email: request.body.email.toLowerCase() }).then((user) => {
      if (!user) {
        response.json({
          status: "USER_NOT_FOUND",
          errors: {
            email: "No user with that email was found."
          }
        });
      } else {
        const isValidPassword = verifyPassword(request.body.password, user.password);
        if (isValidPassword) {
          const tokenObject = issueJWT(user);
          user.password = undefined;
          user._id = undefined;
          response.json({
            status: "TOKEN_ISSUED",
            user: user,
            token: tokenObject.token,
            expiresIn: tokenObject.expires
          });
        } else {
          response.json({
            status: "INCORRECT_PASSWORD",
            errors: {
              password: "The password you entered is incorrect."
            }
          })
        }
      }
    }).catch(error => {
      console.log(error);
      response.json({
        status: "ERROR",
        message: "There was an error while attemping to login."
      });
    });
  });

  /*
    @route /api/users/update-token
    @method GET

    @outputs
      If user is invalid
        404
      If login is valid
        packet: Object (status: TOKEN_EXTENDED, token: token, expiresIn: Date)
  */
  app.get("/api/users/update-token", (request, response, done) => {
    log("GET REQUEST AT /api/users/extend-token");
    done();
  }, passport.authenticate("jwt", { session: false }), (request, response) => {
    const tokenObject = issueJWT(request.user);
    request.user.password = undefined;
    request.user._id = undefined;
    response.json({
      token: tokenObject.token,
      expiresIn: tokenObject.expires,
      status: "TOKEN_UPDATED",
      user: request.user
    });
  });

  /*
    @route /api/users/register
    @method: POST

    @inputs:
      username: String
      email: String
      password1: String

    @outputs:
      If an error occurs
        packet: Object (status: ERROR)

      If input data is invalid
        packet: Object (status: INVALID_REGISTRATION)

      If input data is profane
        packet: Object (status: PROFANE_INPUT)

      If user already exists in database (email or username)
        packet: Object (status: EXISTING_USER)

      If user is able to register
        packet: Object (status: USER_REGISTERED)

  */
  app.post("/api/users/register", (request, response, done) => {
    log("POST REQUEST AT /api/users/register");
    done();
  }, validation.validateRegisterInput, (request, response) => {
    let packet = {
      status: ""
    }
    User.findOne({ email: request.body.email }, function(error, user) {
      if (user) {
        response.json({
          status: "EXISTING_USER",
          errors: {
            email: "An account with that email already exists."
          }
        });
      } else {
        User.findOne({ username: request.body.username }, function(error, user) {
          if (user) {
            response.json({
              status: "EXISTING_USER",
              message: "An account with that username already exists."
            });
          } else {
            const newUser = new User({
              username: request.body.username,
              email: request.body.email,
              password: request.body.password1,
              platform: request.body.platform,
              verified: process.env.NODE_ENV === "development" ? true : false,
              attacker_role: "NONE",
              defender_role: "NONE",
              attackers: [],
              defenders: []
            });
            if (process.env.NODE_ENV === "development") {
              packet._id = newUser._id;
            }
            // Hash password before saving in database
            let hashedPassword = hashPassword(request.body.password1);
            if (hashedPassword) {
              newUser.password = hashedPassword;
              newUser.save().then(user => {
                host = request.hostname;
                let newVerificationId = genVerificationLink();
                let newVerificationLink = "http://" + host + "/api/users/verify?verification_id="+ newVerificationId;
                const newUnverifiedUser = new UnverifiedUser({
                  user_id: newUser._id,
                  verification_id: newVerificationId
                });
                newUnverifiedUser.save().then(user => {
                  response.json({
                    status: "USER_REGISTERED",
                    _id: (process.env.NODE_ENV === "development" ? newUser._id : undefined)
                  });
                  let registrationEmail = {
                    subject: "R6 Stratbook - Registration Complete!",
                    html: "<div><p>Thank you for registering with R6 Stratbook!<br/><br/>We are glad to have you on our platform. To verify your account so you can create and join teams, click the link below.</p><br/><br/><a href='" + newVerificationLink + "' target='_blank'>Verify Email</a></div>"
                  };
                  email(newUser.email, registrationEmail.subject, registrationEmail.html);
                }).catch(error => {
                  console.log(error);
                  response.json({
                    status: "ERROR",
                    message: "An error occurred while attempting to register user."
                  });
                });
              }).catch(error => {
                console.log(error);
                response.json({
                  status: "ERROR",
                  message: "An error occurred while attempting to register user."
                });
              });
            } else {
              console.log(error);
              response.json({
                status: "ERROR",
                message: "An error occurred while attempting to register user."
              });
            }
          }
        });
      }
    });
  });

  /*
    @route /api/users/update-platform
    @method PATCH

    @inputs:
      platform: String

    @outputs:
      If an error occurs
        packet: Object (status: ERROR_WHILE_UPDATING_PLATFORM)

      If input is invalid
        packet: Object (status: INVALID_PLATFORM)

      If user does not exist in database
        packet: Object (status: USER_NOT_FOUND)

      If user has a team
        packet: Object (status: USER_HAS_TEAM)

      If user is allowed to update platofmr
        packet: Object (status: PLATFORM_UPDATED)
  */
  app.patch("/api/users/update-platform", (request, response, done) => {
    log("PATCH REQUEST AT /api/users/update-platform");
    done();
  }, passport.authenticate("jwt", { session: false }), validation.validatePlatformInput, (request, response) => {
    let packet = {
      status: ""
    };
    User.findOne({ email: request.user.email }).then((user) => {
      if (!user) {
        packet.status = "USER_NOT_FOUND";
        response.json(packet);
      } else {
        if (request.user.team_code) {
          packet.status = "USER_HAS_TEAM";
          response.json(packet);
        } else {
          user.platform = request.body.platform;
          user.save().then(() => {
            packet.status = "PLATFORM_UPDATED";
            response.json(packet);
          }).catch(error => {
            console.log(error);
            packet.status = "ERROR_WHILE_UPDATING_PLATFORM";
            response.json(packet);
          });
        }
      }
    }).catch(error => {
      console.log(error);
      packet.status = "ERROR_WHILE_UPDATING_PLATFORM";
      response.json(packet);
    })
  });

  /*
    @route /api/users/update-username
    @method PATCH

    @inputs:
      username: String

    @outputs:
      If an error occurs
        packet: Object (status: ERROR_WHILE_UPDATING_USERNAME)

      If user does not exist
        packet: Object (status: USER_NOT_FOUND)

      If user with new name exists
        packet: Object (status: USERNAME_TAKEN)

      If user is allowed to update username
        packet: Object (status: USERNAME_UPDATED)
  */
  app.patch("/api/users/update-username", (request, response, done) => {
    log("PATCH REQUEST AT /api/users/update-username");
    done();
  }, passport.authenticate("jwt", { session: false }), validation.validateUsernameInput, (request, response) => {
    let packet = {
      status: ""
    };
    User.findOne({ email: request.user.email }).then((user1) => {
      if (!user1) {
        packet.status = "USER_NOT_FOUND";
        response.json(packet);
      } else {
        User.findOne({ username: request.body.username }).then((user2) => {
          if (user2) {
            packet.status = "USERNAME_TAKEN";
            packet.errors = {
              username: "A user with that username already exists"
            }
            response.json(packet);
          } else {
            user1.username = request.body.username;
            user1.save().then(() => {
              packet.status = "USERNAME_UPDATED";
              response.json(packet);
            }).catch(error => {
              console.log(error);
              packet.status = "ERROR_WHILE_UPDATING_USERNAME";
              response.json(packet);
            });
          }
        }).catch(error => {
          console.log(error);
          packet.status = "ERROR_WHILE_UPDATING_USERNAME";
          response.json(packet);
        });
      }
    }).catch(error => {
      console.log(error);
      packet.status = "ERROR_WHILE_UPDATING_USERNAME";
      response.json(packet);
    })
  });

  /*
    @route /api/users/update-email
    @method PATCH

    @inputs:
      email: String

    @outputs:
      If an error occurs
        packet: Object (status: ERROR_WHILE_UPDATING_EMAIL)

      If email is invalid
        packet: Object (status: INVALID_EMAIL)

      If email is profane
        packet: Object (status: PROFANE_INPUT)

      If user is not verified
        packet: Object (status: USER_NOT_VERIFIED)

      If user is not found
        packet: Object (status: USER_NOT_FOUND)

      If email is in use
        packet: Object (status: EMAIL_TAKEN)

      If email is updated successfully
        packet: Object( status: EMAIL_UPDATED)
  */
  app.patch("/api/users/update-email", (request, response, done) => {
    log("PATCH REQUEST AT /api/users/update-email");
    done();
  }, passport.authenticate("jwt", { session: false }), validation.validateEmailInput, (request, response) => {
    let packet = {
      status: ""
    };
    if (request.user.verified) {
      User.findOne({ email: request.user.email }).then((user1) => {
        if (!user1) {
          packet.status = "USER_NOT_FOUND";
          response.json(packet);
        } else {
          User.findOne({ email: request.body.email }).then((user2) => {
            if (user2) {
              packet.status = "EMAIL_TAKEN";
              packet.errors = {
                email: "An account with that email already exists"
              };
              response.json(packet);
            } else {
              user1.email = request.body.email;
              user1.save().then(() => {
                packet.status = "EMAIL_UPDATED";
                response.json(packet);
              }).catch(error => {
                console.log(error);
                packet.status = "ERROR_WHILE_UPDATING_EMAIL";
                response.json(packet);
              });
            }
          }).catch(error => {
            console.log(error);
            packet.status = "ERROR_WHILE_UPDATING_EMAIL";
            response.json(packet);
          });
        }
      }).catch(error => {
        console.log(error);
        packet.status = "ERROR_WHILE_UPDATING_EMAIL";
        response.json(packet);
      })
    } else {
      packet.status = "USER_NOT_VERIFIED";
      response.json(packet);
    }
  });

  /*
    @route /api/users/update-user-status
    @method PATCH

    @inputs
      username: String
      status: String

    @outputs
      If an error occurs
        packet: Object (status: ERROR_WHILE_UPDATING_USER_STATUS)

      If input is invalid
        packet: Object (status: INVALID_STATUS_INPUT)

      If requesting user is not verified
        packet: Object (status: USER_NOT_VERIFIED)

      If requesting user is not an admin
        packet: Object (status: USER_NOT_QUALIFIED)

      If requesting user is not found
        packet: Object (status: USER_NOT_FOUND)

      If requesting user is not on team
        packet: Object (status: USER_HAS_NO_TEAM)

      If requested user does not exist
        packet: Object (status: USER_NOT_FOUND)

      If requested user is an admin
        packet: Object (status: PERMISSION_DENIED)

      If requesting users team is not found
        packet: Object (status: TEAM_DOES_NOT_EXIST)

      If requested user is not on team
        packet: Object (status: USER_NOT_QUALIFIED)

      If update has been completed
        packet: Object (status: USER_STATUS_UPDATED)
  */
  app.patch("/api/users/update-user-status", (request, response, done) => {
    log("PATCH REQUEST AT /api/users/update-user-status");
    done();
  }, passport.authenticate("jwt", { session: false }), validation.validateStatusInput, (request, response) => {
    let packet = {
      status: ""
    };
    if (request.user.verified) {
      if (request.user.status !== "ADMIN") {
        packet.status = "USER_NOT_QUALIFIED";
        response.json(packet);
      } else {
        if (request.user.team_code) {
          User.findOne({ username: request.user.username }).then((rUser) => {
            if (rUser) {
              User.findOne({ username: request.body.username }).then((user) => {
                if (user) {
                  if (user.status === "ADMIN") {
                    packet.status = "PERMISSION_DENIED";
                    response.json(packet);
                  } else {
                    Team.findOne({ join_code: request.user.team_code }).then((team) => {
                      if (team) {
                        if (team.members.indexOf(String(user._id)) >= 0 || team.editors.indexOf(String(user._id)) >= 0) {
                          if (team.members.indexOf(String(user._id)) >= 0) {
                            let index = team.members.indexOf(String(user._id));
                            team.members.splice(index, 1);
                          } else {
                            let index = team.editors.indexOf(String(user._id));
                            team.editors.splice(index, 1);
                          }
                          user.status = request.body.status;
                          if (request.body.status === "ADMIN") {
                            team.admins.push(String(user._id));
                            team.save().then(() => {
                              user.save().then(() => {
                                packet.status = "USER_STATUS_UPDATED";
                                response.json(packet);
                              }).catch(error => {
                                console.log(error);
                                packet.status = "ERROR_WHILE_UPDATING_USER_STATUS";
                                response.json(packet);
                              });
                            }).catch(error => {
                              console.log(error);
                              packet.status = "ERROR_WHILE_UPDATING_USER_STATUS";
                              response.json(packet);
                            });
                          } else if (request.body.status === "EDITOR") {
                            team.editors.push(String(user._id));
                            team.save().then(() => {
                              user.save().then(() => {
                                packet.status = "USER_STATUS_UPDATED";
                                response.json(packet);
                              }).catch(error => {
                                console.log(error);
                                packet.status = "ERROR_WHILE_UPDATING_USER_STATUS";
                                response.json(packet);
                              });
                            }).catch(error => {
                              console.log(error);
                              packet.status = "ERROR_WHILE_UPDATING_USER_STATUS";
                              response.json(packet);
                            });
                          } else if (request.body.status === "MEMBER") {
                            team.members.push(String(user._id));
                            team.save().then(() => {
                              user.save().then(() => {
                                packet.status = "USER_STATUS_UPDATED";
                                response.json(packet);
                              }).catch(error => {
                                console.log(error);
                                packet.status = "ERROR_WHILE_UPDATING_USER_STATUS";
                                response.json(packet);
                              });
                            }).catch(error => {
                              console.log(error);
                              packet.status = "ERROR_WHILE_UPDATING_USER_STATUS";
                              response.json(packet);
                            });
                          } else {
                            packet.status = "INVALID_STATUS_INPUT";
                            packet.errors = {
                              status: "Status field invalid"
                            };
                            response.json(packet);
                          }
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
                      packet.status = "ERROR_WHILE_UPDATING_USER_STATUS";
                      response.json(packet);
                    });
                  }
                } else {
                  packet.status = "USER_NOT_FOUND";
                  response.json(packet);
                }
              }).catch(error => {
                console.log(error);
                packet.status = "ERROR_WHILE_UPDATING_USER_STATUS";
                response.json(packet);
              });
            } else {
              packet.status = "USER_NOT_FOUND";
              response.json(packet);
            }
          });
        } else {
          packet.status = "USER_HAS_NO_TEAM";
          repsonse.json(packet);
        }
      }
    } else {
      packet.status = "USER_NOT_VERIFIED";
      response.json(packet);
    }
  });

  /*
    @route /api/users/forgot-password
    @method PATCH

    @inputs
      email: String

    @outputs
      If an error occurs
        packet: Object (status: ERROR_WHILE_GETTING_USER)

      If input is invalid
        packet: Object (status: INVALID_EMAIL)

      If input is profane
        packet: Object (status: PROFANE_INPUT)

      If user is not found
        packet: Object (status: USER_NOT_FOUND)

      If reset link has been generated
        packet: Object(status: PASSWORD_RESET_LINK_SENT)

  */
  app.patch("/api/users/forgot-password", (request, response, done) => {
    log("PATCH REQUEST AT /api/users/forgot-password");
    done();
  }, validation.validateEmailInput, (request, response) => {
    let packet = {
      status: ""
    };
    User.findOne({ email: request.body.email }).then((user) => {
      if (user) {
        const reset_token = genVerificationLink();
        const reset_expiry = Date.now() + 3600000;
        user.reset_token = reset_token;
        user.reset_expiry = reset_expiry;
        const resetLink = "http://" + request.hostname + "/api/users/reset-password?password_token=" + reset_token;
        user.save().then(() => {
          packet.status = "PASSWORD_RESET_LINK_SENT";
          response.json(packet);
          email(user.email, "Password Reset Link", "<p>You are receiving this because you (or someone else) have requested the reset of the password for your account. Please click on the following link to complete the process</p><br/><br/><a href='" + resetLink + "' target='_blank'>Verify Email</a>");
        }).catch(error => {
          console.log(error);
          packet.status = "ERROR_WHILE_GETTING_USER";
          response.json(packet);
        });
      } else {
        packet.status = "USER_NOT_FOUND";
        response.json(packet);
      }
    }).catch(error => {
      console.log(error);
      packet.status = "ERROR_WHILE_GETTING_USER";
      response.json(packet);
    });
  });

  /*
    @route /api/users/reset-password
    @method PATCH

    @inputs:
      password1: String
      password2: String

    @outputs:
      If an error occurs
        packet: Object (status: ERROR_WHILE_RESETTING_PASSWORD)

      If input is invalid
        packet: Object (status: INVALID_PASSWORD_INPUT)

      If token is not found
        packet: Object (status: INVALID_RESET_TOKEN)

      If token is expired
        packet: Object (status: RESET_TOKEN_EXPIRED)

      If password is reset
        packet: Object (status: PASSWORD_RESET)

  */
  app.patch("/api/users/reset-password", (request, response, done) => {
    log("PATCH REQUEST AT /api/users/reset-password");
    done();
  }, validation.validatePasswordInput, (request, response) => {
    let packet = {
      status: ""
    };
    const reset_token = request.query.password_token;
    if (reset_token || reset_token !== "") {
      User.findOne({ reset_token: reset_token }).then((user) => {
        if (user) {
          if (Date.now() > new Date(user.reset_expiry)) {
            packet.status = "RESET_TOKEN_EXPIRED";
            response.json(packet);
          } else {
            const hash = hashPassword(request.body.password1);
            user.password = hash;
            user.reset_token = undefined;
            user.reset_expiry = undefined;
            user.save().then(() => {
              packet.status = "PASSWORD_RESET";
              response.json(packet);
              email(user.email, "Your password has been reset", "<p>Your password has been reset. If you did not do this, log in to your account immediately and change the password.</p>");
            }).catch(error => {
              console.log(error);
              packet.status = "ERROR_WHILE_RESETTING_PASSWORD";
              response.json(packet);
            });
          }
        } else {
          packet.status = "INVALID_RESET_TOKEN";
          response.json(packet);
        }
      }).catch(error => {
        console.log(error);
        packet.status = "ERROR_WHILE_RESETTING_PASSWORD";
        response.json(packet);
      });
    } else {
      packet.status = "INVALID_RESET_TOKEN";
      response.json(packet);
    }

  });

  /*
    @route /api/users/update-password
    @method PATCH

    @inputs:
      password1: String
      password2: String

    @outputs:
      If there is an error
        packet: Object (status: ERROR_WHILE_UPDATING_PASSWORD)

      If user is not found
        packet: Object (status: USER_NOT_FOUND)

      If password has been updated
        packet: Object (status: PASSWORD_UPDATED)

  */
  app.patch("/api/users/update-password", (request, response, done) => {
    log("PATCH REQUEST AT /api/users/update-password");
    done();
  }, passport.authenticate("jwt", { session: false }), validation.validatePasswordInput, (request, response) => {
    let packet = {
      status: ""
    };
    User.findOne({ username: request.user.username }).then((user) => {
      if (user) {
        user.password = hashPassword(request.body.password1);
        user.save().then(() => {
          packet.status = "PASSWORD_UPDATED";
          response.json(packet);
        }).catch(error => {
          console.log(error);
          packet.status = "ERROR_WHILE_UPDATING_PASSWORD";
          response.json(packet);
        })
      } else {
        packet.status = "USER_NOT_FOUND";
        response.json(packet);
      }
    }).catch(error => {
      console.log(error);
      packet.status = "ERROR_WHILE_UPDATING_PASSWORD";
      response.json(packet);
    })
  });

  /*
    @route /api/users/set-attacker-role
    @method PATCH

    @inputs:
      role: String

    @outputs:
      If there is an error
        packet: Object (status: ERROR_WHILE_SETTING_ATTACKER_ROLE)

      If input is invalid
        packet: Object (status: INVALID_ATTACKER_ROLE)

      If user is not found
        packet: Object (status: USER_NOT_FOUND)

      If attacker role has been updated
        packet: Object (status: ATTACKER_ROLE_SET)
  */
  app.patch("/api/users/set-attacker-role", (request, response, done) => {
    log("PATCH REQUEST AT /api/users/set-attacker-role");
    done();
  }, passport.authenticate("jwt", { session: false }), validation.validateAttackerRole, (request, response) => {
    let packet = {
      status: ""
    };
    User.findOne({ username: request.user.username }).then((user) => {
      if (user) {
        user.attacker_role = request.body.role;
        user.save().then(() => {
          packet.status = "ATTACKER_ROLE_SET";
          response.json(packet);
        }).catch(error => {
          console.log(error);
          packet.status = "ERROR_WHILE_SETTING_ATTACKER_ROLE";
          response.json(packet);
        })
      } else {
        packet.status = "USER_NOT_FOUND";
        response.json(packet);
      }
    }).catch(error => {
      console.log(error);
      packet.status = "ERROR_WHILE_SETTING_ATTACKER_ROLE";
      response.json(packet);
    });
  });

  /*
    @route /api/users/set-defender-role
    @method PATCH

    @inputs:
      role: String

    @outputs:
      If there is an error
        packet: Object (status: ERROR_WHILE_SETTING_DEFENDER_ROLE)

      If input is invalid
        packet: Object (status: INVALID_DEFENDER_ROLE)

      If user is not found
        packet: Object (status: USER_NOT_FOUND)

      If defender role has been updated
        packet: Object (status: DEFENDER_ROLE_SET)
  */
  app.patch("/api/users/set-defender-role", (request, response, done) => {
    log("PATCH REQUEST AT /api/users/set-defender-role");
    done();
  }, passport.authenticate("jwt", { session: false }), validation.validateDefenderRole, (request, response) => {
    let packet = {
      status: ""
    };
    User.findOne({ username: request.user.username }).then((user) => {
      if (user) {
        user.defender_role = request.body.role;
        user.save().then(() => {
          packet.status = "DEFENDER_ROLE_SET";
          response.json(packet);
        }).catch(error => {
          console.log(error);
          packet.status = "ERROR_WHILE_SETTING_DEFENDER_ROLE";
          response.json(packet);
        })
      } else {
        packet.status = "USER_NOT_FOUND";
        response.json(packet);
      }
    }).catch(error => {
      console.log(error);
      packet.status = "ERROR_WHILE_SETTING_DEFENDER_ROLE";
      response.json(packet);
    });
  });

  /*
    @route /api/users/set-attackers
    @method PATCH

    @inputs
      attackers: Array

    @outputs
      If there is an error
        packet: Object (status: ERROR_WHILE_SETTING_ATTACKERS)

      If input is invalid
        packet: Object (status: INVALID_ATTACKERS)

      If user is not found
        packet: Object (status: USER_NOT_FOUND)

      If attackers are set
        packet: Object (status: ATTACKERS_SET)
  */
  app.patch("/api/users/set-attackers", (request, response, done) => {
    log("PATCH REQUEST AT /api/users/set-attackers");
    done();
  }, passport.authenticate("jwt", { session: false }), validation.validateAttackersInput, (request, response) => {
    let packet = {
      status: ""
    };
    User.findOne({ username: request.user.username }).then((user) => {
      if (user) {
        user.attackers = request.body.attackers;
        user.save().then(() => {
          packet.status = "ATTACKERS_SET";
          response.json(packet);
        }).catch(error => {
          console.log(error);
          packet.status = "ERROR_WHILE_SETTING_ATTACKERS";
          response.json(packet);
        })
      } else {
        packet.status = "USER_NOT_FOUND";
        response.json(packet);
      }
    }).catch(error => {
      console.log(error);
      packet.status = "ERROR_WHILE_SETTING_ATTACKERS";
      response.json(packet);
    });
  });

  /*
    @route /api/users/set-defenders
    @method PATCH

    @inputs
      attackers: Array

    @outputs
      If there is an error
        packet: Object (status: ERROR_WHILE_SETTING_DEFENDERS)

      If user is not found
        packet: Object (status: USER_NOT_FOUND)

      I
  */
  app.patch("/api/users/set-defenders", (request, response, done) => {
    log("PATCH REQUEST AT /api/users/set-defenders");
    done();
  }, passport.authenticate("jwt", { session: false }), validation.validateDefendersInput, (request, response) => {
    let packet = {
      status: ""
    };
    User.findOne({ username: request.user.username }).then((user) => {
      if (user) {
        user.defenders = request.body.defenders;
        user.save().then(() => {
          packet.status = "DEFENDERS_SET";
          response.json(packet);
        }).catch(error => {
          console.log(error);
          packet.status = "ERROR_WHILE_SETTING_DEFENDERS";
          response.json(packet);
        })
      } else {
        packet.status = "USER_NOT_FOUND";
        response.json(packet);
      }
    }).catch(error => {
      console.log(error);
      packet.status = "ERROR_WHILE_SETTING_DEFENDERS";
      response.json(packet);
    });
  });

  /*
    @route /api/users/delete
    @method DELETE

    @outputs:
    If at any point there is an error
      packet: Object (status: ERROR_WHILE_DELETING_USER)

    If user is sole person on team
      packet: Object (status: USER_AND_TEAM_DELETED)

    If user is deleted (even on a team)
      packet: Object (status: USER_DELETED)
  */
  app.delete("/api/users/delete", (request, response, done) => {
    log("DELETE REQUEST AT /api/users/delete");
    done();
  }, passport.authenticate("jwt", { session: false }), (request, response) => {
    let packet = {
      status: ""
    };
    if (request.user.team_code) {
      Team.findOne({ join_code: request.user.team_code }).then((team, error) => {
        if (team.members.length === 1 && team.members[0] === String(request.user._id) && team.admins.length === 0 && team.editors.length === 0) {
          Team.deleteOne({ join_code: request.user.team_code }).then(() => {
            User.deleteOne({ _id: mongoose.Types.ObjectId(request.user._id) }).then(() => {
              packet.status = "USER_AND_TEAM_DELETED";
              response.json(packet);
              email(request.user.email, "Account Deleted", "<h2>Your account has succesfully been deleted.</h2><br/><br/><p>Thank you for using R6 Stratbook. While we are sad to see you go, your data has been removed from our databases. If you wish to use the platform again, you will have to create a new account.<br/><br/>Thanks.</p>");
            }).catch(error => {
              console.log(error);
              packet.status = "ERROR_WHILE_DELETING_USER";
              response.json(packet);
            });
          }).catch(error => {
            console.log(error);
            packet.status = "ERROR_WHILE_DELETING_USER";
            response.json(packet);
          })
        } else if (team.editors.length === 1 && team.editors[0] === String(request.user._id) && team.members.length === 0 && team.admins.length === 0) {
          Team.deleteOne({ join_code: request.user.team_code }).then(() => {
            User.deleteOne({ _id: mongoose.Types.ObjectId(request.user._id) }).then(() => {
              packet.status = "USER_AND_TEAM_DELETED";
              response.json(packet);
              email(request.user.email, "Account Deleted", "<h2>Your account has succesfully been deleted.</h2><br/><br/><p>Thank you for using R6 Stratbook. While we are sad to see you go, your data has been removed from our databases. If you wish to use the platform again, you will have to create a new account.<br/><br/>Thanks.</p>");
            }).catch(error => {
              console.log(error);
              packet.status = "ERROR_WHILE_DELETING_USER";
              response.json(packet);
            });
          }).catch(error => {
            console.log(error);
            packet.status = "ERROR_WHILE_DELETING_USER";
            response.json(packet);
          })
        } else if (team.admins.length === 1 && team.admins.indexOf(String(request.user._id)) >= 0) {
          Team.deleteOne({ join_code: request.user.team_code }).then(() => {
            User.deleteOne({ _id: mongoose.Types.ObjectId(request.user._id) }).then(() => {
              packet.status = "USER_AND_TEAM_DELETED";
              response.json(packet);
              email(request.user.email, "Account Deleted", "<h2>Your account has succesfully been deleted.</h2><br/><br/><p>Thank you for using R6 Stratbook. While we are sad to see you go, your data has been removed from our databases. If you wish to use the platform again, you will have to create a new account.<br/><br/>Thanks.</p>");
            }).catch(error => {
              console.log(error);
              packet.status = "ERROR_WHILE_DELETING_USER";
              response.json(packet);
            });
          }).catch(error => {
            console.log(error);
            packet.status = "ERROR_WHILE_DELETING_USER";
            response.json(packet);
          })
        } else {
          if (team.members.indexOf(String(request.user._id)) >= 0) {
            let index = team.members.indexOf(String(request.user._id));
            team.members = team.members.splice(index, 1);
          } else if (team.editors.indexOf(String(request.user._id)) >= 0) {
            let index = team.editors.indexOf(String(request.user._id));
            team.editors = team.editors.splice(index, 1);
          } else if (team.admins.indexOf(String(request.user._id)) >= 0) {
            let index = team.admins.indexOf(String(request.user._id));
            team.admins = team.admins.splice(index, 1);
          }
          team.save().then(() => {
            User.deleteOne({ _id: mongoose.Types.ObjectId(request.user._id) }).then(() => {
              packet.status = "USER_DELETED";
              response.json(packet);
              email(request.user.email, "Account Deleted", "<h2>Your account has succesfully been deleted.</h2><br/><br/><p>Thank you for using R6 Stratbook. While we are sad to see you go, your data has been removed from our databases. If you wish to use the platform again, you will have to create a new account.<br/><br/>Thanks.</p>");
            }).catch(error => {
              console.log(error);
              packet.status = "ERROR_WHILE_DELETING_USER";
              response.json(packet);
            });
          }).catch(error => {
            console.log(error);
            packet.status = "ERROR_WHILE_DELETING_USER";
            response.json(packet);
          })
        }
      }).catch(error => {
        console.log(error);
        packet.status = "ERROR_WHILE_DELETING_USER";
        response.json(packet);
      });
    } else {
      User.deleteOne({ _id: mongoose.Types.ObjectId(request.user._id) }).then(() => {
        packet.status = "USER_DELETED";
        response.json(packet);
      }).catch(error => {
        console.log(error);
        packet.status = "ERROR_WHILE_DELETING_USER";
        response.json(packet);
      });
    }
  });

};
