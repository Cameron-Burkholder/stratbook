/* client/components/pages/Register.js */

import React from "react";

import RegisterAPI from "../api/RegisterAPI.js";

/*
  @func: Register
  @desc: render register page
*/
const Register = () => {
  return (
    <div className="page" id="register">
      <RegisterAPI/>
    </div>
  )
}

export default Register;
