/* client/components/pages/User_UpdateEmail.js */

import React from "react";

import UpdateEmailAPI from "../api/UpdateEmailAPI.js";

/*
  @func: User_UpdateUsername
  @desc: render update email form
  @prop getAuthToken: function
  @prop updateAuthToken: function
  @prop email: String
*/
const User_UpdateEmail = (props) => {
  return (
    <div className="page" id="update-email">
      <UpdateEmailAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken} email={props.email}/>
    </div>
  )
}

export default User_UpdateEmail;
