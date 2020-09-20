/* validation/validateAttackerInput.js */

const Validator = require("validator");
const isEmpty = require("is-empty");

/*
  @func: validateAttackerInput
  @desc: check if attacker role is valid

  @inputs:
    role: String

  @outputs:
    If inputs are not valid
      packet: Object (status: INVALID_ATTACKER_ROLE)
    Else
      done();
*/

module.exports = function validateAttackerUser(request, response, done) {

  const attackerRoles = ["NONE", "HARD BREACH", "SOFT BREACH", "ENTRY FRAG", "AREA DENIAL/FLANK WATCH", "INTEL", "UTILITY CLEAR", "SUPPORT", "ROAM CLEAR"];

  let data = request.body;
  let packet = {};

  let errors = {};
  data.role = !isEmpty(data.role) ? data.role.toUpperCase() : "";

  if (Validator.isEmpty(data.role)) {
    errors.role = "Role field is required";
  }

  if (attackerRoles.indexOf(data.role) < 0) {
    errors.role = "Role field is invalid";
  }

  // Check validation
  if (!isEmpty(errors)) {
    packet.status = "INVALID_ATTACKER_ROLE";
    packet.errors = errors;
    response.json(packet);
    response.end();
    return packet;
  } else {
    done();
    return null;
  }
};
