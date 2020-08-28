const bcrypt = require("bcryptjs");
const email = require("../config/email.js");

const { log, verifyPassword, issueJWT } = require("../config/utilities.js");

// Load input validation
const validateRegisterInput = require("../validation/register.js");
const validateLoginInput = require("../validation/login.js");

// Load User model
require("../models/User.js");
const User = require("../models/User.js");

module.exports = async (app, passport) => {

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
        packet.json(packet);
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

  app.post("/api/users/register", (request, response, done) => {
    log("POST REQUEST AT /api/users/register");
    done();
  }, validateRegisterInput,
  async (request, response, done) => {
    let packet = {
      status: ""
    }
    User.findOne({ email: request.body.email }, function(error, user) {
      if (user) {
        packet.status = "EXISTING_USER";
        packet.errors = "User already exists.";
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
          packet.errors = "Unable to register user.";
          response.json(packet);
        }
      }
    });
  });

  app.post("/api/users/logout", (request, response) => {

  });

};
