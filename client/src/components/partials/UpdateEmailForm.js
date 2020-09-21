/* client/components/partials/UpdateEmailForm.js */

import React from "react";

import Loading from "./Loading.js"

/*
  @func: UpdateEmailForm
  @desc: render update platform form for user to interact with
  @prop onSubmit: function
  @prop onChange: function
  @prop email: String
  @prop errors: Object
  @prop loading: Boolean
*/
const UpdateEmailForm = (props) => {
  return (
    <form className="form" id="update-email-form" onSubmit={props.onSubmit}>
      <p className="form-heading">Update Email</p>
      <fieldset className="form-fieldset" id="email-field">
        <label className="form-label" htmlFor="email">Email</label>
        <input onChange={props.onChange} className={"form-input" + (props.errors && props.errors.email == null ? "" : " input-error")} value={props.email} id="email" type="email" required/>
        <span className="form-error">{(props.errors ? props.errors.email : "")}</span>
      </fieldset>
      { props.loading ? <Loading/> : <button className="form-button" type="submit">Save</button> }
    </form>
  )
}

export default UpdateEmailForm;
