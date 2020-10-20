/* client/src/components/partials/TypeSelector.js */

import React from "react";

const TypeSelector = (props) => {
  return (
    <div className="type-selector">
      <select onChange={props.updateType} className="type-selector__input" value={props.type}>
        <option>ATTACK</option>
        <option>DEFENSE</option>
      </select>
    </div>
  )
}

export default TypeSelector;
