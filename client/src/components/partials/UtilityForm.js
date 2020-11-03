/* client/components/partials/UtilityForm.js */

import React from "react";
import { UTILITY } from "../../data.js";

const utility_guide = UTILITY;

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
