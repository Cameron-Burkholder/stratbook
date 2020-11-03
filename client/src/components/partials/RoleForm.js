/* client/src/components/partials/RoleForm.js */

import React from "react";
import { ATTACKER_ROLES, DEFENDER_ROLES } from "../../data.js";

const attackRoles = ATTACKER_ROLES;
const defenderRoles = DEFENDER_ROLES;
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
