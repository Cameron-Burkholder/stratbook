/* client/src/components/pages/Register.js */

import React from "react";

import RegisterAPI from "../api/RegisterAPI.js";

/*
  @func: Register
  @desc: render register page
  @prop alert: function
*/
const Register = (props) => {
  return (
    <div className="page" id="register">
      <RegisterAPI alert={props.alert}/>
    </div>
  )
}

export default Register;
