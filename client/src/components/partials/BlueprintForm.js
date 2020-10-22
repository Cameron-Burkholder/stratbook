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
      index: 0
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
    let width = 100;
    let height = 100;
    let elements = [...this.props.operatorPositions];
    let newX = e.pageX - (width / 2);
    let newY = e.pageY - height;
    if (newX < this.state.bounds.left) {
      newX = this.state.bounds.left - this.state.bounds.x;
    } else if (newX> this.state.bounds.right - width - this.state.bounds.x) {
      newX = this.state.bounds.right - width - this.state.bounds.x;
    }
    if (newY < this.state.bounds.top - this.state.bounds.y) {
      newY = this.state.bounds.top - this.state.bounds.y;
    } else if (newY > this.state.bounds.bottom - height - this.state.bounds.y) {
      newY = this.state.bounds.bottom - height - this.state.bounds.y;
    }
    elements[this.state.index].x = newX;
    elements[this.state.index].y = newY;
    this.props.updatePositions(elements);
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
    const operators = this.props.operatorPositions.map((op, index) => {
      return <DragItem name={this.props.operators[index]} x={op.x} y={op.y} key={index} index={index}
               selectElement={this.selectElement} drag={index === this.state.index && this.state.drag}/>
    });
    const url = `../media/${this.props.map.replace(" ", "_")}-${this.props.floor.toUpperCase().replace(" ", "_")}.jpg`;
    const style = {
      backgroundImage: `url(${url})`,
      backgroundPosition: "center",
      backgroundSize: "cover"
    }
    return (
      <div className="blueprint-form" ref={this.selector} style={style}>
        { operators }
      </div>
    )
  }
}

export default BlueprintForm;
