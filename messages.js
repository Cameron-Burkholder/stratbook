/* messages.js*/

/**
* List of messages and error reports used throughout platform
*/
module.exports = {
  VERIFY_ACCOUNT: {
    title: "Account Verified",
    body: "You have verified your Stratbook account.",
    email_body: "<div><h2>Your Stratbook Account is Verified!</h2><br/><p>Congratulations on successfully verifying your Stratbook account. You can now access the team and strategies features.</p></div>"
  },
  USER_REGISTERED: {
    status: "User Registered",
    body: "You have created an account with Stratbook.",
    email_body: "<div><h2>Welcome to Stratbook</h2><br/><p>You have successfully created an account on Stratbook. Check your email for a verification link that will allow you to verify your account. Verifying your account allows you to create or join a team and make strategies.</p></div>"
  },

  USER_NOT_FOUND: {
    status: "User Not Found",
    message: "Unable to find user with provided credentials.",
    errors: {
      email: "No user with that email address was found."
    }
  },
  INCORRECT_PASSWORD: {
    status: "Incorrect Password",
    message: "The password entered was incorrect."
  },
  TOKEN_ISSUED: {
    status: "Token Issued"
  },
  INVALID_LOGIN: {
    status: "Invalid Login"
  },
  INVALID_REGISTRATION: {
    status: "Invalid Registration"
  },
  PROFANE_INPUT: {
    status: "Profane Input"
  },
  INVALID_ATTACKER_ROLE: {
    status: "Invalid Attacker Role"
  },
  INVALID_ATTACKERS: {
    status: "Invalid Attackers"
  },
  INVALID_DEFENDER_ROLE: {
    status: "Invalid Defender Role"
  },
  INVALID_DEFENDERS: {
    status: "Invalid Defenders"
  },
  INVALID_BLOCK_USER_INPUT: {
    status: "Invalid Block User Input"
  },
  CANNOT_REMOVE_SELF: {
    status: "Cannot Remove Self"
  },
  INVALID_EMAIL: {
    status: "Invalid Email"
  },
  INVALID_JOIN_CODE: {
    status: "Invalid Join Code"
  },
  INVALID_PASSWORD_INPUT: {
    status: "Invalid Password Input"
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
  PROFANE_TEAM_INPUT: {
    status: "Profane Team Input"
  },
  INVALID_USERNAME: {
    status: "Invalid Username"
  },
  EXISTING_USER: {
    status: "EXISTING_USER"
  }
}
