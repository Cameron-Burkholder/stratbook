/* client/components/partials/AttackerRoleForm.js */

import React from "react";

import Loading from "./Loading.js"

/*
  @func: AttackerRoleForm
  @desc: render attacker role form
  @prop onSubmit: function
  @prop onChange: function
  @prop role: String
  @prop errors: Object
*/
const AttackerRoleForm = (props) => {
  return (
    <form className="form" id="set-attacker-role-form" onSubmit={props.onSubmit}>
      <fieldset className="form-fieldset" id="attacker-role-field">
        <label className="form-label" htmlFor="attacker_role">Primary Attacker Role</label>
        <select onChange={props.onChange} className={"form-input" + (props.errors && props.errors.role == null ? "" : " input-error")} value={props.attacker_role} id="attacker_role" required>
          <option>NONE</option>
          <option>HARD BREACH</option>
          <option>SOFT BREACH</option>
          <option>ENTRY FRAG</option>
          <option>AREA DENIAL/FLANK WATCH</option>
          <option>INTEL</option>
          <option>UTILITY CLEAR</option>
          <option>SUPPORT</option>
          <option>ROAM CLEAR</option>
        </select>
        <span className="form-error">{(props.errors ? props.errors.role : "")}</span>
      </fieldset>
    </form>
  )
}

export default AttackerRoleForm;
