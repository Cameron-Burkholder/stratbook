/* validation/register.js */

const Validator = require("validator");
const isEmpty = require("is-empty");

/*
  @func: validateRegisterInput
  @desc: check if register information is in a valid format
  @param request: request object
  @param response: response object
  @param done: forwarding function for express middleware

  @inputs:
    username: String
    email: String
    password1: String
    password2: String
    platform: String

  @outputs:
    If inputs are not valid
      packet: Object (status: INVALID_REGISTRATION)
    Else
      done();
*/

module.exports = function validateRegisterInput(request, response, done) {

  let data = request.body;
  let packet = {};

  let errors = {};
  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password1 = !isEmpty(data.password1) ? data.password1 : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.platform = !isEmpty(data.platform) ? data.platform.toUpperCase() : "";

  // Username checks
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required.";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid.";
  }

  // Password checks
  if (Validator.isEmpty(data.password1)) {
    errors.password1 = "Password field is required.";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required.";
  }
  if (!Validator.isLength(data.password1, { min: 6, max: 30 })) {
    errors.password1 = "Password must be at least 6 characters and at most 30.";
  }
  if (!Validator.equals(data.password1, data.password2)) {
    errors.password2 = "Passwords must match.";
  }

  // Platform checks
  if (Validator.isEmpty(data.platform)) {
    errors.platform = "Platform field is required.";
  } else if (data.platform !== "XBOX" && data.platform !== "PC" && data.platform !== "PS4") {
    errors.platform = "The only platforms accepted are Xbox, PC, or PS4.";
  }

  if (!isEmpty(errors)) {
    packet.status = "INVALID_REGISTRATION";
    packet.errors = errors;
    response.json(packet);
    response.end();
  } else {
    done();
  }
};
