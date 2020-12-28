/* client/src/components/pages/ResetPassword.js */

import React from "react";

import ResetPasswordAPI from "../api/ResetPasswordAPI.js";
import { useParams } from "react-router";

/*
  @func: Reset password
  @desc: render Reset password
  @prop alert: function
*/
const ResetPassword = (props) => {
  return (
    <div className="page" id="Reset-password">
      <ResetPasswordAPI alert={props.alert} token={props.match.params.token}/>
    </div>
  )
}

export default ResetPassword;
