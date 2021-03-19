/* client/src/components/partials/Canvas.js */

import React from "react";

import FloorSelector from "./FloorSelector.js";
import ZoomSelector from "./ZoomSelector.js";
import Pagination from "./Pagination.js";
import BlueprintForm from "./BlueprintForm.js";
import Objectives from "./Objectives.js";

class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.updateZoom = this.updateZoom.bind(this);
    this.toggleLabels = this.toggleLabels.bind(this);

    this.state = {
      zoom: 1,
      labels: false
    }
  }
  toggleLabels() {
    this.setState({
      labels: !this.state.labels
    })
  }
  updateZoom(e) {
    this.setState({
      zoom: e.target.value
    });
  }
  render() {
    return (
      <div className="canvas">
        <div className="canvas__controls">
          <FloorSelector onChange={this.props.updateFloor} floors={this.props.floors} floor={this.props.floor}/>
          <ZoomSelector onChange={this.updateZoom} zoom={this.state.zoom}/>
          <div className="labels">
            <span>Show Labels</span>
            <input type="checkbox" onChange={this.toggleLabels} checked={this.state.labels}/>
          </div>
          <Pagination onChange={this.props.selectScene} index={this.props.sceneIndex} labels={this.props.scenes}
            activeLabel={this.props.scenes[this.props.sceneIndex].name}/>
        </div>
        <BlueprintForm type={this.props.type}
          operators={this.props.operators}
          operatorPositions={this.props.operatorPositions}
          removeOperator={this.props.removeOperator}
          gadgets={this.props.gadgets}
          gadgetPositions={this.props.gadgetPositions}
          removeGadget={this.props.removeGadget}
          utility={this.props.utility}
          utilityPositions={this.props.utilityPositions}
          removeUtility={this.props.removeUtility}
          drones={this.props.drones}
          removeDrone={this.props.removeDrone}
          rotates={this.props.rotates}
          removeRotate={this.props.removeRotate}
          reinforcements={this.props.reinforcements}
          removeReinforcement={this.props.removeReinforcement}
          map={this.props.map} site={this.props.site} floorIndex={this.props.floorIndex}
          breaches={this.props.breaches}
          removeBreach={this.props.removeBreach}
          floor={this.props.floor}
          updateOperatorPositions={this.props.updateOperatorPositions}
          updateGadgetPositions={this.props.updateGadgetPositions}
          updateDronePositions={this.props.updateDronePositions}
          updateUtilityPositions={this.props.updateUtilityPositions}
          updateRotatePositions={this.props.updateRotatePositions}
          updateReinforcementPositions={this.props.updateReinforcementPositions}
          updateBreachPositions={this.props.updateBreachPositions}
          zoom={this.state.zoom}
          labels={this.state.labels}/>
        <div className="canvas__body">
          <Objectives objectives={this.props.objectives} addObjective={this.props.addObjective} removeObjective={this.props.removeObjective}
            notes={this.props.notes} updateNotes={this.props.updateNotes} scenes={this.props.scenes} sceneIndex={this.props.sceneIndex}
            video={this.props.video} updateVideo={this.props.updateVideo}/>
        </div>
      </div>
    )
  }
}

export default Canvas;
