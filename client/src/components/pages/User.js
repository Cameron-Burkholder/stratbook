/* client/components/pages/User.js */

import React from "react";

/*
  @func: User
  @desc: render user page
*/
const User = (props) => {
  return (
    <div className="page" id="user">
      <p className="user-property">Username: {props.username}</p>
      <p className="user-property">Email: {props.email}</p>
      <p className="user-property">Platform: {props.platform}</p>
    </div>
  )
}

export default User;
