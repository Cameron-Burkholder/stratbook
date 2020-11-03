/* client/src/components/partials/OperatorForm.js */

import React from "react";
import { ATTACKER_ROLES, ATTACKER_OPERATORS, DEFENDER_ROLES, DEFENDER_OPERATORS } from "../../data.js";

const OperatorForm = (props) => {
  const roles = (props.type === "ATTACK" ? (
    ATTACKER_ROLES
  ) : (
    DEFENDER_ROLES
  ));
  const operators = (props.type === "ATTACK" ? (
    ATTACKER_OPERATORS
  ) : (
    DEFENDER_OPERATORS
  ));
  const operatorList = props.operators.map((operator, index) => {
    const i = index;
    const operatorOptions = (props.roles[index] !== "ROLE" ? (
      operators[props.roles[index]].map((operator, index) => {
        if (props.operators.indexOf(operator) < 0 || props.operators.indexOf(operator) === i) {
          return <option key={index}>{operator.toUpperCase()}</option>
        }
      })
    ) : "");
    return (
      <div className="operator-form__operator" key={index}>
        <select className="operator-form__input" onChange={(e) => { props.onChange(e, index) }} value={props.operators[index]} disabled={props.roles[index] === "ROLE"}>
          <option>OPERATOR</option>
          { operatorOptions }
        </select>
      </div>
    )
  });
  return (
    <div className="operator-form">
      { operatorList }
    </div>
  )
}

export default OperatorForm;
