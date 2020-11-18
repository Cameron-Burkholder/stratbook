/* client/components/partials/JoinTeamForm.js */

import React from "react";

import Loading from "./Loading.js"

/*
  @func: JoinTeamForm
  @desc: render join team form for user to interact with
  @prop onSubmit: function
  @prop onChange: function
  @prop join_code: String
  @prop errors: Object
  @prop loading: Boolean
*/
const JoinTeamForm = (props) => {
  return (
    <form className="form" id="join-team-form" onSubmit={props.onSubmit}>
      <fieldset className="form__fieldset" id="join-code-field">
        <label className="form__label" htmlFor="join_code">Team Code</label>
        <input onChange={props.onChange} className={"form__input" + (props.errors && props.errors.join_code == null ? "" : " form__input--error")} value={props.join_code} id="join_code" type="text" required/>
        <span className="form__error">{(props.errors ? props.errors.join_code : "")}</span>
      </fieldset>
      { props.loading ? <Loading/> : <button className="form__button form__button--submit button button--secondary" type="submit">Join Team</button> }
    </form>
  )
}

export default JoinTeamForm;
