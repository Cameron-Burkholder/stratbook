/* client/src/components/partials/DragItem.js */

import React from "react";

class DragItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drag: false
    }
  }
  render() {
    return (
      <div style={{ top: (this.props.y ? this.props.y : 0), left: (this.props.x ? this.props.x : 0), backgroundImage: `url(${this.props.url})`, backgroundSize: "cover", backgroundPosition: "center" }}
      className={"drag-item" + (this.props.drag ? " drag" : "")}
        onMouseDown={() => {
          this.setState({
            drag: true
          }, () => {
            if (this.props.type === "GADGET") {
              this.props.selectElement(this.props.index, this.props.type, this.props.gindex);
            } else if (this.props.type === "UTILITY") {
              this.props.selectElement(this.props.index, this.props.type, this.props.uindex);
            } else {
              this.props.selectElement(this.props.index, this.props.type);
            }
          });
        }} data-type={this.props.type}>
      </div>
    )
  }
}

export default DragItem;
