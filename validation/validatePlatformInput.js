/* validation/validatePlatformInput.js */

const Validator = require("validator");
const isEmpty = require("is-empty");

/*
  @func: validatePlatformInput
  @desc: check if platform information is in a valid format
  @param request: request object
  @param response: response object
  @param done: forwarding function for express middleware

  @inputs:
    platform: String

  @outputs:
    If inputs are not valid
      packet: Object (status: INVALID_PLATFORM)
    Else
      done();
*/

module.exports = function validateRegisterInput(request, response, done) {

  let data = request.body;
  let packet = {};

  let errors = {};
  data.platform = !isEmpty(data.platform) ? data.platform.toUpperCase() : "";

  // Platform checks
  if (Validator.isEmpty(data.platform)) {
    errors.platform = "Platform field is required";
  } else if (data.platform !== "XBOX" && data.platform !== "PC" && data.platform !== "PS4") {
    errors.platform = "The only platforms accepted are Xbox, PC, or PS4";
  }

  if (!isEmpty(errors)) {
    packet.status = "INVALID_PLATFORM";
    packet.errors = errors;
    response.json(packet);
    response.end();
    return packet;
  } else {
    done();
    return null;
  }
};
