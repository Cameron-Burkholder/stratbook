/* client/src/components/partials/Blueprint.js */

import React from "react";

import DragItem from "./DragItem.js";

class BlueprintForm extends React.Component {
  constructor(props) {
    super(props);

    this.selectElement = this.selectElement.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.state = {
      index: 0,
      operators: this.props.operatorPositions,
      gadgets: this.props.gadgetPositions,
      utility: this.props.utilityPositions,
      drones: this.props.drones,
      rotates: this.props.rotates,
      reinforcements: this.props.reinforcements
    }
    this.selector = React.createRef();
  }
  selectElement(index) {
    this.setState({
      index: index,
      drag: true
    }, () => {
      document.addEventListener("mousemove", this.onMouseMove);
      document.addEventListener("mouseup", this.onMouseUp);
    });
  }
  onMouseMove(e) {
    let width = 50;
    let height = 50;
    let newPositions = [...this.props.operatorPositions];
    let newX = e.pageX - this.state.bounds.left - (width / 2);
    let newY = e.pageY - this.state.bounds.top - (height / 2);
    if (newX < this.state.bounds.left) {
      newX = this.state.bounds.left;
    } else if (newX > this.state.bounds.right - width) {
      newX = this.state.bounds.right - width;
    }
    if (newY < 0) {
      console.log("this");
      newY = 0;
    } else if (newY > this.state.bounds.bottom - height) {
      console.log("that");
      newY = this.state.bounds.bottom - height;
    }
    newPositions[this.state.index].x = newX;
    newPositions[this.state.index].y = newY;
    console.log(e);
    console.log(this.state);
    console.log(newPositions);
    console.log("");
    if (e.target.classList.contains("DRAG-OPERATOR")) {
      this.setState({
        operators: newPositions
      });
    } else if (e.target.classList.contains("DRAG-GADGET")) {
      this.props.updateGadgetPositions(newPositions);
    } else if (e.target.classList.contains("DRAG-UTILITY")) {
      this.props.updateUtilityPositions(newPositions);
    } else if (e.target.classList.contains("DRAG-DRONE")) {
      this.props.updateDronePositions(newPositions);
    } else if (e.target.classList.contains("DRAG-ROTATE")) {
      this.props.updateRotatePositions(newPositions);
    } else if (e.target.classList.contains("DRAG-REINFORCEMENT")) {
      this.props.updateReinforcementPositions(newPositions);
    }
  }
  onMouseUp(e) {
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("mouseup", this.onMouseUp);
    this.setState({
      drag: false
    });
  }
  componentDidMount() {
    if (!this.state.bounds) {
      this.setState({
        bounds: this.selector.current.getBoundingClientRect()
      })
    }
  }
  render() {
    let operators = [];
    this.props.operators.map((operator, index) => {
      if (this.state.operators[index].floor === this.props.floorIndex) {
        operators.push(<DragItem url={`https://cdn.r6stats.com/badges/${operator.toLowerCase()}_badge.png`}
                  x={this.state.operators[index].x} y={this.state.operators[index].y}
                  selectElement={this.selectElement} type="OPERATOR" index={index}/>);
      }
    });
    let drones = "";
    let rotates = "";
    let reinforcements = "";
    let utility = "";
    let gadgets = "";
    const url = `../media/${this.props.map.replace(" ", "_")}-${this.props.floor.toUpperCase().replace(" ", "_")}.jpg`;
    const style = {
      backgroundImage: `url(${url})`,
      backgroundPosition: "center",
      backgroundSize: "cover"
    }
    return (
      <div className="blueprint-form" ref={this.selector} style={style}>
        { operators }
        { drones }
        { rotates }
        { reinforcements }
        { utility }
        { gadgets }
      </div>
    )
  }
}

export default BlueprintForm;
