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
      className={"drag-item" + (this.props.drag ? " drag" : "") + ` DRAG-${this.props.type}`}
        onMouseDown={() => {
          this.setState({
            drag: true
          }, () => {
            this.props.selectElement(this.props.index);
          });
        }} data-type={this.props.type}>
      </div>
    )
  }
}

export default DragItem;
