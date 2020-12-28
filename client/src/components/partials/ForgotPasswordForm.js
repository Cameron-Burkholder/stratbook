/* client/components/partials/ForgotPasswordForm.js */

import React from "react";

import Loading from "./Loading.js"

/*
  @func: ForgotPasswordForm
  @desc: render ForgotPassword form for user to interact with
  @prop onSubmit: function
  @prop onChange: function
  @prop email: String
  @prop errors: Object
  @prop loading: Boolean
*/
const ForgotPasswordForm = (props) => {
  return (
    <form className="form" id="ForgotPassword-form" onSubmit={props.onSubmit}>
      <h4 className="form__heading">Forgot Password</h4>
      <fieldset className="form__fieldset" id="email-field">
        <label className="form__label" htmlFor="email">Email associated with account</label>
        <input onChange={props.onChange} className={"form__input" + (props.errors && props.errors.email == null ? "" : " form__input--error")} value={props.email} id="email" type="email" required/>
        <span className="form__error">{(props.errors ? props.errors.email : "")}</span>
      </fieldset>
      { props.loading ? <Loading/> : <button className="form__button form__button--submit" type="submit">Send Reset Link</button> }
    </form>
  )
}

export default ForgotPasswordForm;
