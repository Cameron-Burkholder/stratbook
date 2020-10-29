/* client/src/components/partials/Blueprint.js */

import React from "react";

import PositionOverlay from "./PositionOverlay.js";

const BlueprintForm = (props) => {
    const url = `../media/${props.map.replace(" ", "_")}-${props.floor.toUpperCase().replace(" ", "_")}.jpg`;
    const style = {
      backgroundImage: `url(${url})`,
      backgroundPosition: "center",
      backgroundSize: "cover"
    }
    return (
      <div className="blueprint-form" style={style}>
        <PositionOverlay type="OPERATOR" updatePositions={props.updateOperatorPositions}
            names={props.operators} positions={props.operatorPositions}
            floorIndex={props.floorIndex}/>
        <PositionOverlay type="DRONE" updatePositions={props.updateDronePositions}
            positions={props.drones}
            floorIndex={props.floorIndex}/>
      </div>
    )
}

export default BlueprintForm;
