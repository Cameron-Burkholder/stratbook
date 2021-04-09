/* client/src/components/pages/Login.js */

import React from "react";

import LoginAPI from "../api/LoginAPI.js";

const Login = (props) => {
  return (
    <div className="page" id="login">
      <LoginAPI login={props.login} alert={props.alert}/>
    </div>
  )
}

export default Login;
