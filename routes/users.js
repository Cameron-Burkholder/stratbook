/* routes/users.js */

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const email = require("../config/email.js");

const { log, verifyPassword, hashPassword, issueJWT, genVerificationLink, notify } = require("../config/utilities.js");
const messages = require("../messages/messages.js");
const emails = require("../messages/emails.js");
const errors = require("../messages/errors.js");

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

  /**
  * Verify a user's email
  * @name /api/users/verify
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
      await user.save();
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
    notify(user, emails.VERIFY_ACCOUNT);
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
      return response.json(errors.ERROR_LOGIN);
    }

    if (!user) {
      return response.json(messages.USER_NOT_FOUND);
    }

    const isValidPassword = verifyPassword(request.body.password, user.password);
    if (isValidPassword) {
      const tokenObject = issueJWT(user);
      user.password = undefined;
      user._id = undefined;
      let packet = messages.TOKEN_ISSUED;
      packet.user = user;
      packet.token = tokenObject.token;
      packet.expiresIn = tokenObject.expires;
      return response.json(packet);
    } else {
      return response.json(messages.INCORRECT_PASSWORD);
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
    packet = messages.TOKEN_ISSUED;
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
      return response.json(errors.ERROR_REGISTER);
    }

    if (user) {
      packet = messages.EXISTING_USER;
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
        await newUser.save();
      } catch(error) {
        console.log(error);
        return response.json(errors.ERROR_REGISTER);
      }

      let host = request.hostname;
      let newVerificationId = genVerificationLink();
      let newVerificationLink = "http://" + host + "/api/users/verify?verification_id="+ newVerificationId;
      const newUnverifiedUser = new UnverifiedUser({
        user_id: newUser._id,
        verification_id: newVerificationId
      });

      try {
        await newUnverifiedUser.save();
      } catch(error) {
        console.log(error);
        return response.json(errors.ERROR_REGISTER);
      }

      email(newUser.email, "Account Verification", `<div><h2>Verify your Account</h2><br/><p>Click the link below to verify your Stratbook account.</p><br/><a target="blank" href=${newVerificationLink}>Verify Account</a>`);

      response.json(emails.USER_REGISTERED);
      notify(user, emails.USER_REGISTERED);
    }
  });

  /**
  * Update user's platform
  * @name /api/users/update-platform
  * @function
  * @async
  * @description The user sends a request to update their platform.
  *   If the input is invalid, this sends an invalid platform object.
  *   If the user does not exist in database, this returns a user not found object.
  *   If the user has a team, this returns a user has team object.
  *   If the user can change their platform, this returns a platform updated object.
  * @param {string} request.body.platform platform to change to
  */
  app.patch("/api/users/update-platform", (request, response, done) => {
    log("PATCH REQUEST AT /api/users/update-platform");
    done();
  }, passport.authenticate("jwt", { session: false }), validation.validatePlatformInput, middleware.userIsVerified, middleware.userHasNoTeam, async (request, response) => {
    let packet = {};
    let user;

    try {
      user = await User.findOne({ _id: request.user._id }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_PLATFORM);
    }

    user.platform = request.body.platform;

    try {
      await user.save();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_PLATFORM);
    }

    response.json(emails.PLATFORM_UPDATED);
    notify(user, emails.PLATFORM_UPDATED);
  });

  /**
  * Update user's username
  * @name /api/users/update-username
  * @function
  * @async
  * @description The user sends a request to update their username.
  *   If the user is not found, this returns a user not found object.
  *   If the user is allowed to update username, this returns a username updated object.
  * @param {string} request.body.username the user name to change to
  */
  app.patch("/api/users/update-username", (request, response, done) => {
    log("PATCH REQUEST AT /api/users/update-username");
    done();
  }, passport.authenticate("jwt", { session: false }), validation.validateUsernameInput, async (request, response) => {
    let user;
    try {
      user = await User.findOne({ _id: request.body._id }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_USERNAME);
    }

    user.username = request.body.username;

    try {
      await user.save();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_USERNAME);
    }

    response.json(emails.USERNAME_UPDATED);
    notify(user, emails.USERNAME_UPDATED);
  });

  /**
  * Update user's email
  * @name /api/users/update-email
  * @function
  * @async
  * @description The user sends a request to update their email.
  *   If the email requested is invalid, this returns an invalid email object.
  *   If the email requested is profane, this returns a profane input object.
  *   If the email requested is already taken, this returns an email taken object.
  *   If the email is able to be updated, this returns an email updated object.
  * @param {string} request.body.email the email to change to
  */
  app.patch("/api/users/update-email", (request, response, done) => {
    log("PATCH REQUEST AT /api/users/update-email");
    done();
  }, passport.authenticate("jwt", { session: false }), validation.validateEmailInput, async (request, response) => {
    let existing_user;
    let user;

    try {
      existing_user = await User.findOne({ email: request.body.email }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_EMAIL);
    }

    if (existing_user) {
      let packet = messages.EXISTING_USER;
      packet.errors = {
        email: "An account with that email already exists."
      };
      return response.json(packet);
    }

    try {
      user = await User.findOne({ _id: request.body._id }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_EMAIL);
    }

    const old_user = JSON.parse(JSON.stringify(user));
    user.email = request.body.email;

    try {
      await user.save();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_EMAIL);
    }

    if (!user.verified) {
      let unverified_user;
      try {
        unverified_user = await UnverifiedUser.findOne({ user_id: user._id }).exec();
      } catch(error) {
        console.log(error);
        return response.json(errors.ERROR_EMAIL);
      }

      let host = request.hostname;
      let newVerificationLink = "http://" + host + "/api/users/verify?verification_id="+ unverified_user.verification_id;

      email(newUser.email, "Account Verification", `<div><h2>Verify your Account</h2><br/><p>Click the link below to verify your Stratbook account.</p><br/><a target="blank" href="${newVerificationLink}">Verify Account</a>`);
    }

    response.json(emails.EMAIL_UPDATED);
    notify(user, emails.EMAIL_UPDATED);
    notify(old_user, emails.EMAIL_UPDATED);
  });

  /**
  * Update user status
  * @name /api/users/update-user-status
  * @function
  * @async
  * @description The user sends a request to update the status of a team member.
  *   If the status input is invalid, this returns an invalid status object.
  *   If the requesting user is not verified, this returns a user not verified object.
  *   If the requesting user is not an admin, this returns a permission denied object.
  *   If the requesting user is not on a team, this returns a user has no team object.
  *   If the requested user can't be found, this returns a user not found object.
  *   If the requested user is an admin, this returns a permission denied object.
  *   If the requested user is not on team, this returns a permission denied object.
  *   If the udpate is able to be performed, this returns a user status updated object.
  * @param {string} request.body.username the username of the account to be updated
  */
  app.patch("/api/users/update-user-status", (request, response, done) => {
    log("PATCH REQUEST AT /api/users/update-user-status");
    done();
  }, passport.authenticate("jwt", { session: false }), validation.validateStatusInput, middleware.userIsVerified, middleware.userIsAdmin, middleware.userHasTeam, async (request, response) => {

    let user;
    let team;

    // Find user to update
    try {
      user = await User.findOne({ username: request.body.username }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_UPDATE_USER_STATUS);
    }

    // If requested user can't be found
    if (!user) {
      return response.json(messages.USER_NOT_FOUND);
    }

    // If user is an admin
    if (user.status === ADMIN) {
      return response.json(messages.PERMISSION_DENIED);
    }

    // Find team
    try {
      team = await Team.findOne({ _id: request.team._id }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_UPDATE_USER_STATUS);
    }

    // Check to see if requested user is on team
    if (team.members.indexOf(String(user._id)) < 0 && team.editors.indexOf(String(user._id)) < 0) {
      return response.json(messages.PERMISSION_DENIED);
    }

    // If user is a member, remove from member list
    if (team.members.indexOf(String(user._id)) >= 0) {
      let index = team.members.indexOf(String(user._id));
      team.members.splice(index, 1);
    }
    // If user is an editor, remove from editor list
    if (team.editors.indexOf(String(user._id)) >= 0) {
      let index = team.editors.indexOf(String(user._id));
      team.editors.splice(index, 1);
    }

    // Update user status
    user.status = request.body.status;

    // Put user in correct status list
    if (request.body.status === ADMIN) {
      team.admins.push(String(user._id));
    }
    if (request.body.status === EDITOR) {
      team.editors.push(String(user._id));
    }
    if (request.body.status === MEMBER) {
      team.members.push(String(user._id));
    }

    // Save user
    try {
      await user.save();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_UPDATE_USER_STATUS);
    }

    // Save team
    try {
      await team.save();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_UPDATE_USER_STATUS);
    }


    response.json(emails.USER_STATUS_UPDATED);
    notify(user, emails.USER_STATUS_UPDATED);
  });

  /**
  * Send reset password link
  * @name /api/users/forgot-password
  * @function
  * @async
  * @description The user submits their email in order to request a password reset link.
  *   If the input email is invalid, this returns an invalid email object.
  *   If the input email is profane, this returns a profane input object.
  *   If the requested email is not found, this returns a user not found object.
  *   If the reset link can be sent, this returns a password reset link sent object.
  * @param {string} request.body.email the email to send the reset link
  */
  app.patch("/api/users/forgot-password", (request, response, done) => {
    log("PATCH REQUEST AT /api/users/forgot-password");
    done();
  }, validation.validateEmailInput, async (request, response) => {
    let user;
    try {
      user = await User.findOne({ email: request.body.email }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_FORGOT_PASSWORD);
    }

    if (!user) {
      return response.json(messages.USER_NOT_FOUND);
    }

    const reset_token = genVerificationLink();
    const reset_expiry = Date.now() + 3600000;
    user.reset_token = reset_token;
    user.reset_expiry = reset_expiry;
    const resetLink = "http://" + request.hostname + "/reset-password/" + reset_token;

    try {
      await user.save();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_FORGOT_PASSWORD);
    }

    response.json(messages.PASSWORD_RESET_LINK_SENT);
    email(user.email, "Password Reset", "<div><h2>Reset your password</h2><br/><p>You are receiving this because you have requested to reset the password for your Stratbook account. To complete the process, click on the following link and follow the provided instructions. If you did not request this, consider changing the email associated with your account in addition to your Stratbook password.</p><br/><br/><a href='" + resetLink + "' target='_blank'>Reset Password</a>");
  });

  /**
  * Reset user's password
  * @name /api/users/reset-password
  * @function
  * @async
  * @description The user submits a request to reset their password.
  *   If the password input is invalid, this returns an invalid password input object.
  *   If the token is not matched to a user, invalid, or expired, this returns an invalid reset token object.
  *   If the password is reset, this returns a password reset object.
  * @param {string} request.body.token the reset token to match to a user
  * @param {string} request.body.pasword1 the input field for password 1
  * @param {string} request.body.password2 the input field for password 2
  */
  app.patch("/api/users/reset-password", (request, response, done) => {
    log("PATCH REQUEST AT /api/users/reset-password");
    done();
  }, validation.validatePasswordInput, async (request, response) => {
    let user;
    const reset_token = request.body.token;
    if (reset_token || reset_token !== "") {
      try {
        user = await User.findOne({ reset_token: reset_token }).exec();
      } catch(error) {
        console.log(error);
        return response.json(errors.ERROR_RESET_PASSWORD);
      }

      if (user) {
        if (Date.now() < new Date(user.reset_expiry)) {
          return response.json(messages.INVALID_RESET_TOKEN);
        } else {
          const hash = hashPassword(request.body.password1);
          user.password = hash;
          user.reset_token = undefined;
          user.reset_expiry = undefined;

          try {
            await user.save();
          } catch(error) {
            console.log(error);
            return response.json(errors.ERROR_RESET_PASSWORD);
          }

          response.json(emails.PASSWORD_RESET);
          notify(user, emails.PASSWORD_RESET);
        }
      } else {
        return response.json(messages.INVALID_RESET_TOKEN);
      }
    } else {
      return response.json(messages.INVALID_RESET_TOKEN);
    }
  });

  /**
  * Update user's password
  * @name /api/users/update-password
  * @function
  * @async
  * @description The user submits a request to update their password.
  *   If the user is able to update their password, this returns a password updated object.
  * @param {string} password1 the password 1 input field
  * @param {string} password2 the password 2 input field
  */
  app.patch("/api/users/update-password", (request, response, done) => {
    log("PATCH REQUEST AT /api/users/update-password");
    done();
  }, passport.authenticate("jwt", { session: false }), validation.validatePasswordInput, async (request, response) => {

    let user;
    try {
      user = await User.findOne({ username: request.user.username }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_UPDATE_PASSWORD);
    }

    user.password = hashPassword(request.body.password1);

    try {
      await user.save();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_UPDATE_PASSWORD);
    }

    response.json(PASSWORD_UPDATED);
    notify(user, emails.PASSWORD_UPDATED);
  });

  /**
  * Update user's attacker role
  * @name /api/users/set-attacker-role
  * @function
  * @async
  * @description The user submits a request to set their attacker role.
  *   If the input data is invalid, this returns an invalid attacker role object.
  *   If the attacker role can be set, this returns an attacker role set object.
  * @param {string} request.body.role the attacker role to change to
  */
  app.patch("/api/users/set-attacker-role", (request, response, done) => {
    log("PATCH REQUEST AT /api/users/set-attacker-role");
    done();
  }, passport.authenticate("jwt", { session: false }), validation.validateAttackerRole, async (request, response) => {
    let user;

    try {
      user = await User.findOne({ _id: request.user._id }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_ATTACKER_ROLE);
    }

    user.attacker_role = request.body.role;

    try {
      await user.save();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_ATTACKER_ROLE);
    }

    response.json(messages.ATTACKER_ROLE_SET);
  });

  /**
  * Update user's defender role
  * @name /api/users/set-defender-role
  * @function
  * @async
  * @description The user submits a request to set their defender role.
  *   If the input data is invalid, this returns an invalid defender role object.
  *   If the defender role can be set, this returns an defender role set object.
  * @param {string} request.body.role the defender role to change to
  */
  app.patch("/api/users/set-defender-role", (request, response, done) => {
    log("PATCH REQUEST AT /api/users/set-defender-role");
    done();
  }, passport.authenticate("jwt", { session: false }), validation.validateDefenderRole, async (request, response) => {
    let user;

    try {
      user = await User.findOne({ _id: request.user._id }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_DEFENDER_ROLE);
    }

    user.defender_role = request.body.role;

    try {
      await user.save();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_DEFENDER_ROLE);
    }

    response.json(messages.DEFENDER_ROLE_SET);
  });

  /**
  * Update user's attackers
  * @name /api/users/set-attackers
  * @function
  * @async
  * @description The user submits a request to update their attackers.
  *   If the input is invalid, this returns an invalid attackers object.
  *   If the attackers are able to be set, this returns an attackers set object.
  * @param {[String]} request.body.attackers the array of attackers to set to
  */
  app.patch("/api/users/set-attackers", (request, response, done) => {
    log("PATCH REQUEST AT /api/users/set-attackers");
    done();
  }, passport.authenticate("jwt", { session: false }), validation.validateAttackersInput, async (request, response) => {
    let user;

    try {
      user = await User.findOne({ _id: request.user._id }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_ATTACKERS);
    }

    user.attackers = request.body.attackers;

    try {
      await user.save();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_ATTACKERS);
    }

    response.json(messages.ATTACKERS_SET);
  });

  /**
  * Update user's defenders
  * @name /api/users/set-defenders
  * @function
  * @async
  * @description The user submits a request to update their defenders.
  *   If the input is invalid, this returns an invalid defenders object.
  *   If the defenders are able to be set, this returns a defenders set object.
  * @param {[String]} request.body.defenders the array of defenders to set to
  */
  app.patch("/api/users/set-defenders", (request, response, done) => {
    log("PATCH REQUEST AT /api/users/set-defenders");
    done();
  }, passport.authenticate("jwt", { session: false }), validation.validateDefendersInput, async (request, response) => {
    let user;

    try {
      user = await User.findOne({ _id: request.user._id }).exec();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_DEFENDERS);
    }

    user.defenders = request.body.defenders;

    try {
      await user.save();
    } catch(error) {
      console.log(error);
      return response.json(errors.ERROR_DEFENDERS);
    }

    response.json(messages.DEFENDERS_SET);
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
  /**
  * Delete user
  * @name /api/users/delete
  * @function
  * @async
  * @description The user submits a request to delete account.
  *   If the user is the only person on a team, this returns a user and team deleted object.
  *   If the user is deleted, this returns a user deleted object.
  */
  app.delete("/api/users/delete", (request, response, done) => {
    log("DELETE REQUEST AT /api/users/delete");
    done();
  }, passport.authenticate("jwt", { session: false }), async (request, response) => {
    let user;
    let team;

    if (request.user.team_code) {
      try {
        team = await Team.findOne({ join_code: request.user.team_code }).exec();
      } catch(error) {
        console.log(error);
        return response.json(errors.ERROR_DELETE_USER);
      }

      if ((team.members.length === 1 && team.members[0] === String(request.user._id) && team.editors.length === 0 && team.admins.length === 0) ||
          (team.editors.length === 1 && team.editors[0] === String(request.user._id) && team.members.length === 0 && team.admins.length === 0) ||
          (team.admins.length === 1 && team.admins[0] === String(request.user._id) >= 0)) {

        try {
          await Strategies.deleteOne({ join_code: request.user.team_code }).exec();
        } catch(error) {
          console.log(error);
          return response.json(errors.ERROR_DELETE_TEAM_AND_USER);
        }

        try {
          await Team.deleteOne({ join_code: request.user.team_code }).exec();
        } catch(error) {
          console.log(error);
          return response.json(errors.ERROR_DELETE_TEAM_AND_USER);
        }

        try {
          await User.deleteOne({ _id: request.user._id }).exec();
        } catch(error) {
          console.log(error);
          return response.json(errors.ERROR_DELETE_TEAM_AND_USER);
        }

        notify(user, emails.USER_AND_TEAM_DELETED);
        response.json(emails.USER_AND_TEAM_DELETED);
      } else {
        if (user.status === MEMBER && team.members.indexOf(String(request.user._id)) >= 0) {
          let index = team.members.indexOf(String(request.user._id));
          team.members.splice(index, 1);
        }
        if (user.status === EDITOR && team.editors.indexOf(String(request.user._id)) >= 0) {
          let index = team.editors.indexOf(String(request.user._id));
          team.editors.splice(index, 1);
        }
        if (user.status === ADMIN && team.admins.indexOf(String(request.user._id)) >= 0) {
          let index = team.admins.indexOf(String(request.user._id));
          team.admins.splice(index, 1);
        }

        try {
          await team.save();
        } catch(error) {
          console.log(error);
          return response.json(errors.ERROR_DELETE_TEAM_AND_USER);
        }

        try {
          await User.deleteOne({ _id: request.user._id }).exec();
        } catch(error) {
          console.log(error);
          return response.json(errors.ERROR_DELETE_TEAM_AND_USER);
        }

        response.json(emails.USER_DELETED);
        notify(user, emails.USER_DELETED);
      }
    } else {
      try {
        await User.deleteOne({ _id: mongoose.Types.ObjectId(request.user._id) }).exec();
      } catch(error) {
        console.log(error);
        return response.json(errors.ERROR_DELETE_USER);
      }

      notify(user, emails.USER_DELETED);
      response.json(emails.USER_DELETED);
    }
  });

};
