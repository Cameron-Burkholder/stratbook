/* client/src/components/partials/MapSelector.js */

import React from "react";
import { MAPS } from "../../data.js";

const MapSelector = (props) => {
  const maps = MAPS.filter((map) => props.maps.indexOf(map) < 0).map((map, index) => {
    return (
      <div className="map-option" onClick={() => { props.selectMap(map) }} key={index}>
        <img className="map-option__image" src="" alt="Map Option"/>
        <h4 className="map-option__title">{map}</h4>
      </div>
    )
  });
  return (
    <div className="map-selector">
      <h3>Select a Map to Add to your Stratbook</h3>
      { maps }
    </div>
  )
}

export default MapSelector;
