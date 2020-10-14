/* client/components/partials/DefenderForm.js */

import React from "react";

/*
  @func: DefenderForm
  @desc: render defender form
  @prop operators: Array
  @prop role: String
  @prop index: Int
  @prop onChange: function
*/
const roles = ["NONE", "HARD BREACH DENIAL", "INTEL DENIAL", "INTEL", "AREA DENIAL", "TRAPS", "UTILITY SOAK", "SUPPORT", "ROAM"];
const operators = {
  "HARD BREACH DENIAL": ["BANDIT", "KAID", "MUTE"],
  "INTEL DENIAL": ["MOZZIE", "MUTE", "VIGIL"],
  "INTEL": ["ECHO", "MAESTRO", "MIRA", "MOZZIE", "PULSE", "VALKYRIE"],
  "AREA DENIAL": ["CLASH", "GOYO", "LESION", "MELUSI", "MIRA", "SMOKE", "TACHANKA"],
  "TRAPS": ["ELA", "FROST", "KAPKAN", "LESION", "MELUSI"],
  "UTILITY SOAK": ["CASTLE", "GOYO", "JAGER", "WAMAI"],
  "SUPPORT": ["CLASH", "DOC", "ECHO", "GOYO", "JAGER", "MAESTRO", "MIRA", "PULSE", "ROOK", "TACHANKA", "VALKYRIE", "WARDEN"],
  "ROAM": ["ALIBI", "BANDIT", "CAVEIRA", "ELA", "JAGER", "KAPKAN", "LESION", "MELUSI", "MOZZIE", "ORYX", "VIGIL", "WARDEN"]
};
const DefenderForm = (props) => {
  const options = operators[props.role].map((operator, index) => {
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
