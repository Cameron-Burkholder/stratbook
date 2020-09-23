/* client/components/partials/AttackersForm.js */

import React from "react";

import Loading from "./Loading.js"
const attackers = ["SLEDGE", "THATCHER", "ASH", "THERMITE", "TWITCH", "MONTAGNE", "BLITZ", "IQ", "GLAZ", "FUZE", "BUCK", "BLACKBEARD", "CAPITAO", "HIBANA", "JACKAL", "YING", "ZOFIA", "DOKKAEBI", "FINKA", "MAVERICK", "NOMAD", "NOKK", "AMARU", "KALI", "IANA", "ACE", "ZERO"];

/*
  @func: AttackersForm
  @desc: render attackers form
  @prop onSubmit: function
  @prop onChange: function
  @prop attackers: Array
  @prop errors: Object
  @prop loading: Boolean
*/
const AttackerRoleForm = (props) => {
  const attacker_buttons = attackers.map((attacker, index) => {
    return (
      <div className="attacker" key={index}>
        <input onChange={() => { props.onChange(attacker); } } className="form-input" type="checkbox" id={"attacker-" + attacker.toLowerCase()} checked={props.attackers.indexOf(attacker) >= 0}/>
        <label className="form-label" htmlFor={"attacker-" + attacker.toLowerCase()}>
          <img className="form-image" alt={attacker + " Image"} src={"https://cdn.r6stats.com/badges/" + attacker.toLowerCase() + "_badge.png"}/>
        </label>
      </div>
    )
  });
  return (
    <form className="form" id="set-attackers-form" onSubmit={props.onSubmit}>
      <fieldset className="form-fieldset" id="attackers-field">
        <p className="form-label">Preferred Attackers</p>
          { attacker_buttons }
        <span className="form-error">{(props.errors ? props.errors.attackers : "")}</span>
        <button className="form-submit" type="submit">Save</button>
      </fieldset>
    </form>
  )
}

export default AttackerRoleForm;
