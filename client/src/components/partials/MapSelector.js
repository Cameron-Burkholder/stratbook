/* client/src/components/partials/MapSelector.js */

import React from "react";

const MAPS = ["BANK", "BORDER", "CHALET", "CLUBHOUSE", "COASTLINE", "CONSULATE", "KAFE DOSTOYEVSKY", "KANAL", "OREGON", "OUTBACK", "THEME PARK", "VILLA"];
const MapSelector = (props) => {
  const options = MAPS.filter((map) => props.maps.indexOf(map) < 0).map((map, index) => {
    return <option key={index}>{map}</option>
  });
  return (
    <div className="map-selector">
      <select className="map-selector__input" onChange={props.selectMap}>
        <option></option>
        { options }
      </select>
    </div>
  )
}

export default MapSelector;
