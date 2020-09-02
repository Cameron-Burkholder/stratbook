/* routes/users.js */

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const email = require("../config/email.js");

const { log, verifyPassword, hashPassword, issueJWT, genVerificationLink } = require("../config/utilities.js");

// Load input validation
const validateRegisterInput = require("../validation/register.js");
const validateLoginInput = require("../validation/login.js");

// Load platform validation
const validatePlatformInput = require("../validation/validatePlatformInput.js");

// Load username validation
const validateUsernameInput = require("../validation/validateUsernameInput.js");

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
        User.findOne({ _id: item.user_id }, function(error, user) {
          if (error) {
            console.log(error);
            response.redirect("/register");
          }
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
            });
          })
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
        packet: Object (status: ERROR_WHILE_LOGGING_IN)

      If input data is invalid
        packet: Object (status: INVALID_LOGIN, errors: errors)

      If user does not exist in database
        packet: Object (status: USER_NOT_FOUND)

      If user exists
        If password is correct
          packet: Object (status: TOKEN_ISSUED, user_status: undefined or user_stats)
        Else
          packet: Object (status: INCORRECT_PASSWORD)
  */
  app.post("/api/users/login", (request, response, done) => {
    log("POST REQUEST AT /api/users/login");
    done();
  }, validateLoginInput, (request, response) => {
    User.findOne({ email: request.body.email.toLowerCase() }).then((user) => {
      let packet = {
        status: ""
      };

      if (!user) {
        packet.status = "USER_NOT_FOUND";
        response.json(packet);
      } else {
        const isValidPassword = verifyPassword(request.body.password, user.password);
        if (isValidPassword) {
          const tokenObject = issueJWT(user);
          packet.status = "TOKEN_ISSUED";
          packet.user_status = user.status;
          packet.token = tokenObject.token;
          packet.expiresIn = tokenObject.expires;
          response.json(packet);
        } else {
          packet.status = "INCORRECT_PASSWORD";
          response.json(packet);
        }
      }
    }).catch(error => {
      console.log(error);
      packet.status = "ERROR_WHILE_LOGGING_IN";
      response.json(packet);
    })
  });

  /*
    @route /api/users/register
    @method: POST

    @inputs:
      username: String
      email: String
      password1: String

    @outputs:
      If input data is invalid
        packet: Object (status: INVALID_REGISTRATION)

      If input data is profane
        packet: Object (status: PROFANE_INPUT)

      If user already exists in database (email or username)
        packet: Object (status: EXISTING_USER)

      If user does not exist in database
        If user is able to register
          packet: Object (status: USER_REGISTERED)
        Else
          packet: Object (status: ERROR_WHILE_REGISTERING)
  */
  app.post("/api/users/register", (request, response, done) => {
    log("POST REQUEST AT /api/users/register");
    done();
  }, validateRegisterInput, (request, response) => {
    let packet = {
      status: ""
    }
    User.findOne({ email: request.body.email }, function(error, user) {
      if (user) {
        packet.status = "EXISTING_USER";
        response.json(packet);
      } else {
        User.findOne({ username: request.body.username }, function(error, user) {
          if (user) {
            packet.status = "EXISTING_USER";
            response.json(packet);
          } else {
            const newUser = new User({
              username: request.body.username,
              email: request.body.email,
              password: request.body.password1,
              platform: request.body.platform,
              verified: process.env.NODE_ENV === "TESTING" ? true : false
            });
            if (process.env.NODE_ENV === "TESTING") {
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
                  packet.status = "USER_REGISTERED";

                  response.json(packet);
                  let registrationEmail = {
                    subject: "R6 Stratbook - Registration Complete!",
                    html: "<div><p>Thank you for registering with R6 Stratbook!<br/><br/>We are glad to have you on our platform. To verify your account so you can create and join teams, click the link below.</p><br/><br/><a href='" + newVerificationLink + "' target='_blank'>Verify Email</a></div>"
                  };
                  email(newUser.email, registrationEmail.subject, registrationEmail.html);
                }).catch(error => {
                  console.log(error);
                  packet.status = "ERROR_WHILE_REGISTERING";
                  response.json(packet);
                })
              }).catch(error => {
                console.log(error);
                packet.status = "ERROR_WHILE_REGISTERING";
                response.json(packet);
              });
            } else {
              console.log(error);
              packet.status = "ERROR_WHILE_REGISTERING";
              response.json(packet);
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
      Else
        If user does not exist in database
          packet: Object (status: USER_NOT_FOUND)
        Else
          If user has a team
            packet: Object (status: USER_HAS_TEAM)
          Else
            packet: Object (status: PLATFORM_UPDATED, user_status: undefined or user_stats)
  */
  app.patch("/api/users/update-platform", (request, response, done) => {
    log("PATCH REQUEST AT /api/users/update-platform");
    done();
  }, passport.authenticate("jwt", { session: false }), validatePlatformInput, (request, response) => {
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
      name: String

    @outputs:
      If an error occurs
        packet: Object (status: ERROR_WHILE_UPDATING_USERNAME)

      If user does not exist
        packet: Object (status: USER_NOT_FOUND)
      Else
        If user with new name exists
          packet: Object (status: USERNAME_TAKEN)
        Else
          packet: Object (status: USERNAME_UPDATED)
  */
  app.patch("/api/users/update-username", (request, response, done) => {
    log("PATCH REQUEST AT /api/users/update-username");
    done();
  }, passport.authenticate("jwt", { session: false }), validateUsernameInput, (request, response) => {
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
        } else if (team.admins.length === 1 && team.admins[0] === String(request.user._id) && team.editors.length === 0 && team.members.length === 0) {
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
