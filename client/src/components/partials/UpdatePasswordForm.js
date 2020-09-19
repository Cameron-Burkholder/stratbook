/* client/components/partials/UpdatePasswordForm.js */

import React from "react";

import Loading from "./Loading.js"

/*
  @func: UpdatePasswordForm
  @desc: render update password form for user to interact with
  @prop onSubmit: function
  @prop onChange: function
  @prop errors: Object
  @prop loading: Boolean
*/
const UpdatePasswordForm = (props) => {
  return (
    <form className="form" id="update-password-form" onSubmit={props.onSubmit}>
      <fieldset className="form-fieldset" id="password1-field">
        <label className="form-label" htmlFor="password1">New Password</label>
        <input onChange={props.onChange} className={"form-input" + (props.errors && props.errors.password1 == null ? "" : " input-error")} value={props.password1} id="password1" type="password" required/>
        <span className="form-error">{(props.errors ? props.errors.password1 : "")}</span>
      </fieldset>
      <fieldset className="form-fieldset" id="password2-field">
        <label className="form-label" htmlFor="password2">Confirm New Password</label>
        <input onChange={props.onChange} className={"form-input" + (props.errors && props.errors.password2 == null ? "" : " input-error")} value={props.password2} id="password2" type="password" required/>
        <span className="form-error">{(props.errors ? props.errors.password2 : "")}</span>
      </fieldset>
      { props.loading ? <Loading/> : <button className="form-button" type="submit">Save</button> }
    </form>
  )
}

export default UpdatePasswordForm;
