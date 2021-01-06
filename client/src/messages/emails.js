/* messages/emails.js */

module.exports = {
  ANNOUNCEMENT: {
    status: "Team Announcement",
    body: '#1{NAME}: "#2{ANNOUNCEMENT}"',
    email_body: '<div><h2>Team Announcement</h2><br/><p>#1{NAME}: "#{ANNOUNCEMENT}"'
  },
  EMAIL_UPDATED: {
    status: "Email Updated",
    body: "Your email has been updated to #1{NEW_EMAIL}.",
    email_body: "<div><h2>Your email has been updated to #1{NEW_EMAIL}.</h2><br/><p>The email associated with your Stratbook account has been updated. If you did not do this, login to your Stratbook account and change it back immediately.</p></div>"
  },
  MAP_ADDED: {
    status: "Map Added",
    body: "#1{NEW_MAP} has been added to your Stratbook.",
    email_body: "<div><h2>#1{NEW_MAP} has been added to your Stratbook.</h2><br/><p>A user has added a map to the Stratbook associated with your team.</p></div>"
  },
  MAP_DELETED: {
    status: "Map Deleted",
    body: "#1{MAP} has been removed from your Stratbook.",
    email_body: "<div><h2>#1{MAP} has been removed from your Stratbook.</h2><br/><p>A user has removed a map from the Stratbook associated with your team.</p></div>"
  },
  PASSWORD_RESET: {
    status: "Password Reset",
    body: "Your password has been reset.",
    email_body: "<div><h2>Your password has been reset.</h2><br/><p>The password for your Stratbook account has been reset. If you did not do this, login to your Stratbook account and reset your password immediately.</p></div>"
  },
  PASSWORD_UPDATED: {
    status: "Password Updated",
    body: "Your password has been updated.",
    email_body: "<div><h2>Your password has been updated.</h2><br/><p>The password for your Stratbook account has been updated. If you did not do this, login to your Stratbook account and reset your password immediately.</p></div>"
  },
  PLATFORM_UPDATED: {
    status: "Platform Updated",
    body: "Your platform has been updated.",
    email_body: "<div><h2>Your platform has been updated.</h2><br/><p>The platform associated with your account has been changed.</p></div>"
  },
  TEAM_CREATED: {
    status: "Team Created",
    body: "Your Stratbook team, #1{TEAM_NAME}, has been created.",
    email_body: "<div><h2>Your Stratbook team, #1{TEAM_NAME}, has been created.</h2><br/><p>Congratulations on creating a team on Stratbook. You may now send the join code to other members on the same platform as you to invite them to join your team. You and your team can create strategies for your own stratbook.</p></div>"
  },
  TEAM_DISBANDED: {
    status: "Team Disbanded",
    body: "Your Stratbook team, #1{TEAM_NAME}, has been disbanded.",
    email_body: "<div><h2>Your Stratbook team, #1{TEAM_NAME}, has been disbanded.</h2><br/><p>Due to the actions of an admin on the team, your Stratbook team has been disbanded. All associated data has been removed from the database.</p></div>"
  },
  TEAM_NAME_UPDATED: {
    status: "Team Name Updated",
    body: "Your team name has been updated to #1{NEW_NAME}.",
    email_body: "<div><h2>Your team name has been updated to #1{NEW_NAME}.</h2><br/><p>Your Stratbook team name has been updated. If you wish to undo this as an admin on the team, login and revert the change.</p></div>"
  },
  TEAM_STATUS_UPDATED: {
    status: "Team Status Updated",
    body: "Your team status has been changed to #1{NEW_STATUS}.",
    email_body: "<div><h2>Your team status has been updated to #1{NEW_STATUS}.</h2><br/><p>Changing your team status affects the ability of new members to join. If you think this was a mistake, you can update the team status under the manage page.</p></div>"
  },
  USER_AND_TEAM_DELETED: {
    status: "User and Team Deleted",
    body: "Your Stratbook account and team have been deleted.",
    email_body: "<div><h2>Your Stratbook account and team have been deleted.</h2><br/><p>All associated data has been deleted from the Stratbook databases. Since you were either the sole member or admin on a team, your team has been deleted as well.</p></div>"
  },
  USER_DELETED: {
    status: "User Deleted",
    body: "Your Stratbook account has been deleted.",
    email_body: "<div><h2>Your Stratbook account has been deleted.</h2><br/><p>All associated data has been deleted from the Stratbook databases. If you were a member of a team, you have been removed from the team.</p></div>"
  },
  USER_JOINED_TEAM: {
    status: "User Joined Team",
    body: "#1{USER} has joined your Stratbook team, #2{TEAM_NAME}.",
    email_body: "<div><h2>#1{USER} has joined your Stratbook team, #2{TEAM_NAME}.</h2></br><p>A user has joined your Stratbook team. Log in to Stratbook to see the new user and if needed, remove them.</p></div>"
  },
  USER_LEFT_TEAM: {
    status: "User Left Team",
    body: "#1{USER} has left your Stratbook team, #2{TEAM_NAME}.",
    email_body: "<div><h2>#1{USER} has left your Stratbook team, #2{TEAM_NAME}.</h2><br/><p>A user has left your Stratbook team.</p></div>"
  },
  USER_REGISTERED: {
    status: "User Registered",
    body: "You have created an account with Stratbook.",
    email_body: "<div><h2>Welcome to Stratbook</h2><br/><p>You have successfully created an account on Stratbook. Check your email for a verification link that will allow you to verify your account. Verifying your account allows you to create or join a team and make strategies.</p></div>"
  },
  USER_STATUS_UPDATED: {
    status: "User Status Updated",
    body: "Your status on your Stratbook team, #1{TEAM_NAME}, has been updated to #2{STATUS}.",
    email_body: "<div><h2>User Status Updated</h2><br/><p>The status of your membership on your Stratbook team, #{TEAM_NAME}, has been updated to #2{STATUS}.</p></div>"
  },
  USERNAME_UPDATED: {
    status: "Username Updated",
    body: "Your username has been updated.",
    email_body: "<div><h2>Your username has been updated</h2><br/><p>Your username has been updated.</p></div>"
  },
  VERIFY_ACCOUNT: {
    status: "Account Verified",
    body: "You have verified your Stratbook account.",
    email_body: "<div><h2>Your Stratbook Account is Verified!</h2><br/><p>Congratulations on successfully verifying your Stratbook account. You can now access the team and strategies features.</p></div>"
  },
}
