/* client/components/pages/User_UpdatePlatform.js */

import React from "react";

import UpdatePlatformAPI from "../api/UpdatePlatformAPI.js";

/*
  @func: User_UpdatePlatform
  @desc: render update platform form
  @prop getAuthToken: function
  @prop updateAuthToken: function
  @prop platform: String
*/
const User_UpdatePlatform = (props) => {
  return (
    <div className="page" id="update-platform">
      <UpdatePlatformAPI getAuthToken={props.getAuthToken} updateAuthToken={props.updateAuthToken} platform={props.platform}/>
    </div>
  )
}

export default User_UpdatePlatform;
