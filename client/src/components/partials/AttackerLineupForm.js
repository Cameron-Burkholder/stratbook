/* client/components/partials/AttackerLineupForm.js */

import React from "react";

import AttackerForm from "./AttackerForm.js";

/*
  @func: AttackerLineupForm
  @desc: render attacker lineup form
  @prop roles: Array
  @prop operators: Array
  @prop onChange: function
*/
const roles = ["NONE", "HARD BREACH", "SOFT BREACH", "ENTRY FRAG", "AREA DENIAL/FLANK WATCH", "INTEL", "UTILITY CLEAR", "SUPPORT", "ROAM CLEAR"];

const AttackerLineupForm = (props) => {
  const attackerRoles = props.roles.map((role, index) => {
    return (
      <div className="attacker-lineup-form__role" key={index}>
        <p className="attacker-lineup-form__heading">Operator {index + 1}</p>
        <select onChange={(e) => { props.onChange(e, index)} } className="attacker-lineup-form__input form__input" value={props.roles[index]} id={`attacker-role-${index}`}>
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
        { props.roles[index] !== "NONE" ? (
          <AttackerForm onChange={props.onChange} operators={props.operators} role={props.roles[index]} index={index}/>
        ) : ""}
      </div>
    )
  });
  return (
    <div className="attacker-linup-form">
      { attackerRoles }
    </div>
  )
}

export default AttackerLineupForm;
