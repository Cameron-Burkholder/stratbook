

const Validator = require("validator");
const isEmpty = require("is-empty");

/*
  @func: validateDefenderInput
  @desc: check if defender role is valid

  @inputs:
    role: String

  @outputs:
    If inputs are not valid
      packet: Object (status: INVALID_DEFENDER_ROLE)
    Else
      done();
*/

module.exports = function validateDefenderUser(request, response, done) {

  const defenderRoles = ["NONE", "HARD BREACH DENIAL", "INTEL DENIAL", "INTEL", "AREA DENIAL", "TRAPS", "UTILITY SOAK", "SUPPORT", "ROAM"];

  let data = request.body;
  let packet = {};

  let errors = {};
  data.role = !isEmpty(data.role) ? data.role.toUpperCase() : "";

  if (Validator.isEmpty(data.role)) {
    errors.role = "Role field is required";
  }

  if (defenderRoles.indexOf(data.role) < 0) {
    errors.role = "Role field is invalid";
  }

  // Check validation
  if (!isEmpty(errors)) {
    packet.status = "INVALID_DEFENDER_ROLE";
    packet.errors = errors;
    response.json(packet);
    response.end();
    return packet;
  } else {
    done();
    return null;
  }
};
