

const Validator = require("validator");
const Filter = require("bad-words");
const filter = new Filter();
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
    If inputs are profane
      packet: Object (status: PROFANE_INPUT)
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
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password checks
  if (Validator.isEmpty(data.password1)) {
    errors.password1 = "Password field is required";
  } else if (!Validator.isLength(data.password1, { min: 6, max: 30 })) {
    errors.password1 = "Password must be at least 6 characters and at most 30";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  } else if (!Validator.equals(data.password1, data.password2)) {
    errors.password2 = "Passwords must match";
  }


  // Platform checks
  if (Validator.isEmpty(data.platform)) {
    errors.platform = "Platform field is required";
  } else if (data.platform !== "XBOX" && data.platform !== "PC" && data.platform !== "PS4") {
    errors.platform = "The only platforms accepted are Xbox, PC, or PS4";
  }

  if (!isEmpty(errors)) {
    packet.status = "INVALID_REGISTRATION";
    packet.errors = errors;
    response.json(packet);
    response.end();
    return packet;
  } else if (filter.isProfane(request.body.username) || filter.isProfane(request.body.email)) {
    packet.status = "PROFANE_INPUT";
    errors.username = filter.isProfane(request.body.username) ? "Username may not be inappropriate" : null;
    errors.email = filter.isProfane(request.body.email) ? "Email may not be inappropriate" : null;
    packet.errors = errors;
    response.json(packet);
    response.end();
    return packet;
  } else {
    request.body.email = request.body.email.toLowerCase();
    request.body.username = request.body.username.toUpperCase();
    done();
    return null;
  }
};
