const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(request, response, done) {

  let data = request.body;
  let packet = {};

  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  // Check validation
  if (!isEmpty(errors)) {
    packet.status = "INVALID_LOGIN";
    packet.errors = errors;
    response.json(packet);
    response.end();
  } else {
    done();
  }
};
