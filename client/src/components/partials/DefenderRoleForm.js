/* client/components/partials/DefenderRoleForm.js */

import React from "react";

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
      <fieldset className="form__fieldset" id="defender-role-field">
        <label className="form__label" htmlFor="defender_role">Primary Defender Role</label>
        <select onChange={props.onChange} className={"form__select" + (props.errors && props.errors.role ? " form__input--error" : "")} value={props.defender_role} id="defender_role" required>
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
        <span className="form__error">{(props.errors ? props.errors.role : "")}</span>
      </fieldset>
    </form>
  )
}

export default DefenderRoleForm;
