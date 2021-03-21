/* client/src/components/partials/ViewerDragItem.js */

import React from "react";

class ViewerDragItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drag: false,
      x: this.props.x,
      y: this.props.y,
    }
  }
  render() {
    return (
      <div style={{ top: (this.props.y ? this.props.y : 0), left: (this.props.x ? this.props.x : 0), backgroundImage: `url(${this.props.url})`, backgroundSize: "cover", backgroundPosition: "center" }}
      className={"drag-item" + ` drag-${this.props.type.toLowerCase()}` + (this.props.drag ? " drag" : "") + (this.state.selected ? " drag-item--selected" : "")}
        data-type={this.props.type}>
        { this.props.labels ? (
          <span>{(this.props.type === "GADGET" || this.props.type === "UTILITY" || this.props.type === "OPERATOR" ? this.props.value.replace("_", " ").replace("_", " ").toUpperCase() : "")}</span>
        ) : ""}
      </div>
    )
  }
}

export default ViewerDragItem;
