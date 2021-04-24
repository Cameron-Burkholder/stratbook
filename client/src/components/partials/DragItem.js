/* client/src/components/partials/DragItem.js */

import React from "react";

let width = 30;
let height = 30;

class DragItem extends React.Component {
  constructor(props) {
    super(props);

    // Setup/remove callbacks
    this.setCallbacks = this.setCallbacks.bind(this);

    // Handle drag/touch
    this.removeItem = this.removeItem.bind(this);
    this.translateElement = this.translateElement.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);

    this.state = {
      drag: false,
      x: this.props.x,
      y: this.props.y,
      floor: this.props.floor,
      selected: (this.props.selected && (this.props.type === this.props.selected.type) && (this.props.index === this.props.selected.index) && (!this.props.selected.gi || this.props.selected.gi && this.props.gi === this.props.selected.gi))
    }
  }
  setCallbacks() {
    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("mouseup", this.onMouseUp);
    document.addEventListener("touchmove", this.onTouchMove);
    document.addEventListener("touchend", this.onMouseUp);
    document.addEventListener("keydown", this.translateElement);
  }
  translateElement(e) {
    if (37 <= e.keyCode <= 40) {
      e.preventDefault();

      let newX;
      let newY;

      if (e.keyCode === 37) {
        newX -= 2;
      } else if (e.keyCode === 38) {
        newY -= 2;
      } else if (e.keyCode === 39) {
        newX += 2;
      } else if (e.keyCode === 40) {
        newY += 2;
      } else {
        return this.props.deselectElement();
      }

      this.setState({
        x: newX,
        y: newY
      });
    }
  }
  onMouseMove(e) {

    let newX = e.pageX - (this.props.bounds.left);
    let newY = e.pageY - (this.props.bounds.top);

    if (this.props.zoom > 1) {
      const centerX = this.props.bounds.width / 2;
      const centerY = this.props.bounds.height / 2;
      if (newX > centerX) {
        newX = (centerX / this.props.zoom) + ((newX - centerX) / this.props.zoom);
      } else {
        newX = (centerX / this.props.zoom) - ((centerX - newX) / this.props.zoom);
      }

      if (newY > centerY) {
        newY = (centerY / this.props.zoom) + ((newY - centerY) / this.props.zoom);
      } else {
        newY = (centerY / this.props.zoom) - ((centerY - newY) / this.props.zoom);
      }
    }

    newX -= ((width) / 2);
    newY -= ((height) / 2);

    if (newX < 0) {
      newX = 0;
    } else if (newX > this.props.parentBounds.width - width) {
      newX = this.props.parentBounds.width - width;
    } else if (newY < 0) {
      newY = 0;
    } else if (newY > this.props.parentBounds.height - height) {
      newY = this.props.parentBounds.height - height;
    }

    this.setState({
      x: newX,
      y: newY
    });
  }
  onTouchMove(t) {

    let newX = t.touches[0].pageX - this.props.bounds.left;
    let newY = t.touches[0].pageY - this.props.bounds.top;

    if (this.props.zoom > 1) {
      const centerX = this.props.bounds.width / 2;
      const centerY = this.props.bounds.height / 2;
      if (newX > centerX) {
        newX = (centerX / this.props.zoom) + ((newX - centerX) / this.props.zoom);
      } else {
        newX = (centerX / this.props.zoom) - ((centerX - newX) / this.props.zoom);
      }

      if (newY > centerY) {
        newY = (centerY / this.props.zoom) + ((newY - centerY) / this.props.zoom);
      } else {
        newY = (centerY / this.props.zoom) - ((centerY - newY) / this.props.zoom);
      }
    }

    newX -= ((width) / 2);
    newY -= ((height) / 2);

    if (newX < 0) {
      newX = 0;
    } else if (newX > this.props.parentBounds.width - width) {
      newX = this.props.parentBounds.width - width;
    }
    if (newY < 0) {
      newY = 0;
    } else if (newY > this.props.parentBounds.height - height) {
      newY = this.props.parentBounds.height - height;
    }

    this.setState({
      x: newX,
      y: newY
    });
  }
  onMouseUp(e) {
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("mouseup", this.onMouseUp);
    document.removeEventListener("touchmove", this.onTouchMove);
    document.removeEventListener("touchend", this.onMouseUp);
    this.setState({
      drag: false
    }, () => {
      let position = {
        x: this.state.x,
        y: this.state.y,
        floor: this.state.floor
      };
      switch (this.props.type) {
        case "OPERATOR":
          this.props.updateOperatorPositions(this.props.index, position);
          break;
        case "DRONE":
          this.props.updateDronePositions(this.props.index, position);
          break;
        case "GADGET":
          this.props.updateGadgetPositions(this.props.index, this.props.gi, position);
          break;
        case "UTILITY":
          this.props.updateUtilityPositions(this.props.index, this.props.gi, position);
          break;
        case "ROTATE":
          this.props.updateRotatePositions(this.props.index, position);
          break;
        case "REINFORCEMENT":
          this.props.updateReinforcementPositions(this.props.index, position);
          break;
        case "BREACH":
          this.props.updateBreachPositions(this.props.index, position);
          break;
      }
      this.props.deselectElement();
    });
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
    this.props.deselectElement();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      let selected = false;
      if (this.props.selected && this.props.type === this.props.selected.type && this.props.index === this.props.selected.index) {
        if (typeof(this.props.selected.gi) !== "undefined") {
          if (this.props.gi === this.props.selected.gi) {
            selected = true;
          }
        } else {
          selected = true;
        }
      }
      this.setState({
        selected: selected,
        x: this.props.x,
        y: this.props.y
      });
    }
  }
  render() {
    return (
      <div style={{ top: (this.state.y ? this.state.y : 0), left: (this.state.x ? this.state.x : 0), backgroundImage: `url(${this.props.url})`, backgroundSize: "cover", backgroundPosition: "center" }}
      className={"drag-item" + ` drag-${this.props.type.toLowerCase()}` + (this.props.drag ? " drag" : "") + (this.state.selected ? " drag-item--selected" : "")}
        onClick={(e) => {
          if (this.props.function === "Editor") {
            e.preventDefault();
            e.stopPropagation();
            this.props.selectElement(this.props.index, this.props.type, this.props.gi);
          }
        }}
        onMouseDown={(e) => {
          if (this.props.function === "Editor") {
            e.preventDefault();
            e.stopPropagation();
            this.setState({
              drag: true
            }, () => {
              if (this.props.type === "GADGET") {
                this.props.selectElement(this.props.index, this.props.type, this.props.gi, this.setCallbacks);
              } else if (this.props.type === "UTILITY") {
                this.props.selectElement(this.props.index, this.props.type, this.props.gi, this.setCallbacks);
              } else {
                this.props.selectElement(this.props.index, this.props.type, null, this.setCallbacks);
              }
            });
          }
        }}
        onTouchStart={(e) => {
          if (this.props.function === "Editor") {
            e.preventDefault();
            e.stopPropagation();
            this.setState({
              drag: true
            }, () => {
              if (this.props.type === "GADGET") {
                this.props.selectElement(this.props.index, this.props.type, this.props.gi, this.setCallbacks);
              } else if (this.props.type === "UTILITY") {
                this.props.selectElement(this.props.index, this.props.type, this.props.gi, this.setCallbacks);
              } else {
                this.props.selectElement(this.props.index, this.props.type, null, this.setCallbacks);
              }
            })
          }
        }}
        data-type={this.props.type}>
        { this.props.labels ? (
          <span>{(this.props.type === "GADGET" || this.props.type === "UTILITY" || this.props.type === "OPERATOR" ? this.props.value.replace("_", " ").replace("_", " ").toUpperCase() : "")}</span>
        ) : ""}
        { this.state.selected ? (
          <button className="drag-item__button" onClick={this.removeItem} onMouseDown={this.removeItem}>X</button>
        ) : ""}
      </div>
    )
  }
}

export default DragItem;
