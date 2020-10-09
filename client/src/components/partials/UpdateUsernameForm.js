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
      <p className="form__heading">Update Username</p>
      <fieldset className="form__fieldset" id="username-field">
        <label className="form__label" htmlFor="username">Username</label>
        <input onChange={props.onChange} className={"form__input" + (props.errors && props.errors.username == null ? "" : " form__input--error")} value={props.username} id="username" type="name" required/>
        <span className="form__description">Must match platform</span>
        <span className="form__error">{(props.errors ? props.errors.username : "")}</span>
      </fieldset>
      { props.loading ? <Loading/> : <button className="form__button form__button--submit" type="submit">Save</button> }
    </form>
  )
}

export default UpdateUsernameForm;
