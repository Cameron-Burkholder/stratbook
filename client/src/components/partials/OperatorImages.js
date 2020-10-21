/* client/src/components/partials/OperatorForm.js */

import React from "react";

const OperatorImages = (props) => {
  const operators = props.operators.map((operator, index) => {
    return (
      <img className="operator-images__operator" alt="Operator"
      src={(operator !== "OPERATOR" ? `./media/${operator.charAt(0) + operator.slice(1).toLowerCase()}.webp` : "")}
      key={index}/>
    )
  });
  return (
    <div className="operator-images">
      { operators }
    </div>
  )
}

export default OperatorImages;
