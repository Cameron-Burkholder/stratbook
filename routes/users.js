/* routes/users.js */

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const email = require("../config/email.js");

const { log, verifyPassword, hashPassword, issueJWT, genVerificationLink, notify } = require("../config/utilities.js");
const { VERIFY_ACCOUNT, USER_NOT_FOUND, INCORRECT_PASSWORD, EXISTING_USER, USER_REGISTERED } = require("../messages.js");
const { ERROR_LOGIN, ERROR_REGISTER } = require("../errors.js");

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

  /**
  * Verify a user's email
  * @name /api/users/verify
  * @method GET
  * @function
  * @async
  * @description The user makes a request to this url with a query string specifying which user is attempting to verify their account.
  *   If there is no string token associated with any unverified users, this will redirect to the register screen.
  *   If the string token matches an unverified user, this will find the user object in the db, verify it, then delete the unverified object in the db.
  *   Once the user has been verified this redirects to the login page and notifies the user.
  * @param {string} request.query.verification_id string id token to verify user's account
  */
  app.get("/api/users/verify", async (request, response) => {
    log("GET REQUEST AT /api/users/verify");
    let unverified_user;
    let user;

    // Find unverified user object in db
    try {
      unverified_user = await UnverifiedUser.findOne({ verification_id: request.verification_id }).exec();
      if (!item) {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
      return response.redirect("/register");
    }

    // Find user object associated with unverified user object
    try {
      user = await User.findOne({ _id: mongoose.Types.ObjectId(unverified_user.user_id) }).exec();
    } catch(error) {
      console.error(error);
      return response.redirect("/register");
    }

    // Verify user and save
    user.verified = true;
    try {
      await user.save().exec();
    } catch(error) {
      console.log(error);
      return response.redirect("/register");
    }

    // Delete unverified user object
    try {
      await UnverifiedUser.deleteOne({ user_id: user._id });
    } catch(error) {
      console.log(error);
      return response.redirect("/register");
    }

    // Notify user their account has been verified and redirect to login page
    notify(user, VERIFY_ACCOUNT);
    response.redirect("/login");

  });

  /**
  * Login user
  * @name /api/users/login
  * @function
  * @async
  * @description The user makes a login request by providing an email and password.
  *   If the input data is invalid, this returns an invalid login object
  *   If the user does not exist in db, this returns a user not found object
  *   If the password is incorrect, this returns an incorrect password object
  *   If the password is correct, this returns a token issued object
  * @param {string} request.body.email email address
  * @param {string} request.body.password password
  */
  app.post("/api/users/login", (request, response, done) => {
    log("POST REQUEST AT /api/users/login");
    done();
  }, validation.validateLoginInput, async (request, response) => {
    let packet = {};
    let user;
    try {
      user = await User.findOne({ email: request.body.email.toLowerCase() }).exec();
    } catch(error) {
      console.log(error);
      return response.json(ERROR_LOGIN);
    }

    if (!user) {
      return response.json(USER_NOT_FOUND);
    }

    const isValidPassword = verifyPassword(request.body.password, user.password);
    if (isValidPassword) {
      const tokenObject = issueJWT(user);
      user.password = undefined;
      user._id = undefined;
      let packet = TOKEN_ISSUED;
      packet.user = user;
      packet.token = tokenObject.token;
      packet.expiresIn = tokenObject.expires;
      return response.json(packet);
    } else {
      return response.json(INCORRECT_PASSWORD);
    }

  });

  /**
  * Extend JSON web token for seamless login
  * @name /api/users/update-token
  * @function
  * @description The user requests a new json web token upon loading the website.
  *   If the user is still logged in with a valid token, a new one is granted.
  *   If the user is not logged in with a valid token, the request is denied.
  */
  app.get("/api/users/update-token", (request, response, done) => {
    log("GET REQUEST AT /api/users/update-token");
    done();
  }, passport.authenticate("jwt", { session: false }), (request, response) => {
    let packet = {};
    const tokenObject = issueJWT(request.user);
    request.user.password = undefined;
    request.user._id = undefined;
    packet.status = "TOKEN_UPDATED";
    packet.user = request.user;
    packet.token = tokenObject.token;
    packet.expiresIn = tokenObject.expires;
    response.json(packet);
  });

  /**
  * Register user
  * @name /api/users/register
  * @function
  * @async
  * @description The user makes a registration request to create an account.
  *   If the input data is invalid, this returns an invalid registration object.
  *   If the input data is profane, this returns a profane input object .
  *   If an account with the same email already exists, this returns an existing user object .
  *   If the user is able to register, this returns a user registered object.
  * @param {string} request.body.username username associated with siege account
  * @param {string} request.body.email email to register with
  * @param {string} request.body.platform platform to associate account with
  * @param {string} request.body.password1 password input 1
  * @param {string} request.body.password2 password input 2
  */
  app.post("/api/users/register", (request, response, done) => {
    log("POST REQUEST AT /api/users/register");
    done();
  }, validation.validateRegisterInput, async (request, response) => {
    let packet = {};
    let user;
    try {
      user = await User.findOne({ email: request.body.email }).exec();
    } catch(error) {
      console.log(error);
      return response.json(ERROR_REGISTER);
    }

    if (user) {
      packet = EXISTING_USER;
      packet.errors = {
        email: "An account with that email already exists."
      };
      return response.json(packet);
    }

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

    let hashedPassword = hashPassword(request.body.password1);
    if (hashedPassword) {
      newUser.password = hashedPassword;
      try {
        await newUser.save().exec();
      } catch(error) {
        console.log(error);
        return response.json(ERROR_REGISTER);
      }

      let host = request.hostname;
      let newVerificationId = genVerificationLink();
      let newVerificationLink = "http://" + host + "/api/users/verify?verification_id="+ newVerificationId;
      const newUnverifiedUser = new UnverifiedUser({
        user_id: newUser._id,
        verification_id: newVerificationId
      });

      try {
        await newUnverifiedUser.save().exec();
      } catch(error) {
        console.log(error);
        return response.json(ERROR_REGISTER);
      }

      response.json(USER_REGISTERED);
      notify(user, USER_REGISTERED);
    }
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
  }, passport.authenticate("jwt", { session: false }), validation.validatePlatformInput, middleware.userIsVerified, middleware.userHasNoTeam, (request, response) => {
    let packet = {};
    User.findOne({ _id: request.user._id }).then(user => {
      user.platform = request.body.platform;
      user.save().then(() => {
        packet.status = "PLATFORM_UPDATED";
        response.json(packet);
        notify(user, { title: "Platform Changed", body: "The platform associated with your account has changed." });
        email(user.email, "Platform Changed", "The platform associated with your account has changed. If you did not do this, be sure to change it to the appropriate platform.");
      }).catch(error => {
        console.log(error);
        packet.status = "ERROR";
        packet.message = "An error occurred while attempting to update platform.";
        response.json(packet);
      })
    }).catch(error => {
      console.log(error);
      packet.status = "ERROR";
      packet.message = "An error occurred while attempting to update platform.";
      response.json(packet);
    });
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
    let packet = {};
      User.findOne({ username: request.body.username }).then((existing_user) => {
        if (existing_user) {
          packet.status = "USERNAME_TAKEN";
          packet.errors = {
            username: "A user with that username already exists"
          }
          response.json(packet);
        } else {
          User.findOne({ _id: request.user._id }).then(user => {
            user.username = request.body.username;
            user.save().then(() => {
              packet.status = "USERNAME_UPDATED";
              response.json(packet);
              notify(user, { title: "Username Changed", body: "The username associated with your Stratbook account has been changed." });
              email(user.email, "Username Changed", "The username associated with your Stratbook account has been changed. If you did not do this, please correct this as it may cause the statistics functions of Stratbook to malfunction.");
            }).catch(error => {
              console.log(error);
              packet.status = "ERROR";
              packet.message = "An error occurred while attempting to update username.";
            })
          }).catch(error => {
            console.log(error);
            packet.status = "ERROR";
            packet.message = "An error occurred while attempting to update username.";
          })
        }
      }).catch(error => {
        console.log(error);
        packet.status = "ERROR";
        packet.message = "An error occurred while attempting to update username.";
        response.json(packet);
      });
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
  }, passport.authenticate("jwt", { session: false }), validation.validateEmailInput, middleware.userIsVerified, (request, response) => {
    let packet = {
      status: ""
    };
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
              notify(user, { title: "Email Changed", body: "The email associated with your Stratbook account has been changed." });
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
    });
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
  }, passport.authenticate("jwt", { session: false }), validation.validateStatusInput, middleware.userIsVerified, middleware.userIsAdmin, middleware.userHasTeam, (request, response) => {
    let packet = {
      status: ""
    };
    User.findOne({ username: request.user.username }).then((rUser) => {
        if (rUser) {
          User.findOne({ username: request.body.username }).then((user) => {
            if (user) {
              if (user.status === "ADMIN") {
                packet.status = "PERMISSION_DENIED";
                response.json(packet);
              } else {
                Team.findOne({ _id: request.team._id }).then((team) => {
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
                            notify(user, { title: "Team Status Updated", body: `The status of your membership on the team ${team.name} has been updated to ${user.status}.` });
                            email(user.email, "Team Status Updated", `The status associated with your membership on the team ${team.name} has been updated to ${user.status}.<br/><br/>This means your responsibilities and privileges related to the team may have changed. Contact a team admin if you think this is a mistake.`);
                          }).catch(error => {
                            console.log(error);
                            packet.status = "ERROR";
                            packet.message = "An error occurred while attempting to update user status.";
                            response.json(packet);
                          });
                        }).catch(error => {
                          console.log(error);
                          packet.status = "ERROR";
                          packet.message = "An error occurred while attempting to update user status.";
                          response.json(packet);
                        });
                      } else if (request.body.status === "EDITOR") {
                        team.editors.push(String(user._id));
                        team.save().then(() => {
                          user.save().then(() => {
                            packet.status = "USER_STATUS_UPDATED";
                            response.json(packet);
                            notify(user, { title: "Team Status Updated", body: `The status of your membership on the team ${team.name} has been updated to ${user.status}.` });
                            email(user.email, "Team Status Updated", `The status associated with your membership on the team ${team.name} has been updated to ${user.status}.<br/><br/>This means your responsibilities and privileges related to the team may have changed. Contact a team admin if you think this is a mistake.`);
                          }).catch(error => {
                            console.log(error);
                            packet.status = "ERROR";
                            packet.message = "An error occurred while attempting to update user status.";
                            response.json(packet);
                          });
                        }).catch(error => {
                          console.log(error);
                          packet.status = "ERROR";
                          packet.message = "An error occurred while attempting to update user status.";
                          response.json(packet);
                        });
                      } else if (request.body.status === "MEMBER") {
                        team.members.push(String(user._id));
                        team.save().then(() => {
                          user.save().then(() => {
                            packet.status = "USER_STATUS_UPDATED";
                            response.json(packet);
                            notify(user, { title: "Team Status Updated", body: `The status of your membership on the team ${team.name} has been updated to ${user.status}.` });
                            email(user.email, "Team Status Updated", `The status associated with your membership on the team ${team.name} has been updated to ${user.status}.<br/><br/>This means your responsibilities and privileges related to the team may have changed. Contact a team admin if you think this is a mistake.`);
                          }).catch(error => {
                            console.log(error);
                            packet.status = "ERROR";
                            packet.message = "An error occurred while attempting to update user status.";
                            response.json(packet);
                          });
                        }).catch(error => {
                          console.log(error);
                          packet.status = "ERROR";
                          packet.message = "An error occurred while attempting to update user status.";
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
                    packet.status = "TEAM_NOT_FOUND";
                    response.json(packet);
                  }
                }).catch(error => {
                  console.log(error);
                  packet.status = "ERROR";
                  packet.message = "An error occurred while attempting to update user status.";
                  response.json(packet);
                });
              }
            } else {
              packet.status = "USER_NOT_FOUND";
              response.json(packet);
            }
          }).catch(error => {
            console.log(error);
            packet.status = "ERROR";
            packet.message = "An error occurred while attempting to update user status.";
            response.json(packet);
          });
        } else {
          packet.status = "USER_NOT_FOUND";
          response.json(packet);
        }
      });
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
        const resetLink = "http://" + request.hostname + "/reset-password/" + reset_token;
        user.save().then(() => {
          packet.status = "PASSWORD_RESET_LINK_SENT";
          response.json(packet);
          email(user.email, "Password Reset Link", "<p>You are receiving this because you (or someone else) have requested the reset of the password for your account. Please click on the following link to complete the process</p><br/><br/><a href='" + resetLink + "' target='_blank'>Reset Password</a>");
        }).catch(error => {
          console.log(error);
          packet.status = "ERROR";
          packet.message = "An error occurred while sending password reset link.";
          response.json(packet);
        });
      } else {
        packet.status = "USER_NOT_FOUND";
        response.json(packet);
      }
    }).catch(error => {
      console.log(error);
      packet.status = "ERROR";
      packet.message = "An error occurred while sending password reset link.";
      response.json(packet);
    });
  });

  /*
    @route /api/users/reset-password
    @method PATCH

    @inputs:
      password1: String
      password2: String
      token: String

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
    const reset_token = request.body.token;
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
              notify(user, { title: "Password Reset", body: "Your password has been reset. If you did not do this, login and reset your password immediately." });
              email(user.email, "Your password has been reset", "<p>Your password has been reset. If you did not do this, reset your password immediately.</p>");
            }).catch(error => {
              console.log(error);
              packet.status = "ERROR";
              packet.message = "An error occurred while resetting the user's password.";
              response.json(packet);
            });
          }
        } else {
          packet.status = "INVALID_RESET_TOKEN";
          response.json(packet);
        }
      }).catch(error => {
        console.log(error);
        packet.status = "ERROR";
        packet.message = "An error occurred while resetting the user's password.";
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
      user.password = hashPassword(request.body.password1);
      user.save().then(() => {
        packet.status = "PASSWORD_UPDATED";
        response.json(packet);
        notify(user, { title: "Password Updated", body: "The password associated with your Stratbook account has been udpated." });
        email(user.email, "Password Updated", `The password associated with your account has been updated. If you did not do this, <a href=${request.protocol + "://" + request.get("host") + request.originalUrl + "/forgot-password"} target="_blank">click here</a> to reset it.`);
      }).catch(error => {
        console.log(error);
        packet.status = "ERROR";
        packet.message = "An error occurred while updating password.";
        response.json(packet);
      });
    }).catch(error => {
      console.log(error);
      packet.status = "ERROR";
      packet.message = "An error occurred while updating password.";
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
      user.attacker_role = request.body.role;
      user.save().then(() => {
        packet.status = "ATTACKER_ROLE_SET";
        response.json(packet);
      }).catch(error => {
        console.log(error);
        packet.status = "ERROR";
        packet.message = "An error occurred while attempting to set user's attacker role.";
        response.json(packet);
      })
    }).catch(error => {
      console.log(error);
      packet.status = "ERROR";
      packet.message = "An error occurred while attempting to set user's attacker role.";
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
      user.defender_role = request.body.role;
      user.save().then(() => {
        packet.status = "DEFENDER_ROLE_SET";
        response.json(packet);
      }).catch(error => {
        console.log(error);
        packet.status = "ERROR";
        packet.message = "An error occurred while setting user's defender role.";
        response.json(packet);
      })
    }).catch(error => {
      console.log(error);
      packet.status = "ERROR";
      packet.message = "An error occurred while setting user's defender role.";
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
      user.attackers = request.body.attackers;
      user.save().then(() => {
        packet.status = "ATTACKERS_SET";
        response.json(packet);
      }).catch(error => {
        console.log(error);
        packet.status = "ERROR";
        packet.message = "An error occurred while attempting to set user's preferred attackers.";
        response.json(packet);
      });
    }).catch(error => {
      console.log(error);
      packet.status = "ERROR";
      packet.message = "An error occurred while attempting to set user's preferred attackers.";
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
      user.defenders = request.body.defenders;
      user.save().then(() => {
        packet.status = "DEFENDERS_SET";
        response.json(packet);
      }).catch(error => {
        console.log(error);
        packet.status = "ERROR";
        packet.message = "An error occurred while attempting to set user's defender role.";
        response.json(packet);
      });
    }).catch(error => {
      console.log(error);
      packet.status = "ERROR";
      packet.message = "An error occurred while attempting to set user's defender role.";
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
            packet.status = "ERROR";
            packet.message = "An error occurred while attempting to delete user's account.";
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
              packet.status = "ERROR";
              packet.message = "An error occurred while attempting to delete user's account.";
              response.json(packet);
            });
          }).catch(error => {
            console.log(error);
            packet.status = "ERROR";
            packet.message = "An error occurred while attempting to delete user's account.";
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
              packet.status = "ERROR";
              packet.message = "An error occurred while attempting to delete user's account.";
              response.json(packet);
            });
          }).catch(error => {
            console.log(error);
            packet.status = "ERROR";
            packet.message = "An error occurred while attempting to delete user's account.";
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
              packet.status = "ERROR";
              packet.message = "An error occurred while attempting to delete user's account.";
              response.json(packet);
            });
          }).catch(error => {
            console.log(error);
            packet.status = "ERROR";
            packet.message = "An error occurred while attempting to delete user's account.";
            response.json(packet);
          })
        }
      }).catch(error => {
        console.log(error);
        packet.status = "ERROR";
        packet.message = "An error occurred while attempting to delete user's account.";
        response.json(packet);
      });
    } else {
      User.deleteOne({ _id: mongoose.Types.ObjectId(request.user._id) }).then(() => {
        packet.status = "USER_DELETED";
        response.json(packet);
      }).catch(error => {
        console.log(error);
        packet.status = "ERROR";
        packet.message = "An error occurred while attempting to delete user's account.";
        response.json(packet);
      });
    }
  });

};
