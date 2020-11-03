/* client/components/partials/DefenderForm.js */

import React from "react";
import { DEFENDER_ROLES, DEFENDER_OPERATORS } from "../../data.js";

/*
  @func: DefenderForm
  @desc: render defender form
  @prop operators: Array
  @prop role: String
  @prop index: Int
  @prop onChange: function
*/

const DefenderForm = (props) => {
  const options = DEFENDER_OPERATORS[props.role].map((operator, index) => {
    if (props.operators.indexOf(operator) < 0 || props.operators.indexOf(operator) === props.index) {
      return <option key={index}>{operator.toUpperCase()}</option>
    }
  });
  return (
    <div className="defender-form">
      <select onChange={(e) => { props.onChange(e, props.index); } }className="defender-form__input form__input" value={props.operators[props.index]} id={`defender-form-${props.index}`}>
        <option>ANY</option>
        { options }
      </select>
      { props.operators[props.index] !== "ANY" && props.operators[props.index] !== "" ? (
        <img className="defender-form__image" alt="Defender" src={`../media/${props.operators[props.index].toLowerCase()}.webp`}/>
      ) : "" }
    </div>
  )
}

export default DefenderForm;
