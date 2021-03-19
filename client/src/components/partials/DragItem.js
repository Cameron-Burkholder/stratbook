/* client/src/components/partials/DragItem.js */

import React from "react";
import r6operators from "r6operators";

class DragItem extends React.Component {
  constructor(props) {
    super(props);

    this.removeItem = this.removeItem.bind(this);

    this.state = {
      drag: false,
      x: this.props.x,
      y: this.props.y,
      selected: (this.props.selected && (this.props.type === this.props.selected.type) && (this.props.index === this.props.selected.index) && (!this.props.selected.gi || this.props.selected.gi && this.props.gi === this.props.selected.gi))
    }
  }
  removeItem() {
    if (this.props.type === "OPERATOR") {
      this.props.removeOperator(this.props.index);
    }
    if (this.props.type === "GADGET") {
      this.props.removeGadget(this.props.index, this.props.gi);
    }
    if (this.props.type === "UTILITY") {
      this.props.removeUtility(this.props.index, this.props.gi);
    }
    if (this.props.type === "DRONE") {
      this.props.removeDrone(this.props.index);
    }
    if (this.props.type === "BREACH") {
      this.props.removeBreach(this.props.index);
    }
    if (this.props.type === "REINFORCEMENT") {
      this.props.removeReinforcement(this.props.index);
    }
    if (this.props.type === "ROTATE") {
      this.props.removeRotate(this.props.index);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    let selected = this.props.selected && (this.props.type === this.props.selected.type) && (this.props.index === this.props.selected.index) && (!this.props.selected.gi || this.props.selected.gi && this.props.gi === this.props.selected.gi);
    if (this.state.selected !== selected) {
      this.setState({
        selected: selected
      });
    }
  }
  render() {
    return (
      <div style={{ top: (this.props.y ? this.props.y : 0), left: (this.props.x ? this.props.x : 0), backgroundImage: `url(${this.props.url})`, backgroundSize: "cover", backgroundPosition: "center" }}
      className={"drag-item" + ` drag-${this.props.type.toLowerCase()}` + (this.props.drag ? " drag" : "") + (this.state.selected ? " drag-item--selected" : "")}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();

        }}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          this.setState({
            drag: true
          }, () => {
            if (this.props.type === "GADGET") {
              this.props.selectElement(this.props.index, this.props.type, this.props.gi);
            } else if (this.props.type === "UTILITY") {
              this.props.selectElement(this.props.index, this.props.type, this.props.gi);
            } else {
              this.props.selectElement(this.props.index, this.props.type);
            }
          });
        }}
        onTouchStart={(e) => {
          e.preventDefault();
          e.stopPropagation();
          this.setState({
            drag: true
          }, () => {
            if (this.props.type === "GADGET") {
              this.props.selectElement(this.props.index, this.props.type, this.props.gi);
            } else if (this.props.type === "UTILITY") {
              this.props.selectElement(this.props.index, this.props.type, this.props.gi);
            } else {
              this.props.selectElement(this.props.index, this.props.type);
            }
          })
        }}
        data-type={this.props.type}>
        { this.props.labels ? (
          <span>{(this.props.type === "GADGET" || this.props.type === "UTILITY" || this.props.type === "OPERATOR" ? this.props.value.replace("_", " ").replace("_", " ").toUpperCase() : "")}</span>
        ) : ""}
        { this.state.selected ? (
          <button className="drag-item__button" onClick={this.removeItem}>X</button>
        ) : ""}
      </div>
    )
  }
}

export default DragItem;
