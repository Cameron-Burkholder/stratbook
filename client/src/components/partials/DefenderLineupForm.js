/* client/components/partials/DefenderLineupForm.js */

import React from "react";

import DefenderForm from "./DefenderForm.js";

/*
  @func: DefenderLineupForm
  @desc: render defender lineup form
  @prop roles: Array
  @prop operators: Array
  @prop onChange: function
*/
const roles = ["NONE", "HARD BREACH DENIAL", "INTEL DENIAL", "INTEL", "AREA DENIAL", "TRAPS", "UTILITY SOAK", "SUPPORT", "ROAM"];

const DefenderLineupForm = (props) => {
  const defenderRoles = props.roles.map((role, index) => {
    return (
      <div className="defender-lineup-form__role" key={index}>
        <p className="defender-lineup-form__heading">Operator {index + 1}</p>
        <select onChange={(e) => { props.onChange(e, index)} } className="defender-lineup-form__input form__input" value={props.roles[index]} id={`defender-role-${index}`}>
          <option>ANY</option>
          <option>HARD BREACH DENIAL</option>
          <option>INTEL DENIAL</option>
          <option>INTEL</option>
          <option>AREA DENIAL</option>
          <option>TRAPS</option>
          <option>UTILITY SOAK</option>
          <option>SUPPORT</option>
          <option>ROAM</option>
        </select>
        { props.roles[index] !== "ANY" ? (
          <DefenderForm onChange={props.onChange} operators={props.operators} role={props.roles[index]} index={index}/>
        ) : ""}
      </div>
    )
  });
  return (
    <div className="defender-linup-form">
      { defenderRoles }
    </div>
  )
}

export default DefenderLineupForm;
