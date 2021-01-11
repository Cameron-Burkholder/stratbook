/* client/src/components/partials/Blueprint.js */

import React from "react";

import PositionOverlay from "./PositionOverlay.js";

const width = 900;
const height = 675;

class BlueprintForm extends React.Component {
  constructor(props) {
    super(props);

    this.onDragStart = this.onDragStart.bind(this);
    this.onDragTouch = this.onDragTouch.bind(this);
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
  onDragTouch(t) {
    this.setState({
      startX: t.touches[0].clientX,
      startY: t.touches[0].clientY,
      move: true
    }, () => {
      console.log(this.state);
      document.addEventListener("touchmove", this.onDrag);
      document.addEventListener("touchend", this.onDragStop);
    })
  }
  onDrag(e) {
    let offsetX = e.clientX - this.state.startX;
    let offsetY = e.clientY - this.state.startY;
    if (e.touches) {
      offsetX = e.touches[0].clientX - this.state.startX;
      offsetY = e.touches[0].clientY - this.state.startY;
    }
    const xLowerBound = this.props.zoom * (((this.props.zoom * this.state.bounds.width) - this.state.bounds.width) / 2);
    const xUpperBound = this.props.zoom * ((this.state.bounds.width - (this.props.zoom * this.state.bounds.width)) / 2);
    const yLowerBound = this.props.zoom * (((this.props.zoom * this.state.bounds.height) - this.state.bounds.height) / 2);
    const yUpperBound = this.props.zoom * ((this.state.bounds.height - (this.props.zoom * this.state.bounds.height)) / 2);

    if (offsetX > xLowerBound) {
      offsetX = xLowerBound;
    }
    if (offsetX < xUpperBound) {
      offsetX = xUpperBound;
    }

    if (offsetY > yLowerBound) {
      offsetY = yLowerBound;
    }
    if (offsetY < yUpperBound) {
      offsetY = yUpperBound;
    }

    this.setState({
      offsetX: offsetX,
      offsetY: offsetY
    });
  }
  onDragStop(e) {
    document.removeEventListener("mousemove", this.onDrag);
    document.removeEventListener("mouseup", this.onDragStop);
    document.removeEventListener("touchmove", this.onDrag);
    document.addEventListener("touchend", this.onDragStop);
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
          onDragTouch={this.onDragTouch}
          offsetX={this.state.offsetX}
          offsetY={this.state.offsetY}/>
      </div>
    )
  }
}

export default BlueprintForm;
