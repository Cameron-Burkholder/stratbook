/* client/src/components/partials/PositionOverlay.js */

import React from "react";

import DragItem from "./DragItem.js";

class PositionOverlay extends React.Component {
  constructor(props) {
    super(props);

    this.selectElement = this.selectElement.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.selector = React.createRef();

    this.state = {
      index: 0,
      type: "",
      operatorPositions: this.props.operatorPositions,
      gadgetPositions: this.props.gadgetPositions,
      utilityPositions: this.props.utilityPositions,
      drones: this.props.drones,
      rotates: this.props.rotates,
      reinforcements: this.props.reinforcements
    }
  }
  selectElement(index, type) {
    this.setState({
      index: index,
      drag: true,
      type: type
    }, () => {
      document.addEventListener("mousemove", this.onMouseMove);
      document.addEventListener("mouseup", this.onMouseUp);
    });
  }
  onMouseMove(e) {
    let width = 60;
    let height = 60;
    let newPositions;
    switch (this.state.type) {
      case "OPERATOR":
        newPositions = [...this.state.operatorPositions];
        break;
      case "DRONE":
        newPositions = [...this.state.drones];
        break;
    }
    let newX = e.pageX - this.state.bounds.left - (width / 2);
    let newY = e.pageY - this.state.bounds.top - (height);
    if (newX < 0) {
      newX = 0;
    } else if (newX > this.state.bounds.width - width) {
      newX = this.state.bounds.width - width;
    }
    if (newY < 0) {
      newY = 0;
    } else if (newY > this.state.bounds.height - height) {
      newY = this.state.bounds.height - height;
    }
    newPositions[this.state.index].x = newX;
    newPositions[this.state.index].y = newY;
    switch (this.state.type) {
      case "OPERATOR":
        this.setState({
          operatorPositions: newPositions
        });
        break;
      case "DRONE":
        this.setState({
          drones: newPositions
        });
    }
  }
  onMouseUp(e) {
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("mouseup", this.onMouseUp);
    this.setState({
      drag: false
    }, () => {
      switch (this.state.type) {
        case "OPERATOR":
          this.props.updateOperatorPositions(this.state.operatorPositions);
          break;
        case "DRONE":
          this.props.updateDronePositions(this.state.drones);
          break;
      }
      this.setState({
        type: undefined
      });
    });
  }
  componentDidMount() {
    if (!this.state.bounds) {
      this.setState({
        bounds: this.selector.current.getBoundingClientRect()
      })
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.positions !== this.props.positions) {
      this.setState({
        positions: this.props.positions
      });
    }
  }
  render() {
    const operators = this.state.operatorPositions.map((pos, index) => {
      if (pos.floor === this.props.floorIndex) {
        let url = `https://cdn.r6stats.com/badges/${this.props.operators[index].toLowerCase()}_badge.png`;
        return (
          <DragItem url={url}
            x={pos.x} y={pos.y}
            selectElement={this.selectElement} index={index} key={index} drag={this.state.drag}
            type="OPERATOR"/>
        )
      } else {
        return "";
      }
    });
    const drones = this.state.drones.map((pos, index) => {
      if (pos.floor === this.props.floorIndex) {
        let url = "https://external-preview.redd.it/mYPEnvxN9kDjubOi6dDM6IO1Z5Ando9V8Vzi1VS2qnM.png?auto=webp&s=0a1d4f3a875a6fc968ec22e68c9a7d868b342281";
        return (
          <DragItem url={url}
            x={pos.x} y={pos.y}
            selectElement={this.selectElement} index={index} key={index} drag={this.state.drag}
            type="DRONE"/>
        )
      } else {
        return "";
      }
    });
    return (
      <div className="position-overlay" ref={this.selector}>
        { operators }
        { drones }
      </div>
    )
  }
}

export default PositionOverlay;
