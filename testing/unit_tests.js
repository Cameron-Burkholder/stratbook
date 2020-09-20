/* testing/unit_tests.js */

const chai = require("chai");
const assert = chai.assert;

suite("UNIT TESTS", function() {

  suite("Login", function() {
    const validateLoginInput = require("../validation/login.js");
    let response = {
      json: function() {},
      end: function() {}
    }
    let done = function() {};
    test("# Email field not provided", function() {
      let request = {
        body: {}
      }
      assert.equal(validateLoginInput(request, response, done).status, "INVALID_LOGIN", "Response should be invalid if email field is not provided in request.");
      assert.equal(validateLoginInput(request, response, done).errors.email, "Email field is required", "Errors should list email as required if not provided in request.");
    });
    test("# Email field is empty", function() {
      let request = {
        body: { email: "" }
      }
      assert.equal(validateLoginInput(request, response, done).status, "INVALID_LOGIN", "Response should be invalid if email field is empty.");
      assert.equal(validateLoginInput(request, response, done).errors.email, "Email field is required", "Errors should list email as required if empty in request.");
    });
    test("# Email is invalid format", function() {
      let request1 = {
        body: { email: "just_name" }
      };
      let request2 = {
        body: { email: "name_and@" }
      };
      let request3 = {
        body: { email: "name_and@and" }
      };
      let request4 = {
        body: { email: "name_and@and.com." }
      };
      let request5 = {
        body: { email: "@" }
      };
      let request6 = {
        body: { email: ".com" }
      }
      let request7 = {
        body: { email: ".com." }
      }
      let request8 = {
        body: { email: "@.com" }
      }
      let request9 = {
        body: { email: "@.com." }
      };
      let request10 = {
        body: { email: "valid_email@valid.com" }
      };

      assert.equal(validateLoginInput(request1, response, done).status, "INVALID_LOGIN", "Response should be invalid if email contains no @ or domain.");
      assert.equal(validateLoginInput(request1, response, done).errors.email, "Email is invalid", "Errors should inform user that email is invalid when without a @ or domain.");

      assert.equal(validateLoginInput(request2, response, done).status, "INVALID_LOGIN", "Response should be invalid if email contains no domain.");
      assert.equal(validateLoginInput(request2, response, done).errors.email, "Email is invalid", "Errors should inform user that email is invalid when without a domain.");

      assert.equal(validateLoginInput(request3, response, done).status, "INVALID_LOGIN", "Response should be invalid if email contains no domain specifyer (.com, etch)");
      assert.equal(validateLoginInput(request3, response, done).errors.email, "Email is invalid", "Errors should inform user that email is invalid when without a domain specifyer (.com, etch)");

      assert.equal(validateLoginInput(request4, response, done).status, "INVALID_LOGIN", "Response should be invalid if email contains extra non-alphanumeric characters after domain.");
      assert.equal(validateLoginInput(request4, response, done).errors.email, "Email is invalid", "Errors should inform user that email is invalid when there are extra non-alphanumeric characters after domain.");

      assert.equal(validateLoginInput(request5, response, done).status, "INVALID_LOGIN", "Response should be invalid if email contains only @.");
      assert.equal(validateLoginInput(request5, response, done).errors.email, "Email is invalid", "Errors should inform user that email is invalid when there is only @.");

      assert.equal(validateLoginInput(request6, response, done).status, "INVALID_LOGIN", "Response should be invalid if email contains only domain.");
      assert.equal(validateLoginInput(request6, response, done).errors.email, "Email is invalid", "Errors should inform user that email is invalid when there is only a domain.");

      assert.equal(validateLoginInput(request7, response, done).status, "INVALID_LOGIN", "Response should be invalid if email contains only domain with extra characters.");
      assert.equal(validateLoginInput(request7, response, done).errors.email, "Email is invalid", "Errors should inform user that email is invalid when there is only a domain with extra characters.");

      assert.equal(validateLoginInput(request8, response, done).status, "INVALID_LOGIN", "Response should be invalid if email contains only @ and domain.");
      assert.equal(validateLoginInput(request8, response, done).errors.email, "Email is invalid", "Errors should inform user that email is invalid when it only contains @ and a domain.");

      assert.equal(validateLoginInput(request9, response, done).status, "INVALID_LOGIN", "Response should be invalid if email contains only @ and domain plus extra characters.");
      assert.equal(validateLoginInput(request9, response, done).errors.email, "Email is invalid", "Errors should inform user that email is invalid when it only contains @ and domain plus extra characters.");

      assert.equal(validateLoginInput(request10, response, done).errors.email, null, "Packet.errors.email should be null if email is valid.");

    });

    test("# Password field not provided", function() {
      let request = {
        body: {}
      }
      assert.equal(validateLoginInput(request, response, done).status, "INVALID_LOGIN", "Response should be invalid if password field is not provided.");
      assert.equal(validateLoginInput(request, response, done).errors.password, "Password field is required", "Errors should list password as required if not provided in request.");
    });
    test("# Password field is empty", function() {
      let request = {
        body: { password: "" }
      };
      assert.equal(validateLoginInput(request, response, done).status, "INVALID_LOGIN", "Response should be invalid if password field is empty.");
      assert.equal(validateLoginInput(request, response, done).errors.password, "Password field is required", "Errors should list password as required if empty in request.");

    });

  });

  suite("Registration", function() {
    const validateRegisterInput = require("../validation/register.js");
    let response = {
      json: function() {},
      end: function() {}
    }
    let done = function() {};
    test("# Username field not provided", function() {
      let request = {
        body: []
      };
      assert.equal(validateRegisterInput(request, response, done).status, "INVALID_REGISTRATION", "Response should be invalid if username field is not provided.");
      assert.equal(validateRegisterInput(request, response, done).errors.username, "Username field is required", "Errors should list username as required i not provided in request.");
    });
    test("# Username field is empty", function() {
      let request = {
        body: { username: "" }
      };
      assert.equal(validateRegisterInput(request, response, done).status, "INVALID_REGISTRATION", "Response should be invalid if username field is empty.");
      assert.equal(validateRegisterInput(request, response, done).errors.username, "Username field is required", "Errors should list username as required if empty in request.");
    });
    test("# Username is inappropriate", function() {
      let request = {
        body: { username: "Fuck", email: "valid@website.com", password1: "validpass", password2: "validpass", platform: "XBOX" }
      };
      assert.equal(validateRegisterInput(request, response, done).status, "PROFANE_INPUT", "Response should be invalid if username is profane.");
      assert.equal(validateRegisterInput(request, response, done).errors.username, "Username may not be inappropriate", "Errors should list username as profane if it is.");
    });

    test("# Email field not provided", function() {
      let request = {
        body: {}
      }
      assert.equal(validateRegisterInput(request, response, done).status, "INVALID_REGISTRATION", "Response should be invalid if email field is not provided in request.");
      assert.equal(validateRegisterInput(request, response, done).errors.email, "Email field is required", "Errors should list email as required if not provided in request.");
    });
    test("# Email field is empty", function() {
      let request = {
        body: { email: "" }
      }
      assert.equal(validateRegisterInput(request, response, done).status, "INVALID_REGISTRATION", "Response should be invalid if email field is empty.");
      assert.equal(validateRegisterInput(request, response, done).errors.email, "Email field is required", "Errors should list email as required if empty in request.");
    });
    test("# Email is invalid format", function() {
      let request1 = {
        body: { email: "just_name" }
      };
      let request2 = {
        body: { email: "name_and@" }
      };
      let request3 = {
        body: { email: "name_and@and" }
      };
      let request4 = {
        body: { email: "name_and@and.com." }
      };
      let request5 = {
        body: { email: "@" }
      };
      let request6 = {
        body: { email: ".com" }
      }
      let request7 = {
        body: { email: ".com." }
      }
      let request8 = {
        body: { email: "@.com" }
      }
      let request9 = {
        body: { email: "@.com." }
      };
      let request10 = {
        body: { email: "valid_email@valid.com" }
      };

      assert.equal(validateRegisterInput(request1, response, done).status, "INVALID_REGISTRATION", "Response should be invalid if email contains no @ or domain.");
      assert.equal(validateRegisterInput(request1, response, done).errors.email, "Email is invalid", "Errors should inform user that email is invalid when without a @ or domain.");

      assert.equal(validateRegisterInput(request2, response, done).status, "INVALID_REGISTRATION", "Response should be invalid if email contains no domain.");
      assert.equal(validateRegisterInput(request2, response, done).errors.email, "Email is invalid", "Errors should inform user that email is invalid when without a domain.");

      assert.equal(validateRegisterInput(request3, response, done).status, "INVALID_REGISTRATION", "Response should be invalid if email contains no domain specifyer (.com, etch)");
      assert.equal(validateRegisterInput(request3, response, done).errors.email, "Email is invalid", "Errors should inform user that email is invalid when without a domain specifyer (.com, etch)");

      assert.equal(validateRegisterInput(request4, response, done).status, "INVALID_REGISTRATION", "Response should be invalid if email contains extra non-alphanumeric characters after domain.");
      assert.equal(validateRegisterInput(request4, response, done).errors.email, "Email is invalid", "Errors should inform user that email is invalid when there are extra non-alphanumeric characters after domain.");

      assert.equal(validateRegisterInput(request5, response, done).status, "INVALID_REGISTRATION", "Response should be invalid if email contains only @.");
      assert.equal(validateRegisterInput(request5, response, done).errors.email, "Email is invalid", "Errors should inform user that email is invalid when there is only @.");

      assert.equal(validateRegisterInput(request6, response, done).status, "INVALID_REGISTRATION", "Response should be invalid if email contains only domain.");
      assert.equal(validateRegisterInput(request6, response, done).errors.email, "Email is invalid", "Errors should inform user that email is invalid when there is only a domain.");

      assert.equal(validateRegisterInput(request7, response, done).status, "INVALID_REGISTRATION", "Response should be invalid if email contains only domain with extra characters.");
      assert.equal(validateRegisterInput(request7, response, done).errors.email, "Email is invalid", "Errors should inform user that email is invalid when there is only a domain with extra characters.");

      assert.equal(validateRegisterInput(request8, response, done).status, "INVALID_REGISTRATION", "Response should be invalid if email contains only @ and domain.");
      assert.equal(validateRegisterInput(request8, response, done).errors.email, "Email is invalid", "Errors should inform user that email is invalid when it only contains @ and a domain.");

      assert.equal(validateRegisterInput(request9, response, done).status, "INVALID_REGISTRATION", "Response should be invalid if email contains only @ and domain plus extra characters.");
      assert.equal(validateRegisterInput(request9, response, done).errors.email, "Email is invalid", "Errors should inform user that email is invalid when it only contains @ and domain plus extra characters.");

      assert.equal(validateRegisterInput(request10, response, done).errors.email, null, "Packet.errors.email should be null if email is valid.");

    });
    test("# Email is inappropriate", function() {
      let request = {
        body: { username: "user", email: "fuck@penis.com", password1: "validpass", password2: "validpass", platform: "XBOX" }
      };
      assert.equal(validateRegisterInput(request, response, done).status, "PROFANE_INPUT", "Response should be invalid if email is profane.");
      assert.equal(validateRegisterInput(request, response, done).errors.email, "Email may not be inappropriate", "Errors should list email as profane if it is.");
    })

    test("# Password field not provided", function() {
      let request = {
        body: {}
      }
      assert.equal(validateRegisterInput(request, response, done).status, "INVALID_REGISTRATION", "Response should be invalid if password field is not provided in request.");
      assert.equal(validateRegisterInput(request, response, done).errors.password1, "Password field is required", "Errors should list password as required if not provided in request.");
    });
    test("# Password field is empty", function() {
      let request = {
        body: { password1: "" }
      };
      assert.equal(validateRegisterInput(request, response, done).status, "INVALID_REGISTRATION", "Response should be invalid if password field is empty.");
      assert.equal(validateRegisterInput(request, response, done).errors.password1, "Password field is required", "Errors should list password as required if empty in request.");
    });

    test("# Confirm password field not provided", function() {
      let request = {
        body: {}
      }
      assert.equal(validateRegisterInput(request, response, done).status, "INVALID_REGISTRATION", "Response should be invalid if confirm password field is not provided in request.");
      assert.equal(validateRegisterInput(request, response, done).errors.password2, "Confirm password field is required", "Errors should list confirm password as required if not provided in request.");
    });
    test("# Confirm password field is empty", function() {
      let request = {
        body: { password2: "" }
      };
      assert.equal(validateRegisterInput(request, response, done).status, "INVALID_REGISTRATION", "Response should be invalid if confirm password field is empty.");
      assert.equal(validateRegisterInput(request, response, done).errors.password1, "Password field is required", "Errors should list confirm password as required if empty in request.");
    });

    test("# Password must be at least 6 characters and at most 30", function() {
      let request1 = {
        body: { password1: "less" }
      };
      let request2 = {
        body: { password1: "morecharactersthanthirtycharacters "}
      };
      let request3 = {
        body: { password1: "justright" }
      };
      assert.equal(validateRegisterInput(request1, response, done).status, "INVALID_REGISTRATION", "Response should be invalid if password is less than six characters.");
      assert.equal(validateRegisterInput(request1, response, done).errors.password1, "Password must be at least 6 characters and at most 30", "Errors should list password as too short.");

      assert.equal(validateRegisterInput(request2, response, done).status, "INVALID_REGISTRATION", "Response should be invalid if password is more than thirty characters.");
      assert.equal(validateRegisterInput(request2, response, done).errors.password1, "Password must be at least 6 characters and at most 30", "Errors should list password as too long.");

      assert.equal(validateRegisterInput(request3, response, done).errors.password1, null, "If password is in appropriate parameters, errors.password1 should be null.");
    });
    test("# Passwords must match", function() {
      let request1 = {
        body: { password1: "sixchars", password2: "sevenchars" }
      }
      let request2 = {
        body: { password1: "sixchars", password2: "sixchars" }
      };

      assert.equal(validateRegisterInput(request1, response, done).status, "INVALID_REGISTRATION", "Response should be invalid if passwords are not equal.");
      assert.equal(validateRegisterInput(request1, response, done).errors.password2, "Passwords must match", "Errors should list passwords as not matching if they do not.");

      assert.equal(validateRegisterInput(request2, response, done).errors.password2, null, "If passwords match, password2 should not list any errors.");
    });

    test("# Platform field not provided", function() {
      let request = {
        body: {}
      };
      assert.equal(validateRegisterInput(request, response, done).status, "INVALID_REGISTRATION", "Response should be invalid if platform field is not provided in request.");
      assert.equal(validateRegisterInput(request, response, done).errors.platform, "Platform field is required", "Errors should list platform is required if not provided in request.");
    });
    test("# Platform field is empty", function() {
      let request = {
        body: { platform: "" }
      }
      assert.equal(validateRegisterInput(request, response, done).status, "INVALID_REGISTRATION", "Response should be invalid if platform field is empty.");
      assert.equal(validateRegisterInput(request, response, done).errors.platform, "Platform field is required", "Errors should list platform field as required if it is empty.");
    });
    test("# Platform field is invalid", function() {
      let request1 = {
        body: { platform: "something" }
      };
      let request2 = {
        body: { platform: "XBOX" }
      };
      let request3 = {
        body: { platform: "PC" }
      };
      let request4 = {
        body: { platform: "PS4" }
      };
      let request5 = {
        body: { platform: "xbox" }
      };
      let request6 = {
        body: { platform: "pc" }
      };
      let request7 = {
        body: { platform: "ps4" }
      };
      assert.equal(validateRegisterInput(request1, response, done).status, "INVALID_REGISTRATION", "Response should be invalid if platform is not one of the accepted values.");
      assert.equal(validateRegisterInput(request1, response, done).errors.platform, "The only platforms accepted are Xbox, PC, or PS4", "Errors should list platform as invalid if not one of the accepted values.");

      assert.equal(validateRegisterInput(request2, response, done).errors.platform, null, "XBOX should be an accepted value.");
      assert.equal(validateRegisterInput(request3, response, done).errors.platform, null, "PC should be an accepted value.");
      assert.equal(validateRegisterInput(request4, response, done).errors.platform, null, "PS4 should be an accepted value.");

      assert.equal(validateRegisterInput(request5, response, done).errors.platform, null, "xbox should be an accepted value.");
      assert.equal(validateRegisterInput(request6, response, done).errors.platform, null, "pc should be an accepted value.");
      assert.equal(validateRegisterInput(request7, response, done).errors.platform, null, "ps4 should be an accepted value.");
    });

  });

  suite("Team Name", function() {
    const validateTeamName = require("../validation/validateTeamName.js");
    let response = {
      json: function() {},
      end: function() {}
    }
    let done = function() {};
    test("# Name field not provided", function() {
      let request = {
        body: {}
      };
      assert.equal(validateTeamName(request, response, done).status, "INVALID_TEAM_INPUT", "Response should be invalid if name field is not provided in request.");
      assert.equal(validateTeamName(request, response, done).errors.name, "Name field is required", "Errors should list name as invalid if not provided in request.");
    });
    test("# Name field is empty", function() {
      let request = {
        body: {}
      };
      assert.equal(validateTeamName(request, response, done).status, "INVALID_TEAM_INPUT", "Response should be invalid if name field is empty in request.");
      assert.equal(validateTeamName(request, response, done).errors.name, "Name field is required", "Errors should list name as invalid if empty in request.");
    });
    test("# Name is inappropriate", function() {
      let request = {
        body: { name: "Fuck" }
      };
      assert.equal(validateTeamName(request, response, done).status, "PROFANE_TEAM_INPUT", "Response should indicate that profanity is not accepted if found in team names.");
      assert.equal(validateTeamName(request, response, done).errors.name, "Name may not be inappropriate", "Errors should list name is invalid if it is in appropriate.");
    })
  });

  suite("Join Code", function() {
    const validateJoinCode = require("../validation/validateJoinCode.js");
    let response = {
      json: function() {},
      end: function() {}
    }
    let done = function() {};
    test("# Join code field not provded", function() {
      let request = {
        body: {}
      };
      assert.equal(validateJoinCode(request, response, done).status, "INVALID_JOIN_CODE", "Response should be invalid if join code is not included in request.");
      assert.equal(validateJoinCode(request, response, done).errors.join_code, "Join code field is required", "Errors should list join code as invalid if not included in request.");
    });
    test("# Join code field is empty", function() {
      let request = {
        body: { join_code: "" }
      };
      assert.equal(validateJoinCode(request, response, done).status, "INVALID_JOIN_CODE", "Response should be invalid if join code is empty in request.");
      assert.equal(validateJoinCode(request, response, done).errors.join_code, "Join code field is required", "Errors should list join code as invalid if it is empty in request.");
    });
    test("# Join code is not 8 digits", function() {
      let request1 = {
        body: { join_code: "7777777" }
      };
      let request2 = {
        body: { join_code: "999999999" }
      }
      let request3 = {
        body: { join_code: "88888888" }
      }
      assert.equal(validateJoinCode(request1, response, done).status, "INVALID_JOIN_CODE", "Response should be invalid if join code is less than 8 digits.");
      assert.equal(validateJoinCode(request1, response, done).errors.join_code, "Join code must be exactly 8 digits", "Errors should list join code as invalid if it is less than 8 digits.");

      assert.equal(validateJoinCode(request2, response, done).status, "INVALID_JOIN_CODE", "Response should be invalid if join code is more than 8 digits.");
      assert.equal(validateJoinCode(request2, response, done).errors.join_code, "Join code must be exactly 8 digits", "Errors should list join code as invalid if it is more than 8 digits.");

      assert.equal(validateJoinCode(request3, response, done), null, "Errors should be empty if join code is valid.");
    });
    test("# Join code contains non-numeric digits", function() {
      let request1 = {
        body: { join_code: "abcdefgh" }
      };
      let request2 = {
        body: { join_code: "abcd1234" }
      }
      let request3 = {
        body: { join_code: "/.<>^%*&" }
      }
      let request4 = {
        body: { join_code: "abcd!@#$" }
      }
      let request5 = {
        body: { join_code: "12345678" }
      }
      assert.equal(validateJoinCode(request1, response, done).status, "INVALID_JOIN_CODE", "Response should be invalid if join code only contains alphabet characters.");
      assert.equal(validateJoinCode(request1, response, done).errors.join_code, "Join code may not contain non-number characters", "Errors should list join code as invalid if it is only letter characters.");

      assert.equal(validateJoinCode(request2, response, done).status, "INVALID_JOIN_CODE", "Response should be invalid if join code contains any letters.");
      assert.equal(validateJoinCode(request2, response, done).errors.join_code, "Join code may not contain non-number characters", "Errors should list join code as invalid if it contains any letters.");

      assert.equal(validateJoinCode(request3, response, done).status, "INVALID_JOIN_CODE", "Response should be invalid if join code contains all non-alphanumeric characters.");
      assert.equal(validateJoinCode(request3, response, done).errors.join_code, "Join code may not contain non-number characters", "Errors should list join code as invalid if it contains all non-alphanumeric characters.");

      assert.equal(validateJoinCode(request4, response, done).status, "INVALID_JOIN_CODE", "Response should be invalid if join code contains any non-alphanumeric characters.");
      assert.equal(validateJoinCode(request4, response, done).errors.join_code, "Join code may not contain non-number characters", "Errors should list join code as invalid if it contains any non-alphanumeric characters.");

      assert.equal(validateJoinCode(request5, response, done), null, "Response should be valid if join code is 8 numerical digits.");
    });
  });

  suite("Update Platform", function() {
    const validatePlatformInput = require("../validation/validatePlatformInput.js");
    let response = {
      json: function() {},
      end: function() {}
    }
    let done = function() {};
    test("# Platform field not provided", function() {
      let request = {
        body: {}
      };
      assert.equal(validatePlatformInput(request, response, done).status, "INVALID_PLATFORM", "Response should be invalid if platform field is not provided in request.");
      assert.equal(validatePlatformInput(request, response, done).errors.platform, "Platform field is required", "Errors should list platform is required if not provided in request.");
    });
    test("# Platform field is empty", function() {
      let request = {
        body: { platform: "" }
      }
      assert.equal(validatePlatformInput(request, response, done).status, "INVALID_PLATFORM", "Response should be invalid if platform field is empty.");
      assert.equal(validatePlatformInput(request, response, done).errors.platform, "Platform field is required", "Errors should list platform field as required if it is empty.");
    });
    test("# Platform field is invalid", function() {
      let request1 = {
        body: { platform: "something" }
      };
      let request2 = {
        body: { platform: "XBOX" }
      };
      let request3 = {
        body: { platform: "PC" }
      };
      let request4 = {
        body: { platform: "PS4" }
      };
      let request5 = {
        body: { platform: "xbox" }
      };
      let request6 = {
        body: { platform: "pc" }
      };
      let request7 = {
        body: { platform: "ps4" }
      };
      assert.equal(validatePlatformInput(request1, response, done).status, "INVALID_PLATFORM", "Response should be invalid if platform is not one of the accepted values.");
      assert.equal(validatePlatformInput(request1, response, done).errors.platform, "The only platforms accepted are Xbox, PC, or PS4", "Errors should list platform as invalid if not one of the accepted values.");

      assert.equal(validatePlatformInput(request2, response, done), null, "XBOX should be an accepted value.");
      assert.equal(validatePlatformInput(request3, response, done), null, "PC should be an accepted value.");
      assert.equal(validatePlatformInput(request4, response, done), null, "PS4 should be an accepted value.");

      assert.equal(validatePlatformInput(request5, response, done), null, "xbox should be an accepted value.");
      assert.equal(validatePlatformInput(request6, response, done), null, "pc should be an accepted value.");
      assert.equal(validatePlatformInput(request7, response, done), null, "ps4 should be an accepted value.");
    });
  });

  suite("Update Username", function() {
    const validateUsernameInput = require("../validation/validateUsernameInput.js");
    let response = {
      json: function() {},
      end: function() {}
    }
    let done = function() {};
    test("# Username field not provided", function() {
      let request = {
        body: {}
      };
      assert.equal(validateUsernameInput(request, response, done).status, "INVALID_USERNAME", "Response should be invalid if username field is not provided in request.");
      assert.equal(validateUsernameInput(request, response, done).errors.username, "Username field is required", "Errors should list username is required if not provided in request.");
    });
    test("# Username field is empty", function() {
      let request = {
        body: { platform: "" }
      }
      assert.equal(validateUsernameInput(request, response, done).status, "INVALID_USERNAME", "Response should be invalid if username field is empty.");
      assert.equal(validateUsernameInput(request, response, done).errors.username, "Username field is required", "Errors should list username field as required if it is empty.");
    });
    test("# Platform field is profane", function() {
      let request = {
        body: { username: "something bitch" }
      };

      assert.equal(validateUsernameInput(request, response, done).status, "PROFANE_INPUT", "Response should be invalid if input is profane.");
      assert.equal(validateUsernameInput(request, response, done).errors.username, "Username may not be inappropriate", "Errors should indicate username is inappropriate.");

    });
  });

  suite("Block User", function() {
    const validateBlockUser = require("../validation/validateBlockUser.js");
    let response = {
      json: function() {},
      end: function() {}
    }
    let done = function() {};

    test("# Username field not provided", function() {
      let request = {
        body: {}
      };
      assert.equal(validateBlockUser(request, response, done).status, "INVALID_BLOCK_USER_INPUT", "Response should be invalid if username is not included in request.");
      assert.equal(validateBlockUser(request, response, done).errors.username, "Username field is required", "Errors should list username as invalid if not included in request.");
    });
    test("# Username field is empty", function() {
      let request = {
        body: { username: "" }
      };
      assert.equal(validateBlockUser(request, response, done).status, "INVALID_BLOCK_USER_INPUT", "Response should be invalid if username is empty in request.");
      assert.equal(validateBlockUser(request, response, done).errors.username, "Username field is required", "Errors should list username as invalid if it is empty in request.");
    })
  });

  suite("Update User Status", function() {
    const validateStatusInput = require("../validation/validateStatusInput.js");
    let response = {
      json: function() {},
      end: function() {}
    }
    let done = function() {};
    test("# Username field not provided", function() {
      let request = {
        body: {}
      };
      assert.equal(validateStatusInput(request, response, done).status, "INVALID_STATUS_INPUT", "Response should be invalid if username field is not provided in request.");
      assert.equal(validateStatusInput(request, response, done).errors.username, "Username field is required", "Errors should list username is required if not provided in request.");
    });
    test("# Username field is empty", function() {
      let request = {
        body: { platform: "" }
      }
      assert.equal(validateStatusInput(request, response, done).status, "INVALID_STATUS_INPUT", "Response should be invalid if username field is empty.");
      assert.equal(validateStatusInput(request, response, done).errors.username, "Username field is required", "Errors should list username field as required if it is empty.");
    });
    test("# Status field not provided", function() {
      let request = {
        body: {}
      };
      assert.equal(validateStatusInput(request, response, done).status, "INVALID_STATUS_INPUT", "Response should be invalid if status is not provided.");
      assert.equal(validateStatusInput(request, response, done).errors.status, "Status field is required", "Response should indiciate status field is required.");
    });
    test("# Status field empty", function() {
      let request = {
        body: { status: "" }
      };
      assert.equal(validateStatusInput(request, response, done).status, "INVALID_STATUS_INPUT", "Response should be invalid if status is not provided.");
      assert.equal(validateStatusInput(request, response, done).errors.status, "Status field is required", "Response should indiciate status field is required.");
    });
    test("# Status field is invalid", function() {
      let request = {
        body: { status: "not member" }
      };
      assert.equal(validateStatusInput(request, response, done).status, "INVALID_STATUS_INPUT", "Response should indicate status is invalid.");
      assert.equal(validateStatusInput(request, response, done).errors.status, "Status field invalid", "Response should indiciate status is invalid.");
    });
    test("# Valid status update", function() {
      let request = {
        body: { status: "ADMIN", username: "something" }
      };
      assert.equal(validateStatusInput(request, response, done), null, "Response should be OK if input is valid.");
    });

  });

  suite("Update Email", function() {
    const validateEmailInput = require("../validation/validateEmailInput.js");
    let response = {
      json: function() {},
      end: function() {}
    }
    let done = function() {};
    test("# Email field not provided", function() {
      let request = {
        body: {}
      };
      assert.equal(validateEmailInput(request, response, done).status, "INVALID_EMAIL", "Response should be invalid if email field is not provided in request.");
      assert.equal(validateEmailInput(request, response, done).errors.email, "Email field is required", "Errors should list email is required if not provided in request.");
    });
    test("# Email field is empty", function() {
      let request = {
        body: { email: "" }
      }
      assert.equal(validateEmailInput(request, response, done).status, "INVALID_EMAIL", "Response should be invalid if email field is empty.");
      assert.equal(validateEmailInput(request, response, done).errors.email, "Email field is required", "Errors should list email field as required if it is empty.");
    });
    test("# Email is invalid", function() {
      let request1 = {
        body: { email: "just_name" }
      };
      let request2 = {
        body: { email: "name_and@" }
      };
      let request3 = {
        body: { email: "name_and@and" }
      };
      let request4 = {
        body: { email: "name_and@and.com." }
      };
      let request5 = {
        body: { email: "@" }
      };
      let request6 = {
        body: { email: ".com" }
      }
      let request7 = {
        body: { email: ".com." }
      }
      let request8 = {
        body: { email: "@.com" }
      }
      let request9 = {
        body: { email: "@.com." }
      };
      let request10 = {
        body: { email: "valid_email@valid.com" }
      };

      assert.equal(validateEmailInput(request1, response, done).status, "INVALID_EMAIL", "Response should be invalid if email contains no @ or domain.");
      assert.equal(validateEmailInput(request1, response, done).errors.email, "Email is invalid", "Errors should inform user that email is invalid when without a @ or domain.");

      assert.equal(validateEmailInput(request2, response, done).status, "INVALID_EMAIL", "Response should be invalid if email contains no domain.");
      assert.equal(validateEmailInput(request2, response, done).errors.email, "Email is invalid", "Errors should inform user that email is invalid when without a domain.");

      assert.equal(validateEmailInput(request3, response, done).status, "INVALID_EMAIL", "Response should be invalid if email contains no domain specifyer (.com, etch)");
      assert.equal(validateEmailInput(request3, response, done).errors.email, "Email is invalid", "Errors should inform user that email is invalid when without a domain specifyer (.com, etch)");

      assert.equal(validateEmailInput(request4, response, done).status, "INVALID_EMAIL", "Response should be invalid if email contains extra non-alphanumeric characters after domain.");
      assert.equal(validateEmailInput(request4, response, done).errors.email, "Email is invalid", "Errors should inform user that email is invalid when there are extra non-alphanumeric characters after domain.");

      assert.equal(validateEmailInput(request5, response, done).status, "INVALID_EMAIL", "Response should be invalid if email contains only @.");
      assert.equal(validateEmailInput(request5, response, done).errors.email, "Email is invalid", "Errors should inform user that email is invalid when there is only @.");

      assert.equal(validateEmailInput(request6, response, done).status, "INVALID_EMAIL", "Response should be invalid if email contains only domain.");
      assert.equal(validateEmailInput(request6, response, done).errors.email, "Email is invalid", "Errors should inform user that email is invalid when there is only a domain.");

      assert.equal(validateEmailInput(request7, response, done).status, "INVALID_EMAIL", "Response should be invalid if email contains only domain with extra characters.");
      assert.equal(validateEmailInput(request7, response, done).errors.email, "Email is invalid", "Errors should inform user that email is invalid when there is only a domain with extra characters.");

      assert.equal(validateEmailInput(request8, response, done).status, "INVALID_EMAIL", "Response should be invalid if email contains only @ and domain.");
      assert.equal(validateEmailInput(request8, response, done).errors.email, "Email is invalid", "Errors should inform user that email is invalid when it only contains @ and a domain.");

      assert.equal(validateEmailInput(request9, response, done).status, "INVALID_EMAIL", "Response should be invalid if email contains only @ and domain plus extra characters.");
      assert.equal(validateEmailInput(request9, response, done).errors.email, "Email is invalid", "Errors should inform user that email is invalid when it only contains @ and domain plus extra characters.");

      assert.equal(validateEmailInput(request10, response, done), null, "Packet.errors.email should be null if email is valid.");

    });
    test("# Email field is profane", function() {
      let request = {
        body: { email: "bitch@shit.com" }
      };

      assert.equal(validateEmailInput(request, response, done).status, "PROFANE_INPUT", "Response should be invalid if input is profane.");
      assert.equal(validateEmailInput(request, response, done).errors.email, "Email may not be inappropriate", "Errors should indicate email is inappropriate.");

    });
  });

  suite("Update Password", function() {
    const validatePasswordInput = require("../validation/validatePasswordInput.js");
    let response = {
      json: function() {},
      end: function() {}
    }
    let done = function() {};

    test("# Password field not provided", function() {
      let request = {
        body: {}
      }
      assert.equal(validatePasswordInput(request, response, done).status, "INVALID_PASSWORD_INPUT", "Response should be invalid if password field is not provided in request.");
      assert.equal(validatePasswordInput(request, response, done).errors.password1, "Password field is required", "Errors should list password as required if not provided in request.");
    });
    test("# Password field is empty", function() {
      let request = {
        body: { password1: "" }
      };
      assert.equal(validatePasswordInput(request, response, done).status, "INVALID_PASSWORD_INPUT", "Response should be invalid if password field is empty.");
      assert.equal(validatePasswordInput(request, response, done).errors.password1, "Password field is required", "Errors should list password as required if empty in request.");
    });

    test("# Confirm password field not provided", function() {
      let request = {
        body: {}
      }
      assert.equal(validatePasswordInput(request, response, done).status, "INVALID_PASSWORD_INPUT", "Response should be invalid if confirm password field is not provided in request.");
      assert.equal(validatePasswordInput(request, response, done).errors.password2, "Confirm password field is required", "Errors should list confirm password as required if not provided in request.");
    });
    test("# Confirm password field is empty", function() {
      let request = {
        body: { password2: "" }
      };
      assert.equal(validatePasswordInput(request, response, done).status, "INVALID_PASSWORD_INPUT", "Response should be invalid if confirm password field is empty.");
      assert.equal(validatePasswordInput(request, response, done).errors.password1, "Password field is required", "Errors should list confirm password as required if empty in request.");
    });

    test("# Password must be at least 6 characters and at most 30", function() {
      let request1 = {
        body: { password1: "less" }
      };
      let request2 = {
        body: { password1: "morecharactersthanthirtycharacters "}
      };
      let request3 = {
        body: { password1: "justright" }
      };
      assert.equal(validatePasswordInput(request1, response, done).status, "INVALID_PASSWORD_INPUT", "Response should be invalid if password is less than six characters.");
      assert.equal(validatePasswordInput(request1, response, done).errors.password1, "Password must be at least 6 characters and at most 30", "Errors should list password as too short.");

      assert.equal(validatePasswordInput(request2, response, done).status, "INVALID_PASSWORD_INPUT", "Response should be invalid if password is more than thirty characters.");
      assert.equal(validatePasswordInput(request2, response, done).errors.password1, "Password must be at least 6 characters and at most 30", "Errors should list password as too long.");

      assert.equal(validatePasswordInput(request3, response, done).errors.password1, null, "If password is in appropriate parameters, errors.password1 should be null.");
    });
    test("# Passwords must match", function() {
      let request1 = {
        body: { password1: "sixchars", password2: "sevenchars" }
      }
      let request2 = {
        body: { password1: "sixchars", password2: "sixchars" }
      };

      assert.equal(validatePasswordInput(request1, response, done).status, "INVALID_PASSWORD_INPUT", "Response should be invalid if passwords are not equal.");
      assert.equal(validatePasswordInput(request1, response, done).errors.password2, "Passwords must match", "Errors should list passwords as not matching if they do not.");

      assert.equal(validatePasswordInput(request2, response, done), null, "If passwords match, password2 should not list any errors.");
    });
  })

  suite("Set Attacker Role", function() {
    let validateAttackerInput = require("../validation/validateAttackerInput.js");
    let response = {
      json: function() {},
      end: function() {}
    }
    let done = function() {};

    test("# Role field not provided", function() {
      let request = {
        body: {}
      }
      assert.equal(validateAttackerInput(request, response, done).status, "INVALID_ATTACKER_ROLE", "Response should be invalid if attacker role field is not present.");
      assert.equal(validateAttackerInput(request, response, done).errors.role, "Role field is invalid", "Errors should indicate attacker role is required.");
    });

    test("# Role field is empty", function() {
      let request = {
        body: { role: "" }
      };
      assert.equal(validateAttackerInput(request, response, done).status, "INVALID_ATTACKER_ROLE", "Response should be invalid if attacker role field is empty.");
      assert.equal(validateAttackerInput(request, response, done).errors.role, "Role field is invalid", "Errors should indicate attacker role is required.");
    });

    test("# Role field is invalid", function() {
      let request = {
        body: { role: "SOMETHING" }
      }
      assert.equal(validateAttackerInput(request, response, done).status, "INVALID_ATTACKER_ROLE", "Response should be invalid if attacker role is invalid.");
      assert.equal(validateAttackerInput(request, response, done).errors.role, "Role field is invalid", "Errors should indicate attacker role is invalid.");
    });

    test("# Role field is valid", function() {
      let request = {
        body: { role: "HARD BREACH" }
      }
      assert.equal(validateAttackerInput(request, response, done), null, "Response should be valid if attacker role is valid.");
    })
  });

  suite("Set Attacker Role", function() {
    let validateDefenderInput = require("../validation/validateDefenderInput.js");
    let response = {
      json: function() {},
      end: function() {}
    }
    let done = function() {};

    test("# Role field not provided", function() {
      let request = {
        body: {}
      }
      assert.equal(validateDefenderInput(request, response, done).status, "INVALID_DEFENDER_ROLE", "Response should be invalid if attacker role field is not present.");
      assert.equal(validateDefenderInput(request, response, done).errors.role, "Role field is invalid", "Errors should indicate attacker role is required.");
    });

    test("# Role field is empty", function() {
      let request = {
        body: { role: "" }
      };
      assert.equal(validateDefenderInput(request, response, done).status, "INVALID_DEFENDER_ROLE", "Response should be invalid if attacker role field is empty.");
      assert.equal(validateDefenderInput(request, response, done).errors.role, "Role field is invalid", "Errors should indicate attacker role is required.");
    });

    test("# Role field is invalid", function() {
      let request = {
        body: { role: "SOMETHING" }
      }
      assert.equal(validateDefenderInput(request, response, done).status, "INVALID_DEFENDER_ROLE", "Response should be invalid if attacker role is invalid.");
      assert.equal(validateDefenderInput(request, response, done).errors.role, "Role field is invalid", "Errors should indicate attacker role is invalid.");
    });

    test("# Role field is valid", function() {
      let request = {
        body: { role: "HARD BREACH DENIAL" }
      }
      assert.equal(validateDefenderInput(request, response, done), null, "Response should be valid if attacker role is valid.");
    })
  });

  suite("Utility Functions", function() {
    const { verifyPassword, hashPassword, issueJWT, genVerificationLink, genJoinCode } = require("../config/utilities.js");
    // UNIT TEST ACCOUNT
    const user = {
      _id: "5f4ae417264fca06f0d74d3c",
      username: "UNIT_TEST_USER",
      email: "unittestuser@r6stratbook.com",
      password: "$2a$10$t2o3z/f0scig1e9PCqj0w.gvX.IXMlp80jcTS7gGZubhyrU10S2SK",
      platform: "PC",
      verified: true,
      status: "ADMIN",
      team_code: "55192962"
    };

    let password = "someRandomString";
    let otherPassword = "someOtherString";
    let hash;

    test("# hashPassword", function() {
      hash = hashPassword(password);
      assert.isOk(hashPassword(password), "The return of hash password should be a hash, or a truthy value.");
    });

    test("# verifyPassword", function() {
      assert.equal(verifyPassword(password, hash), true, "Matching passwords should return true.");
      assert.equal(verifyPassword(otherPassword, hash), false, "Non-matching passwords should return false.");
    });

    test("# issueJWT", function() {
      assert.isOk(issueJWT(user).token, "issueJWT should return a token when passed a user.");
      assert.isOk(issueJWT(user).expires, "issueJWT should return an expires property when passed a user.");
    });

    test("# genVerificationLink", function() {
      assert.equal(genVerificationLink().length, 128, "Verification link should be 128 characters in length.");
    })

    test("# genJoinCode", function() {
      assert.isOk(genJoinCode(), "genJoinCode should return a value.");
      assert.notEqual(genJoinCode(), user.team_code, "genJoinCode should not allow duplicates.");
    })
  });

});
