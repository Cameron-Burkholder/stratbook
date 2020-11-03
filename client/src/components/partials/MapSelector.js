/* client/src/components/partials/MapSelector.js */

import React from "react";
import { MAPS } from "../../data.js";

const MapSelector = (props) => {
  const options = MAPS.filter((map) => props.maps.indexOf(map) < 0).map((map, index) => {
    return <option key={index}>{map}</option>
  });
  return (
    <div className="map-selector">
      <select className="map-selector__input" onChange={props.selectMap}>
        <option>MAP</option>
        { options }
      </select>
    </div>
  )
}

export default MapSelector;
