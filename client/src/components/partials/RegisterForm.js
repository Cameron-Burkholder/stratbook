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
  @prop platform: String
  @prop errors: Object
  @prop loading: Boolean
*/
const RegisterForm = (props) => {
  return (
    <form className="form" id="register-form" onSubmit={props.onSubmit}>
      <h4 className="form__heading">Register Form</h4>
      <fieldset className="form__fieldset" id="username-field">
        <label className="form__label" htmlFor="username">Username</label>
        <input onChange={props.onChange} className={"form__input" + (props.errors && props.errors.username == null ? "" : " form__input--error")} value={props.username} id="username" type="name" required/>
        <span className="form__description">Must match platform</span>
        <span className="form__error">{(props.errors ? props.errors.username : "")}</span>
      </fieldset>
      <fieldset className="form__fieldset" id="email-field">
        <label className="form__label" htmlFor="email">Email</label>
        <input onChange={props.onChange} className={"form__input" + (props.errors && props.errors.email == null ? "" : " form__input--error")} value={props.email} id="email" type="email" required/>
        <span className="form__error">{(props.errors ? props.errors.email : "")}</span>
        <span className="form__error">{(props.errors ? props.errors.user : "")}</span>
      </fieldset>
      <fieldset className="form__fieldset" id="platform-field">
        <label className="form__label" htmlFor="platform">Platform</label>
        <select onChange={props.onChange} className={"form__select" + (props.errors && props.errors.platform == null ? "" : " form__input--error")} value={props.platform} id="platform" required>
          <option>XBOX</option>
          <option>PC</option>
          <option>PS4</option>
        </select>
        <span className="form__error">{(props.errors ? props.errors.platform : "")}</span>
      </fieldset>
      <fieldset className="form__fieldset" id="password1-field">
        <label className="form__label" htmlFor="password1">Password</label>
        <input onChange={props.onChange} className={"form__input" + (props.errors && props.errors.password1 == null ? "" : " form__input--error")} value={props.password1} id="password1" type="password" required/>
        <span className="form__error">{(props.errors ? props.errors.password1 : "")}</span>
      </fieldset>
      <fieldset className="form__fieldset" id="password2-field">
        <label className="form__label" htmlFor="password2">Confirm Password</label>
        <input onChange={props.onChange} className={"form__input" + (props.errors && props.errors.password2 == null ? "" : " form__input--error")} value={props.password2} id="password2" type="password" required/>
        <span className="form__error">{(props.errors ? props.errors.password2 : "")}</span>
      </fieldset>
      { props.loading ? <Loading/> : <button className="form__button form__button--submit" type="submit">Register</button> }
    </form>
  )
}

export default RegisterForm;
