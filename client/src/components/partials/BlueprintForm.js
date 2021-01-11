/* client/src/components/partials/Blueprint.js */

import React from "react";

import PositionOverlay from "./PositionOverlay.js";

const width = 900;
const height = 675;

class BlueprintForm extends React.Component {
  constructor(props) {
    super(props);

    this.onDragStart = this.onDragStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDragStop = this.onDragStop.bind(this);

    this.selector = React.createRef();

    this.state = {
      offsetX: 0,
      offsetY: 0
    };
  }
  onDragStart(e) {
    this.setState({
      startX: e.clientX,
      startY: e.clientY,
      move: true
    }, () => {
      document.addEventListener("mousemove", this.onDrag);
      document.addEventListener("mouseup", this.onDragStop);
    });
  }
  onDrag(e) {
    this.setState({
      offsetX: e.clientX - this.state.startX,
      offsetY: e.clientY - this.state.startY
    });
  }
  onDragStop(e) {
    document.removeEventListener("mousemove", this.onDrag);
    document.removeEventListener("mouseup", this.onDragStop);
  }
  componentDidMount() {
    if (!this.state.bounds) {
      this.setState({
        bounds: this.selector.current.getBoundingClientRect()
      })
    }
  }
  render() {
    const url = `../../media/maps/${this.props.map.replace(" ", "_")}-${this.props.floor.toUpperCase().replace(" ", "_")}-min.jpg`;
    const style = {
      backgroundImage: `url(${url})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      transform: `scale(${parseFloat(this.props.zoom)}) translate(${this.state.offsetX}px, ${this.state.offsetY}px)`
    };
    return (
      <div className="blueprint-form" ref={this.selector}>
        <PositionOverlay
          style={style}
          operators={this.props.operators}
          operatorPositions={this.props.operatorPositions}
          gadgets={this.props.gadgets}
          gadgetPositions={this.props.gadgetPositions}
          utility={this.props.utility}
          utilityPositions={this.props.utilityPositions}
          drones={this.props.drones}
          rotates={this.props.rotates}
          reinforcements={this.props.reinforcements}
          floorIndex={this.props.floorIndex}
          breaches={this.props.breaches}
          updateOperatorPositions={this.props.updateOperatorPositions}
          updateGadgetPositions={this.props.updateGadgetPositions}
          updateDronePositions={this.props.updateDronePositions}
          updateUtilityPositions={this.props.updateUtilityPositions}
          updateRotatePositions={this.props.updateRotatePositions}
          updateReinforcementPositions={this.props.updateReinforcementPositions}
          updateBreachPositions={this.props.updateBreachPositions}
          type={this.props.type}
          zoom={this.props.zoom}
          bounds={this.state.bounds}
          onDragStart={this.onDragStart}
          offsetX={this.state.offsetX}
          offsetY={this.state.offsetY}/>
      </div>
    )
  }
}

export default BlueprintForm;
