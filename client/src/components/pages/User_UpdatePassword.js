/* client/components/pages/User_UpdatePassword.js */

import React from "react";

import UpdatePasswordAPI from "../api/UpdatePasswordAPI.js";

/*
  @func: User_UpdatePassword
  @desc: render update password form
  @prop getAuthToken: function
  @prop updateAuthToken: function
*/
const User_UpdatePassword = (props) => {
  return (
    <div className="page" id="update-platform">
      <UpdatePasswordAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken}/>
    </div>
  )
}

export default User_UpdatePassword;
