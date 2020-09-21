/* client/components/partials/CreateTeamForm.js */

import React from "react";

import Loading from "./Loading.js"

/*
  @func: CreateTeamForm
  @desc: render create team form for user to interact with
  @prop onSubmit: function
  @prop onChange: function
  @prop name: String
  @prop errors: Object
  @prop loading: Boolean
*/
const CreateTeamForm = (props) => {
  return (
    <form className="form" id="create-team-form" onSubmit={props.onSubmit}>
      <fieldset className="form-fieldset" id="name-field">
        <label className="form-label" htmlFor="name">Team Name</label>
        <input onChange={props.onChange} className={"form-input" + (props.errors && props.errors.name == null ? "" : " input-error")} value={props.name} id="name" type="text" required/>
        <span className="form-error">{(props.errors ? props.errors.name : "")}</span>
      </fieldset>
      { props.loading ? <Loading/> : <button className="form-button" type="submit">Create Team</button> }
    </form>
  )
}

export default CreateTeamForm;
