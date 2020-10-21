/* client/components/partials/UtilityForm.js */

import React from "react";

const utility_guide = {
  attack: {
    "OPERATOR": ["BREACH CHARGES", "CLAYMORE", "FRAG GRENADES", "HARD BREACH CHARGE", "SMOKE GRENADES", "STUN GRENADES"],
    "SLEDGE": ["FRAG GRENADES", "STUN GRENADES"],
    "THATCHER": ["BREACH CHARGES", "CLAYMORE"],
    "ASH": ["BREACH CHARGES", "STUN GRENADES"],
    "THERMITE": ["CLAYMORE", "STUN GRENADES"],
    "TWITCH": ["BREACH CHARGES", "CLAYMORE"],
    "MONTAGNE": ["HARD BREACH CHARGE", "SMOKE GRENADES"],
    "BLITZ": ["BREACH CHARGES", "SMOKE GRENADES"],
    "IQ": ["BREACH CHARGES", "CLAYMORE"],
    "GLAZ": ["FRAG GRENADES", "SMOKE GRENADES"],
    "FUZE": ["BREACH CHARGES", "HARD BREACH CHARGE"],
    "BUCK": ["CLAYMORE", "STUN GRENADES"],
    "BLACKBEARD": ["BREACH CHARGES", "STUN GRENADES"],
    "CAPITAO": ["CLAYMORE", "HARD BREACH CHARGE"],
    "HIBANA": ["BREACH CHARGES", "STUN GRENADES"],
    "JACKAL": ["CLAYMORE", "SMOKE GRENADES"],
    "YING": ["HARD BREACH CHARGE", "SMOKE GRENADES"],
    "ZOFIA": ["BREACH CHARGES", "CLAYMORE"],
    "DOKKAEBI": ["SMOKE GRENADES", "STUN GRENADES"],
    "LION": ["HARD BREACH CHARGE", "STUN GRENADES"],
    "FINKA": ["HARD BREACH CHARGE", "FRAG GRENADES"],
    "MAVERICK": ["CLAYMORE", "FRAG GRENADES"],
    "NOMAD": ["BREACH CHARGES", "STUN GRENADES"],
    "GRIDLOCK": ["BREACH CHARGES", "SMOKE GRENADES"],
    "NOKK": ["HARD BREACH CHARGE", "FRAG GRENADES"],
    "AMARU": ["HARD BREACH CHARGE", "STUN GRENADES"],
    "KALI": ["BREACH CHARGES", "CLAYMORE"],
    "IANA": ["FRAG GRENADES", "SMOKE GRENADES"],
    "ACE": ["BREACH CHARGES", "SMOKE GRENADES"],
    "ZERO": ["CLAYMORE", "FRAG GRENADES"]
  },
  defense: {
    "OPERATOR": ["BARBED WIRE", "BULLETPROOF CAMERA", "DEPLOYABLE SHIELD", "IMPACT GRENADES", "NITRO CELL", "PROXIMITY ALARMS"],
    "SMOKE": ["BARBED WIRE", "DEPLOYABLE SHIELD"],
    "MUTE": ["BULLETPROOF CAMERA", "NITRO CELL"],
    "CASTLE": ["BULLETPROOF CAMERA", "PROXIMITY ALARMS"],
    "PULSE": ["BARBED WIRE", "NITRO CELL"],
    "DOC": ["BARBED WIRE", "BULLETPROOF CAMERA"],
    "ROOK": ["IMPACT GRENADES", "PROXIMITY ALARMS"],
    "KAPKAN": ["IMPACT GRENADES", "NITRO CELL"],
    "TACHANKA": ["BARBED WIRE", "PROXIMITY ALARMS"],
    "JAGER": ["BARBED WIRE", "BULLETPROOF CAMERA"],
    "BANDIT": ["BARBED WIRE", "NITRO CELL"],
    "FROST": ["BULLETPROOF CAMERA", "DEPLOYABLE SHIELD"],
    "VALKYRIE": ["DEPLOYABLE SHIELD", "NITRO CELL"],
    "CAVEIRA": ["IMPACT GRENADES", "PROXIMITY ALARMS"],
    "ECHO": ["BARBED WIRE", "IMPACT GRENADES"],
    "MIRA": ["NITRO CELL", "PROXIMITY ALARMS"],
    "LESION": ["BULLETPROOF CAMERA", "IMPACT GRENADES"],
    "ELA": ["BARBED WIRE", "DEPLOYABLE SHIELD"],
    "VIGIL": ["BULLETPROOF CAMERA", "IMPACT GRENADES"],
    "MAESTRO": ["BARBED WIRE", "IMPACT GRENADES"],
    "ALIBI": ["DEPLOYABLE SHIELD", "IMPACT GRENADES"],
    "CLASH": ["BARBED WIRE", "IMPACT GRENADES"],
    "KAID": ["BARBED WIRE", "NITRO CELL"],
    "MOZZIE": ["BARBED WIRE", "NITRO CELL"],
    "WARDEN": ["DEPLOYABLE SHIELD", "NITRO CELL"],
    "GOYO": ["NITRO CELL", "PROXIMITY ALARMS"],
    "WAMAI": ["DEPLOYABLE SHIELD", "PROXIMITY ALARMS"],
    "ORYX": ["BARBED WIRE", "PROXIMITY ALARMS"],
    "MELUSI": ["IMPACT GRENADES", "NITRO CELL"]
  }
};

const UtilityForm = (props) => {
  const utility = props.utility.map((utility, index) => {
    const options = (props.type === "ATTACK" ? (
      utility_guide.attack[props.operators[index]].map((gadget, index) => {
        return <option key={index}>{gadget}</option>
      })
    ) : (
      utility_guide.defense[props.operators[index]].map((gadget, index) => {
        return <option key={index}>{gadget}</option>
      })
    ));
    return (
      <div className="utility-form__utility" key={index}>
        <select className="utility-form__input" onChange={(e) => { props.onChange(e, index) }} value={props.utility[index]}>
          <option>UTILITY</option>
          { options }
        </select>
      </div>
    )
  })
  return (
    <div className="utility-form">
      { utility }
    </div>
  )
}

export default UtilityForm;
