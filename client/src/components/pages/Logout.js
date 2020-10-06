/* client/src/components/pages/Logout.js */

import React from "react";

/*
  @func: Logout
  @desc: call client-side logout when rendered
  @prop logout: function
*/
const Logout = (props) => {
  props.logout();
  return (
    <div className="page" id="logout"></div>
  )
}

export default Logout;
