/* middleware.js */

const mongoose = require("mongoose");
const errors = require("./client/src/messages/errors.js");
const messages = require("./client/src/messages/messages.js");

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
      response.json(errors.ERROR_TEAM);
      return response.end();
    }

    if (team) {
      request.team = team;
      done();
    } else {
      response.json(messages.TEAM_NOT_FOUND);
      return response.end();
    }
  } else {
    response.json(messages.USER_HAS_NO_TEAM);
    return response.end();
  }
}

/**
* Check to see if user is not a part of a team
*/
exports.userHasNoTeam = (request, response, done) => {
  if (request.user.team_code) {
    let packet = messages.USER_HAS_TEAM;
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
    response.json(messages.USER_NOT_VERIFIED);
    return response.end();
  }
}

/**
* Check to see if user is an admin
*/
exports.userIsAdmin = (request, response, done) => {
  if (request.user.status !== "ADMIN") {
    response.json(messages.PERMISSION_DENIED);
    return response.end();
  } else {
    done();
  }
}
