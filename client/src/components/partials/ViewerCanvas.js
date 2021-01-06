/* client/src/components/partials/ViewerCanvas.js */

import React from "react";

import FloorSelector from "./FloorSelector.js";
import ViewerBlueprintForm from "./BlueprintForm.js";

class ViewerCanvas extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="canvas">
        <div className="canvas__controls">
          <FloorSelector onChange={this.props.updateFloor} floors={this.props.floors} floor={this.props.floor}/>
        </div>
        <ViewerBlueprintForm type={this.props.type}
          operators={this.props.operators}
          operatorPositions={this.props.operatorPositions}
          gadgets={this.props.gadgets}
          gadgetPositions={this.props.gadgetPositions}
          utility={this.props.utility}
          utilityPositions={this.props.utilityPositions}
          drones={this.props.drones}
          rotates={this.props.rotates}
          reinforcements={this.props.reinforcements}
          map={this.props.map} site={this.props.site} floorIndex={this.props.floorIndex}
          breaches={this.props.breaches}
          floor={this.props.floor}
          />
        <div className="canvas__body">
          <h3>Objectives</h3>
          <ul>
            <li>DO first things first</li>
            <li>Get wall open</li>
            <li>Plan</li>
          </ul>
          <h3>Notes</h3>
          <p></p>
        </div>
      </div>
    )
  }
}

export default ViewerCanvas;
