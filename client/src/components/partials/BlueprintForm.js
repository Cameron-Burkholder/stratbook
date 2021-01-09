/* client/src/components/partials/Blueprint.js */

import React from "react";

import PositionOverlay from "./PositionOverlay.js";

const width = 900;
const height = 675;

const BlueprintForm = (props) => {
  const url = `../../media/maps/${props.map.replace(" ", "_")}-${props.floor.toUpperCase().replace(" ", "_")}-min.jpg`;
  const style = {
    backgroundImage: `url(${url})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    transform: `scale(${parseFloat(props.zoom)}) translate(${(props.zoom * width - width) / 2}px, ${(props.zoom * height - height) / 2}px)`
  }
  console.log(style);
  return (
    <div className="blueprint-form">
      <PositionOverlay
        style={style}
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
        updateOperatorPositions={props.updateOperatorPositions}
        updateGadgetPositions={props.updateGadgetPositions}
        updateDronePositions={props.updateDronePositions}
        updateUtilityPositions={props.updateUtilityPositions}
        updateRotatePositions={props.updateRotatePositions}
        updateReinforcementPositions={props.updateReinforcementPositions}
        updateBreachPositions={props.updateBreachPositions}
        type={props.type}
        zoom={props.zoom}/>
    </div>
  )
}

export default BlueprintForm;
