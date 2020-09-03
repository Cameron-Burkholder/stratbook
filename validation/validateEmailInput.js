/* validation/validateEmailInput.js */

const Validator = require("validator");
const Filter = require("bad-words");
const filter = new Filter();
const isEmpty = require("is-empty");

/*
  @func: validateEmailInput
  @desc: check if email information is in a valid format
  @param request: request object
  @param response: response object
  @param done: forwarding function for express middleware

  @inputs:
    username: String

  @outputs:
    If inputs are not valid
      packet: Object (status: INVALID_EMAIL)
    If inputs are profane
      packet: Object (status: PROFANE_INPUT)
    Else
      done();
*/

module.exports = function validateEmailInput(request, response, done) {

  let data = request.body;
  let packet = {};

  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";

  // Username checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (!isEmpty(errors)) {
    packet.status = "INVALID_EMAIL";
    packet.errors = errors;
    response.json(packet);
    response.end();
    return packet;
  } else if (filter.isProfane(request.body.email)) {
    packet.status = "PROFANE_INPUT";
    errors.email = filter.isProfane(request.body.email) ? "Email may not be inappropriate" : null;
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
