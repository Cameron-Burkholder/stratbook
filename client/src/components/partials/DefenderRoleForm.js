/* client/components/partials/DefenderRoleForm.js */

import React from "react";

import Loading from "./Loading.js"

/*
  @func: DefenderRoleForm
  @desc: render defender role form
  @prop onSubmit: function
  @prop onChange: function
  @prop role: String
  @prop errors: Object
  @prop loading: Boolean
*/
const DefenderRoleForm = (props) => {
  return (
    <form className="form" id="set-defender-role-form" onSubmit={props.onSubmit}>
      <fieldset className="form-fieldset" id="defender-role-field">
        <label className="form-label" htmlFor="defender_role">Primary Defender Role</label>
        <select onChange={props.onChange} className={"form-input" + (props.errors && props.errors.role == null ? "" : " input-error")} value={props.defender_role} id="defender_role" required>
          <option>NONE</option>
          <option>HARD BREACH DENIAL</option>
          <option>INTEL DENIAL</option>
          <option>INTEL</option>
          <option>AREA DENIAL</option>
          <option>TRAPS</option>
          <option>UTILITY SOAK</option>
          <option>SUPPORT</option>
          <option>ROAM</option>
        </select>
        <span className="form-error">{(props.errors ? props.errors.role : "")}</span>
      </fieldset>
    </form>
  )
}

export default DefenderRoleForm;
