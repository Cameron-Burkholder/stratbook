/* client/components/pages/User.js */

import React from "react";

import SetAttackerRoleAPI from "../api/SetAttackerRoleAPI.js";
import SetDefenderRoleAPI from "../api/SetDefenderRoleAPI.js";
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
      <SetAttackerRoleAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken} attacker_role={props.attacker_role}/>
      <SetDefenderRoleAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken} defender_role={props.defender_role}/>
      <DeleteUserAPI getAuthToken={props.getAuthToken} logout={props.logout}/>
    </div>
  )
}

export default User;
