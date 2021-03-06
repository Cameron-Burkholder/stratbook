/* client/src/components/pages/User.js */

import React from "react";

import UpdatePlatformAPI from "../api/UpdatePlatformAPI.js";
import UpdateUsernameAPI from "../api/UpdateUsernameAPI.js";
import UpdateEmailAPI from "../api/UpdateEmailAPI.js";
import UpdatePasswordAPI from "../api/UpdatePasswordAPI.js";
import SetAttackerRoleAPI from "../api/SetAttackerRoleAPI.js";
import SetAttackersAPI from "../api/SetAttackersAPI.js";
import SetDefenderRoleAPI from "../api/SetDefenderRoleAPI.js";
import SetDefendersAPI from "../api/SetDefendersAPI.js";
import PushNotificationsAPI from "../api/PushNotificationsAPI.js";
import DeleteUserAPI from "../api/DeleteUserAPI.js";

const User = (props) => {
  return (
    <div className="page" id="user">
      <div className="account-section">
        <h3>Preferences</h3>
        <div className="role">
          <h4>Roles</h4>
          <SetAttackerRoleAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken} attacker_role={props.attacker_role} alert={props.alert}/>
          <SetDefenderRoleAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken} defender_role={props.defender_role} alert={props.alert}/>
        </div>
        <div className="operators">
          <h4>Operators</h4>
          <SetAttackersAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken} attackers={props.attackers} alert={props.alert}/>
          <SetDefendersAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken} defenders={props.defenders} alert={props.alert}/>
        </div>
      </div>
      <div className="account-section" id="account-info">
        <h3>Account Information</h3>
        <UpdatePlatformAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken} platform={props.platform} alert={props.alert}/>
        <UpdateUsernameAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken} username={props.username} alert={props.alert}/>
        <UpdateEmailAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken} email={props.email} alert={props.alert}/>
        <UpdatePasswordAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken} alert={props.alert}/>
      </div>
      <div className="account-section" id="notifications">
        <h3>Notification Preferences</h3>
        <PushNotificationsAPI getAuthToken={props.getAuthToken} alert={props.alert} subscription={props.subscription}/>
      </div>
      <div className="account-section account-section--danger">
        <h3>Manage Account</h3>
        <DeleteUserAPI getAuthToken={props.getAuthToken} logout={props.logout} alert={props.alert} updateAuthToken={props.getAuthToken}/>
      </div>
    </div>
  )
}

export default User;
