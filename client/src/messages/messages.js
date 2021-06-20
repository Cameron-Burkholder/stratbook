/* messages.js*/

/**
* List of messages and error reports used throughout platform
*/
module.exports = {
  ANNOUNCEMENT_SENT: {
    status: "Announcement Sent",
    message: "Your announcement has been successfully sent."
  },
  ATTACKER_ROLE_SET: {
    status: "Attacker Role Set",
    message: "Your attacking role has been set."
  },
  ATTACKERS_SET: {
    status: "Attackers Set",
    message: "Your preferred attackers have been set."
  },
  BLOCKED_USERS_FOUND: {
    status: "Blocked Users Found",
    message: "Team's blocked users have been found."
  },
  CANNOT_REMOVE_SELF: {
    status: "Cannot Remove Self",
    message: "User cannot block self from team."
  },
  DEFENDER_ROLE_SET: {
    status: "Defender Role Set",
    message: "Your defending role has been set."
  },
  DEFENDERS_SET: {
    status: "Defenders Set",
    message: "Your preferred defenders have been set."
  },
  EXISTING_USER: {
    status: "Existing User",
    message: "A user with those credentials already exists."
  },
  FEEDBACK_SUBMITTED: {
    status: "Feedback Submitted",
    message: "Thanks for taking the time to make Stratbook better! Your feedback has been submitted. You may be contacted (via email) depending on the nature of your submission."
  },
  GENERAL_STATS_FOUND: {
    status: "General Statistics Found",
    message: "General statistics have been found."
  },
  INCORRECT_PASSWORD: {
    status: "Incorrect Password",
    message: "The password entered was incorrect."
  },
  INVALID_ANNOUNCEMENT: {
    status: "Invalid Announcement",
    message: "The announcement provided is invalid."
  },
  INVALID_ATTACKER_ROLE: {
    status: "Invalid Attacker Role",
    message: "The attacking role you selected is invalid."
  },
  INVALID_ATTACKERS: {
    status: "Invalid Attackers",
    message: "The preferred attackers you selected are invalid."
  },
  INVALID_BLOCK_USER_INPUT: {
    status: "Invalid Block User Input",
    message: "The block user input provided is invalid."
  },
  INVALID_DEFENDER_ROLE: {
    status: "Invalid Defender Role",
    message: "The defending role you selected is invalid."
  },
  INVALID_DEFENDERS: {
    status: "Invalid Defenders",
    message: "The preferred defenders you selected are invalid."
  },
  INVALID_EMAIL: {
    status: "Invalid Email",
    message: "The email address provided is invalid."
  },
  INVALID_JOIN_CODE: {
    status: "Invalid Join Code",
    message: "The join code provided is invalid."
  },
  INVALID_LOGIN: {
    status: "Invalid Login",
    message: "The login input provided is invalid."
  },
  INVALID_MMR: {
    status: "Invalid MMR",
    message: "The MMR threshold provided is invalid."
  },
  INVALID_PASSWORD_INPUT: {
    status: "Invalid Password Input",
    message: "The password input provided is invalid."
  },
  INVALID_REGISTRATION: {
    status: "Invalid Registration",
    message: "The registration input provided is invalid."
  },
  INVALID_RESET_TOKEN: {
    status: "Invalid Reset Token",
    message: "The reset token provided is invalid or expired."
  },
  INVALID_PLATFORM: {
    status: "Invalid Platform",
    message: "The platform selected is invalid."
  },
  INVALID_STATUS_INPUT: {
    status: "Invalid Status Input",
    message: "The user status selected is invalid."
  },
  INVALID_TEAM_INPUT: {
    status: "Invalid Team Input",
    message: "The team name provided is invalid."
  },
  INVALID_TEAM_PLATFORM: {
    status: "Invalid Team Platform",
    message: "The platform provided is invalid."
  },
  INVALID_TEAM_STATUS: {
    status: "Invalid Team Status",
    message: "The team status requested to update to is invalid."
  },
  INVALID_USERNAME: {
    status: "Invalid Username",
    message: "The username provided is invalid."
  },
  MAP_ADDED: {
    status: "Map Added",
    message: "The requested map has been added to your Stratbook."
  },
  MAP_DELETED: {
    status: "Map Deleted",
    message: "The requested map has been deleted."
  },
  MAP_DOES_NOT_EXIST: {
    status: "Map Does Not Exist",
    message: "The requested map does not exist in your team's Stratbook."
  },
  MAP_EXISTS: {
    status: "Map Exists",
    message: "The requested map already exists in your Stratbook. In order to protect your data, a duplicate cannot be added."
  },
  MAP_FOUND: {
    status: "Map Found",
    message: "The requested map has been found."
  },
  MAP_NOT_FOUND: {
    status: "Map Not Found",
    message: "The requested map could not be found in the team's stratbook."
  },
  MAP_UPDATED: {
    status: "Map Updated",
    message: "The requested map has been updated."
  },
  OPERATOR_STATS_FOUND: {
    status: "Operator Statistics Found",
    message: "Operator statistics found."
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
    status: "Profane Input",
    message: "Stratbook does not accept profane input."
  },
  PROFANE_TEAM_INPUT: {
    status: "Profane Team Input",
    message: "Stratbook does not accept profane input."
  },
  PUSH_SUBSCRIBE: {
    status: "Push Notifications Subscribed",
    message: "You have successfully subscribed to push notifications on this device."
  },
  SEASONAL_STATS_FOUND: {
    status: "Seasonal Statistics Found",
    message: "Seasonal statistics found."
  },
  SHARED_STRATEGIES_FOUND: {
    status: "Shared Strategies Found",
    message: "The shared strategies requested have been found."
  },
  SHARED_STRATEGY_FOUND: {
    status: "Shared Strategy Found",
    message: "The strategy requested has been found."
  },
  SHARED_STRATEGY_NOT_FOUND: {
    status: "Shared Strategy Not Found",
    message: "The strategy you requested could not be found."
  },
  STRATEGIES_FOUND: {
    status: "Strategies Found",
    message: "Strategies found."
  },
  STRATEGY_SHARED: {
    status: "Strategy Shared",
    message: "Your strategy has been shared successfully."
  },
  STRATEGY_UNSHARED: {
    status: "Strategy Unshared",
    message: "Your strategy has been unshared successfully."
  },
  TEAM_CREATED: {
    status: "Team Created",
    message: "You have created a team."
  },
  TEAM_DELETED: {
    status: "Team Deleted",
    message: "You have deleted your team."
  },
  TEAM_EXISTS: {
    status: "Team Exists",
    message: "A team with that name already exists."
  },
  TEAM_FOUND: {
    status: "Team Found",
    message: "Team found."
  },
  TEAM_JOINED: {
    status: "Team Joined",
    message: "You have joined the team."
  },
  TEAM_LEFT: {
    status: "Team Left",
    message: "You have left the team."
  },
  TEAM_MMR_UPDATED: {
    status: "Team MMR Updated",
    message: "You have updated the MMR threshold required to join your team."
  },
  TEAM_NAME_UPDATED: {
    status: "Team Name Updated",
    message: "You have updated the team name."
  },
  TEAM_NOT_FOUND: {
    status: "Team Not Found",
    message: "No team with the provided credentials could be found."
  },
  TEAM_PLATFORM_UPDATED: {
    status: "Team Platform Updated",
    message: "Your team platform has been successfully updated."
  },
  TEAM_STATS_FOUND: {
    status: "Team Statistics Found",
    message: "Team statistics found."
  },
  TOKEN_ISSUED: {
    status: "Token Issued",
    message: "Token issued."
  },
  USER_AND_TEAM_DELETED: {
    status: "User and Team Deleted",
    message: "You have deleted your account and your team."
  },
  USER_BLOCKED: {
    status: "User Blocked",
    message: "You have blocked the requested user."
  },
  USER_UNBLOCKED: {
    status: "User Unblocked",
    message: "You have unblocked the requested user."
  },
  USER_DELETED: {
    status: "User Deleted",
    message: "You have deleted your account."
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
  },
  WAIT_BEFORE_MORE_FEEDBACK: {
    status: "Must Wait Before Further Feedback",
    message: "You have submitted feedback within the past 24 hours. You must wait 24 hours from your most recent feedback before submitting more. Please understand this restriction is in place to prevent the sole Stratbook developer from getting spammed, not to limit users from providing feedback."
  }
}
