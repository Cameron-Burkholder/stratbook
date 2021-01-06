/* client/src/components/partials/ViewerDragItem.js */

import React from "react";

class ViewerDragItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drag: false
    }
  }
  render() {
    return (
      <div style={{ top: (this.props.y ? this.props.y : 0), left: (this.props.x ? this.props.x : 0), backgroundImage: `url(${this.props.url})`, backgroundSize: "cover", backgroundPosition: "center" }}
      className="drag-item" data-type={this.props.type}>
      </div>
    )
  }
}

export default ViewerDragItem;
