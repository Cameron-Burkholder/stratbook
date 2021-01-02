/* messages.js*/

/**
* List of messages and error reports used throughout platform
*/
module.exports = {
  ATTACKER_ROLE_SET: {
    status: "Attacker Role Set"
  },
  ATTACKERS_SET: {
    status: "Attackers Set"
  },
  BLOCKED_USERS_FOUND: {
    status: "Blocked Users Found"
  },
  CANNOT_REMOVE_SELF: {
    status: "Cannot Remove Self"
  },
  DEFENDER_ROLE_SET: {
    status: "Defender Role Set"
  },
  DEFENDERS_SET: {
    status: "Defenders Set"
  },
  EXISTING_USER: {
    status: "EXISTING_USER"
  },
  INCORRECT_PASSWORD: {
    status: "Incorrect Password",
    message: "The password entered was incorrect."
  },
  INVALID_ATTACKER_ROLE: {
    status: "Invalid Attacker Role"
  },
  INVALID_ATTACKERS: {
    status: "Invalid Attackers"
  },
  INVALID_BLOCK_USER_INPUT: {
    status: "Invalid Block User Input"
  },
  INVALID_DEFENDER_ROLE: {
    status: "Invalid Defender Role"
  },
  INVALID_DEFENDERS: {
    status: "Invalid Defenders"
  },
  INVALID_EMAIL: {
    status: "Invalid Email"
  },
  INVALID_JOIN_CODE: {
    status: "Invalid Join Code"
  },
  INVALID_LOGIN: {
    status: "Invalid Login"
  },
  INVALID_PASSWORD_INPUT: {
    status: "Invalid Password Input"
  },
  INVALID_REGISTRATION: {
    status: "Invalid Registration"
  },
  INVALID_RESET_TOKEN: {
    status: "Invalid Reset Token",
    message: "The reset token provided is invalid or expired."
  },
  INVALID_PLATFORM: {
    status: "Invalid Platform"
  },
  INVALID_STATUS_INPUT: {
    status: "Invalid Status Input"
  },
  INVALID_TEAM_INPUT: {
    status: "Invalid Team Input"
  },
  INVALID_USERNAME: {
    status: "Invalid Username"
  },
  PASSWORD_RESET_LINK_SENT: {
    status: "Password Reset Link Sent",
    message: "A link to reset your password has been sent to your email."
  },
  PERMISSION_DENIED: {
    status: "Permission Denied",
    message: "Permission to perform the action you requested has been denied."
  },
  PLATFORM_DOES_NOT_MATCH: {
    status: "Platform Does Not Match",
    message: "The platform of the team you requested to join does not match your platform."
  },
  PROFANE_INPUT: {
    status: "Profane Input"
  },
  PROFANE_TEAM_INPUT: {
    status: "Profane Team Input"
  },
  TEAM_CREATED: {
    status: "Team Created"
  },
  TEAM_DELETED: {
    status: "Team Deleted"
  },
  TEAM_EXISTS: {
    status: "Team Exists",
    message: "A team with that name already exists"
  },
  TEAM_FOUND: {
    status: "Team Found"
  },
  TEAM_JOINED: {
    status: "Team Joined"
  },
  TEAM_LEFT: {
    status: "Team Left"
  },
  TEAM_NAME_UPDATED: {
    status: "Team Name Updated"
  },
  TEAM_NOT_FOUND: {
    status: "Team Not Found",
    message: "No team with the provided credentials could be found."
  },
  TOKEN_ISSUED: {
    status: "Token Issued"
  },
  USER_AND_TEAM_DELETED: {
    status: "User and Team Deleted"
  },
  USER_BLOCKED: {
    status: "User Blocked"
  },
  USER_UNBLOCKED: {
    status: "User Unblocked"
  },
  USER_DELETED: {
    status: "User Deleted"
  },
  USER_HAS_NO_TEAM: {
    status: "User Has No Team",
    message: "You must have a team to perform this action."
  },
  USER_HAS_TEAM: {
    status: "User Has Team",
    message: "You cannot perform this action if you are a part of a team."
  },
  USER_NOT_FOUND: {
    status: "User Not Found",
    message: "Unable to find user with provided credentials.",
    errors: {
      email: "No user with that email address was found."
    }
  },
  USER_NOT_VERIFIED: {
    status: "User Not Verified",
    message: "You must verify your account to perform this action."
  }
}
