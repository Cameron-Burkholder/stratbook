/* client/src/components/partials/Blueprint.js */

import React from "react";

import ViewerPositionOverlay from "./ViewerPositionOverlay.js";

const ViewerBlueprintForm = (props) => {
  const url = `../../media/maps/${props.map.replace(" ", "_")}-${props.floor.toUpperCase().replace(" ", "_")}.png`;
  const style = {
    backgroundImage: `url(${url})`,
    backgroundPosition: "center",
    backgroundSize: "cover"
  }
  return (
    <div className="blueprint-form" style={style}>
      <ViewerPositionOverlay
        operators={props.operators}
        operatorPositions={props.operatorPositions}
        gadgets={props.gadgets}
        gadgetPositions={props.gadgetPositions}
        utility={props.utility}
        utilityPositions={props.utilityPositions}
        drones={props.drones}
        rotates={props.rotates}
        reinforcements={props.reinforcements}
        floorIndex={props.floorIndex}
        breaches={props.breaches}
        type={props.type}/>
    </div>
  )
}

export default ViewerBlueprintForm;
