/* validation.js */

const Validator = require("validator");
const Filter = require("bad-words");
const filter = new Filter();
filter.addWords("fuckboy", "fuckboys", "penisboy", "penisboys");
const isEmpty = require("is-empty");
const { ATTACKERS, ATTACKER_ROLES, DEFENDERS, DEFENDER_ROLES } = require("./client/src/data.js");
const { INVALID_LOGIN, INVALID_REGISTRATION, PROFANE_INPUT, INVALID_ATTACKER_ROLE, INVALID_ATTACKERS, INVALID_DEFENDER_ROLE, INVALID_DEFENDERS,
        INVALID_BLOCK_USER_INPUT, CANNOT_REMOVE_SELF, INVALID_EMAIL, INVALID_JOIN_CODE, INVALID_PASSWORD_INPUT, INVALID_PLATFORM,
        INVALID_STATUS_INPUT, INVALID_TEAM_INPUT, PROFANE_TEAM_INPUT } = require("./messages.js");

/**
* Validates input fields for login form
*/
exports.validateLoginInput = function(request, response, done) {

  let data = request.body;
  let packet = INVALID_LOGIN;

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
    packet.errors = errors;
    response.json(packet);
    response.end();
    return packet;
  } else {
    request.body.email = request.body.email.toLowerCase();
    done();
    return null;
  }
}

/**
* Validate register form input fields
*/
exports.validateRegisterInput = function(request, response, done) {

  let data = request.body;
  let packet = INVALID_REGISTRATION;

  let errors = {};
  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password1 = !isEmpty(data.password1) ? data.password1 : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.platform = !isEmpty(data.platform) ? data.platform.toUpperCase() : "";

  // Username checks
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password checks
  if (Validator.isEmpty(data.password1)) {
    errors.password1 = "Password field is required";
  } else if (!Validator.isLength(data.password1, { min: 6, max: 30 })) {
    errors.password1 = "Password must be at least 6 characters and at most 30";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  } else if (!Validator.equals(data.password1, data.password2)) {
    errors.password2 = "Passwords must match";
  }


  // Platform checks
  if (Validator.isEmpty(data.platform)) {
    errors.platform = "Platform field is required";
  } else if (data.platform !== "XBOX" && data.platform !== "PC" && data.platform !== "PS4") {
    errors.platform = "The only platforms accepted are Xbox, PC, or PS4";
  }

  if (!isEmpty(errors)) {
    packet.errors = errors;
    response.json(packet);
    response.end();
    return packet;
  } else if (filter.isProfane(request.body.username) || filter.isProfane(request.body.email)) {
    packet = PROFANE_INPUT;
    errors.username = filter.isProfane(request.body.username) ? "Username may not be inappropriate" : null;
    errors.email = filter.isProfane(request.body.email) ? "Email may not be inappropriate" : null;
    packet.errors = errors;
    response.json(packet);
    response.end();
    return packet;
  } else {
    request.body.email = request.body.email.toLowerCase();
    request.body.username = request.body.username.toUpperCase();
    done();
    return null;
  }
}

/**
* Validate attacker role input field
*/
exports.validateAttackerRole = function(request, response, done) {

  const attackerRoles = ATTACKER_ROLES;

  let data = request.body;
  let packet = INVALID_ATTACKER_ROLE;

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
    packet.errors = errors;
    response.json(packet);
    response.end();
    return packet;
  } else {
    done();
    return null;
  }
}

/**
* Validate attackers list for preferred attackers
*/
exports.validateAttackersInput = function(request, response, done) {

  const attackers = ATTACKERS;
  let data = request.body;
  let packet = INVALID_ATTACKERS;

  let errors = {};

  if (data.attackers) {
    if (data.attackers.length === 0) {
      errors.attackers = "Attackers list is required";
    }

    for (let i = 0; i < data.attackers.length; i++) {
      if (attackers.indexOf(data.attackers[i]) < 0) {
        errors.attackers = "Attackers list is invalid";
        break;
      }
    }
  } else {
    errors.attackers = "Attackers list is required";
  }

  // Check validation
  if (!isEmpty(errors)) {
    packet.errors = errors;
    response.json(packet);
    response.end();
    return packet;
  } else {
    done();
    return null;
  }
}

/**
* Validate defender role input field
*/
exports.validateDefenderRole = function(request, response, done) {

  const defenderRoles = DEFENDER_ROLES;

  let data = request.body;
  let packet = INVALID_DEFENDER_ROLE;

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
    packet.errors = errors;
    response.json(packet);
    response.end();
    return packet;
  } else {
    done();
    return null;
  }
}

/**
* Validate defenders list for preferred defenders
*/
exports.validateDefendersInput = function(request, response, done) {

  const defenders = DEFENDERS;
  let data = request.body;
  let packet = INVALID_DEFENDERS;

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
    packet.errors = errors;
    response.json(packet);
    response.end();
    return packet;
  } else {
    done();
    return null;
  }
}

/**
* Validate username field for blocking user
*/
exports.validateBlockUser = function(request, response, done) {

  let data = request.body;
  let packet = INVALID_BLOCK_USER_INPUT;

  let errors = {};
  data.username = !isEmpty(data.username) ? data.username : "";

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  // Check validation
  if (!isEmpty(errors)) {
    packet.errors = errors;
    response.json(packet);
    response.end();
    return packet;
  } else {
    if (request.body.username === request.user.username) {
      packet = CANNOT_REMOVE_SELF;
      packet.message = "User cannot block himself/herself.";
      response.json(packet);
      response.end();
      return packet;
    } else {
      done();
      return null;
    }
  }
}

/**
* Validate email input field for updating email
*/
exports.validateEmailInput = function(request, response, done) {

  let data = request.body;
  let packet = INVALID_EMAIL;

  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";

  // Username checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (!isEmpty(errors)) {
    packet.errors = errors;
    response.json(packet);
    response.end();
    return packet;
  } else if (filter.isProfane(request.body.email)) {
    packet = PROFANE_INPUT;
    errors.email = filter.isProfane(request.body.email) ? "Email may not be inappropriate" : null;
    packet.errors = errors;
    response.json(packet);
    response.end();
    return packet;
  } else {
    request.body.email = request.body.email.toLowerCase();
    done();
    return null;
  }
}

/**
* Validate join code input field
*/
exports.validateJoinCode = function(request, response, done) {

  let data = request.body;
  let packet = INVALID_JOIN_CODE;

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
    packet.errors = errors;
    response.json(packet);
    response.end();
    return packet;
  } else {
    done();
    return null;
  }
}

/**
* Validate password input fields for updating password
*/
exports.validatePasswordInput = function(request, response, done) {

  let data = request.body;
  let packet = INVALID_PASSWORD_INPUT;

  let errors = {};
  data.password1 = !isEmpty(data.password1) ? data.password1 : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // Password checks
  if (Validator.isEmpty(data.password1)) {
    errors.password1 = "Password field is required";
  } else if (!Validator.isLength(data.password1, { min: 6, max: 30 })) {
    errors.password1 = "Password must be at least 6 characters and at most 30";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  } else if (!Validator.equals(data.password1, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  if (!isEmpty(errors)) {
    packet.errors = errors;
    response.json(packet);
    response.end();
    return packet;
  } else {
    done();
    return null;
  }
}

/**
* Validate platform input field for updating platform
*/
exports.validatePlatformInput = function(request, response, done) {

  let data = request.body;
  let packet = INVALID_PLATFORM;

  let errors = {};
  data.platform = !isEmpty(data.platform) ? data.platform.toUpperCase() : "";

  // Platform checks
  if (Validator.isEmpty(data.platform)) {
    errors.platform = "Platform field is required";
  } else if (data.platform !== "XBOX" && data.platform !== "PC" && data.platform !== "PS4") {
    errors.platform = "The only platforms accepted are Xbox, PC, or PS4";
  }

  if (!isEmpty(errors)) {
    packet.errors = errors;
    response.json(packet);
    response.end();
    return packet;
  } else {
    done();
    return null;
  }
}

/**
* Validate status field for updating team members' statuses (admin, editor, member)
*/
exports.validateStatusInput = function(request, response, done) {

  let data = request.body;
  let packet = INVALID_STATUS_INPUT;

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
}

/**
* Validate team name input field for updating team name
*/
exports.validateTeamInput = function(request, response, done) {

  let data = request.body;
  let packet = INVALID_TEAM_INPUT;

  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";

  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // Check validation
  if (!isEmpty(errors)) {
    packet.errors = errors;
    response.json(packet);
    response.end();
    return packet;
  } else if (filter.isProfane(request.body.name)) {
    packet = PROFANE_TEAM_INPUT;
    errors.name = "Name may not be inappropriate";
    packet.errors = errors;
    response.json(packet);
    response.end();
    return packet;
  } else {
    done();
    return null;
  }
}

/**
* Validate username input field for changing username
*/
exports.validateUsernameInput = function(request, response, done) {

  let data = request.body;
  let packet = INVALID_USERNAME;

  let errors = {};
  data.username = !isEmpty(data.username) ? data.username : "";

  // Username checks
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  if (!isEmpty(errors)) {
    packet.errors = errors;
    response.json(packet);
    response.end();
    return packet;
  } else if (filter.isProfane(request.body.username)) {
    packet = PROFANE_INPUT;
    errors.username = filter.isProfane(request.body.username) ? "Username may not be inappropriate" : null;
    packet.errors = errors;
    response.json(packet);
    response.end();
    return packet;
  } else {
    request.body.username = request.body.username.toUpperCase();
    done();
    return null;
  }
}
