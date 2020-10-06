

const Validator = require("validator");
const isEmpty = require("is-empty");

/*
  @func: validatePasswordInput
  @desc: check if register information is in a valid format
  @param request: request object
  @param response: response object
  @param done: forwarding function for express middleware

  @inputs:
    password1: String
    password2: String

  @outputs:
    If inputs are not valid
      packet: Object (status: INVALID_REGISTRATION)
    Else
      done();
*/

module.exports = function validatePasswordInput(request, response, done) {

  let data = request.body;
  let packet = {};

  let errors = {};
  data.password1 = !isEmpty(data.password1) ? data.password1 : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

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

  if (!isEmpty(errors)) {
    packet.status = "INVALID_PASSWORD_INPUT";
    packet.errors = errors;
    response.json(packet);
    response.end();
    return packet;
  } else {
    done();
    return null;
  }
};
