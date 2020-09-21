/* client/components/partials/UpdateUsernameForm.js */

import React from "react";

import Loading from "./Loading.js"

/*
  @func: UpdateUsernameForm
  @desc: render update username form for user to interact with
  @prop onSubmit: function
  @prop onChange: function
  @prop username: String
  @prop errors: Object
  @prop loading: Boolean
*/
const UpdateUsernameForm = (props) => {
  return (
    <form className="form" id="update-username-form" onSubmit={props.onSubmit}>
      <p className="form-heading">Update Username</p>
      <fieldset className="form-fieldset" id="username-field">
        <label className="form-label" htmlFor="username">Username</label>
        <input onChange={props.onChange} className={"form-input" + (props.errors && props.errors.username == null ? "" : " input-error")} value={props.username} id="username" type="name" required/>
        <span className="form-description">Must match platform</span>
        <span className="form-error">{(props.errors ? props.errors.username : "")}</span>
      </fieldset>
      { props.loading ? <Loading/> : <button className="form-button" type="submit">Save</button> }
    </form>
  )
}

export default UpdateUsernameForm;
