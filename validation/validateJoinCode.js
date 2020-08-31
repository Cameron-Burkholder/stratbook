/* validation/validateJoinCode.js */

const Validator = require("validator");
const Filter = require("bad-words");
const filter = new Filter();
const isEmpty = require("is-empty");

/*
  @func: validateJoinCode
  @desc: check if join code is valid
  @param join_code: String

  @inputs:
    join_code: String

  @outputs:
    If inputs are not valid
      packet: Object (status: INVALID_TEAM_INPUT)
    Else
      done();
*/

module.exports = function validateJoinCode(request, response, done) {

  let data = request.body;
  let packet = {};

  let errors = {};
  data.join_code = !isEmpty(data.join_code) ? data.join_code : "";

  // Join code checks
  if (Validator.isEmpty(data.join_code)) {
    errors.join_code = "Join code field is required";
  } else if (!Validator.isLength(data.join_code, { min: 8, max: 8 })) {
    errors.join_code = "Join code must be exactly 8 digits";
  } else if (!Validator.isNumeric(data.join_code, { no_symbols: true })) {
    errors.join_code = "Join code may not contain non-number characters";
  }

  // Check validation
  if (!isEmpty(errors)) {
    packet.status = "INVALID_JOIN_CODE";
    packet.errors = errors;
    response.json(packet);
    response.end();
    return packet;
  } else {
    done();
    return null;
  }
};
