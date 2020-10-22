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
    const url = `https://cdn.r6stats.com/badges/${this.props.name.toLowerCase()}_badge.png`;
    return (
      <div style={{ top: (this.props.y ? this.props.y : 0), left: (this.props.x ? this.props.x : 0), background: `url(${url})`, backgroundSize: "cover", backgroundPosition: "center" }}
      className={"drag-item" + (this.props.drag ? " drag" : "")}
        onMouseDown={() => {
          this.setState({
            drag: true
          }, () => {
            this.props.selectElement(this.props.index);
          });
        }}>
      </div>
    )
  }
}

export default DragItem;
