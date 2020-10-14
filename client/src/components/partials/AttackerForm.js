/* client/components/partials/AttackerForm.js */

import React from "react";

/*
  @func: AttackerForm
  @desc: render attacker form
  @prop operators: Array
  @prop role: String
  @prop index: Int
  @prop onChange: function
*/
const roles = ["NONE", "HARD BREACH", "SOFT BREACH", "ENTRY FRAG", "AREA DENIAL/FLANK WATCH", "INTEL", "UTILITY CLEAR", "SUPPORT", "ROAM CLEAR"];
const operators = {
  "HARD BREACH": ["ACE", "HIBANA", "MAVERICK", "THERMITE"],
  "SOFT BREACH": ["ASH", "BUCK", "SLEDGE", "ZOFIA"],
  "ENTRY FRAG": ["AMARU", "ASH", "BLITZ", "FINKA", "IANA", "IQ", "MONTAGNE", "NOKK", "TWITCH", "ZOFIA"],
  "AREA DENIAL/FLANK WATCH": ["CAPITAO", "GRIDLOCK", "NOMAD", "ZERO"],
  "INTEL": ["DOKKAEBI", "IANA", "IQ", "LION", "MONTAGNE", "TWITCH", "ZERO"],
  "UTILITY CLEAR": ["ASH", "FUZE", "KALI", "MAVERICK", "SLEDGE", "THATCHER", "TWITCH"],
  "SUPPORT": ["ACE", "BLACKBEARD", "CAPITAO", "DOKKAEBI", "FINKA", "GLAZ", "IANA", "LION", "MAVERICK", "MONTAGNE", "YING", "ZERO"],
  "ROAM CLEAR": ["DOKKAEBI", "JACKAL", "LION", "NOKK", "SLEDGE", "TWITCH", "ZOFIA"]
};
const AttackerForm = (props) => {
  const options = operators[props.role].map((operator, index) => {
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
