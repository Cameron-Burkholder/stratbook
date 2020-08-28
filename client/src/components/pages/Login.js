/* client/components/pages/Login.js */

import React from "react";

import LoginAPI from "../api/LoginAPI.js";

/*
  @func: Login
  @desc: render login page
  @prop login: function
*/
const Login = (props) => {
  return (
    <div className="page" id="login">
      <LoginAPI login={props.login}/>
    </div>
  )
}

export default Login;
