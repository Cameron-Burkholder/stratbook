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
      positions: this.props.positions
    }
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
    let width = 60;
    let height = 60;
    let newPositions = [...this.state.positions];
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
    this.setState({
      positions: newPositions
    });
  }
  onMouseUp(e) {
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("mouseup", this.onMouseUp);
    this.setState({
      drag: false
    }, () => {
      this.props.updatePositions(this.state.positions);
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
    let items = [];
    this.state.positions.map((pos, index) => {
      if (this.state.positions[index].floor === this.props.floorIndex) {
        let url;
        if (this.props.type === "OPERATOR") {
          url = `https://cdn.r6stats.com/badges/${this.props.names[index].toLowerCase()}_badge.png`;
        } else if (this.props.type === "GADGET") {

        } else if (this.props.type === "UTILITY") {

        } else if (this.props.type === "DRONE") {
          url = "https://external-preview.redd.it/mYPEnvxN9kDjubOi6dDM6IO1Z5Ando9V8Vzi1VS2qnM.png?auto=webp&s=0a1d4f3a875a6fc968ec22e68c9a7d868b342281";
        } else if (this.props.type === "ROTATE") {

        } else if (this.props.type === "REINFORCEMENT") {

        }
        items.push(
          <DragItem url={url}
            x={this.state.positions[index].x} y={this.state.positions[index].y}
            selectElement={this.selectElement} type={this.props.type} index={index} key={index} drag={this.state.drag}/>
        )
      }
    });
    return (
      <div className="position-overlay" ref={this.selector}>
        { items }
      </div>
    )
  }
}

export default PositionOverlay;
