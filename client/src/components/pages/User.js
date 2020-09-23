/* client/components/pages/User.js */

import React from "react";

import UpdatePlatformAPI from "../api/UpdatePlatformAPI.js";
import UpdateUsernameAPI from "../api/UpdateUsernameAPI.js";
import UpdateEmailAPI from "../api/UpdateEmailAPI.js";
import UpdatePasswordAPI from "../api/UpdatePasswordAPI.js";
import SetAttackerRoleAPI from "../api/SetAttackerRoleAPI.js";
import SetAttackersAPI from "../api/SetAttackersAPI.js";
import SetDefenderRoleAPI from "../api/SetDefenderRoleAPI.js";
import SetDefendersAPI from "../api/SetDefendersAPI.js";
import DeleteUserAPI from "../api/DeleteUserAPI.js";

/*
  @func: User
  @desc: render user page
  @prop getAuthToken: function
  @prop logout: function
*/
const User = (props) => {
  return (
    <div className="page" id="user">
      <p className="user-property">Username: {props.username}</p>
      <p className="user-property">Email: {props.email}</p>
      <p className="user-property">Platform: {props.platform}</p>
      <div className="account-section">
        <h3>Preferences</h3>
        <SetAttackerRoleAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken} attacker_role={props.attacker_role}/>
        <SetAttackersAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken} attackers={props.attackers}/>
        <SetDefenderRoleAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken} defender_role={props.defender_role}/>
        <SetDefendersAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken} defenders={props.defenders}/>
      </div>
      <div className="account-section">
        <h3>Account Information</h3>
        <UpdatePlatformAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken} platform={props.platform}/>
        <UpdateUsernameAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken} username={props.username}/>
        <UpdateEmailAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken} email={props.email}/>
        <UpdatePasswordAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken}/>
      </div>
      <div className="account-section" id="danger">
        <h3>Manage Account</h3>
        <DeleteUserAPI getAuthToken={props.getAuthToken} logout={props.logout}/>
      </div>
    </div>
  )
}

export default User;
