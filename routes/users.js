/* routes/users.js */

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const email = require("../config/email.js");

const { log, verifyPassword, hashPassword, issueJWT, genVerificationLink } = require("../config/utilities.js");

// Load input validation
const validateRegisterInput = require("../validation/register.js");
const validateLoginInput = require("../validation/login.js");

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
              verified: false
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
    @route /api/users/delete
    @method DELETE

    @outputs:
    If at any point there is an error
      packet: Object (status: ERROR_WHILE_DELETING_USER)

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
      Team.findOne({ join_code: request.user.team_code }).then((error, team) => {

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
