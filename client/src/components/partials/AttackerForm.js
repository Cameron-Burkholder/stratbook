/* client/components/partials/AttackerForm.js */

import React from "react";
import { ATTACKER_ROLES, ATTACKER_OPERATORS } from "../../data.js";

/*
  @func: AttackerForm
  @desc: render attacker form
  @prop operators: Array
  @prop role: String
  @prop index: Int
  @prop onChange: function
*/

const AttackerForm = (props) => {
  const options = ATTACKER_OPERATORS[props.role].map((operator, index) => {
    if (props.operators.indexOf(operator) < 0 || props.operators.indexOf(operator) === props.index) {
      return <option key={index}>{operator.toUpperCase()}</option>
    }
  });
  return (
    <div className="attacker-form">
      <select onChange={(e) => { props.onChange(e, props.index); } }className="attacker-form__input form__input" value={props.operators[props.index]} id={`attacker-form-${props.index}`}>
        <option>ANY</option>
        { options }
      </select>
      { props.operators[props.index] !== "ANY" && props.operators[props.index] !== "" ? (
        <img className="attacker-form__image" alt="Attacker" src={`../media/${props.operators[props.index].toLowerCase()}.webp`}/>
      ) : "" }
    </div>
  )
}

export default AttackerForm;
