

const Validator = require("validator");
const isEmpty = require("is-empty");

/*
  @func: validateLoginInput
  @desc: check if login information is in a valid format
  @param request: request object
  @param response: response object
  @param done: forwarding function for express middleware

  @inputs:
    email: String
    password: String

  @outputs:
    If inputs are not valid
      packet: Object (status: INVALID_LOGIN)
    Else
      done();
*/

module.exports = function validateLoginInput(request, response, done) {

  let data = request.body;
  let packet = {};

  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  // Check validation
  if (!isEmpty(errors)) {
    packet.status = "INVALID_LOGIN";
    packet.errors = errors;
    response.json(packet);
    response.end();
    return packet;
  } else {
    request.body.email = request.body.email.toLowerCase();
    done();
    return null;
  }
};
