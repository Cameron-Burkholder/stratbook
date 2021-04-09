/* client/src/components/pages/ResetPassword.js */

import React from "react";

import ResetPasswordAPI from "../api/ResetPasswordAPI.js";

const ResetPassword = (props) => {
  return (
    <div className="page" id="Reset-password">
      <ResetPasswordAPI alert={props.alert} token={props.match.params.token}/>
    </div>
  )
}

export default ResetPassword;
