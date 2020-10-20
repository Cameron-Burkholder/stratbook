/* client/src/components/partials/RoleForm.js */

import React from "react";

const attackRoles = ["ANY", "HARD BREACH", "SOFT BREACH", "INTEL", "AREA DENIAL/FLANK WATCH", "UTILITY CLEAR", "SUPPORT", "ENTRY FRAG"];
const defenderRoles = ["ANY", "HARD BREACH DENIAL", "INTEL DENIAL", "INTEL", "AREA DENIAL", "TRAPS", "UTILITY SOAK", "SUPPORT", "ROAM"];
const RoleForm = (props) => {
  const roleOptions = (props.type === "ATTACK" ? (
    attackRoles.map((option, index) => {
      return <option key={index}>{option}</option>
    })
  ) : (
    defenderRoles.map((option, index) => {
      return <option key={index}>{option}</option>
    })
  ));
  const roles = props.roles.map((role, index) => {
    return (
      <div className="role-form__role" key={index}>
        <select className="role-form__input" onChange={(e) => { props.onChange(e, index) }} value={props.roles[index]}>
          { roleOptions }
        </select>
      </div>
    )
  });
  return (
    <div className="role-form">
      { roles }
    </div>
  )
}

export default RoleForm;
