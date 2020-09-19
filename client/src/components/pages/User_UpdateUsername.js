/* client/components/pages/User_UpdateUsername.js */

import React from "react";

import UpdateUsernameAPI from "../api/UpdateUsernameAPI.js";

/*
  @func: User_UpdateUsername
  @desc: render update platform form
  @prop getAuthToken: function
  @prop updateAuthToken: function
  @prop username: String
*/
const User_UpdateUsername = (props) => {
  return (
    <div className="page" id="update-platform">
      <UpdateUsernameAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken} username={props.username}/>
    </div>
  )
}

export default User_UpdateUsername;
