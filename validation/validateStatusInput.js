/* validation/validateStatusInput.js */

const Validator = require("validator");
const Filter = require("bad-words");
const filter = new Filter();
const isEmpty = require("is-empty");

/*
  @func: validateStatusInput
  @desc: check if join code is valid
  @param status: String
  @param username: String

  @inputs:
    join_code: String
    username: String

  @outputs:
    If inputs are not valid
      packet: Object (status: INVALID_STATUS_INPUT)
    Else
      done();
*/

module.exports = function validateJoinCode(request, response, done) {

  let data = request.body;
  let packet = {};

  let errors = {};
  data.status = !isEmpty(data.status) ? data.status.toUpperCase() : "";
  data.username = !isEmpty(data.username) ? data.username : "";

  // Status checks
  if (Validator.isEmpty(data.status)) {
    errors.status = "Status field is required";
  } else if (data.status !== "ADMIN" && data.status !== "EDITOR" && data.status !== "MEMBER") {
    errors.status = "Status field invalid";
  }

  // Username checks
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  // Check validation
  if (!isEmpty(errors)) {
    packet.status = "INVALID_STATUS_INPUT";
    packet.errors = errors;
    response.json(packet);
    response.end();
    return packet;
  } else {
    request.body.status = request.body.status.toUpperCase();
    request.body.username = request.body.username.toUpperCase();
    done();
    return null;
  }
};
