/* client/src/components/pages/Logout.js */

import React from "react";

const Logout = (props) => {
  props.logout();
  return (
    <div className="page" id="logout"></div>
  )
}

export default Logout;
