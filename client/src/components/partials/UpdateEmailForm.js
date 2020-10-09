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
      <p className="form__heading">Update Email</p>
      <fieldset className="form__fieldset" id="email-field">
        <label className="form__label" htmlFor="email">Email</label>
        <input onChange={props.onChange} className={"form__input" + (props.errors && props.errors.email == null ? "" : " form__input--error")} value={props.email} id="email" type="email" required/>
        <span className="form__error">{(props.errors ? props.errors.email : "")}</span>
      </fieldset>
      { props.loading ? <Loading/> : <button className="form__button form__button--submit" type="submit">Save</button> }
    </form>
  )
}

export default UpdateEmailForm;
