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
      <fieldset className="form__fieldset" id="attacker-role-field">
        <label className="form__label" htmlFor="attacker_role">Primary Attacker Role</label>
        <select onChange={props.onChange} className={"form__select" + (props.errors && props.errors.role ? " form__input--error" : "")} value={props.attacker_role} id="attacker_role" required>
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
        <span className="form__error">{(props.errors ? props.errors.role : "")}</span>
      </fieldset>
    </form>
  )
}

export default AttackerRoleForm;
