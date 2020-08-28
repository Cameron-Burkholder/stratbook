/* routes/users.js */

const bcrypt = require("bcryptjs");
const email = require("../config/email.js");

const { log, verifyPassword, hashPassword, issueJWT } = require("../config/utilities.js");

// Load input validation
const validateRegisterInput = require("../validation/register.js");
const validateLoginInput = require("../validation/login.js");

// Load User model
require("../models/User.js");
const User = require("../models/User.js");

module.exports = async (app, passport) => {

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
          packet: Object (status: TOKEN_ISSUED)
        Else
          packet: Object (status: INCORRECT_PASSWORD)
  */
  app.post("/api/users/login", (request, response, done) => {
    log("POST REQUEST AT /api/users/login");
    done();
  }, validateLoginInput, (request, response) => {
    User.findOne({ email: request.body.email }).then((user) => {
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
      name: String
      email: String
      password1: String

    @outputs:
      If input data is invalid
        packet: Object (status: INVALID_REGISTRATION)

      If user already exists in database
        packet: Object (status: EXISTING_USER)

      If user does not exist in database
        If user is able to register
          packet: Object (status: USER_REGISTERED)
        Else
          packet: Object (status: UNABLE_TO_REGISTER)
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
        const newUser = new User({
          name: request.body.name,
          email: request.body.email,
          password: request.body.password1
        });
        // Hash password before saving in database
        let hashedPassword = hashPassword(request.body.password1);
        if (hashedPassword) {
          newUser.password = hashedPassword;
          newUser.save().then(user => {
            packet.status = "USER_REGISTERED";
            response.json(packet);
            let registrationEmail = {
              subject: "SUBJECT",
              text: "TEXT"
            };
            email(user.email, registrationEmail.subject, registrationEmail.text);
          });
        } else {
          packet.status = "UNABLE_TO_REGISTER";
          response.json(packet);
        }
      }
    });
  });

};
