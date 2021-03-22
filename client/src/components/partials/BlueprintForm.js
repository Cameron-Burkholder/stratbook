/* client/src/components/partials/Blueprint.js */

import React from "react";

import PositionOverlay from "./PositionOverlay.js";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../../data.js";

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

    if (!this.state.isMobile) {
      const xLowerBound = this.props.zoom * (((this.props.zoom * this.state.bounds.CANVAS_WIDTH) - this.state.bounds.CANVAS_WIDTH) / 2);
      const xUpperBound = this.props.zoom * ((this.state.bounds.CANVAS_WIDTH - (this.props.zoom * this.state.bounds.CANVAS_WIDTH)) / 2);
      const yLowerBound = this.props.zoom * (((this.props.zoom * this.state.bounds.CANVAS_HEIGHT) - this.state.bounds.CANVAS_HEIGHT) / 2);
      const yUpperBound = this.props.zoom * ((this.state.bounds.CANVAS_HEIGHT - (this.props.zoom * this.state.bounds.CANVAS_HEIGHT)) / 2);

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
    }

    if (this.state.isMobile) {
      offsetX += this.state.mobileOffset;
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
      let bounds = this.selector.current.getBoundingClientRect();
      const isMobile = (Math.abs(bounds.CANVAS_WIDTH - CANVAS_WIDTH) < 20 && Math.abs(bounds.CANVAS_HEIGHT - CANVAS_HEIGHT) < 20 ? false : true);
      bounds.CANVAS_WIDTH = CANVAS_WIDTH;
      bounds.CANVAS_HEIGHT = CANVAS_HEIGHT;
      this.setState({
        bounds: bounds,
        isMobile: isMobile
      }, () => {
        if (this.state.isMobile) {
          let bounds = this.selector.current.getBoundingClientRect();
          let mobileOffset = -((this.state.bounds.CANVAS_WIDTH / 2) - (bounds.CANVAS_WIDTH / 2));
          this.setState({
            offsetX: mobileOffset,
            mobileOffset: mobileOffset
          });
        }
      })
    }
  }
  render() {
    const url = `../../media/min/maps/${this.props.map.replace(" ", "_")}-${this.props.floor.toUpperCase().replace(" ", "_")}-min.jpg`;
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
          floorIndex={this.props.floorIndex}
          breaches={this.props.breaches}
          removeBreach={this.props.removeBreach}
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
          offsetY={this.state.offsetY}
          labels={this.props.labels}/>
      </div>
    )
  }
}

export default BlueprintForm;
