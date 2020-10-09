/* client/src/components/partials/Operator.js */

import React from "react";

const Operator = (props) => {
  return (
    <div className="operator">
      <img className="operator__image" src={"./media/" + props.operator.toLowerCase() + ".webp"} alt={props.operator}/>
      <p className="operator__name">{props.operator}</p>
    </div>
  )
}

export default Operator;
