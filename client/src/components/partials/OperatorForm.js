/* client/src/components/partials/OperatorForm.js */

import React from "react";

const OperatorForm = (props) => {
  const roles = (props.type === "ATTACK" ? (
    ["OPERATOR", "HARD BREACH", "SOFT BREACH", "INTEL", "AREA DENIAL/FLANK WATCH", "UTILITY CLEAR", "SUPPORT", "ENTRY FRAG"]
  ) : (
    ["OPERATOR", "HARD BREACH DENIAL", "INTEL DENIAL", "INTEL", "AREA DENIAL", "TRAPS", "UTILITY SOAK", "SUPPORT", "ROAM"]
  ));
  const operators = (props.type === "ATTACK" ? (
    {
      "HARD BREACH": ["ACE", "HIBANA", "MAVERICK", "THERMITE"],
      "SOFT BREACH": ["ASH", "BUCK", "SLEDGE", "ZOFIA"],
      "ENTRY FRAG": ["AMARU", "ASH", "BLITZ", "FINKA", "IANA", "IQ", "MONTAGNE", "NOKK", "TWITCH", "ZOFIA"],
      "AREA DENIAL/FLANK WATCH": ["CAPITAO", "GRIDLOCK", "NOMAD", "ZERO"],
      "INTEL": ["DOKKAEBI", "IANA", "IQ", "LION", "MONTAGNE", "TWITCH", "ZERO"],
      "UTILITY CLEAR": ["ASH", "FUZE", "KALI", "MAVERICK", "SLEDGE", "THATCHER", "TWITCH"],
      "SUPPORT": ["ACE", "BLACKBEARD", "CAPITAO", "DOKKAEBI", "FINKA", "GLAZ", "IANA", "LION", "MAVERICK", "MONTAGNE", "YING", "ZERO"],
      "ROAM CLEAR": ["DOKKAEBI", "JACKAL", "LION", "NOKK", "SLEDGE", "TWITCH", "ZOFIA"]
    }
  ) : (
    {
      "HARD BREACH DENIAL": ["BANDIT", "KAID", "MUTE"],
      "INTEL DENIAL": ["MOZZIE", "MUTE", "VIGIL"],
      "INTEL": ["ECHO", "MAESTRO", "MIRA", "MOZZIE", "PULSE", "VALKYRIE"],
      "AREA DENIAL": ["CLASH", "GOYO", "LESION", "MELUSI", "MIRA", "SMOKE", "TACHANKA"],
      "TRAPS": ["ELA", "FROST", "KAPKAN", "LESION", "MELUSI"],
      "UTILITY SOAK": ["CASTLE", "GOYO", "JAGER", "WAMAI"],
      "SUPPORT": ["CLASH", "DOC", "ECHO", "GOYO", "JAGER", "MAESTRO", "MIRA", "PULSE", "ROOK", "TACHANKA", "VALKYRIE", "WARDEN"],
      "ROAM": ["ALIBI", "BANDIT", "CAVEIRA", "ELA", "JAGER", "KAPKAN", "LESION", "MELUSI", "MOZZIE", "ORYX", "VIGIL", "WARDEN"]
    }
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
