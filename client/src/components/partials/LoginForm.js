/* client/components/partials/LoginForm.js */

import React from "react";

import Loading from "./Loading.js"

/*
  @func: LoginForm
  @desc: render login form for user to interact with
  @prop onSubmit: function
  @prop onChange: function
  @prop email: String
  @prop password: String
  @prop errors: Object
  @prop loading: Boolean
*/
const LoginForm = (props) => {
  return (
    <form className="form" id="login-form" onSubmit={props.onSubmit}>
      <fieldset className="form-fieldset" id="email-field">
        <label className="form-label" htmlFor="email">Email</label>
        <input onChange={props.onChange} className={"form-input" + (props.errors.email == null ? "" : " input-error")} value={props.email} id="email" type="email" required/>
        <span className="form-error">{props.errors.email}</span>
        <span className="form-error">{props.errors.user}</span>
      </fieldset>
      <fieldset className="form-fieldset" id="password-field">
        <label className="form-label" htmlFor="password">Password</label>
        <input onChange={props.onChange} className={"form-input" + (props.errors.password == null ? "" : " input-error")} value={props.password} id="password" type="password" required/>
        <span className="form-error">{props.errors.password}</span>
      </fieldset>
      { props.loading ? <Loading/> : <button className="form-button" type="submit">Login</button> }
    </form>
  )
}

export default LoginForm;
