/* client/components/partials/RegisterForm.js */

import React from "react";

import Loading from "./Loading.js"

/*
  @func: RegisterForm
  @desc: render register form for user to interact with
  @prop onSubmit: function
  @prop onChange: function
  @prop name: String
  @prop email: String
  @prop password1: String
  @prop password2: String
  @prop errors: Object
  @prop loading: Boolean
*/
const RegisterForm = (props) => {
  return (
    <form className="form" id="register-form" onSubmit={props.onSubmit}>
      <fieldset className="form-fieldset" id="name-field">
        <label className="form-label" htmlFor="name">Name</label>
        <input onChange={props.onChange} className={"form-input" + (props.errors.name == null ? "" : " input-error")} value={props.name} id="name" type="name" required/>
        <span className="form-error">{props.errors.name}</span>
      </fieldset>
      <fieldset className="form-fieldset" id="email-field">
        <label className="form-label" htmlFor="email">Email</label>
        <input onChange={props.onChange} className={"form-input" + (props.errors.email == null ? "" : " input-error")} value={props.email} id="email" type="email" required/>
        <span className="form-error">{props.errors.email}</span>
        <span className="form-error">{props.errors.user}</span>
      </fieldset>
      <fieldset className="form-fieldset" id="password1-field">
        <label className="form-label" htmlFor="password1">Password</label>
        <input onChange={props.onChange} className={"form-input" + (props.errors.password1 == null ? "" : " input-error")} value={props.password1} id="password1" type="password" required/>
        <span className="form-error">{props.errors.password1}</span>
      </fieldset>
      <fieldset className="form-fieldset" id="password2-field">
        <label className="form-label" htmlFor="password2">Confirm Password</label>
        <input onChange={props.onChange} className={"form-input" + (props.errors.password2 == null ? "" : " input-error")} value={props.password2} id="password2" type="password" required/>
        <span className="form-error">{props.errors.password2}</span>
      </fieldset>
      { props.loading ? <Loading/> : <button className="form-button" type="submit">Register</button> }
    </form>
  )
}

export default RegisterForm;
