/* validation.js */

const Validator = require("validator");
const Filter = require("bad-words");
const filter = new Filter();
filter.addWords("fuckboy", "fuckboys", "penisboy", "penisboys");
const isEmpty = require("is-empty");

module.exports = validation = {
  validateLoginInput: function(request, response, done) {

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
      return packet;
    } else {
      request.body.email = request.body.email.toLowerCase();
      done();
      return null;
    }
  },
  validateRegisterInput: function(request, response, done) {

    let data = request.body;
    let packet = {};

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
      packet.status = "INVALID_REGISTRATION";
      packet.errors = errors;
      response.json(packet);
      response.end();
      return packet;
    } else if (filter.isProfane(request.body.username) || filter.isProfane(request.body.email)) {
      packet.status = "PROFANE_INPUT";
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
  },
  validateAttackerRole: function(request, response, done) {

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
  },
  validateAttackersInput: function(request, response, done) {

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
          errors.attackers = "Attackers list is invalid";
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
  },
  validateBlockUser: function(request, response, done) {

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
      if (request.body.username === request.user.username) {
        packet.status = "CANNOT_REMOVE_SELF";
        packet.message = "User cannot block himself/herself.";
        response.json(packet);
        response.end();
        return packet;
      } else {
        done();
        return null;
      }
    }
  },
  validateDefenderRole: function(request, response, done) {

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
  },
  validateDefendersInput: function(request, response, done) {

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
  },
  validateEmailInput: function(request, response, done) {

    let data = request.body;
    let packet = {};

    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : "";

    // Username checks
    if (Validator.isEmpty(data.email)) {
      errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }

    if (!isEmpty(errors)) {
      packet.status = "INVALID_EMAIL";
      packet.errors = errors;
      response.json(packet);
      response.end();
      return packet;
    } else if (filter.isProfane(request.body.email)) {
      packet.status = "PROFANE_INPUT";
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
  },
  validateJoinCode: function(request, response, done) {

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
  },
  validatePasswordInput: function(request, response, done) {

    let data = request.body;
    let packet = {};

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
      packet.status = "INVALID_PASSWORD_INPUT";
      packet.errors = errors;
      response.json(packet);
      response.end();
      return packet;
    } else {
      done();
      return null;
    }
  },
  validatePlatformInput: function(request, response, done) {

    let data = request.body;
    let packet = {};

    let errors = {};
    data.platform = !isEmpty(data.platform) ? data.platform.toUpperCase() : "";

    // Platform checks
    if (Validator.isEmpty(data.platform)) {
      errors.platform = "Platform field is required";
    } else if (data.platform !== "XBOX" && data.platform !== "PC" && data.platform !== "PS4") {
      errors.platform = "The only platforms accepted are Xbox, PC, or PS4";
    }

    if (!isEmpty(errors)) {
      packet.status = "INVALID_PLATFORM";
      packet.errors = errors;
      response.json(packet);
      response.end();
      return packet;
    } else {
      done();
      return null;
    }
  },
  validateStatusInput: function(request, response, done) {

    let data = request.body;
    let packet = {};

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
      packet.status = "INVALID_STATUS_INPUT";
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
  },
  validateTeamInput: function(request, response, done) {

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
  },
  validateUsernameInput: function(request, response, done) {

    let data = request.body;
    let packet = {};

    let errors = {};
    data.username = !isEmpty(data.username) ? data.username : "";

    // Username checks
    if (Validator.isEmpty(data.username)) {
      errors.username = "Username field is required";
    }

    if (!isEmpty(errors)) {
      packet.status = "INVALID_USERNAME";
      packet.errors = errors;
      response.json(packet);
      response.end();
      return packet;
    } else if (filter.isProfane(request.body.username)) {
      packet.status = "PROFANE_INPUT";
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
  },
  validateStrategyInput: function(request, response, done) {
    let data = request.body.strategy;
    let packet = {};

    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : "";
    data.type = !isEmpty(data.type) ? data.type : "";
    data.objectives = !isEmpty(data.objectives) ? data.objectives : "";
    data.execution = !isEmpty(data.execution) ? data.execution : "";
    data.roles = !isEmpty(data.roles) ? data.roles : "";
    data.operators = !isEmpty(data.operators) ? data.operators : "";

    // Name checks
    if (Validator.isEmpty(data.name)) {
      errors.name = "Name field is required";
    }

    // Type checks
    if (Validator.isEmpty(data.type)) {
      errors.type = "Type field is required";
    } else if (data.type !== "ATTACK" && data.type !== "DEFENSE") {
      errors.type = "Type field is invalid";
    }

    // Execution checks
    if (Validator.isEmpty(data.execution)) {
      errors.execution = "Execution field is required";
    }

    // Objectives check
    if (data.objectives.length < 0) {
      errors.objectives = "Objectives field is invalid";
    }

    // Roles checks
    if (data.roles.length !== 5) {
      errors.roles = "Roles field is invalid";
    }

    // Operators checks
    if (data.operators.length !== 5) {
      errors.operators = "Operators field is invalid";
    }

    if (!isEmpty(errors)) {
      packet.status = "INVALID_STRATEGY";
      packet.errors = errors;
      response.json(packet);
      response.end();
      return packet;
    } else {
      done();
      return null;
    }
  }
}
