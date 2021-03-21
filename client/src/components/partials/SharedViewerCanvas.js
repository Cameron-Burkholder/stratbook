/* client/src/components/partials/SharedViewerCanvas.js */

import React from "react";

import FloorSelector from "./FloorSelector.js";
import ZoomSelector from "./ZoomSelector.js";
import Pagination from "./Pagination.js";
import ViewerBlueprintForm from "./ViewerBlueprintForm.js";
import ViewerObjectives from "./ViewerObjectives.js";

class SharedViewerCanvas extends React.Component {
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
          zoom={this.state.zoom}
          labels={this.state.labels}/>
        <div className="canvas__body">
          <ViewerObjectives objectives={this.props.objectives}
            notes={this.props.notes} scenes={this.props.scenes} sceneIndex={this.props.sceneIndex}
            video={this.props.video}/>
        </div>
      </div>
    )
  }
}

export default SharedViewerCanvas;
