/* client/components/partials/ResetPasswordForm.js */

import React from "react";

import Loading from "./Loading.js"

/*
  @func: ResetPasswordForm
  @desc: render ResetPassword form for user to interact with
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
const ResetPasswordForm = (props) => {
  return (
    <form className="form" id="ResetPassword-form" onSubmit={props.onSubmit}>
      <h4 className="form__heading">Reset Password</h4>
      <fieldset className="form__fieldset" id="password1-field">
        <label className="form__label" htmlFor="password1">New Password</label>
        <input onChange={props.onChange} className={"form__input" + (props.errors && props.errors.password1 == null ? "" : " form__input--error")} value={props.password1} id="password1" type="password" required/>
        <span className="form__error">{(props.errors ? props.errors.password1 : "")}</span>
      </fieldset>
      <fieldset className="form__fieldset" id="password2-field">
        <label className="form__label" htmlFor="password2">Confirm Password</label>
        <input onChange={props.onChange} className={"form__input" + (props.errors && props.errors.password2 == null ? "" : " form__input--error")} value={props.password2} id="password2" type="password" required/>
        <span className="form__error">{(props.errors ? props.errors.password2 : "")}</span>
      </fieldset>
      { props.loading ? <Loading/> : <button className="form__button form__button--submit" type="submit">Reset Password</button> }
    </form>
  )
}

export default ResetPasswordForm;
