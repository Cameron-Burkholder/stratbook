/* middleware.js */

const mongoose = require("mongoose");
const { ERROR_TEAM } = require("./errors.js");
const { PERMISSION_DENIED, TEAM_NOT_FOUND, USER_HAS_NO_TEAM, USER_HAS_TEAM, USER_NOT_VERIFIED } = require("./messages.js");

/**
* Check to see if user is a part of a team
*/
exports.userHasTeam = async (request, response, done) => {
  if (request.user.team_code) {
    let team;
    try {
      team = await Team.findOne({ join_code: request.user.team_code }).exec();
    } catch(error) {
      console.log(error);
      response.json(ERROR_TEAM);
      return response.end();
    }

    if (team) {
      request.team = team;
      done();
    } else {
      response.json(TEAM_NOT_FOUND);
      return response.end();
    }
  } else {
    response.json(USER_HAS_NO_TEAM);
    return response.end();
  }
}

/**
* Check to see if user is not a part of a team
*/
exports.userHasNoTeam = (request, response, done) => {
  if (request.user.team_code) {
    let packet = USER_HAS_TEAM;
    packet.message = "User cannot update platform if he/she belongs to a team. Teams are platform specific.";
    response.json(packet);
    return response.end();
  } else {
    done();
  }
}

/**
* Check to see if user has verified their account
*/
exports.userIsVerified = (request, response, done) => {
  if (request.user.verified) {
    done();
  } else {
    response.json(USER_NOT_VERIFIED);
    return response.end();
  }
}

/**
* Check to see if user is an admin
*/
exports.userIsAdmin = (request, response, done) => {
  if (request.user.status !== "ADMIN") {
    response.json(PERMISSION_DENIED);
    return response.end();
  } else {
    done();
  }
}
