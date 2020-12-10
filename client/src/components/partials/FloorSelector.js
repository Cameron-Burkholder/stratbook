/* client/src/components/partials/FloorSelector.js */

import React from "react";

const FloorSelector = (props) => {
  const options = props.floors.map((floor, index) => {
    return <option key={index}>{floor}</option>
  })
  return (
    <select onChange={props.onChange} className="form__select" value={props.floor}>
      {options}
    </select>
  )
}

export default FloorSelector;
