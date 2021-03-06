/* client/src/components/partials/DragItem.js */

import React from "react";
import { SNAPS, SNAP_TOLERANCE, CANVAS_WIDTH, CANVAS_HEIGHT, ATTRIBUTES } from "../../data.js";

let width = 40;
let height = 40;

class DragItem extends React.Component {
  constructor(props) {
    super(props);

    // Setup/remove callbacks
    this.setCallbacks = this.setCallbacks.bind(this);

    // Handle drag/touch
    this.removeItem = this.removeItem.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.checkSnap = this.checkSnap.bind(this);

    // Manage attributes
    this.toggleAttributeMenu = this.toggleAttributeMenu.bind(this);
    this.updatePropAttributes = this.updatePropAttributes.bind(this);

    this.state = {
      drag: false,
      x: this.props.x,
      y: this.props.y,
      floor: this.props.floor,
      selected: (this.props.selected && (this.props.type === this.props.selected.type) && (this.props.index === this.props.selected.index) && (!this.props.selected.gi || this.props.selected.gi && this.props.gi === this.props.selected.gi)),
      snaps: (this.props.map ? SNAPS[this.props.map][this.props.floor] : undefined),
      attribute: this.props.attribute ? this.props.attribute : ATTRIBUTES[this.props.type][0],
      attributeMenu: false
    }
  }
  toggleAttributeMenu(e) {
    this.setState({
      attributeMenu: !this.state.attributeMenu
    });
  }
  setCallbacks() {
    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("mouseup", this.onMouseUp);
    document.addEventListener("touchmove", this.onTouchMove);
    document.addEventListener("touchend", this.onMouseUp);
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
    }
    if (newY < 0) {
      newY = 0;
    } else if (newY > this.props.parentBounds.height - height) {
      newY = this.props.parentBounds.height - height;
    }

    let newBounds = this.checkSnap(newX, newY);

    this.setState({
      x: newBounds.newX,
      y: newBounds.newY
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
    }
    if (newX > this.props.parentBounds.width - width) {
      newX = this.props.parentBounds.width - width;
    }
    if (newY < 0) {
      newY = 0;
    } else if (newY > this.props.parentBounds.height - height) {
      newY = this.props.parentBounds.height - height;
    }

    let newBounds = this.checkSnap(newX, newY);

    this.setState({
      x: newBounds.newX,
      y: newBounds.newY
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
        floor: this.state.floor,
        attribute: this.state.attribute
      };
      if (position.x < 0) {
        position.x = Math.floor(CANVAS_WIDTH / 2);
      }
      if (position.x >= CANVAS_WIDTH) {
        position.x = Math.floor(CANVAS_WIDTH / 2);
      }
      if (position.y < 0) {
        position.y = Math.floor(CANVAS_HEIGHT / 2);
      }
      if (position.y >= CANVAS_HEIGHT) {
        position.y = Math.floor(CANVAS_HEIGHT / 2);
      }
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
  checkSnap(newX, newY) {

    if (this.props.map) {
      this.state.snaps.forEach((region, index) => {
        if (newX >= region.x0 && newX <= region.x && newY >= region.y0 && newY <= region.y) {
          this.state.snaps[index].locations.forEach((snap) => {
            if (newX >= (snap.x - SNAP_TOLERANCE) && newX <= (snap.x + SNAP_TOLERANCE) && newY >= (snap.y - SNAP_TOLERANCE) && newY <= (snap.y + SNAP_TOLERANCE)) {
              newX = snap.x;
              newY = snap.y;
            }
          });
        }
      })
    }

    return {
      newX: newX,
      newY: newY
    }
  }
  updatePropAttributes(e) {
    let position = {
      x: this.state.x,
      y: this.state.y,
      floor: this.state.floor,
      attribute: e.target.value
    };

    if (this.props.type === "ROTATE") {
      this.props.updateRotatePositions(this.props.index, position);
    }
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
      let newX = this.props.x;
      let newY = this.props.y;
      if (newX < 0 || newX > CANVAS_WIDTH) {
        newX = Math.floor(CANVAS_WIDTH / 2);
      }
      if (newY < 0 || newY > CANVAS_HEIGHT) {
        newY = Math.floor(CANVAS_HEIGHT / 2);
      }
      this.setState({
        selected: selected,
        x: newX,
        y: newY,
        floor: this.props.floor,
        snaps: (this.props.map ? SNAPS[this.props.map][this.props.floor] : undefined),
        attributeMenu: (!selected ? false : this.state.attributeMenu),
        attribute: this.props.attribute ? this.props.attribute : ATTRIBUTES[this.props.type][0]
      });
    }
  }
  render() {
    const options = ATTRIBUTES[this.props.type].map((attr, index) => {
      return <option key={index}>{attr}</option>
    });
    let url;
    if (this.props.type === "ROTATE") {
      let splitUrl = this.props.url.split("\.");
      url = "../.." + splitUrl[4] + "-" + ATTRIBUTES[this.props.type].indexOf(this.state.attribute) + "." + splitUrl[5];
    } else {
      url = this.props.url;
    }
    return (
      <div style={{ top: (this.state.y ? this.state.y : 0), left: (this.state.x ? this.state.x : 0), backgroundImage: `url(${url})`, backgroundSize: "cover", backgroundPosition: "center" }}
      className={"drag-item" + ` drag-${this.props.type.toLowerCase()}` + (this.props.drag ? " drag" : "") + (this.state.selected ? " drag-item--selected" : "")}
        onDoubleClick={(e) => {
          if (this.props.function === "Editor" && this.props.type === "ROTATE") {
            this.toggleAttributeMenu();
          }
        }}
        onClick={(e) => {
          if (this.props.function === "Editor" && !this.state.attributeMenu) {
            this.props.selectElement(this.props.index, this.props.type, this.props.gi);
          }
        }}
        onMouseDown={(e) => {
          if (this.props.function === "Editor" && !this.state.attributeMenu) {
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
          } else {
            e.stopPropagation();
          }
        }}
        onTouchStart={(e) => {
          if (this.props.function === "Editor" && !this.state.attributeMenu) {
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
          <button className="drag-item__button" onClick={this.removeItem} onMouseDown={this.removeItem} onTouchStart={this.removeItem}>X</button>
        ) : ""}
        { this.state.attributeMenu ? (
          <select className="drag-item__select" onChange={this.updatePropAttributes} value={this.state.attribute}>
            { options }
          </select>
        ) : ""}
      </div>
    )
  }
}

export default DragItem;
