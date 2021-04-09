/* client/src/components/pages/ForgotPassword.js */

import React from "react";

import ForgotPasswordAPI from "../api/ForgotPasswordAPI.js";

const ForgotPassword = (props) => {
  return (
    <div className="page" id="forgot-password">
      <ForgotPasswordAPI alert={props.alert}/>
    </div>
  )
}

export default ForgotPassword;
