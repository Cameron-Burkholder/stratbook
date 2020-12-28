/* client/components/partials/LoginForm.js */

import React from "react";

import Loading from "./Loading.js"
import { Link } from "react-router-dom";

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
      <h4 className="form__heading">Login Form</h4>
      <fieldset className="form__fieldset" id="email-field">
        <label className="form__label" htmlFor="email">Email</label>
        <input onChange={props.onChange} className={"form__input" + (props.errors && props.errors.email == null ? "" : " form__input--error")} value={props.email} id="email" type="email" required/>
        <span className="form__error">{(props.errors ? props.errors.email : "")}</span>
        <span className="form__error">{(props.errors ? props.errors.user : "")}</span>
      </fieldset>
      <fieldset className="form__fieldset" id="password-field">
        <label className="form__label" htmlFor="password">Password</label>
        <input onChange={props.onChange} className={"form__input" + (props.errors && props.errors.password == null ? "" : " form__input--error")} value={props.password} id="password" type="password" required/>
        <span className="form__error">{(props.errors ? props.errors.password : "")}</span>
        <Link to="/forgot-password">Forgot Password?</Link>
      </fieldset>
      { props.loading ? <Loading/> : <button className="form__button form__button--submit" type="submit">Login</button> }
    </form>
  )
}

export default LoginForm;
