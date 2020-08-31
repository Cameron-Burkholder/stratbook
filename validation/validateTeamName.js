/* validation/validateTeamName.js */

const Validator = require("validator");
const Filter = require("bad-words");
const filter = new Filter();
filter.addWords("fuckboy", "fuckboys", "penisboy", "penisboys");
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

    If inputs are inappropriate
      packet: Object (status: PROFANE_TEAM_INPUT)
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
    return packet;
  } else if (filter.isProfane(request.body.name)) {
    packet.status = "PROFANE_TEAM_INPUT";
    errors.name = "Name may not be inappropriate";
    packet.errors = errors;
    response.json(packet);
    response.end();
    return packet;
  } else {
    done();
    return null;
  }
};
