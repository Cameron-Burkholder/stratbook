

const Validator = require("validator");
const isEmpty = require("is-empty");

/*
  @func: validateBlockUser
  @desc: check if username and join_code are valid
  @param username: String

  @inputs:
    join_code: String
    username: String

  @outputs:
    If inputs are not valid
      packet: Object (status: INVALID_REMOVE_USER_INPUT)
    Else
      done();
*/

module.exports = function validateBlockUser(request, response, done) {

  let data = request.body;
  let packet = {};

  let errors = {};
  data.username = !isEmpty(data.username) ? data.username : "";

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  // Check validation
  if (!isEmpty(errors)) {
    packet.status = "INVALID_BLOCK_USER_INPUT";
    packet.errors = errors;
    response.json(packet);
    response.end();
    return packet;
  } else {
    done();
    return null;
  }
};
