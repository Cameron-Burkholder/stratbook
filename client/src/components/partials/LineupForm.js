/* client/src/components/partials/Lineup.js */

import React from "react";

import RoleForm from "../partials/RoleForm.js";
import OperatorForm from "../partials/OperatorForm.js";
import UtilityForm from "../partials/UtilityForm.js";

const LineupForm = (props) => {
  return (
    <div className="lineup">
      <RoleForm onChange={props.updateRoles} roles={props.roles} type={props.type}/>
      <OperatorForm onChange={props.updateOperators} roles={props.roles} operators={props.operators} type={props.type}/>
      <UtilityForm onChange={props.updateUtility} operators={props.operators} utility={props.utility}type={props.type}/>
    </div>
  )
}

export default LineupForm;
