/* middleware.js */

const mongoose = require("mongoose");

/**
* Check to see if user is a part of a team
*/
exports.userHasTeam = async (request, response, done) => {
  let packet = {};
  if (request.user.team_code) {
    Team.findOne({ join_code: request.user.team_code }).then(team => {
      if (team) {
        request.team = team;
        done();
      } else {
        packet.status = "TEAM_NOT_FOUND";
        packet.message = "No team with the requested join code exists.";
        response.json(packet);
        response.end();
      }
    }).catch(error => {
      console.log(error);
      packet.status = "ERROR";
      packet.message = "An error occurred while finding the team associated with the user's team code.";
      response.json(packet);
      response.end();
    })
  } else {
    packet.status = "USER_HAS_NO_TEAM";
    packet.message = "The user does not have a team code associated with his/her account.";
    response.json(packet);
    response.end();
  }
}

/**
* Check to see if user is not a part of a team
*/
exports.userHasNoTeam = (request, response, done) => {
  let packet = {};
  if (request.user.team_code) {
    packet.status = "USER_HAS_TEAM";
    packet.message = "User cannot update platform if he/she belongs to a team. Teams are platform specific.";
    response.json(packet);
    response.end();
  } else {
    done();
  }
}

/**
* Check to see if user has verified their account
*/
exports.userIsVerified = (request, response, done) => {
  let packet = {};
  if (request.user.verified) {
    done();
  } else {
    packet.status = "USER_NOT_VERIFIED";
    packet.message = "User has not verified their account. This functionality requires that the user be verified.";
    response.json(packet);
    response.end();
  }
}

/**
* Check to see if user is an admin
*/
exports.userIsAdmin = (request, response, done) => {
  let packet = {};
  if (request.user.status !== "ADMIN") {
    packet.status = "USER_NOT_QUALIFIED";
    packet.message = "User is not an admin. User must be an admin to perform this task.";
    response.json(packet);
    response.end();
  } else {
    done();
  }
}
