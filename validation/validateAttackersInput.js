/* validation/validateAttackersInput.js */

const Validator = require("validator");
const isEmpty = require("is-empty");

/*
  @func: validateAttackersInput
  @desc: check if attackers array is valid

  @inputs:
    attackers: Array

  @outputs:
    If inputs are not valid
      packet: Object (status: INVALID_ATTACKERS)
    Else
      done();
*/

module.exports = function validateAttackersInput(request, response, done) {

  const attackers = ["ACE", "AMARU", "ASH", "BLACKBEARD", "BLITZ", "BUCK", "CAPITAO", "DOKKAEBI", "FINKA", "FUZE", "GLAZ", "GRIDLOCK", "HIBANA", "IANA", "IQ", "JACKAL", "KALI", "LION", "MAVERICK", "MONTAGNE", "NOMAD", "NOKK", "SLEDGE", "THATCHER", "THERMITE", "TWITCH", "YING", "ZERO", "ZOFIA"];
  let data = request.body;
  let packet = {};

  let errors = {};

  if (data.attackers) {
    if (data.attackers.length === 0) {
      errors.attackers = "Attackers list is required";
    }

    for (let i = 0; i < data.attackers.length; i++) {
      if (attackers.indexOf(data.attackers[i]) < 0) {
        errors.attackers = "Attackers list is not valid";
        break;
      }
    }
  } else {
    errors.attackers = "Attackers list is required";
  }

  // Check validation
  if (!isEmpty(errors)) {
    packet.status = "INVALID_ATTACKERS";
    packet.errors = errors;
    response.json(packet);
    response.end();
    return packet;
  } else {
    done();
    return null;
  }
};
