/* messages.js*/

/**
* List of messages and error reports used throughout platform
*/
module.exports = {
  EMAIL_UPDATED: {
    status: "Email Updated",
    body: "Your email has been updated.",
    email_body: "<div><h2>Your email has been updated</h2><br/><p>The email associated with your Stratbook account has been updated. If you did not do this, login to your Stratbook account and change it back immediately.</p></div>"
  },
  PLATFORM_UPDATED: {
    status: "Platform Updated",
    body: "Your platform has been updated",
    email_body: "<div><h2>Your platform has been updated</h2><br/><p>The platform associated with your account has been changed.</p></div>"
  },
  USER_REGISTERED: {
    status: "User Registered",
    body: "You have created an account with Stratbook.",
    email_body: "<div><h2>Welcome to Stratbook</h2><br/><p>You have successfully created an account on Stratbook. Check your email for a verification link that will allow you to verify your account. Verifying your account allows you to create or join a team and make strategies.</p></div>"
  },
  USER_STATUS_UPDATED: {
    status: "User Status Updated",
    body: "Your status on your Stratbook team has been updated.",
    email_body: "<div><h2>User Status Updated</h2><br/><p>The status of your membership on your Stratbook team has been updated.</p></div>"
  },
  USERNAME_UPDATED: {
    status: "Username Updated",
    body: "Your username has been updated.",
    email_body: "<div><h2>Your username has been updated</h2><br/><p>Your username has been updated.</p></div>"
  },
  VERIFY_ACCOUNT: {
    title: "Account Verified",
    body: "You have verified your Stratbook account.",
    email_body: "<div><h2>Your Stratbook Account is Verified!</h2><br/><p>Congratulations on successfully verifying your Stratbook account. You can now access the team and strategies features.</p></div>"
  },

  CANNOT_REMOVE_SELF: {
    status: "Cannot Remove Self"
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
  PERMISSION_DENIED: {
    status: "Permission Denied",
    message: "Permission to perform the action you requested has been denied."
  },
  PROFANE_INPUT: {
    status: "Profane Input"
  },
  PROFANE_TEAM_INPUT: {
    status: "Profane Team Input"
  },
  TEAM_NOT_FOUND: {
    status: "Team Not Found",
    message: "No team with the provided credentials could be found."
  },
  TOKEN_ISSUED: {
    status: "Token Issued"
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
