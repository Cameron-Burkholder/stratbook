/* validation/createTeam.js */

const Validator = require("validator");
const isEmpty = require("is-empty");

/*
  @func: validateTeamInput
  @desc: check if team form data is valid
  @param name: String

  @inputs:
    name: String

  @outputs:
    If inputs are not valid
      packet: Object (status: INVALID_TEAM_INPUT)
    Else
      done();
*/

module.exports = function validateTeamInput(request, response, done) {

  let data = request.body;
  let packet = {};

  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";

  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // Check validation
  if (!isEmpty(errors)) {
    packet.status = "INVALID_TEAM_INPUT";
    packet.errors = errors;
    response.json(packet);
    response.end();
  } else {
    done();
  }
};
