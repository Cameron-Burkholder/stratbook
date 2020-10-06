

const Validator = require("validator");
const Filter = require("bad-words");
const filter = new Filter();
const isEmpty = require("is-empty");

/*
  @func: validateUsernameInput
  @desc: check if username information is in a valid format
  @param request: request object
  @param response: response object
  @param done: forwarding function for express middleware

  @inputs:
    username: String

  @outputs:
    If inputs are not valid
      packet: Object (status: INVALID_USERNAME)
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

  // Username checks
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  if (!isEmpty(errors)) {
    packet.status = "INVALID_USERNAME";
    packet.errors = errors;
    response.json(packet);
    response.end();
    return packet;
  } else if (filter.isProfane(request.body.username)) {
    packet.status = "PROFANE_INPUT";
    errors.username = filter.isProfane(request.body.username) ? "Username may not be inappropriate" : null;
    packet.errors = errors;
    response.json(packet);
    response.end();
    return packet;
  } else {
    request.body.username = request.body.username.toUpperCase();
    done();
    return null;
  }
};
