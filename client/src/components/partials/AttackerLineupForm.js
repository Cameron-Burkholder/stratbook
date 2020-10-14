/* client/components/partials/AttackerLineupForm.js */

import React from "react";

import AttackerForm from "./AttackerForm.js";
import UtilityForm from "./UtilityForm.js";

/*
  @func: AttackerLineupForm
  @desc: render attacker lineup form
  @prop roles: Array
  @prop operators: Array
  @prop onChange: function
  @prop utility: Array
*/
const roles = ["NONE", "HARD BREACH", "SOFT BREACH", "ENTRY FRAG", "AREA DENIAL/FLANK WATCH", "INTEL", "UTILITY CLEAR", "SUPPORT", "ROAM CLEAR"];

const AttackerLineupForm = (props) => {
  const attackerRoles = props.roles.map((role, index) => {
    return (
      <div className="attacker-lineup-form__role" key={index}>
        <p className="attacker-lineup-form__heading">Operator {index + 1}</p>
        <label className="attacker-lineup-form__label form__label">Role</label>
        <select onChange={(e) => { props.onChange(e, index)} } className="attacker-lineup-form__input form__input" value={props.roles[index]} id={`attacker-role-${index}`}>
          <option>ANY</option>
          <option>HARD BREACH</option>
          <option>SOFT BREACH</option>
          <option>ENTRY FRAG</option>
          <option>AREA DENIAL/FLANK WATCH</option>
          <option>INTEL</option>
          <option>UTILITY CLEAR</option>
          <option>SUPPORT</option>
          <option>ROAM CLEAR</option>
        </select>
        { props.roles[index] !== "ANY" ? (
          <AttackerForm onChange={props.onChange} operators={props.operators} role={props.roles[index]} index={index}/>
        ) : ""}
        <label className="attacker-lineup-form__label form__label">Utility</label>
        <UtilityForm onChange={props.onChange} type="ATTACK" operator={props.operators[index]} index={index} utility={props.utility[index]}/>
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
