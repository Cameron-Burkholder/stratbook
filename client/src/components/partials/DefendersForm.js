/* client/components/partials/DefendersForm.js */

import React from "react";

import Loading from "./Loading.js"
const defenders = ["MUTE", "SMOKE", "CASTLE", "PULSE", "DOC", "ROOK", "JAGER", "BANDIT", "KAPKAN", "TACHANKA", "FROST", "VALKYRIE", "CAVEIRA", "ECHO", "MIRA", "LESION", "ELA", "VIGIL", "CLASH", "KAID", "WARDEN", "GOYO", "WAMAI", "ORYX", "MELUSI"];

/*
  @func: DefendersForm
  @desc: render defenders form
  @prop onSubmit: function
  @prop onChange: function
  @prop defenders: Array
  @prop errors: Object
  @prop loading: Boolean
*/
const AttackerRoleForm = (props) => {
  const defender_buttons = defenders.map((defender, index) => {
    return (
      <div className="defender" key={index}>
        <input onChange={() => { props.onChange(defender); } } className="form-input" type="checkbox" id={"attacker-" + defender.toLowerCase()} checked={props.defenders.indexOf(defender) >= 0}/>
        <label className="form-label" htmlFor={"attacker-" + defender.toLowerCase()}>
          <img className="form-image" alt={defender + " Image"} src={"https://cdn.r6stats.com/badges/" + defender.toLowerCase() + "_badge.png"}/>
        </label>
      </div>
    )
  });
  return (
    <form className="form" id="set-defenders-form" onSubmit={props.onSubmit}>
      <fieldset className="form-fieldset" id="defenders-field">
        <p className="form-label">Preferred Defenders</p>
          { defender_buttons }
        <span className="form-error">{(props.errors ? props.errors.defenders : "")}</span>
        <button className="form-submit" type="submit">Save</button>
      </fieldset>
    </form>
  )
}

export default AttackerRoleForm;
