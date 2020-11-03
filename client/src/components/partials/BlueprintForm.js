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
        <PositionOverlay
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
          updateOperatorPositions={props.updateOperatorPositions}
          updateGadgetPositions={props.updateGadgetPositions}
          updateDronePositions={props.updateDronePositions}
          updateUtilityPositions={props.updateUtilityPositions}
          updateRotatePositions={props.updateRotatePositions}
          updateReinforcementPositions={props.updateReinforcementPositions}
          type={props.type}/>
      </div>
    )
}

export default BlueprintForm;
