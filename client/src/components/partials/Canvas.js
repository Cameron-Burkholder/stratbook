/* client/src/components/partials/Canvas.js */

import React from "react";

import FloorSelector from "./FloorSelector.js";
import ZoomSelector from "./ZoomSelector.js";
import Pagination from "./Pagination.js";
import BlueprintForm from "./BlueprintForm.js";
import Objectives from "./Objectives.js";

const ZOOM_TOLERANCE = 0.2;

class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.updateZoom = this.updateZoom.bind(this);
    this.scrollZoom = this.scrollZoom.bind(this);
    this.toggleLabels = this.toggleLabels.bind(this);

    this.state = {
      zoom: 1,
      labels: false,
      mounted: false
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
  scrollZoom(e) {
    let newZoom = parseFloat(this.state.zoom);
    e.preventDefault();
    e.stopPropagation();
    if (e.deltaY >= 0) {
      newZoom -= ZOOM_TOLERANCE;
    } else {
      newZoom += ZOOM_TOLERANCE;
    }
    newZoom = Math.round(newZoom * 100) / 100;
    if (newZoom >= 1 && newZoom <= 3) {
      this.setState({
        zoom: newZoom
      });
    }
  }
  render() {
    let blueprintProps = {};
    let objectiveProps = {};
    if (this.props.function === "Editor") {
      blueprintProps.removeOperator = this.props.removeOperator;
      blueprintProps.removeGadget = this.props.removeGadget;
      blueprintProps.removeUtility = this.props.removeUtility;
      blueprintProps.removeDrone = this.props.removeDrone;
      blueprintProps.removeRotate = this.props.removeRotate;
      blueprintProps.removeReinforcement = this.props.removeReinforcement;
      blueprintProps.removeBreach = this.props.removeBreach;
      blueprintProps.updateOperatorPositions = this.props.updateOperatorPositions;
      blueprintProps.updateGadgetPositions = this.props.updateGadgetPositions;
      blueprintProps.updateDronePositions = this.props.updateDronePositions;
      blueprintProps.updateUtilityPositions = this.props.updateUtilityPositions;
      blueprintProps.updateRotatePositions = this.props.updateRotatePositions;
      blueprintProps.updateReinforcementPositions = this.props.updateReinforcementPositions;
      blueprintProps.updateBreachPositions = this.props.updateBreachPositions;

      objectiveProps.addObjective = this.props.addObjective;
      objectiveProps.removeObjective = this.props.removeObjective;
      objectiveProps.updateNotes = this.props.updateNotes;
      objectiveProps.updateVideo = this.props.updateVideo;
    }
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
          zoom={this.state.zoom}
          labels={this.state.labels}
          function={this.props.function}
          blueprintProps={blueprintProps}
          scrollZoom={this.scrollZoom}/>
        <div className="canvas__body">
          <Objectives objectives={this.props.objectives}
            notes={this.props.notes} scenes={this.props.scenes} sceneIndex={this.props.sceneIndex}
            video={this.props.video}
            function={this.props.function}
            {...objectiveProps}/>
        </div>
      </div>
    )
  }
}

export default Canvas;
