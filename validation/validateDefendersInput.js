

const Validator = require("validator");
const isEmpty = require("is-empty");

/*
  @func: validateDefendersInput
  @desc: check if defenders array is valid

  @inputs:
    attackers: Array

  @outputs:
    If inputs are not valid
      packet: Object (status: INVALID_DEFENDERS)
    Else
      done();
*/

module.exports = function validateDefendersInput(request, response, done) {

  const defenders = ["ALIBI", "BANDIT", "CASTLE", "CAVEIRA", "CLASH", "DOC", "ECHO", "ELA", "FROST", "GOYO", "JAGER", "KAID", "KAPKAN", "LESION", "MAESTRO", "MELUSI", "MIRA", "MOZZIE", "MUTE", "ORYX", "PULSE", "ROOK", "SMOKE", "TACHANKA", "VALKYRIE", "VIGIL", "WAMAI", "WARDEN"];
  let data = request.body;
  let packet = {};

  let errors = {};
  data.defenders = !isEmpty(data.defenders) ? data.defenders : "";

  if (data.defenders) {
    if (data.defenders.length === 0) {
      errors.defenders = "Defenders list is required";
    }

    for (let i = 0; i < data.defenders.length; i++) {
      if (defenders.indexOf(data.defenders[i]) < 0) {
        errors.defenders = "Defenders list is invalid";
        break;
      }
    }
  } else {
    errors.defenders = "Defenders list is required";
  }

  // Check validation
  if (!isEmpty(errors)) {
    packet.status = "INVALID_DEFENDERS";
    packet.errors = errors;
    response.json(packet);
    response.end();
    return packet;
  } else {
    done();
    return null;
  }
};
