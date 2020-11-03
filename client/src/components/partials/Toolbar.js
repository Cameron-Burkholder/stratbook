/* client/src/components/partials/Toolbar.js */

import React from "react";

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="toolbar">
        { this.props.operators[this.props.activeOperator] !== "OPERATOR" ? (
          <div>
            <div className="manage">
              <h3>Operator</h3>
              <img className="operator-image" alt="Operator"
              src={(this.props.operators[this.props.activeOperator] !== "OPERATOR" ? `../media/${this.props.operators[this.props.activeOperator].charAt(0) + this.props.operators[this.props.activeOperator].slice(1).toLowerCase()}.webp` : "")}
              />
              <div className="controls">
                <button onClick={() => { this.props.insertOperator(this.props.activeOperator) }}>Insert</button>
                <button onClick={() => { this.props.removeOperator(this.props.activeOperator) }}>Remove</button>
              </div>
            </div>
            <div className="manage">
              <h4>Gadget</h4>
              <p>{this.props.gadgets[this.props.activeOperator].gadget}</p>
              { this.props.gadgets[this.props.activeOperator].count !== 0 ? (
                <div>
                  { this.props.gadgetPositions[this.props.activeOperator].length < this.props.gadgets[this.props.activeOperator].count ? (
                    <button onClick={() => { this.props.insertGadget(this.props.activeOperator) }}>Insert</button>
                  ) : ""}
                  <button onClick={() => { this.props.removeGadget(this.props.activeOperator) }}>Remove</button>
                </div>
              ) : ""}
            </div>
            <div className="manage">
              <h4>Utility</h4>
              <p>{this.props.utility[this.props.activeOperator]}</p>
            </div>
          </div>
        ) : ""}
        { this.props.type === "ATTACK" ? (
          <div>
            <div className="manage">
              <h3>Drones</h3>
              <button onClick={this.props.insertDrone}>Insert</button>
              <button onClick={this.props.removeDrone}>Remove</button>
            </div>
          </div>
        ) : (
          <div>
            <div className="manage">
              <h3>Rotates</h3>
              <button onClick={this.props.insertRotate}>Insert</button>
              <button onClick={this.props.removeRotate}>Remove</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Toolbar;
