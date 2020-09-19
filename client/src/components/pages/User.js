/* client/components/pages/User.js */

import React from "react";

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
      <DeleteUserAPI getAuthToken={props.getAuthToken} logout={props.logout}/>
    </div>
  )
}

export default User;
